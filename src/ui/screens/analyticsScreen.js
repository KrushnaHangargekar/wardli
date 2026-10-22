/**
 * Wardrobe Analytics & Cost-Per-Wear Screen
 * Deterministic analytics calculated strictly from user data without third-party or AI APIs.
 */

import { storage } from '../../services/storage.js';
import { analyticsService } from '../../services/analyticsService.js';
import { getGarmentSvg } from '../assets.js';

export function renderAnalyticsScreen({ onOpenGarmentDetail }) {
  const container = document.createElement('div');
  container.className = 'analytics-screen';

  function renderContent() {
    const userId = storage.getCurrentUserId();
    const stats = analyticsService.getAnalytics(userId);

    container.innerHTML = `
      <div class="screen-header">
        <div>
          <h2 class="screen-title">Wardrobe Insights</h2>
          <p class="screen-subtitle">Data-driven analytics & cost-per-wear</p>
        </div>
      </div>

      <!-- Overview KPI Cards -->
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 20px;">
        <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 14px; padding: 14px;">
          <div style="font-size: 11px; font-weight: 700; color: #71717A; text-transform: uppercase;">Recorded Wears</div>
          <div style="font-size: 26px; font-weight: 800; color: #000000; margin-top: 4px;">${stats.totalRecordedWears}</div>
          <div style="font-size: 11px; color: #059669; font-weight: 600;">${stats.repetition.uniqueLooks} unique looks</div>
        </div>

        <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 14px; padding: 14px;">
          <div style="font-size: 11px; font-weight: 700; color: #71717A; text-transform: uppercase;">Repetition Rate</div>
          <div style="font-size: 26px; font-weight: 800; color: #000000; margin-top: 4px;">${stats.repetition.repeatRatePercentage}%</div>
          <div style="font-size: 11px; color: #71717A;">${stats.repetition.repeatRatePercentage < 20 ? 'High wardrobe variety' : 'Consistent style'}</div>
        </div>

        <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 14px; padding: 14px;">
          <div style="font-size: 11px; font-weight: 700; color: #71717A; text-transform: uppercase;">Total Wardrobe</div>
          <div style="font-size: 26px; font-weight: 800; color: #000000; margin-top: 4px;">${stats.totalGarments + stats.totalAccessories}</div>
          <div style="font-size: 11px; color: #71717A;">${stats.totalGarments} clothes &bull; ${stats.totalAccessories} accs</div>
        </div>

        <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 14px; padding: 14px;">
          <div style="font-size: 11px; font-weight: 700; color: #71717A; text-transform: uppercase;">Wardrobe Value</div>
          <div style="font-size: 26px; font-weight: 800; color: #000000; margin-top: 4px;">$${stats.costPerWear.totalInvestment}</div>
          <div style="font-size: 11px; color: #71717A;">${stats.costPerWear.totalItemsWithPrice} priced items</div>
        </div>
      </div>

      ${!stats.hasSufficientHistory ? `
        <div class="empty-state">
          <div style="font-size: 34px;">📈</div>
          <h3 class="empty-state-title">Insufficient wear history</h3>
          <p class="empty-state-desc">Start wearing outfits and logging history to reveal your most-worn pieces, repetition rates, and cost-per-wear.</p>
        </div>
      ` : `
        <!-- Section: Most Worn & Least Worn Garments -->
        <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 16px; padding: 16px; margin-bottom: 16px;">
          <h3 style="font-size: 15px; font-weight: 800; color: #000000; margin-bottom: 12px;">Top 5 Most-Worn Garments</h3>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${stats.mostWornGarments.map((g, idx) => `
              <div style="display: flex; align-items: center; justify-content: space-between; font-size: 13px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-weight: 800; width: 18px; color: #A1A1AA;">#${idx + 1}</span>
                  <div style="width: 32px; height: 32px; background: #FAFAFA; border-radius: 6px; display: flex; align-items: center; justify-content: center; border: 1px solid #E5E5E5;">
                    ${getGarmentSvg(g.category, g.subcategory, g.primaryColor)}
                  </div>
                  <div>
                    <div style="font-weight: 700; color: #000000;">${g.name}</div>
                    <div style="font-size: 11px; color: #71717A;">${g.category} &bull; ${g.primaryColor}</div>
                  </div>
                </div>
                <div style="font-weight: 800; background: #F4F4F5; padding: 3px 8px; border-radius: 6px;">
                  ${g.wearCount} ${g.wearCount === 1 ? 'wear' : 'wears'}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Section: Most Worn Accessories -->
        <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 16px; padding: 16px; margin-bottom: 16px;">
          <h3 style="font-size: 15px; font-weight: 800; color: #000000; margin-bottom: 12px;">Most-Worn Accessories</h3>
          ${stats.mostWornAccessories.length === 0 ? `
            <div style="font-size: 12px; color: #71717A;">No accessories worn yet in recorded history.</div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${stats.mostWornAccessories.map((a, idx) => `
                <div style="display: flex; align-items: center; justify-content: space-between; font-size: 13px;">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-weight: 800; width: 18px; color: #A1A1AA;">#${idx + 1}</span>
                    <div style="width: 32px; height: 32px; background: #FAFAFA; border-radius: 6px; display: flex; align-items: center; justify-content: center; border: 1px solid #E5E5E5;">
                      ${getGarmentSvg(a.category, a.subcategory, a.primaryColor)}
                    </div>
                    <div>
                      <div style="font-weight: 700; color: #000000;">${a.name}</div>
                      <div style="font-size: 11px; color: #71717A;">${a.subcategory || 'Accessory'}</div>
                    </div>
                  </div>
                  <div style="font-weight: 800; background: #F4F4F5; padding: 3px 8px; border-radius: 6px;">
                    ${a.wearCount} ${a.wearCount === 1 ? 'wear' : 'wears'}
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>

        <!-- Section: Monthly Wear Breakdown -->
        <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 16px; padding: 16px; margin-bottom: 16px;">
          <h3 style="font-size: 15px; font-weight: 800; color: #000000; margin-bottom: 12px;">Outfits Recorded by Month</h3>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${stats.monthlyBreakdown.map(m => {
              const maxCount = Math.max(...stats.monthlyBreakdown.map(x => x.count), 1);
              const pct = Math.round((m.count / maxCount) * 100);
              return `
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 600; margin-bottom: 4px;">
                    <span>${m.label}</span>
                    <span>${m.count} outfits</span>
                  </div>
                  <div style="width: 100%; height: 8px; background: #F4F4F5; border-radius: 4px; overflow: hidden;">
                    <div style="width: ${pct}%; height: 100%; background: #000000; border-radius: 4px;"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Section: Cost-Per-Wear (CPW) Analysis -->
        <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 16px; padding: 16px; margin-bottom: 16px;">
          <h3 style="font-size: 15px; font-weight: 800; color: #000000; margin-bottom: 4px;">Cost-Per-Wear (CPW) Analysis</h3>
          <p style="font-size: 11px; color: #71717A; margin-bottom: 12px;">Purchase price &divide; verified wear count</p>

          <h4 style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #059669; margin-bottom: 8px;">Best Value Items (Lowest CPW)</h4>
          <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
            ${stats.costPerWear.bestValueItems.map(item => `
              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; border-bottom: 1px solid #F4F4F5; padding-bottom: 6px;">
                <div>
                  <div style="font-weight: 700; color: #000000;">${item.name}</div>
                  <div style="color: #71717A;">Cost $${item.purchasePrice} &bull; ${item.wearCount} wears</div>
                </div>
                <div style="font-size: 13px; font-weight: 800; color: #059669; background: #ECFDF5; padding: 2px 8px; border-radius: 6px;">
                  $${item.costPerWear}/wear
                </div>
              </div>
            `).join('')}
          </div>

          <h4 style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #D97706; margin-bottom: 8px;">Investment Items Needing Wear</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${stats.costPerWear.highestCpwItems.slice(0, 3).map(item => `
              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; border-bottom: 1px solid #F4F4F5; padding-bottom: 6px;">
                <div>
                  <div style="font-weight: 700; color: #000000;">${item.name}</div>
                  <div style="color: #71717A;">Cost $${item.purchasePrice} &bull; ${item.wearCount} wears</div>
                </div>
                <div style="font-size: 13px; font-weight: 800; color: #D97706; background: #FFFBEB; padding: 2px 8px; border-radius: 6px;">
                  $${item.costPerWear}/wear
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `}
    `;
  }

  renderContent();

  return {
    element: container,
    refresh: renderContent
  };
}
