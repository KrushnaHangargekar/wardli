/**
 * Dedicated Exact Outfit History Screen
 * Matching design sheet: 05_history.png
 * Supports grouping by Day/Week/Month, manual past logs, corrections, deletions,
 * and frozen snapshot inspection.
 */

import { storage } from '../../services/storage.js';
import { historyService } from '../../services/historyService.js';
import { OCCASIONS } from '../../domain/constants.js';
import { getGarmentSvg } from '../assets.js';

export function renderHistoryScreen({ onOpenManualLog, onOpenHistoryDetail, onOpenLeaderboard }) {
  const container = document.createElement('div');
  container.className = 'history-screen';

  let currentGrouping = 'day'; // 'day' | 'week' | 'month'
  let filterOccasion = 'All';
  let searchQuery = '';

  function renderContent() {
    const userId = storage.getCurrentUserId();
    const groups = historyService.getGroupedHistory(userId, currentGrouping, {
      occasion: filterOccasion !== 'All' ? filterOccasion : null
    });

    const totalEvents = storage.getHistoryEvents(userId).length;

    container.innerHTML = `
      <div class="screen-header">
        <div>
          <h2 class="screen-title">Outfit History</h2>
          <p class="screen-subtitle">${totalEvents} recorded wear events</p>
        </div>
        <button id="btn-log-past" class="btn btn-primary btn-sm">
          + Log Past Outfit
        </button>
      </div>

      <!-- Grouping Switcher Tabs & Leaderboard -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
        <div class="filter-pill-bar" style="margin-bottom: 0;">
          <button class="pill-btn ${currentGrouping === 'day' ? 'active' : ''}" data-group="day">Day</button>
          <button class="pill-btn ${currentGrouping === 'week' ? 'active' : ''}" data-group="week">Week</button>
          <button class="pill-btn ${currentGrouping === 'month' ? 'active' : ''}" data-group="month">Month</button>
        </div>

        <button id="btn-wear-summary" style="font-size: 11px; font-weight: 700; background: #F4F4F5; border: 1px solid #E5E5E5; padding: 6px 10px; border-radius: 8px; cursor: pointer;">
          📊 Wear Counts
        </button>
      </div>

      <!-- Filter Bar: Occasion & Search -->
      <div style="display: flex; gap: 8px; margin-bottom: 16px;">
        <select id="select-history-occ" class="form-select" style="flex: 1; padding: 6px 10px; font-size: 12px;">
          <option value="All">All Occasions</option>
          ${OCCASIONS.map(o => `<option value="${o}" ${o === filterOccasion ? 'selected' : ''}>${o}</option>`).join('')}
        </select>
        <input type="date" id="input-history-date" class="form-input" style="flex: 1; padding: 6px 10px; font-size: 12px;" value="${searchQuery}" placeholder="Filter date">
      </div>

      <!-- Grouped History List -->
      ${groups.length === 0 ? `
        <div class="empty-state">
          <div style="font-size: 36px;">⏳</div>
          <h3 class="empty-state-title">No wear history yet</h3>
          <p class="empty-state-desc">Wear an outfit from the suggestions tab or log a past outfit manually to start tracking.</p>
          <button id="btn-empty-log" class="btn btn-secondary btn-sm" style="margin-top: 10px;">
            + Log Past Outfit
          </button>
        </div>
      ` : `
        <div class="history-group-list">
          ${groups.map(group => {
            // Collect up to 4 thumbnail previews from the group's events
            const allItemsInGroup = [];
            group.events.forEach(evt => {
              (evt.itemSnapshots || []).forEach(snap => {
                if (allItemsInGroup.length < 4 && !allItemsInGroup.some(i => i.id === snap.id)) {
                  allItemsInGroup.push(snap);
                }
              });
            });

            return `
              <div class="history-card-item" data-group-key="${group.key}" data-event-id="${group.events[0]?.id}">
                <div class="history-card-left">
                  <div class="history-thumbnails">
                    ${allItemsInGroup.map(item => `
                      <div class="history-thumb" title="${item.name}">
                        ${getGarmentSvg(item.category, item.subcategory, item.primaryColor)}
                      </div>
                    `).join('')}
                  </div>
                  <div>
                    <div class="history-info-date">${group.title}</div>
                    <div class="history-info-sub">
                      ${group.count} ${group.count === 1 ? 'outfit tried' : 'outfits tried'}
                      ${group.events[0]?.occasion ? `&bull; ${group.events[0].occasion}` : ''}
                    </div>
                  </div>
                </div>

                <div style="color: #71717A; font-size: 18px; font-weight: 300;">
                  &rsaquo;
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `}
    `;

    // Grouping tabs
    container.querySelectorAll('[data-group]').forEach(btn => {
      btn.addEventListener('click', () => {
        currentGrouping = btn.getAttribute('data-group');
        renderContent();
      });
    });

    // Occasion dropdown filter
    const occSelect = container.querySelector('#select-history-occ');
    if (occSelect) {
      occSelect.addEventListener('change', (e) => {
        filterOccasion = e.target.value;
        renderContent();
      });
    }

    // Date search filter
    const dateInput = container.querySelector('#input-history-date');
    if (dateInput) {
      dateInput.addEventListener('change', (e) => {
        searchQuery = e.target.value;
        if (searchQuery) {
          // Open detail for that date if exists
          const evts = storage.getHistoryEvents(userId, { fromDate: searchQuery, toDate: searchQuery });
          if (evts.length > 0) {
            onOpenHistoryDetail(evts[0].id);
          } else {
            alert(`No outfit recorded on ${searchQuery}`);
          }
        }
      });
    }

    // Log past outfit button
    const logBtn = container.querySelector('#btn-log-past');
    if (logBtn) logBtn.addEventListener('click', onOpenManualLog);
    const emptyLogBtn = container.querySelector('#btn-empty-log');
    if (emptyLogBtn) emptyLogBtn.addEventListener('click', onOpenManualLog);

    // Wear summary leaderboard trigger
    const summaryBtn = container.querySelector('#btn-wear-summary');
    if (summaryBtn) summaryBtn.addEventListener('click', onOpenLeaderboard);

    // History card click
    container.querySelectorAll('.history-card-item').forEach(card => {
      card.addEventListener('click', () => {
        const eventId = card.getAttribute('data-event-id');
        if (eventId) {
          onOpenHistoryDetail(eventId);
        }
      });
    });
  }

  renderContent();

  return {
    element: container,
    refresh: renderContent
  };
}
