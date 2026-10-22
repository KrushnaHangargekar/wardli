/**
 * Wardli Interactive Modals & Bottom Drawers
 * Handles Add Garment, Garment Detail, Item Swap, History Detail, Manual Past Wear, and Schedule Plan.
 */

import { storage } from '../services/storage.js';
import { historyService } from '../services/historyService.js';
import { plannerService } from '../services/plannerService.js';
import { suggestionEngine } from '../services/suggestionEngine.js';
import { AVAILABILITY_STATUS, DEFAULT_SUBCATEGORIES, OCCASIONS, COLOR_PALETTES } from '../domain/constants.js';
import { createGarment } from '../domain/models.js';
import { getGarmentSvg } from './assets.js';

export class ModalManager {
  constructor() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'modal-overlay';
    document.body.appendChild(this.overlay);

    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });
  }

  close() {
    this.overlay.classList.remove('open');
    setTimeout(() => {
      this.overlay.innerHTML = '';
    }, 250);
  }

  _renderSheet(title, contentHtml) {
    this.overlay.innerHTML = `
      <div class="modal-sheet">
        <div class="sheet-handle"></div>
        <div class="sheet-header">
          <div class="sheet-title">${title}</div>
          <button class="close-btn" id="modal-close-trigger">&times;</button>
        </div>
        <div class="sheet-content">
          ${contentHtml}
        </div>
      </div>
    `;
    this.overlay.querySelector('#modal-close-trigger').addEventListener('click', () => this.close());
    this.overlay.classList.add('open');
  }

  // 1. ADD GARMENT MODAL
  openAddGarment({ onSaved }) {
    const userId = storage.getCurrentUserId();
    const profile = storage.getProfile(userId);
    const customCats = profile?.customCategories || [];
    const allCategories = ['Tops', 'Bottoms', 'Footwear', 'Accessories', ...customCats];

    const contentHtml = `
      <form id="form-add-garment">
        <div class="form-group">
          <label class="form-label">Garment Name</label>
          <input type="text" id="garm-name" class="form-input" placeholder="e.g. Heavyweight Relaxed Tee" required>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <div class="form-group">
            <label class="form-label">Category</label>
            <select id="garm-cat" class="form-select">
              ${allCategories.map(c => `<option value="${c}">${c}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Subcategory</label>
            <select id="garm-subcat" class="form-select">
              ${(DEFAULT_SUBCATEGORIES['Tops'] || []).map(s => `<option value="${s}">${s}</option>`).join('')}
            </select>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <div class="form-group">
            <label class="form-label">Primary Color</label>
            <select id="garm-color" class="form-select">
              ${COLOR_PALETTES.map(p => `<option value="${p.name}">${p.name}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Availability Status</label>
            <select id="garm-status" class="form-select">
              <option value="${AVAILABILITY_STATUS.CLEAN}">Clean</option>
              <option value="${AVAILABILITY_STATUS.WORN}">Worn</option>
              <option value="${AVAILABILITY_STATUS.IN_LAUNDRY}">In Laundry</option>
              <option value="${AVAILABILITY_STATUS.RESERVED}">Reserved</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Occasions (Select applicable)</label>
          <div style="display: flex; flex-wrap: wrap; gap: 6px;">
            ${OCCASIONS.map(occ => `
              <label style="font-size: 12px; display: flex; align-items: center; gap: 4px; background: #F4F4F5; padding: 4px 10px; border-radius: 6px; cursor: pointer;">
                <input type="checkbox" name="occasions" value="${occ}" ${occ === 'Casual' ? 'checked' : ''}>
                <span>${occ}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <div class="form-group">
            <label class="form-label">Purchase Price ($)</label>
            <input type="number" id="garm-price" class="form-input" placeholder="e.g. 45" min="0" step="1">
          </div>
          <div class="form-group">
            <label class="form-label">Purchase Date</label>
            <input type="date" id="garm-pdate" class="form-input">
          </div>
        </div>

        <div style="margin-top: 20px;">
          <button type="submit" class="btn btn-primary btn-block">Add to Wardrobe</button>
        </div>
      </form>
    `;

    this._renderSheet('Add Wardrobe Item', contentHtml);

    // Dynamic subcategory update
    const catSelect = this.overlay.querySelector('#garm-cat');
    const subSelect = this.overlay.querySelector('#garm-subcat');
    catSelect.addEventListener('change', () => {
      const subs = DEFAULT_SUBCATEGORIES[catSelect.value] || ['Item', 'Custom'];
      subSelect.innerHTML = subs.map(s => `<option value="${s}">${s}</option>`).join('');
    });

    const form = this.overlay.querySelector('#form-add-garment');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = this.overlay.querySelector('#garm-name').value;
      const category = catSelect.value;
      const subcategory = subSelect.value;
      const primaryColor = this.overlay.querySelector('#garm-color').value;
      const status = this.overlay.querySelector('#garm-status').value;
      const price = this.overlay.querySelector('#garm-price').value;
      const pdate = this.overlay.querySelector('#garm-pdate').value;

      const checkedOccasions = Array.from(this.overlay.querySelectorAll('input[name="occasions"]:checked'))
        .map(el => el.value);

      const newGarment = createGarment({
        userId,
        name,
        category,
        subcategory,
        primaryColor,
        occasions: checkedOccasions.length > 0 ? checkedOccasions : ['Casual'],
        status,
        purchasePrice: price ? Number(price) : null,
        purchaseDate: pdate || null
      });

      storage.saveGarment(newGarment, userId);
      this.close();
      if (onSaved) onSaved(newGarment);
    });
  }

  // 2. GARMENT DETAIL MODAL
  openGarmentDetail(garmentId, { onUpdated, onDeleted }) {
    const userId = storage.getCurrentUserId();
    const garment = storage.getGarment(garmentId, userId);
    if (!garment) return;

    const cpw = garment.purchasePrice && (garment.wearCount || 0) > 0
      ? `$${(garment.purchasePrice / garment.wearCount).toFixed(2)} / wear`
      : garment.purchasePrice ? `$${garment.purchasePrice} (Unworn)` : 'Not set';

    const contentHtml = `
      <div style="text-align: center; margin-bottom: 20px;">
        <div style="width: 140px; height: 140px; background: #FAFAFA; border: 1px solid #E5E5E5; border-radius: 16px; margin: 0 auto 14px auto; display: flex; align-items: center; justify-content: center;">
          ${getGarmentSvg(garment.category, garment.subcategory, garment.primaryColor)}
        </div>
        <h3 style="font-size: 18px; font-weight: 800; color: #000000;">${garment.name}</h3>
        <p style="font-size: 13px; color: #71717A;">${garment.category} &bull; ${garment.subcategory || ''} &bull; ${garment.primaryColor}</p>
      </div>

      <div style="background: #FAFAFA; border: 1px solid #E5E5E5; border-radius: 14px; padding: 14px; margin-bottom: 16px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 13px;">
          <div>
            <span style="color: #71717A; font-size: 11px; text-transform: uppercase; font-weight: 700;">Wear Count</span>
            <div style="font-size: 16px; font-weight: 800; color: #000000;">${garment.wearCount || 0} wears</div>
          </div>
          <div>
            <span style="color: #71717A; font-size: 11px; text-transform: uppercase; font-weight: 700;">Cost Per Wear</span>
            <div style="font-size: 16px; font-weight: 800; color: #059669;">${cpw}</div>
          </div>
          <div>
            <span style="color: #71717A; font-size: 11px; text-transform: uppercase; font-weight: 700;">Purchase Price</span>
            <div style="font-size: 14px; font-weight: 700; color: #000000;">${garment.purchasePrice ? `$${garment.purchasePrice}` : 'None'}</div>
          </div>
          <div>
            <span style="color: #71717A; font-size: 11px; text-transform: uppercase; font-weight: 700;">Occasions</span>
            <div style="font-size: 12px; font-weight: 600; color: #000000;">${(garment.occasions || []).join(', ')}</div>
          </div>
        </div>
      </div>

      <!-- Quick Status Change -->
      <div class="form-group">
        <label class="form-label">Update Availability Status</label>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px;">
          ${Object.values(AVAILABILITY_STATUS).map(st => `
            <button class="pill-btn ${garment.status === st ? 'active' : ''}" data-change-status="${st}">
              ${st}
            </button>
          `).join('')}
        </div>
      </div>

      <div style="display: flex; gap: 10px; margin-top: 24px;">
        <button id="btn-archive-garment" class="btn btn-secondary btn-sm" style="flex: 1; color: #DC2626;">
          Archive / Delete Item
        </button>
      </div>
    `;

    this._renderSheet('Item Details', contentHtml);

    // Status change listener
    this.overlay.querySelectorAll('[data-change-status]').forEach(btn => {
      btn.addEventListener('click', () => {
        const newStatus = btn.getAttribute('data-change-status');
        storage.updateGarment(garmentId, { status: newStatus }, userId);
        this.close();
        if (onUpdated) onUpdated();
      });
    });

    // Archive / delete listener
    const archiveBtn = this.overlay.querySelector('#btn-archive-garment');
    if (archiveBtn) {
      archiveBtn.addEventListener('click', () => {
        if (confirm(`Archive "${garment.name}"? Past wear history will safely retain its snapshot.`)) {
          storage.archiveGarment(garmentId, userId);
          this.close();
          if (onDeleted) onDeleted();
        }
      });
    }
  }

  // 3. SINGLE ITEM SWAP DRAWER
  openSwapDrawer({ category, currentOutfit, occasion, onItemChosen }) {
    const userId = storage.getCurrentUserId();
    const replacements = suggestionEngine.getAvailableReplacements({
      category,
      currentOutfit,
      occasion,
      userId
    });

    const contentHtml = `
      <p style="font-size: 12px; color: #71717A; margin-bottom: 14px;">
        Choose another clean ${category} item to swap without rebuilding the whole outfit:
      </p>

      ${replacements.length === 0 ? `
        <div class="empty-state" style="padding: 20px;">
          <div style="font-size: 28px;">👔</div>
          <div class="empty-state-title">No alternative clean ${category} available</div>
          <p class="empty-state-desc">All other items in this category are either in laundry, reserved, or already selected.</p>
        </div>
      ` : `
        <div style="display: flex; flex-direction: column; gap: 8px; max-height: 400px; overflow-y: auto;">
          ${replacements.map(r => `
            <div class="swap-choice-item" data-item-id="${r.item.id}" style="
              display: flex; align-items: center; justify-content: space-between;
              background: #FAFAFA; border: 1px solid #E5E5E5; border-radius: 10px;
              padding: 10px 14px; cursor: pointer; transition: 0.15s ease;
            ">
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 40px; height: 40px; background: #fff; border-radius: 8px; border: 1px solid #E5E5E5; display: flex; align-items: center; justify-content: center;">
                  ${getGarmentSvg(r.item.category, r.item.subcategory, r.item.primaryColor)}
                </div>
                <div>
                  <div style="font-size: 13px; font-weight: 700; color: #000000;">${r.item.name}</div>
                  <div style="font-size: 11px; color: #71717A;">
                    ${r.item.primaryColor} &bull; ${r.item.occasions.includes(occasion) ? '✓ Matches occasion' : 'Alternative'}
                  </div>
                </div>
              </div>

              <div style="font-size: 12px; font-weight: 700; color: #000000;">
                Select &rarr;
              </div>
            </div>
          `).join('')}
        </div>
      `}
    `;

    this._renderSheet(`Replace ${category}`, contentHtml);

    this.overlay.querySelectorAll('.swap-choice-item').forEach(itemEl => {
      itemEl.addEventListener('click', () => {
        const id = itemEl.getAttribute('data-item-id');
        const chosen = storage.getGarment(id, userId);
        this.close();
        if (onItemChosen && chosen) onItemChosen(chosen);
      });
    });
  }

  // 4. HISTORY DETAIL MODAL (FROZEN SNAPSHOT)
  openHistoryDetail(eventId, { onUpdated, onDeleted }) {
    const userId = storage.getCurrentUserId();
    const event = storage.getHistoryEvent(eventId, userId);
    if (!event) return;

    const contentHtml = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
        <div>
          <span style="font-size: 11px; font-weight: 700; color: #71717A; text-transform: uppercase;">Exact Wear History</span>
          <h3 style="font-size: 18px; font-weight: 800; color: #000000;">${event.wearDate}</h3>
          <span style="font-size: 12px; color: #71717A;">${event.occasion} &bull; ${event.wearTime || 'Time unset'}</span>
        </div>
        <span class="status-badge clean">Recorded</span>
      </div>

      ${event.notes ? `
        <div style="background: #FAFAFA; border: 1px solid #E5E5E5; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 13px; font-style: italic;">
          &ldquo;${event.notes}&rdquo;
        </div>
      ` : ''}

      <h4 style="font-size: 13px; font-weight: 700; color: #71717A; text-transform: uppercase; margin-bottom: 8px;">
        Frozen Item Snapshot (${event.itemSnapshots?.length || 0} Items)
      </h4>

      <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">
        ${(event.itemSnapshots || []).map(snap => `
          <div style="display: flex; align-items: center; justify-content: space-between; background: #FAFAFA; border: 1px solid #E5E5E5; border-radius: 10px; padding: 10px 12px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 36px; height: 36px; background: #fff; border-radius: 6px; display: flex; align-items: center; justify-content: center; border: 1px solid #E5E5E5;">
                ${getGarmentSvg(snap.category, snap.subcategory, snap.primaryColor)}
              </div>
              <div>
                <div style="font-size: 13px; font-weight: 700; color: #000000;">${snap.name}</div>
                <div style="font-size: 11px; color: #71717A;">${snap.category} &bull; ${snap.primaryColor}</div>
              </div>
            </div>
            ${snap.purchasePrice ? `<span style="font-size: 12px; font-weight: 600; color: #71717A;">$${snap.purchasePrice}</span>` : ''}
          </div>
        `).join('')}
      </div>

      <div style="display: flex; gap: 8px;">
        <button id="btn-edit-history-entry" class="btn btn-secondary btn-sm" style="flex: 1;">
          ✏️ Correct Date / Notes
        </button>
        <button id="btn-delete-history-entry" class="btn btn-secondary btn-sm" style="color: #DC2626;">
          Delete Entry
        </button>
      </div>
    `;

    this._renderSheet('Wear History Record', contentHtml);

    // Edit entry
    const editBtn = this.overlay.querySelector('#btn-edit-history-entry');
    if (editBtn) {
      editBtn.addEventListener('click', () => {
        const newDate = prompt('Correct wear date (YYYY-MM-DD):', event.wearDate);
        if (newDate && newDate.trim()) {
          const newNotes = prompt('Update notes:', event.notes || '') || '';
          historyService.updateHistoryEntry(event.id, {
            wearDate: newDate.trim(),
            notes: newNotes.trim()
          }, userId);
          this.close();
          if (onUpdated) onUpdated();
        }
      });
    }

    // Delete entry
    const deleteBtn = this.overlay.querySelector('#btn-delete-history-entry');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => {
        if (confirm('Delete this wear history entry? This will automatically decrement wear counts for its items.')) {
          historyService.deleteHistoryEntry(event.id, userId);
          this.close();
          if (onDeleted) onDeleted();
        }
      });
    }
  }

  // 5. MANUAL LOG PAST OUTFIT MODAL
  openManualLog({ onLogged }) {
    const userId = storage.getCurrentUserId();
    const garments = storage.getGarments(userId, { includeArchived: false });

    const contentHtml = `
      <form id="form-manual-log">
        <div class="form-group">
          <label class="form-label">Wear Date</label>
          <input type="date" id="manual-date" class="form-input" value="${new Date().toISOString().split('T')[0]}" required>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <div class="form-group">
            <label class="form-label">Occasion</label>
            <select id="manual-occ" class="form-select">
              ${OCCASIONS.map(o => `<option value="${o}">${o}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Time of Day (Optional)</label>
            <input type="time" id="manual-time" class="form-input" value="12:00">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Select Items Worn</label>
          <div style="max-height: 200px; overflow-y: auto; border: 1px solid #E5E5E5; border-radius: 8px; padding: 6px;">
            ${garments.map(g => `
              <label style="display: flex; align-items: center; justify-content: space-between; padding: 6px 10px; border-bottom: 1px solid #F4F4F5; font-size: 13px; cursor: pointer;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <input type="checkbox" name="manual_items" value="${g.id}">
                  <span style="font-weight: 600;">${g.name}</span>
                </div>
                <span style="font-size: 11px; color: #71717A;">${g.category}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Notes</label>
          <textarea id="manual-notes" class="form-textarea" placeholder="e.g. Wore this to the museum..."></textarea>
        </div>

        <div style="margin-top: 20px;">
          <button type="submit" class="btn btn-primary btn-block">Log Wear History</button>
        </div>
      </form>
    `;

    this._renderSheet('Log Past Outfit', contentHtml);

    const form = this.overlay.querySelector('#form-manual-log');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const date = this.overlay.querySelector('#manual-date').value;
      const occ = this.overlay.querySelector('#manual-occ').value;
      const time = this.overlay.querySelector('#manual-time').value;
      const notes = this.overlay.querySelector('#manual-notes').value;

      const checkedItems = Array.from(this.overlay.querySelectorAll('input[name="manual_items"]:checked'))
        .map(el => el.value);

      if (checkedItems.length === 0) {
        alert('Please select at least one item that was worn.');
        return;
      }

      historyService.addManualPastOutfit({
        userId,
        itemIds: checkedItems,
        wearDate: date,
        wearTime: time,
        occasion: occ,
        notes: notes.trim()
      });

      this.close();
      if (onLogged) onLogged();
    });
  }

  // 6. SCHEDULE PLAN MODAL
  openSchedulePlan(initialDate, { onScheduled }) {
    const userId = storage.getCurrentUserId();
    const tops = storage.getGarments(userId, { category: 'Tops' });
    const bottoms = storage.getGarments(userId, { category: 'Bottoms' });
    const shoes = storage.getGarments(userId, { category: 'Footwear' });
    const accessories = storage.getGarments(userId, { category: 'Accessories' });

    const contentHtml = `
      <form id="form-schedule-plan">
        <div class="form-group">
          <label class="form-label">Date to Plan</label>
          <input type="date" id="plan-date" class="form-input" value="${initialDate || new Date().toISOString().split('T')[0]}" required>
        </div>

        <div class="form-group">
          <label class="form-label">Occasion</label>
          <select id="plan-occ" class="form-select">
            ${OCCASIONS.map(o => `<option value="${o}">${o}</option>`).join('')}
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Top</label>
          <select id="plan-top" class="form-select" required>
            ${tops.map(t => `<option value="${t.id}">${t.name} (${t.status})</option>`).join('')}
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Bottom</label>
          <select id="plan-bot" class="form-select" required>
            ${bottoms.map(b => `<option value="${b.id}">${b.name} (${b.status})</option>`).join('')}
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Footwear</label>
          <select id="plan-shoes" class="form-select" required>
            ${shoes.map(s => `<option value="${s.id}">${s.name} (${s.status})</option>`).join('')}
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Optional Accessories</label>
          <div style="max-height: 120px; overflow-y: auto; border: 1px solid #E5E5E5; border-radius: 8px; padding: 6px;">
            ${accessories.map(a => `
              <label style="display: flex; align-items: center; justify-content: space-between; padding: 4px 8px; font-size: 12px; cursor: pointer;">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <input type="checkbox" name="plan_accs" value="${a.id}">
                  <span>${a.name}</span>
                </div>
                <span style="color: #71717A;">${a.status}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Plan Notes (Optional)</label>
          <input type="text" id="plan-notes" class="form-input" placeholder="e.g. Meeting at 11am">
        </div>

        <div style="margin-top: 18px;">
          <button type="submit" class="btn btn-primary btn-block">Save to Calendar</button>
        </div>
      </form>
    `;

    this._renderSheet('Schedule Outfit', contentHtml);

    const form = this.overlay.querySelector('#form-schedule-plan');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const pdate = this.overlay.querySelector('#plan-date').value;
      const occ = this.overlay.querySelector('#plan-occ').value;
      const topId = this.overlay.querySelector('#plan-top').value;
      const botId = this.overlay.querySelector('#plan-bot').value;
      const shoeId = this.overlay.querySelector('#plan-shoes').value;
      const notes = this.overlay.querySelector('#plan-notes').value;

      const accIds = Array.from(this.overlay.querySelectorAll('input[name="plan_accs"]:checked'))
        .map(el => el.value);

      plannerService.scheduleOutfit({
        userId,
        topId,
        bottomId: botId,
        footwearId: shoeId,
        accessoryIds: accIds,
        plannedDate: pdate,
        occasion: occ,
        notes: notes.trim()
      });

      this.close();
      if (onScheduled) onScheduled();
    });
  }

  // 7. WEAR COUNTS LEADERBOARD MODAL
  openLeaderboard() {
    const userId = storage.getCurrentUserId();
    const garments = storage.getGarments(userId, { includeArchived: true })
      .sort((a, b) => (b.wearCount || 0) - (a.wearCount || 0));

    const contentHtml = `
      <div style="max-height: 440px; overflow-y: auto;">
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${garments.map((g, idx) => `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: #FAFAFA; border: 1px solid #E5E5E5; border-radius: 8px; font-size: 13px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-weight: 800; width: 16px; color: #A1A1AA; font-size: 11px;">#${idx + 1}</span>
                <div>
                  <div style="font-weight: 700; color: #000000;">${g.name}</div>
                  <div style="font-size: 11px; color: #71717A;">${g.category} &bull; ${g.status}</div>
                </div>
              </div>
              <div style="font-weight: 800; background: #FFFFFF; border: 1px solid #E5E5E5; padding: 2px 8px; border-radius: 6px;">
                ${g.wearCount || 0} ${g.wearCount === 1 ? 'wear' : 'wears'}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this._renderSheet('Wardrobe Wear Counts', contentHtml);
  }
}

export const modalManager = new ModalManager();
