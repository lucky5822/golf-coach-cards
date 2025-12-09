// ==============================================
// GOLFCOACH CARDS - SINGLE FILE BUNDLE
// Version 1.0.0
// ==============================================

console.info('🏌️ Loading GolfCoach Cards Bundle...');

// ==============================================
// 1. RAW LAUNCH DATA CARD
// ==============================================
class NovaRawLaunchDataCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._hass = null;
    this._config = null;
  }

  setConfig(config) {
    this._config = {
      title: 'Raw Launch Data',
      icon: 'mdi:golf-tee',
      ...config
    };
    this.render();
  }

  render() {
    if (!this._config || !this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        ha-card {
          height: 100%;
          overflow: hidden;
          padding: 0;
        }
        .card-header {
          display: flex;
          align-items: center;
          padding: 16px 16px 12px 16px;
          border-bottom: 1px solid var(--divider-color);
        }
        .card-header ha-icon {
          margin-right: 12px;
          color: var(--primary-color);
        }
        .card-title {
          font-weight: 500;
          font-size: 16px;
          color: var(--primary-text-color);
        }
        .card-content {
          padding: 16px;
        }
        .entities-table {
          width: 100%;
          border-collapse: collapse;
        }
        .entities-table tr {
          border-bottom: 1px solid var(--divider-color);
        }
        .entities-table tr:last-child {
          border-bottom: none;
        }
        .entities-table td {
          padding: 12px 0;
          vertical-align: middle;
        }
        .entity-name {
          color: var(--secondary-text-color);
          font-size: 14px;
        }
        .entity-state {
          text-align: right;
          font-weight: 500;
          font-size: 14px;
          color: var(--primary-text-color);
        }
        .positive {
          color: var(--success-color, #4CAF50);
        }
        .negative {
          color: var(--error-color, #F44336);
        }
      </style>
      <ha-card>
        <div class="card-header">
          <ha-icon icon="${this._config.icon}"></ha-icon>
          <div class="card-title">${this._config.title}</div>
        </div>
        <div class="card-content">
          <table class="entities-table">
            <tr>
              <td class="entity-name">Session shot count</td>
              <td class="entity-state" id="state-shot-count">...</td>
            </tr>
            <tr>
              <td class="entity-name">Last shot</td>
              <td class="entity-state" id="state-last-shot">...</td>
            </tr>
            <tr>
              <td class="entity-name">Ball speed</td>
              <td class="entity-state" id="state-ball-speed">...</td>
            </tr>
            <tr>
              <td class="entity-name">Vertical launch angle</td>
              <td class="entity-state" id="state-vertical-angle">...</td>
            </tr>
            <tr>
              <td class="entity-name">Horizontal launch angle</td>
              <td class="entity-state" id="state-horizontal-angle">...</td>
            </tr>
            <tr>
              <td class="entity-name">Total spin</td>
              <td class="entity-state" id="state-total-spin">...</td>
            </tr>
            <tr>
              <td class="entity-name">Spin axis</td>
              <td class="entity-state" id="state-spin-axis">...</td>
            </tr>
          </table>
        </div>
      </ha-card>
    `;
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._config || !this.shadowRoot) return;

    const entities = {
      'shot-count': 'sensor.nova_session_shot_count',
      'last-shot': 'sensor.nova_last_shot',
      'ball-speed': 'sensor.nova_ball_speed',
      'vertical-angle': 'sensor.nova_vertical_launch_angle',
      'horizontal-angle': 'sensor.nova_horizontal_launch_angle',
      'total-spin': 'sensor.nova_total_spin',
      'spin-axis': 'sensor.nova_spin_axis'
    };

    Object.keys(entities).forEach(key => {
      const element = this.shadowRoot.getElementById(`state-${key}`);
      if (element) {
        const state = hass.states[entities[key]];
        if (state && state.state && state.state !== 'unknown' && state.state !== 'unavailable') {
          let displayState = state.state;
          const num = parseFloat(state.state);
          
          if (!isNaN(num)) {
            displayState = num.toFixed(1);
            element.classList.remove('positive', 'negative');
            
            if (num > 0) {
              element.classList.add('positive');
            } else if (num < 0) {
              element.classList.add('negative');
            }
          }
          
          element.textContent = displayState;
        } else {
          element.textContent = 'N/A';
          element.classList.remove('positive', 'negative');
        }
      }
    });
  }

  getCardSize() {
    return 8;
  }
}

// ==============================================
// 2. DERIVED BALL FLIGHT CARD
// ==============================================
class NovaDerivedBallFlightCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._hass = null;
    this._config = null;
  }

  setConfig(config) {
    this._config = {
      title: 'Derived Ball Flight',
      icon: 'mdi:chart-areaspline',
      ...config
    };
    this.render();
  }

  render() {
    if (!this._config || !this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        ha-card {
          height: 100%;
          overflow: hidden;
          padding: 0;
        }
        .card-header {
          display: flex;
          align-items: center;
          padding: 16px 16px 12px 16px;
          border-bottom: 1px solid var(--divider-color);
        }
        .card-header ha-icon {
          margin-right: 12px;
          color: var(--primary-color);
        }
        .card-title {
          font-weight: 500;
          font-size: 16px;
          color: var(--primary-text-color);
        }
        .card-content {
          padding: 16px;
        }
        .entities-table {
          width: 100%;
          border-collapse: collapse;
        }
        .entities-table tr {
          border-bottom: 1px solid var(--divider-color);
        }
        .entities-table tr:last-child {
          border-bottom: none;
        }
        .entities-table td {
          padding: 12px 0;
          vertical-align: middle;
        }
        .entity-name {
          color: var(--secondary-text-color);
          font-size: 14px;
        }
        .entity-state {
          text-align: right;
          font-weight: 500;
          font-size: 14px;
          color: var(--primary-text-color);
        }
        .positive {
          color: var(--success-color, #4CAF50);
        }
        .negative {
          color: var(--error-color, #F44336);
        }
      </style>
      <ha-card>
        <div class="card-header">
          <ha-icon icon="${this._config.icon}"></ha-icon>
          <div class="card-title">${this._config.title}</div>
        </div>
        <div class="card-content">
          <table class="entities-table">
            <tr>
              <td class="entity-name">Carry distance</td>
              <td class="entity-state" id="state-carry">...</td>
            </tr>
            <tr>
              <td class="entity-name">Total distance</td>
              <td class="entity-state" id="state-total">...</td>
            </tr>
            <tr>
              <td class="entity-name">Offline distance</td>
              <td class="entity-state" id="state-offline">...</td>
            </tr>
            <tr>
              <td class="entity-name">Backspin</td>
              <td class="entity-state" id="state-backspin">...</td>
            </tr>
            <tr>
              <td class="entity-name">Sidespin</td>
              <td class="entity-state" id="state-sidespin">...</td>
            </tr>
            <tr>
              <td class="entity-name">Club speed</td>
              <td class="entity-state" id="state-club-speed">...</td>
            </tr>
            <tr>
              <td class="entity-name">Smash factor</td>
              <td class="entity-state" id="state-smash">...</td>
            </tr>
          </table>
        </div>
      </ha-card>
    `;
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._config || !this.shadowRoot) return;

    const entities = {
      'carry': 'sensor.nova_carry_distance',
      'total': 'sensor.nova_total_distance',
      'offline': 'sensor.nova_offline_distance',
      'backspin': 'sensor.nova_backspin',
      'sidespin': 'sensor.nova_sidespin',
      'club-speed': 'sensor.nova_club_speed',
      'smash': 'sensor.nova_smash_factor'
    };

    Object.keys(entities).forEach(key => {
      const element = this.shadowRoot.getElementById(`state-${key}`);
      if (element) {
        const state = hass.states[entities[key]];
        if (state && state.state && state.state !== 'unknown' && state.state !== 'unavailable') {
          let displayState = state.state;
          const num = parseFloat(state.state);
          
          if (!isNaN(num)) {
            displayState = num.toFixed(1);
            element.classList.remove('positive', 'negative');
            
            if (key === 'offline') {
              // Per offline, piccolo è meglio
              if (Math.abs(num) < 10) {
                element.classList.add('positive');
              } else if (Math.abs(num) > 20) {
                element.classList.add('negative');
              }
            } else if (num > 0) {
              element.classList.add('positive');
            } else if (num < 0) {
              element.classList.add('negative');
            }
          }
          
          element.textContent = displayState;
        } else {
          element.textContent = 'N/A';
          element.classList.remove('positive', 'negative');
        }
      }
    });
  }

  getCardSize() {
    return 8;
  }
}

// ==============================================
// 3. SHOT CLASSIFICATION CARD
// ==============================================
class NovaShotClassificationCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._hass = null;
    this._config = null;
  }

  setConfig(config) {
    this._config = {
      title: 'Shot Classification',
      icon: 'mdi:target-variant',
      ...config
    };
    this.render();
  }

  render() {
    if (!this._config || !this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        ha-card {
          height: 100%;
          overflow: hidden;
          padding: 0;
        }
        .card-header {
          display: flex;
          align-items: center;
          padding: 16px 16px 12px 16px;
          border-bottom: 1px solid var(--divider-color);
        }
        .card-header ha-icon {
          margin-right: 12px;
          color: var(--primary-color);
        }
        .card-title {
          font-weight: 500;
          font-size: 16px;
          color: var(--primary-text-color);
        }
        .card-content {
          padding: 16px;
        }
        .entities-table {
          width: 100%;
          border-collapse: collapse;
        }
        .entities-table tr {
          border-bottom: 1px solid var(--divider-color);
        }
        .entities-table tr:last-child {
          border-bottom: none;
        }
        .entities-table td {
          padding: 12px 0;
          vertical-align: middle;
        }
        .entity-name {
          color: var(--secondary-text-color);
          font-size: 14px;
        }
        .entity-state {
          text-align: right;
          font-weight: 500;
          font-size: 14px;
          color: var(--primary-text-color);
        }
        .shot-quality {
          font-weight: bold;
        }
        .quality-good { color: #4CAF50; }
        .quality-average { color: #FF9800; }
        .quality-poor { color: #F44336; }
      </style>
      <ha-card>
        <div class="card-header">
          <ha-icon icon="${this._config.icon}"></ha-icon>
          <div class="card-title">${this._config.title}</div>
        </div>
        <div class="card-content">
          <table class="entities-table">
            <tr>
              <td class="entity-name">Shot type</td>
              <td class="entity-state" id="state-type">...</td>
            </tr>
            <tr>
              <td class="entity-name">Shot rank</td>
              <td class="entity-state" id="state-rank">...</td>
            </tr>
            <tr>
              <td class="entity-name">Shot quality</td>
              <td class="entity-state">
                <span id="state-quality" class="shot-quality">...</span>
              </td>
            </tr>
          </table>
        </div>
      </ha-card>
    `;
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._config || !this.shadowRoot) return;

    // Shot type
    const typeElement = this.shadowRoot.getElementById('state-type');
    const typeState = hass.states['sensor.nova_shot_type'];
    if (typeElement && typeState && typeState.state) {
      typeElement.textContent = typeState.state;
    } else if (typeElement) {
      typeElement.textContent = 'N/A';
    }

    // Shot rank
    const rankElement = this.shadowRoot.getElementById('state-rank');
    const rankState = hass.states['sensor.nova_shot_rank'];
    if (rankElement && rankState && rankState.state) {
      rankElement.textContent = rankState.state;
    } else if (rankElement) {
      rankElement.textContent = 'N/A';
    }

    // Shot quality
    const qualityElement = this.shadowRoot.getElementById('state-quality');
    const qualityState = hass.states['sensor.nova_nova_shot_quality'];
    if (qualityElement && qualityState && qualityState.state) {
      const quality = parseInt(qualityState.state);
      qualityElement.textContent = qualityState.state;
      
      qualityElement.classList.remove('quality-good', 'quality-average', 'quality-poor');
      if (!isNaN(quality)) {
        if (quality >= 80) {
          qualityElement.classList.add('quality-good');
        } else if (quality >= 50) {
          qualityElement.classList.add('quality-average');
        } else {
          qualityElement.classList.add('quality-poor');
        }
      }
    } else if (qualityElement) {
      qualityElement.textContent = 'N/A';
      qualityElement.classList.remove('quality-good', 'quality-average', 'quality-poor');
    }
  }

  getCardSize() {
    return 4;
  }
}

// ==============================================
// REGISTRAZIONE DI TUTTE LE CARD
// ==============================================

// Registra le card
if (!customElements.get('nova-raw-launch-data-card')) {
  customElements.define('nova-raw-launch-data-card', NovaRawLaunchDataCard);
}

if (!customElements.get('nova-derived-ball-flight-card')) {
  customElements.define('nova-derived-ball-flight-card', NovaDerivedBallFlightCard);
}

if (!customElements.get('nova-shot-classification-card')) {
  customElements.define('nova-shot-classification-card', NovaShotClassificationCard);
}

// ==============================================
// REGISTRA NELL'EDITOR LOVELACE
// ==============================================

// Inizializza l'array customCards
if (!window.customCards) {
  window.customCards = [];
}

// Aggiungi tutte le card all'editor
window.customCards.push(
  {
    type: 'nova-raw-launch-data-card',
    name: 'Raw Launch Data',
    description: 'Raw launch data from Nova GolfCoach',
    preview: true,
    documentationURL: 'https://github.com/lucky5822/golf-coach-cards'
  },
  {
    type: 'nova-derived-ball-flight-card',
    name: 'Derived Ball Flight',
    description: 'Derived ball flight data',
    preview: true,
    documentationURL: 'https://github.com/lucky5822/golf-coach-cards'
  },
  {
    type: 'nova-shot-classification-card',
    name: 'Shot Classification',
    description: 'Shot classification and ranking',
    preview: true,
    documentationURL: 'https://github.com/lucky5822/golf-coach-cards'
  }
);

console.info('✅ GolfCoach Cards loaded successfully!');