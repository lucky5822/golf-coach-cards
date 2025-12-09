// GOLFCOACH CARDS - COMPLETE BUNDLE
// All 9 cards in one file for HACS compatibility

console.log('🏌️ GolfCoach Cards - Loading complete bundle...');

// ========== INITIALIZE FOR EDITOR ==========
window.customCards = window.customCards || [];

// ========== HELPER: CARD TEMPLATE ==========
const cardStyle = `
  <style>
    .golfcoach-card ha-card {
      height: 100%;
      overflow: hidden;
    }
    .golfcoach-card .header {
      display: flex;
      align-items: center;
      padding: 16px 16px 12px 16px;
      border-bottom: 1px solid var(--divider-color);
    }
    .golfcoach-card .header ha-icon {
      margin-right: 12px;
      color: var(--primary-color);
    }
    .golfcoach-card .title {
      font-weight: 500;
      font-size: 16px;
      color: var(--primary-text-color);
    }
    .golfcoach-card .content {
      padding: 16px;
    }
    .golfcoach-card .entity-table {
      width: 100%;
      border-collapse: collapse;
    }
    .golfcoach-card .entity-row {
      border-bottom: 1px solid var(--divider-color);
    }
    .golfcoach-card .entity-row:last-child {
      border-bottom: none;
    }
    .golfcoach-card .entity-name {
      color: var(--secondary-text-color);
      font-size: 14px;
      padding: 12px 0;
    }
    .golfcoach-card .entity-state {
      text-align: right;
      font-weight: 500;
      font-size: 14px;
      padding: 12px 0;
      color: var(--primary-text-color);
    }
    .golfcoach-card .positive {
      color: var(--success-color, #4CAF50);
    }
    .golfcoach-card .negative {
      color: var(--error-color, #F44336);
    }
    .golfcoach-card .quality-good { color: #4CAF50; font-weight: bold; }
    .golfcoach-card .quality-average { color: #FF9800; font-weight: bold; }
    .golfcoach-card .quality-poor { color: #F44336; font-weight: bold; }
  </style>
`;

// ========== 1. RAW LAUNCH DATA CARD ==========
class NovaRawLaunchDataCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = null;
  }
  
  setConfig(config) {
    this._config = {
      title: 'Raw Launch Data',
      icon: 'mdi:golf-tee',
      ...config
    };
    this._render();
  }
  
  _render() {
    if (!this._config) return;
    
    this.shadowRoot.innerHTML = cardStyle + `
      <ha-card class="golfcoach-card">
        <div class="header">
          <ha-icon icon="${this._config.icon}"></ha-icon>
          <div class="title">${this._config.title}</div>
        </div>
        <div class="content">
          <table class="entity-table">
            ${this._getEntities().map((entity, i) => `
              <tr class="entity-row">
                <td class="entity-name">${entity.name}</td>
                <td class="entity-state" id="${entity.id.replace(/[^a-z0-9]/gi, '-')}">...</td>
              </tr>
            `).join('')}
          </table>
        </div>
      </ha-card>
    `;
  }
  
  set hass(hass) {
    if (!this._config || !this.shadowRoot) return;
    
    this._getEntities().forEach(entity => {
      const element = this.shadowRoot.getElementById(entity.id.replace(/[^a-z0-9]/gi, '-'));
      if (element) {
        const state = hass.states[entity.entity];
        if (state && state.state && state.state !== 'unavailable' && state.state !== 'unknown') {
          element.textContent = state.state;
        } else {
          element.textContent = 'N/A';
        }
      }
    });
  }
  
  _getEntities() {
    return [
      { id: 'session-shot-count', name: 'Session shot count', entity: 'sensor.nova_session_shot_count' },
      { id: 'last-shot', name: 'Last shot', entity: 'sensor.nova_last_shot' },
      { id: 'ball-speed', name: 'Ball speed', entity: 'sensor.nova_ball_speed' },
      { id: 'vertical-launch', name: 'Vertical launch angle', entity: 'sensor.nova_vertical_launch_angle' },
      { id: 'horizontal-launch', name: 'Horizontal launch angle', entity: 'sensor.nova_horizontal_launch_angle' },
      { id: 'total-spin', name: 'Total spin', entity: 'sensor.nova_total_spin' },
      { id: 'spin-axis', name: 'Spin axis', entity: 'sensor.nova_spin_axis' }
    ];
  }
  
  getCardSize() { return 8; }
  static getStubConfig() { return { title: 'Raw Launch Data', icon: 'mdi:golf-tee' }; }
}

// ========== 2. DERIVED BALL FLIGHT CARD ==========
class NovaDerivedBallFlightCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = null;
  }
  
  setConfig(config) {
    this._config = {
      title: 'Derived Ball Flight',
      icon: 'mdi:chart-areaspline',
      ...config
    };
    this._render();
  }
  
  _render() {
    if (!this._config) return;
    
    this.shadowRoot.innerHTML = cardStyle + `
      <ha-card class="golfcoach-card">
        <div class="header">
          <ha-icon icon="${this._config.icon}"></ha-icon>
          <div class="title">${this._config.title}</div>
        </div>
        <div class="content">
          <table class="entity-table">
            ${this._getEntities().map((entity, i) => `
              <tr class="entity-row">
                <td class="entity-name">${entity.name}</td>
                <td class="entity-state" id="${entity.id}">...</td>
              </tr>
            `).join('')}
          </table>
        </div>
      </ha-card>
    `;
  }
  
  set hass(hass) {
    if (!this._config || !this.shadowRoot) return;
    
    this._getEntities().forEach(entity => {
      const element = this.shadowRoot.getElementById(entity.id);
      if (element) {
        const state = hass.states[entity.entity];
        if (state && state.state && state.state !== 'unavailable' && state.state !== 'unknown') {
          element.textContent = state.state;
        } else {
          element.textContent = 'N/A';
        }
      }
    });
  }
  
  _getEntities() {
    return [
      { id: 'carry', name: 'Carry distance', entity: 'sensor.nova_carry_distance' },
      { id: 'total', name: 'Total distance', entity: 'sensor.nova_total_distance' },
      { id: 'offline', name: 'Offline distance', entity: 'sensor.nova_offline_distance' },
      { id: 'backspin', name: 'Backspin', entity: 'sensor.nova_backspin' },
      { id: 'sidespin', name: 'Sidespin', entity: 'sensor.nova_sidespin' },
      { id: 'club-speed', name: 'Club speed', entity: 'sensor.nova_club_speed' },
      { id: 'smash', name: 'Smash factor', entity: 'sensor.nova_smash_factor' }
    ];
  }
  
  getCardSize() { return 8; }
  static getStubConfig() { return { title: 'Derived Ball Flight', icon: 'mdi:chart-areaspline' }; }
}

// ========== 3. SHOT CLASSIFICATION CARD ==========
class NovaShotClassificationCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = null;
  }
  
  setConfig(config) {
    this._config = {
      title: 'Shot Classification',
      icon: 'mdi:target-variant',
      ...config
    };
    this._render();
  }
  
  _render() {
    if (!this._config) return;
    
    this.shadowRoot.innerHTML = cardStyle + `
      <ha-card class="golfcoach-card">
        <div class="header">
          <ha-icon icon="${this._config.icon}"></ha-icon>
          <div class="title">${this._config.title}</div>
        </div>
        <div class="content">
          <table class="entity-table">
            <tr class="entity-row">
              <td class="entity-name">Shot type</td>
              <td class="entity-state" id="shot-type">...</td>
            </tr>
            <tr class="entity-row">
              <td class="entity-name">Shot rank</td>
              <td class="entity-state" id="shot-rank">...</td>
            </tr>
            <tr class="entity-row">
              <td class="entity-name">Shot quality</td>
              <td class="entity-state">
                <span id="shot-quality" class="quality-average">...</span>
              </td>
            </tr>
          </table>
        </div>
      </ha-card>
    `;
  }
  
  set hass(hass) {
    if (!this._config || !this.shadowRoot) return;
    
    // Shot type
    const typeEl = this.shadowRoot.getElementById('shot-type');
    const typeState = hass.states['sensor.nova_shot_type'];
    if (typeEl) typeEl.textContent = typeState?.state || 'N/A';
    
    // Shot rank
    const rankEl = this.shadowRoot.getElementById('shot-rank');
    const rankState = hass.states['sensor.nova_shot_rank'];
    if (rankEl) rankEl.textContent = rankState?.state || 'N/A';
    
    // Shot quality
    const qualityEl = this.shadowRoot.getElementById('shot-quality');
    const qualityState = hass.states['sensor.nova_nova_shot_quality'];
    if (qualityEl && qualityState?.state) {
      const quality = parseInt(qualityState.state);
      qualityEl.textContent = qualityState.state;
      
      qualityEl.className = 'quality-average';
      if (!isNaN(quality)) {
        if (quality >= 80) qualityEl.className = 'quality-good';
        else if (quality >= 50) qualityEl.className = 'quality-average';
        else qualityEl.className = 'quality-poor';
      }
    } else if (qualityEl) {
      qualityEl.textContent = 'N/A';
      qualityEl.className = 'quality-average';
    }
  }
  
  getCardSize() { return 4; }
  static getStubConfig() { return { title: 'Shot Classification', icon: 'mdi:target-variant' }; }
}

// ========== 4. TOUR BENCHMARKS CARD ==========
class NovaTourBenchmarksCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = null;
  }
  
  setConfig(config) {
    this._config = {
      title: 'Tour Benchmarks',
      icon: 'mdi:trophy',
      ...config
    };
    this._render();
  }
  
  _render() {
    if (!this._config) return;
    
    this.shadowRoot.innerHTML = cardStyle + `
      <ha-card class="golfcoach-card">
        <div class="header">
          <ha-icon icon="${this._config.icon}"></ha-icon>
          <div class="title">${this._config.title}</div>
        </div>
        <div class="content">
          <table class="entity-table">
            ${this._getEntities().map((entity, i) => `
              <tr class="entity-row">
                <td class="entity-name">${entity.name}</td>
                <td class="entity-state" id="${entity.id}">...</td>
              </tr>
            `).join('')}
          </table>
        </div>
      </ha-card>
    `;
  }
  
  set hass(hass) {
    if (!this._config || !this.shadowRoot) return;
    
    this._getEntities().forEach(entity => {
      const element = this.shadowRoot.getElementById(entity.id);
      if (element) {
        const state = hass.states[entity.entity];
        if (state && state.state && state.state !== 'unavailable' && state.state !== 'unknown') {
          const value = parseFloat(state.state);
          element.textContent = state.state;
          element.classList.remove('positive', 'negative');
          
          if (!isNaN(value)) {
            if (entity.id.includes('vs')) {
              if (value > 0) element.classList.add('positive');
              else if (value < 0) element.classList.add('negative');
            }
          }
        } else {
          element.textContent = 'N/A';
          element.classList.remove('positive', 'negative');
        }
      }
    });
  }
  
  _getEntities() {
    return [
      { id: 'amateur', name: 'Amateur carry', entity: 'sensor.nova_amateur_carry_benchmark' },
      { id: 'lpga', name: 'LPGA carry', entity: 'sensor.nova_lpga_carry_benchmark' },
      { id: 'tour', name: 'Tour carry', entity: 'sensor.nova_nova_tour_carry' },
      { id: 'your-carry', name: 'Your carry', entity: 'sensor.nova_carry_distance' },
      { id: 'vs-tour', name: 'Carry vs Tour', entity: 'sensor.nova_nova_carry_vs_tour' }
    ];
  }
  
  getCardSize() { return 6; }
  static getStubConfig() { return { title: 'Tour Benchmarks', icon: 'mdi:trophy' }; }
}

// ========== 5. SHOT QUALITY CARD ==========
class NovaShotQualityCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = null;
  }
  
  setConfig(config) {
    this._config = {
      title: 'Shot Quality',
      icon: 'mdi:star-circle',
      ...config
    };
    this._render();
  }
  
  _render() {
    if (!this._config) return;
    
    this.shadowRoot.innerHTML = cardStyle + `
      <ha-card class="golfcoach-card">
        <div class="header">
          <ha-icon icon="${this._config.icon}"></ha-icon>
          <div class="title">${this._config.title}</div>
        </div>
        <div class="content">
          <table class="entity-table">
            <tr class="entity-row">
              <td class="entity-name">Shot quality</td>
              <td class="entity-state">
                <span id="quality" class="quality-average">...</span>
              </td>
            </tr>
            <tr class="entity-row">
              <td class="entity-name">Carry</td>
              <td class="entity-state" id="carry">...</td>
            </tr>
            <tr class="entity-row">
              <td class="entity-name">Offline</td>
              <td class="entity-state" id="offline">...</td>
            </tr>
            <tr class="entity-row">
              <td class="entity-name">Optimal windows</td>
              <td class="entity-state" id="windows">...</td>
            </tr>
            <tr class="entity-row">
              <td class="entity-name">Recommendation</td>
              <td class="entity-state" id="recommendation">...</td>
            </tr>
          </table>
        </div>
      </ha-card>
    `;
  }
  
  set hass(hass) {
    if (!this._config || !this.shadowRoot) return;
    
    // Quality
    const qualityEl = this.shadowRoot.getElementById('quality');
    const qualityState = hass.states['sensor.nova_nova_shot_quality'];
    if (qualityEl && qualityState?.state) {
      const quality = parseInt(qualityState.state);
      qualityEl.textContent = qualityState.state;
      qualityEl.className = 'quality-average';
      if (!isNaN(quality)) {
        if (quality >= 80) qualityEl.className = 'quality-good';
        else if (quality >= 50) qualityEl.className = 'quality-average';
        else qualityEl.className = 'quality-poor';
      }
    } else if (qualityEl) {
      qualityEl.textContent = 'N/A';
      qualityEl.className = 'quality-average';
    }
    
    // Other entities
    const entities = [
      { id: 'carry', entity: 'sensor.nova_carry_distance' },
      { id: 'offline', entity: 'sensor.nova_offline_distance' },
      { id: 'windows', entity: 'sensor.nova_optimal_window_summary' },
      { id: 'recommendation', entity: 'sensor.nova_club_recommendation' }
    ];
    
    entities.forEach(item => {
      const element = this.shadowRoot.getElementById(item.id);
      if (element) {
        const state = hass.states[item.entity];
        element.textContent = state?.state || 'N/A';
      }
    });
  }
  
  getCardSize() { return 6; }
  static getStubConfig() { return { title: 'Shot Quality', icon: 'mdi:star-circle' }; }
}

// ========== 6. CLUB DELIVERY CARD ==========
class NovaClubDeliveryCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = null;
  }
  
  setConfig(config) {
    this._config = {
      title: 'Club Delivery',
      icon: 'mdi:golf',
      ...config
    };
    this._render();
  }
  
  _render() {
    if (!this._config) return;
    
    this.shadowRoot.innerHTML = cardStyle + `
      <ha-card class="golfcoach-card">
        <div class="header">
          <ha-icon icon="${this._config.icon}"></ha-icon>
          <div class="title">${this._config.title}</div>
        </div>
        <div class="content">
          <table class="entity-table">
            ${this._getEntities().map((entity, i) => `
              <tr class="entity-row">
                <td class="entity-name">${entity.name}</td>
                <td class="entity-state" id="${entity.id}">...</td>
              </tr>
            `).join('')}
          </table>
        </div>
      </ha-card>
    `;
  }
  
  set hass(hass) {
    if (!this._config || !this.shadowRoot) return;
    
    this._getEntities().forEach(entity => {
      const element = this.shadowRoot.getElementById(entity.id);
      if (element) {
        const state = hass.states[entity.entity];
        element.textContent = state?.state || 'N/A';
      }
    });
  }
  
  _getEntities() {
    return [
      { id: 'spin-loft', name: 'Spin loft (°)', entity: 'sensor.nova_nova_spin_loft' },
      { id: 'attack-angle', name: 'Attack angle (°)', entity: 'sensor.nova_nova_attack_angle' },
      { id: 'face-angle', name: 'Face angle (°)', entity: 'sensor.nova_nova_face_angle' },
      { id: 'face-to-path', name: 'Face to path (°)', entity: 'sensor.nova_nova_face_to_path' },
      { id: 'club-path', name: 'Club path (°)', entity: 'sensor.nova_nova_club_path' }
    ];
  }
  
  getCardSize() { return 6; }
  static getStubConfig() { return { title: 'Club Delivery', icon: 'mdi:golf' }; }
}

// ========== 7. TRAJECTORY CARD ==========
class NovaTrajectoryCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = null;
  }
  
  setConfig(config) {
    this._config = {
      title: 'Trajectory',
      icon: 'mdi:chart-bell-curve',
      ...config
    };
    this._render();
  }
  
  _render() {
    if (!this._config) return;
    
    this.shadowRoot.innerHTML = cardStyle + `
      <ha-card class="golfcoach-card">
        <div class="header">
          <ha-icon icon="${this._config.icon}"></ha-icon>
          <div class="title">${this._config.title}</div>
        </div>
        <div class="content">
          <table class="entity-table">
            <tr class="entity-row">
              <td class="entity-name">Apex height</td>
              <td class="entity-state" id="apex">...</td>
            </tr>
            <tr class="entity-row">
              <td class="entity-name">Hang time</td>
              <td class="entity-state" id="hang">...</td>
            </tr>
            <tr class="entity-row">
              <td class="entity-name">Descent angle</td>
              <td class="entity-state" id="descent">...</td>
            </tr>
          </table>
        </div>
      </ha-card>
    `;
  }
  
  set hass(hass) {
    if (!this._config || !this.shadowRoot) return;
    
    const entities = [
      { id: 'apex', entity: 'sensor.nova_nova_apex_height' },
      { id: 'hang', entity: 'sensor.nova_nova_hang_time' },
      { id: 'descent', entity: 'sensor.nova_nova_descent_angle' }
    ];
    
    entities.forEach(item => {
      const element = this.shadowRoot.getElementById(item.id);
      if (element) {
        const state = hass.states[item.entity];
        element.textContent = state?.state || 'N/A';
      }
    });
  }
  
  getCardSize() { return 4; }
  static getStubConfig() { return { title: 'Trajectory', icon: 'mdi:chart-bell-curve' }; }
}

// ========== 8. OPTIMAL WINDOWS CARD ==========
class NovaOptimalWindowsCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = null;
  }
  
  setConfig(config) {
    this._config = {
      title: 'Optimal Windows',
      icon: 'mdi:check-decagram',
      ...config
    };
    this._render();
  }
  
  _render() {
    if (!this._config) return;
    
    this.shadowRoot.innerHTML = cardStyle + `
      <ha-card class="golfcoach-card">
        <div class="header">
          <ha-icon icon="${this._config.icon}"></ha-icon>
          <div class="title">${this._config.title}</div>
        </div>
        <div class="content">
          <table class="entity-table">
            <tr class="entity-row">
              <td class="entity-name">Launch in window</td>
              <td class="entity-state" id="launch">...</td>
            </tr>
            <tr class="entity-row">
              <td class="entity-name">Spin in window</td>
              <td class="entity-state" id="spin">...</td>
            </tr>
            <tr class="entity-row">
              <td class="entity-name">Start line in window</td>
              <td class="entity-state" id="start-line">...</td>
            </tr>
          </table>
        </div>
      </ha-card>
    `;
  }
  
  set hass(hass) {
    if (!this._config || !this.shadowRoot) return;
    
    const entities = [
      { id: 'launch', entity: 'sensor.nova_launch_in_window' },
      { id: 'spin', entity: 'sensor.nova_spin_in_window' },
      { id: 'start-line', entity: 'sensor.nova_start_line_in_window' }
    ];
    
    entities.forEach(item => {
      const element = this.shadowRoot.getElementById(item.id);
      if (element) {
        const state = hass.states[item.entity];
        element.textContent = state?.state || 'N/A';
      }
    });
  }
  
  getCardSize() { return 4; }
  static getStubConfig() { return { title: 'Optimal Windows', icon: 'mdi:check-decagram' }; }
}

// ========== 9. BENCHMARKS CARD ==========
class NovaBenchmarksCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = null;
  }
  
  setConfig(config) {
    this._config = {
      title: 'Benchmarks',
      icon: 'mdi:trophy',
      ...config
    };
    this._render();
  }
  
  _render() {
    if (!this._config) return;
    
    this.shadowRoot.innerHTML = cardStyle + `
      <ha-card class="golfcoach-card">
        <div class="header">
          <ha-icon icon="${this._config.icon}"></ha-icon>
          <div class="title">${this._config.title}</div>
        </div>
        <div class="content">
          <table class="entity-table">
            ${this._getEntities().map((entity, i) => `
              <tr class="entity-row">
                <td class="entity-name">${entity.name}</td>
                <td class="entity-state" id="${entity.id}">...</td>
              </tr>
            `).join('')}
          </table>
        </div>
      </ha-card>
    `;
  }
  
  set hass(hass) {
    if (!this._config || !this.shadowRoot) return;
    
    this._getEntities().forEach(entity => {
      const element = this.shadowRoot.getElementById(entity.id);
      if (element) {
        const state = hass.states[entity.entity];
        if (state && state.state && state.state !== 'unavailable' && state.state !== 'unknown') {
          const value = parseFloat(state.state);
          element.textContent = state.state;
          element.classList.remove('positive', 'negative');
          
          if (!isNaN(value) && entity.id.includes('vs')) {
            if (value > 0) element.classList.add('positive');
            else if (value < 0) element.classList.add('negative');
          }
        } else {
          element.textContent = 'N/A';
          element.classList.remove('positive', 'negative');
        }
      }
    });
  }
  
  _getEntities() {
    return [
      { id: 'amateur', name: 'Amateur carry', entity: 'sensor.nova_amateur_carry_benchmark' },
      { id: 'lpga', name: 'LPGA carry', entity: 'sensor.nova_lpga_carry_benchmark' },
      { id: 'tour', name: 'Tour carry', entity: 'sensor.nova_nova_tour_carry' },
      { id: 'your-carry', name: 'Your carry', entity: 'sensor.nova_carry_distance' },
      { id: 'vs-amateur', name: 'Carry vs Amateur', entity: 'sensor.nova_carry_vs_amateur' },
      { id: 'vs-lpga', name: 'Carry vs LPGA', entity: 'sensor.nova_carry_vs_lpga' },
      { id: 'vs-tour', name: 'Carry vs Tour', entity: 'sensor.nova_nova_carry_vs_tour' }
    ];
  }
  
  getCardSize() { return 8; }
  static getStubConfig() { return { title: 'Benchmarks', icon: 'mdi:trophy' }; }
}

// ========== REGISTER ALL CARDS ==========
const cards = [
  { name: 'nova-raw-launch-data-card', class: NovaRawLaunchDataCard },
  { name: 'nova-derived-ball-flight-card', class: NovaDerivedBallFlightCard },
  { name: 'nova-shot-classification-card', class: NovaShotClassificationCard },
  { name: 'nova-tour-benchmarks-card', class: NovaTourBenchmarksCard },
  { name: 'nova-shot-quality-card', class: NovaShotQualityCard },
  { name: 'nova-club-delivery-card', class: NovaClubDeliveryCard },
  { name: 'nova-trajectory-card', class: NovaTrajectoryCard },
  { name: 'nova-optimal-windows-card', class: NovaOptimalWindowsCard },
  { name: 'nova-benchmarks-card', class: NovaBenchmarksCard }
];

cards.forEach(card => {
  if (!customElements.get(card.name)) {
    try {
      customElements.define(card.name, card.class);
      console.log(`✅ Registered: ${card.name}`);
    } catch (error) {
      console.error(`❌ Error registering ${card.name}:`, error);
    }
  }
});

// ========== REGISTER FOR LOVELACE EDITOR ==========
// Clear any previous registration
window.customCards = window.customCards.filter(c => 
  !c.type || !c.type.includes('nova-')
);

// Add all cards to editor
cards.forEach(card => {
  const stub = card.class.getStubConfig ? card.class.getStubConfig() : {};
  window.customCards.push({
    type: card.name,
    name: stub.title || card.name.replace('nova-', '').replace(/-/g, ' '),
    description: `Display ${stub.title || card.name} from Nova GolfCoach`,
    preview: true,
    documentationURL: 'https://github.com/lucky5822/golf-coach-cards'
  });
});

// ========== FINAL MESSAGE ==========
console.log('✅ GolfCoach Cards complete bundle loaded!');
console.log('📋 Available cards:');
cards.forEach((card, i) => {
  console.log(`   ${i+1}. ${card.name}`);
});
console.log('🏌️ Search for these cards in Lovelace editor!');