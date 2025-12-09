// GOLFCOACH CARDS - ROOT VERSION
// Single file in root for HACS compatibility

console.log('🏌️ GolfCoach Cards loading...');

// ========== INIT EDITOR ==========
window.customCards = window.customCards || [];

// ========== CARD TEMPLATE ==========
const createCardClass = (cardName, defaultTitle, defaultIcon, entities) => {
  return class extends HTMLElement {
    constructor() {
      super();
      this._config = null;
    }
    
    setConfig(config) {
      this._config = { title: defaultTitle, icon: defaultIcon, ...config };
      this.innerHTML = this._render();
    }
    
    _render() {
      if (!this._config) return '';
      
      return `
        <ha-card>
          <div style="
            display: flex;
            align-items: center;
            padding: 16px 16px 12px 16px;
            border-bottom: 1px solid var(--divider-color);
          ">
            <ha-icon icon="${this._config.icon}" style="
              margin-right: 12px;
              color: var(--primary-color);
            "></ha-icon>
            <div style="
              font-weight: 500;
              font-size: 16px;
              color: var(--primary-text-color);
            ">
              ${this._config.title}
            </div>
          </div>
          <div style="padding: 16px;">
            <table style="width: 100%; border-collapse: collapse;">
              ${entities.map((entity, i) => `
                <tr style="border-bottom: ${i < entities.length - 1 ? '1px solid var(--divider-color)' : 'none'};">
                  <td style="
                    color: var(--secondary-text-color);
                    font-size: 14px;
                    padding: 12px 0;
                  ">${entity.name}</td>
                  <td style="
                    text-align: right;
                    font-weight: 500;
                    font-size: 14px;
                    padding: 12px 0;
                    color: var(--primary-text-color);
                  " id="${entity.id}">...</td>
                </tr>
              `).join('')}
            </table>
          </div>
        </ha-card>
      `;
    }
    
    set hass(hass) {
      if (!this._config) return;
      
      entities.forEach(entity => {
        const element = document.getElementById(entity.id);
        if (element) {
          const state = hass.states[entity.entityId];
          element.textContent = state?.state || 'N/A';
        }
      });
    }
    
    getCardSize() {
      return entities.length + 1;
    }
    
    static getStubConfig() {
      return { title: defaultTitle, icon: defaultIcon };
    }
  };
};

// ========== DEFINE ALL CARDS ==========

// 1. Raw Launch Data Card
const RawLaunchDataCard = createCardClass(
  'Raw Launch Data',
  'mdi:golf-tee',
  [
    { id: 'shot-count', name: 'Session shot count', entityId: 'sensor.nova_session_shot_count' },
    { id: 'last-shot', name: 'Last shot', entityId: 'sensor.nova_last_shot' },
    { id: 'ball-speed', name: 'Ball speed', entityId: 'sensor.nova_ball_speed' },
    { id: 'vertical-angle', name: 'Vertical launch angle', entityId: 'sensor.nova_vertical_launch_angle' },
    { id: 'horizontal-angle', name: 'Horizontal launch angle', entityId: 'sensor.nova_horizontal_launch_angle' },
    { id: 'total-spin', name: 'Total spin', entityId: 'sensor.nova_total_spin' },
    { id: 'spin-axis', name: 'Spin axis', entityId: 'sensor.nova_spin_axis' }
  ]
);

// 2. Derived Ball Flight Card
const DerivedBallFlightCard = createCardClass(
  'Derived Ball Flight',
  'mdi:chart-areaspline',
  [
    { id: 'carry', name: 'Carry distance', entityId: 'sensor.nova_carry_distance' },
    { id: 'total', name: 'Total distance', entityId: 'sensor.nova_total_distance' },
    { id: 'offline', name: 'Offline distance', entityId: 'sensor.nova_offline_distance' },
    { id: 'backspin', name: 'Backspin', entityId: 'sensor.nova_backspin' },
    { id: 'sidespin', name: 'Sidespin', entityId: 'sensor.nova_sidespin' },
    { id: 'club-speed', name: 'Club speed', entityId: 'sensor.nova_club_speed' },
    { id: 'smash', name: 'Smash factor', entityId: 'sensor.nova_smash_factor' }
  ]
);

// 3. Shot Classification Card
const ShotClassificationCard = createCardClass(
  'Shot Classification',
  'mdi:target-variant',
  [
    { id: 'shot-type', name: 'Shot type', entityId: 'sensor.nova_shot_type' },
    { id: 'shot-rank', name: 'Shot rank', entityId: 'sensor.nova_shot_rank' },
    { id: 'shot-quality', name: 'Shot quality', entityId: 'sensor.nova_nova_shot_quality' }
  ]
);

// 4. Tour Benchmarks Card
const TourBenchmarksCard = createCardClass(
  'Tour Benchmarks',
  'mdi:trophy',
  [
    { id: 'amateur', name: 'Amateur carry', entityId: 'sensor.nova_amateur_carry_benchmark' },
    { id: 'lpga', name: 'LPGA carry', entityId: 'sensor.nova_lpga_carry_benchmark' },
    { id: 'tour', name: 'Tour carry', entityId: 'sensor.nova_nova_tour_carry' },
    { id: 'your-carry', name: 'Your carry', entityId: 'sensor.nova_carry_distance' },
    { id: 'vs-tour', name: 'Carry vs Tour', entityId: 'sensor.nova_nova_carry_vs_tour' }
  ]
);

// 5. Shot Quality Card
const ShotQualityCard = createCardClass(
  'Shot Quality',
  'mdi:star-circle',
  [
    { id: 'quality', name: 'Shot quality', entityId: 'sensor.nova_nova_shot_quality' },
    { id: 'carry-quality', name: 'Carry', entityId: 'sensor.nova_carry_distance' },
    { id: 'offline-quality', name: 'Offline', entityId: 'sensor.nova_offline_distance' },
    { id: 'windows', name: 'Optimal windows', entityId: 'sensor.nova_optimal_window_summary' },
    { id: 'recommendation', name: 'Recommendation', entityId: 'sensor.nova_club_recommendation' }
  ]
);

// 6. Club Delivery Card
const ClubDeliveryCard = createCardClass(
  'Club Delivery',
  'mdi:golf',
  [
    { id: 'spin-loft', name: 'Spin loft', entityId: 'sensor.nova_nova_spin_loft' },
    { id: 'attack-angle', name: 'Attack angle', entityId: 'sensor.nova_nova_attack_angle' },
    { id: 'face-angle', name: 'Face angle', entityId: 'sensor.nova_nova_face_angle' },
    { id: 'face-to-path', name: 'Face to path', entityId: 'sensor.nova_nova_face_to_path' },
    { id: 'club-path', name: 'Club path', entityId: 'sensor.nova_nova_club_path' }
  ]
);

// 7. Trajectory Card
const TrajectoryCard = createCardClass(
  'Trajectory',
  'mdi:chart-bell-curve',
  [
    { id: 'apex', name: 'Apex height', entityId: 'sensor.nova_nova_apex_height' },
    { id: 'hang-time', name: 'Hang time', entityId: 'sensor.nova_nova_hang_time' },
    { id: 'descent', name: 'Descent angle', entityId: 'sensor.nova_nova_descent_angle' }
  ]
);

// 8. Optimal Windows Card
const OptimalWindowsCard = createCardClass(
  'Optimal Windows',
  'mdi:check-decagram',
  [
    { id: 'launch-window', name: 'Launch in window', entityId: 'sensor.nova_launch_in_window' },
    { id: 'spin-window', name: 'Spin in window', entityId: 'sensor.nova_spin_in_window' },
    { id: 'start-line-window', name: 'Start line in window', entityId: 'sensor.nova_start_line_in_window' }
  ]
);

// 9. Benchmarks Card
const BenchmarksCard = createCardClass(
  'Benchmarks',
  'mdi:trophy',
  [
    { id: 'amateur-full', name: 'Amateur carry', entityId: 'sensor.nova_amateur_carry_benchmark' },
    { id: 'lpga-full', name: 'LPGA carry', entityId: 'sensor.nova_lpga_carry_benchmark' },
    { id: 'tour-full', name: 'Tour carry', entityId: 'sensor.nova_nova_tour_carry' },
    { id: 'your-carry-full', name: 'Your carry', entityId: 'sensor.nova_carry_distance' },
    { id: 'vs-amateur', name: 'Carry vs Amateur', entityId: 'sensor.nova_carry_vs_amateur' },
    { id: 'vs-lpga', name: 'Carry vs LPGA', entityId: 'sensor.nova_carry_vs_lpga' },
    { id: 'vs-tour', name: 'Carry vs Tour', entityId: 'sensor.nova_nova_carry_vs_tour' }
  ]
);

// ========== REGISTER CARDS ==========
const cardDefinitions = [
  { name: 'nova-raw-launch-data-card', class: RawLaunchDataCard },
  { name: 'nova-derived-ball-flight-card', class: DerivedBallFlightCard },
  { name: 'nova-shot-classification-card', class: ShotClassificationCard },
  { name: 'nova-tour-benchmarks-card', class: TourBenchmarksCard },
  { name: 'nova-shot-quality-card', class: ShotQualityCard },
  { name: 'nova-club-delivery-card', class: ClubDeliveryCard },
  { name: 'nova-trajectory-card', class: TrajectoryCard },
  { name: 'nova-optimal-windows-card', class: OptimalWindowsCard },
  { name: 'nova-benchmarks-card', class: BenchmarksCard }
];

cardDefinitions.forEach(def => {
  if (!customElements.get(def.name)) {
    customElements.define(def.name, def.class);
    console.log(`✅ Registered: ${def.name}`);
  }
});

// ========== REGISTER FOR EDITOR ==========
// Clear any old registrations
window.customCards = window.customCards.filter(c => 
  !c.type || !c.type.includes('nova-')
);

// Add all cards
cardDefinitions.forEach(def => {
  window.customCards.push({
    type: def.name,
    name: def.class.getStubConfig().title,
    description: `Display ${def.class.getStubConfig().title} from Nova GolfCoach`,
    preview: true
  });
});

// ========== FORCE EDITOR REFRESH ==========
setTimeout(() => {
  console.log('🔄 Notifying editor of new cards...');
  
  // Dispatch events to refresh editor
  const events = [
    'll-custom-cards-registered',
    'cards-updated',
    'lovelace-cards-changed'
  ];
  
  events.forEach(eventName => {
    try {
      window.dispatchEvent(new Event(eventName));
      console.log(`📢 Event dispatched: ${eventName}`);
    } catch (e) {
      // Ignore errors
    }
  });
  
  // Try to refresh if editor functions exist
  if (window.loadLovelaceCards) {
    window.loadLovelaceCards();
    console.log('🔄 loadLovelaceCards() called');
  }
  
  console.log(`🎉 GolfCoach Cards ready! ${cardDefinitions.length} cards available.`);
}, 1000);