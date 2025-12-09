class NovaShotQualityCard extends HTMLElement {
  setConfig(config) {
    this.config = {
      title: 'Shot Quality',
      icon: 'mdi:star-circle',
      ...config
    };
  }

  set hass(hass) {
    if (!this.content) {
      this.innerHTML = `
        <ha-card>
          <div class="card-header">
            <ha-icon icon="${this.config.icon}"></ha-icon>
            <div class="card-title">${this.config.title}</div>
          </div>
          <div class="card-content">
            <table class="entities-table">
              ${this.getEntities().map(entity => `
                <tr>
                  <td class="entity-name">${entity.name}</td>
                  <td class="entity-state">${hass.states[entity.id]?.state || 'N/A'}</td>
                </tr>
              `).join('')}
            </table>
          </div>
        </ha-card>
      `;
      this.content = true;
    }
  }

  getEntities() {
    return [
      { id: 'sensor.nova_nova_shot_quality', name: 'Shot quality (0–100)' },
      { id: 'sensor.nova_carry_distance', name: 'Carry (yd)' },
      { id: 'sensor.nova_offline_distance', name: 'Offline (yd)' },
      { id: 'sensor.nova_optimal_window_summary', name: 'Optimal windows' },
      { id: 'sensor.nova_club_recommendation', name: 'Recommendation' }
    ];
  }

  getCardSize() {
    return 3;
  }
}

customElements.define('nova-shot-quality-card', NovaShotQualityCard);