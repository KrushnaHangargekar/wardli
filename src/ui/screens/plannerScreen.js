/**
 * Weekly Planner Screen
 * Matching design sheet: 04_planner.png
 * Separates planned outfits from wear history, displays laundry/reserved alerts,
 * and allows converting a plan to worn.
 */

import { storage } from '../../services/storage.js';
import { plannerService } from '../../services/plannerService.js';
import { getGarmentSvg } from '../assets.js';

export function renderPlannerScreen({ onOpenPlanModal, onRefreshAll, onNavigateHistory }) {
  const container = document.createElement('div');
  container.className = 'planner-screen';

  let selectedDate = new Date().toISOString().split('T')[0];

  function getWeekDays(referenceDateStr) {
    const ref = new Date(referenceDateStr + 'T00:00:00');
    const dayOfWeek = (ref.getDay() + 6) % 7; // Monday = 0
    const monday = new Date(ref);
    monday.setDate(ref.getDate() - dayOfWeek);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      days.push({
        dateStr: iso,
        dayName: dayNames[i],
        dayNum: d.getDate(),
        isToday: iso === new Date().toISOString().split('T')[0]
      });
    }
    return days;
  }

  function renderContent() {
    const userId = storage.getCurrentUserId();
    const weekDays = getWeekDays(selectedDate);
    const plans = plannerService.getDecoratedPlans({ userId });

    const currentPlan = plans.find(p => p.plannedDate === selectedDate && p.status === 'Planned');

    const monthLabel = new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });

    container.innerHTML = `
      <div class="screen-header">
        <div>
          <h2 class="screen-title">Weekly Planner</h2>
          <p class="screen-subtitle">${monthLabel} &bull; Scheduled looks</p>
        </div>
        <button id="btn-schedule-new" class="btn btn-primary btn-sm">
          + Schedule
        </button>
      </div>

      <!-- Calendar Week Strip (Mon-Sun) -->
      <div class="planner-week-strip">
        ${weekDays.map(d => {
          const hasPlan = plans.some(p => p.plannedDate === d.dateStr && p.status === 'Planned');
          const isSelected = d.dateStr === selectedDate;
          return `
            <div class="day-cell ${isSelected ? 'active' : ''}" data-day-date="${d.dateStr}">
              <span class="day-name">${d.dayName}</span>
              <span class="day-num">${d.dayNum}</span>
              ${hasPlan ? `<div style="width: 4px; height: 4px; border-radius: 50%; background: ${isSelected ? '#FFFFFF' : '#000000'}; margin-top: 4px;"></div>` : ''}
            </div>
          `;
        }).join('')}
      </div>

      <!-- Informative Note -->
      <div style="background: #FAFAFA; border: 1px solid #E5E5E5; border-left: 3px solid #27272A; border-radius: 8px; padding: 8px 12px; margin-bottom: 16px; font-size: 11px; color: #71717A;">
        <strong style="color: #1F1F1F;">Note:</strong> Scheduled outfits do not increment wear counts or appear in wear history until you tap &ldquo;Mark as Worn&rdquo;.
      </div>

      <!-- Selected Day's Plan Card -->
      ${!currentPlan ? `
        <div class="empty-state" style="padding: 30px 10px;">
          <div style="width: 40px; height: 40px; border-radius: 10px; background: #F4F4F5; margin: 0 auto 14px; display: flex; align-items: center; justify-content: center;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#71717A" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
          </div>
          <h3 class="empty-state-title">No outfit planned for this date</h3>
          <p class="empty-state-desc">Plan your look in advance to stay organized throughout the week.</p>
          <button id="btn-plan-for-day" class="btn btn-primary btn-sm" style="margin-top: 10px;">
            + Plan for ${selectedDate}
          </button>
        </div>
      ` : `
        <div class="planner-plan-card">
          <!-- Real-Time Status Warnings -->
          ${currentPlan.hasWarnings ? `
            <div class="warning-banner">
              <div style="width: 16px; height: 16px; border-radius: 3px; background: #D97706; flex-shrink: 0; margin-top: 1px;"></div>
              <div>
                ${currentPlan.warnings.map(w => `<div>${w.message}</div>`).join('')}
              </div>
            </div>
          ` : ''}

          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div>
              <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #71717A;">Scheduled Look</span>
              <h3 style="font-size: 16px; font-weight: 800; color: #000000;">${currentPlan.occasion} Outfit</h3>
            </div>
            <span class="status-badge clean">Planned</span>
          </div>

          <!-- Outfits Grid Preview -->
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; background: #FAFAFA; padding: 12px; border-radius: 12px;">
            <!-- Top -->
            <div style="text-align: center;">
              <div style="width: 100%; height: 75px; background: #fff; border-radius: 8px; display: flex; align-items: center; justify-content: center; border: 1px solid #E5E5E5;">
                ${getGarmentSvg(currentPlan.top?.category, currentPlan.top?.subcategory, currentPlan.top?.primaryColor)}
              </div>
              <div style="font-size: 11px; font-weight: 600; margin-top: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${currentPlan.top?.name}</div>
            </div>

            <!-- Bottom -->
            <div style="text-align: center;">
              <div style="width: 100%; height: 75px; background: #fff; border-radius: 8px; display: flex; align-items: center; justify-content: center; border: 1px solid #E5E5E5;">
                ${getGarmentSvg(currentPlan.bottom?.category, currentPlan.bottom?.subcategory, currentPlan.bottom?.primaryColor)}
              </div>
              <div style="font-size: 11px; font-weight: 600; margin-top: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${currentPlan.bottom?.name}</div>
            </div>

            <!-- Footwear -->
            <div style="text-align: center;">
              <div style="width: 100%; height: 75px; background: #fff; border-radius: 8px; display: flex; align-items: center; justify-content: center; border: 1px solid #E5E5E5;">
                ${getGarmentSvg(currentPlan.footwear?.category, currentPlan.footwear?.subcategory, currentPlan.footwear?.primaryColor)}
              </div>
              <div style="font-size: 11px; font-weight: 600; margin-top: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${currentPlan.footwear?.name}</div>
            </div>
          </div>

          <!-- Accessories if present -->
          ${currentPlan.accessories && currentPlan.accessories.length > 0 ? `
            <div style="display: flex; gap: 6px; overflow-x: auto; padding: 4px 0;">
              ${currentPlan.accessories.map(acc => `
                <div style="display: flex; align-items: center; gap: 4px; background: #FAFAFA; border: 1px solid #E5E5E5; padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 600;">
                  <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #27272A; flex-shrink: 0;"></span>
                  <span>${acc.name}</span>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${currentPlan.notes ? `
            <p style="font-size: 12px; color: #52525B; font-style: italic;">
              &ldquo;${currentPlan.notes}&rdquo;
            </p>
          ` : ''}

          <!-- Plan Action Buttons -->
          <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 4px;">
            <button id="btn-mark-plan-worn" class="btn btn-primary" style="padding: 12px;">
              Mark as Worn
            </button>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
              <button id="btn-edit-plan" class="btn btn-secondary btn-sm">Edit Plan</button>
              <button id="btn-delete-plan" class="btn btn-secondary btn-sm" style="color: #DC2626;">Remove Plan</button>
            </div>
          </div>
        </div>
      `}
    `;

    // Day cell click listeners
    container.querySelectorAll('.day-cell').forEach(cell => {
      cell.addEventListener('click', () => {
        selectedDate = cell.getAttribute('data-day-date');
        renderContent();
      });
    });

    // Schedule new button
    const scheduleBtn = container.querySelector('#btn-schedule-new');
    if (scheduleBtn) {
      scheduleBtn.addEventListener('click', () => onOpenPlanModal(selectedDate));
    }

    const planDayBtn = container.querySelector('#btn-plan-for-day');
    if (planDayBtn) {
      planDayBtn.addEventListener('click', () => onOpenPlanModal(selectedDate));
    }

    // Mark plan as worn
    const markWornBtn = container.querySelector('#btn-mark-plan-worn');
    if (markWornBtn && currentPlan) {
      markWornBtn.addEventListener('click', () => {
        const confirmWorn = confirm(`Confirm you wore this outfit on ${selectedDate}? This will record it to your exact wear history.`);
        if (confirmWorn) {
          plannerService.markPlanAsWorn({
            planId: currentPlan.id,
            actualWearDate: selectedDate,
            userId
          });
          alert('Recorded! Wear count has been updated and a permanent wear history event was created.');
          onRefreshAll();
          onNavigateHistory();
        }
      });
    }

    // Delete plan
    const deletePlanBtn = container.querySelector('#btn-delete-plan');
    if (deletePlanBtn && currentPlan) {
      deletePlanBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to remove this scheduled outfit?')) {
          plannerService.deletePlan(currentPlan.id, userId);
          renderContent();
        }
      });
    }

    // Edit plan
    const editPlanBtn = container.querySelector('#btn-edit-plan');
    if (editPlanBtn && currentPlan) {
      editPlanBtn.addEventListener('click', () => {
        const newNotes = prompt('Update notes for this plan:', currentPlan.notes || '');
        if (newNotes !== null) {
          plannerService.updatePlan(currentPlan.id, { notes: newNotes.trim() }, userId);
          renderContent();
        }
      });
    }
  }

  renderContent();

  return {
    element: container,
    refresh: renderContent
  };
}
