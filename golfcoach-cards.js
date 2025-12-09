// GOLFCOACH CARDS - ULTIMATE VERSION
// Questo file FUNZIONA e appare nell'editor

console.log('🎯 GolfCoach Cards - Ultimate version loading...');

// ========== ESSENTIAL FOR EDITOR ==========
// MUST be at the VERY BEGINNING of the file
window.customCards = window.customCards || [];

// Helper function to create cards
const createSimpleCard = (cardType, title, icon, entities) => {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      ha-card {
        padding: 0;
        margin: 0;
      }
      .header {
        display: flex;
        align-items: center;
        padding: 16px;
        border-bottom: 1px solid var(--divider-color);
      }
      .icon {
        margin-right: 12px;
        color: var(--primary-color);
      }
      .title {
        font-weight: 500;
        font-size: 16px;
        color: var(--primary-text-color);
      }
      .content {
        padding: 16px;
      }
      .entity {
        display: flex;
        justify-content: space-between;
        padding: 12px 0;
        border-bottom: 1px solid var(--divider-color);
      }
      .entity:last-child {
        border-bottom: none;
      }
      .entity-name {
        color: var(--secondary-text-color);
        font-size: 14px;
      }
      .entity-state {
        font-weight: 500;
        font-size: 14px;
        color: var(--primary-text-color);
      }
    </style>
    <ha-card>
      <div class="header">
        <ha-icon class="icon" icon=""></ha-icon>
        <div class="title"></div>
      </div>
      <div class="content">
        ${entities.map(e => `
          <div class="entity" data-entity="${e.entity}">
            <span class="entity-name">${e.name}</span>
            <span class="entity-state" id="${e.id}">...</span>
          </div>
        `).join('')}
      </div>
    </ha-card>
  `;

  return class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this._config = null;
      this._hass = null;
    }

    setConfig(config) {
      this._config = { title, icon, ...config };
      
      // Update header
      const header = this.shadowRoot.querySelector('.header');
      const iconEl = header.querySelector('.icon');
      const titleEl = header.querySelector('.title');
      
      iconEl.setAttribute('icon', this._config.icon);
      titleEl.textContent = this._config.title;
    }

    set hass(hass) {
      this._hass = hass;
      if (!this._config) return;
      
      // Update all entities
      entities.forEach(entity => {
        const element = this.shadowRoot.getElementById(entity.id);
        if (element) {
          const state = hass.states[entity.entity];
          element.textContent = state?.state || 'N/A';
        }
      });
    }

    getCardSize() {
      return entities.length + 2;
    }

    // CRITICAL: This makes cards appear in editor
    static getStubConfig() {
      return { title, icon };
    }
  };
};

// ========== DEFINE ALL 9 CARDS ==========

// Card 1: Raw Launch Data
const NovaRawLaunchDataCard = createSimpleCard(
  'nova-raw-launch-data-card',
  'Raw Launch Data',
  'mdi:golf-tee',
  [
    { id: 'shot-count', name: 'Session shot count', entity: 'sensor.nova_session_shot_count' },
    { id: 'ball-speed', name: 'Ball speed', entity: 'sensor.nova_ball_speed' },
    { id: 'carry', name: 'Carry distance', entity: 'sensor.nova_carry_distance' },
    { id: 'total-spin', name: 'Total spin', entity: 'sensor.nova_total_spin' }
  ]
);

// Card 2: Derived Ball Flight  
const NovaDerivedBallFlightCard = createSimpleCard(
  'nova-derived-ball-flight-card',
  'Derived Ball Flight',
  'mdi:chart-areaspline',
  [
    { id: 'carry2', name: 'Carry distance', entity: 'sensor.nova_carry_distance' },
    { id: 'total', name: 'Total distance', entity: 'sensor.nova_total_distance' },
    { id: 'offline', name: 'Offline distance', entity: 'sensor.nova_offline_distance' },
    { id: 'smash', name: 'Smash factor', entity: 'sensor.nova_smash_factor' }
  ]
);

// Card 3: Shot Classification
const NovaShotClassificationCard = createSimpleCard(
  'nova-shot-classification-card',
  'Shot Classification',
  'mdi:target-variant',
  [
    { id: 'shot-type', name: 'Shot type', entity: 'sensor.nova_shot_type' },
    { id: 'shot-rank', name: 'Shot rank', entity: 'sensor.nova_shot_rank' },
    { id: 'shot-quality', name: 'Shot quality', entity: 'sensor.nova_nova_shot_quality' }
  ]
);

// Card 4: Tour Benchmarks
const NovaTourBenchmarksCard = createSimpleCard(
  'nova-tour-benchmarks-card',
  'Tour Benchmarks',
  'mdi:trophy',
  [
    { id: 'amateur', name: 'Amateur carry', entity: 'sensor.nova_amateur_carry_benchmark' },
    { id: 'lpga', name: 'LPGA carry', entity: 'sensor.nova_lpga_carry_benchmark' },
    { id: 'tour', name: 'Tour carry', entity: 'sensor.nova_nova_tour_carry' },
    { id: 'your-carry', name: 'Your carry', entity: 'sensor.nova_carry_distance' }
  ]
);

// Card 5: Shot Quality
const NovaShotQualityCard = createSimpleCard(
  'nova-shot-quality-card',
  'Shot Quality',
  'mdi:star-circle',
  [
    { id: 'quality', name: 'Shot quality', entity: 'sensor.nova_nova_shot_quality' },
    { id: 'carry-q', name: 'Carry', entity: 'sensor.nova_carry_distance' },
    { id: 'offline-q', name: 'Offline', entity: 'sensor.nova_offline_distance' },
    { id: 'recommendation', name: 'Recommendation', entity: 'sensor.nova_club_recommendation' }
  ]
);

// Card 6: Club Delivery
const NovaClubDeliveryCard = createSimpleCard(
  'nova-club-delivery-card',
  'Club Delivery',
  'mdi:golf',
  [
    { id: 'spin-loft', name: 'Spin loft', entity: 'sensor.nova_nova_spin_loft' },
    { id: 'attack-angle', name: 'Attack angle', entity: 'sensor.nova_nova_attack_angle' },
    { id: 'face-angle', name: 'Face angle', entity: 'sensor.nova_nova_face_angle' },
    { id: 'club-path', name: 'Club path', entity: 'sensor.nova_nova_club_path' }
  ]
);

// Card 7: Trajectory
const NovaTrajectoryCard = createSimpleCard(
  'nova-trajectory-card',
  'Trajectory',
  'mdi:chart-bell-curve',
  [
    { id: 'apex', name: 'Apex height', entity: 'sensor.nova_nova_apex_height' },
    { id: 'hang-time', name: 'Hang time', entity: 'sensor.nova_nova_hang_time' },
    { id: 'descent', name: 'Descent angle', entity: 'sensor.nova_nova_descent_angle' }
  ]
);

// Card 8: Optimal Windows
const NovaOptimalWindowsCard = createSimpleCard(
  'nova-optimal-windows-card',
  'Optimal Windows',
  'mdi:check-decagram',
  [
    { id: 'launch-window', name: 'Launch in window', entity: 'sensor.nova_launch_in_window' },
    { id: 'spin-window', name: 'Spin in window', entity: 'sensor.nova_spin_in_window' },
    { id: 'start-line', name: 'Start line in window', entity: 'sensor.nova_start_line_in_window' }
  ]
);

// Card 9: Benchmarks
const NovaBenchmarksCard = createSimpleCard(
  'nova-benchmarks-card',
  'Benchmarks',
  'mdi:trophy',
  [
    { id: 'amateur-full', name: 'Amateur carry', entity: 'sensor.nova_amateur_carry_benchmark' },
    { id: 'lpga-full', name: 'LPGA carry', entity: 'sensor.nova_lpga_carry_benchmark' },
    { id: 'tour-full', name: 'Tour carry', entity: 'sensor.nova_nova_tour_carry' },
    { id: 'vs-tour', name: 'Carry vs Tour', entity: 'sensor.nova_nova_carry_vs_tour' }
  ]
);

// ========== REGISTER CARDS ==========
const cards = [
  ['nova-raw-launch-data-card', NovaRawLaunchDataCard],
  ['nova-derived-ball-flight-card', NovaDerivedBallFlightCard],
  ['nova-shot-classification-card', NovaShotClassificationCard],
  ['nova-tour-benchmarks-card', NovaTourBenchmarksCard],
  ['nova-shot-quality-card', NovaShotQualityCard],
  ['nova-club-delivery-card', NovaClubDeliveryCard],
  ['nova-trajectory-card', NovaTrajectoryCard],
  ['nova-optimal-windows-card', NovaOptimalWindowsCard],
  ['nova-benchmarks-card', NovaBenchmarksCard]
];

cards.forEach(([name, cls]) => {
  if (!customElements.get(name)) {
    customElements.define(name, cls);
    console.log(`✅ Registered: ${name}`);
  }
});

// ========== REGISTER FOR EDITOR ==========
// Clear old entries FIRST
const oldCards = (window.customCards || []).filter(c => 
  c.type && c.type.includes('nova-')
);
if (oldCards.length > 0) {
  console.log(`🧹 Removing ${oldCards.length} old card registrations`);
  window.customCards = window.customCards.filter(c => 
    !c.type || !c.type.includes('nova-')
  );
}

// Add ALL cards with proper configuration
cards.forEach(([name, cls]) => {
  const stub = cls.getStubConfig ? cls.getStubConfig() : {};
  window.customCards.push({
    type: name,
    name: stub.title || name.replace('nova-', '').replace(/-/g, ' '),
    description: `Display ${stub.title || 'golf data'} from Nova GolfCoach`,
    preview: true,
    documentationURL: 'https://github.com/lucky5822/golf-coach-cards'
  });
  console.log(`📝 Added to editor: ${name}`);
});

// ========== CRITICAL: FORCE EDITOR UPDATE ==========
// This is what makes cards appear in the visual editor
setTimeout(() => {
  console.log('🔄 Forcing editor update...');
  
  // Method 1: Standard event
  const event = new CustomEvent('ll-custom-cards-registered', {
    detail: { cards: window.customCards }
  });
  window.dispatchEvent(event);
  
  // Method 2: Alternative event
  window.dispatchEvent(new Event('cards-updated'));
  
  // Method 3: HA specific
  window.dispatchEvent(new Event('lovelace-cards-changed'));
  
  // Method 4: Direct API call if available
  if (window.loadLovelaceCards) {
    window.loadLovelaceCards();
  }
  
  // Method 5: Refresh any open editor
  const editors = document.querySelectorAll('hui-card-picker, hui-dialog-edit-card');
  editors.forEach(editor => {
    if (editor._filterCards) editor._filterCards();
    if (editor.refreshCards) editor.refreshCards();
    if (editor.requestUpdate) editor.requestUpdate();
  });
  
  console.log('🎉 GolfCoach Cards ready! Should appear in editor now.');
  console.log('💡 If not visible, try:');
  console.log('   1. Close and reopen the card picker');
  console.log('   2. Refresh the page (Ctrl+F5)');
  console.log('   3. Try incognito mode');
}, 500);

// ========== FINAL CONFIRMATION ==========
console.log(`🏌️ GolfCoach Cards loaded: ${cards.length} cards available`);
console.log('🔍 Search for these in editor:');
cards.forEach(([name], i) => {
  console.log(`   ${i+1}. ${name.replace('nova-', '').replace(/-/g, ' ')}`);
});