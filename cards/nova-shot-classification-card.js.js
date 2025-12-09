class NovaShotClassificationCard extends HTMLElement {
  setConfig(config) {
    this.config = {
      title: 'Shot Classification',
      icon: 'mdi:target-variant',
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
      { id: 'sensor.nova_shot_type', name: 'Shot type' },
      { id: 'sensor.nova_shot_rank', name: 'Shot rank' },
      { id: 'sensor.nova_nova_shot_quality', name: 'Shot quality (0–100)' }
    ];
  }

  getCardSize() {
    return 2;
  }
}

customElements.define('nova-shot-classification-card', NovaShotClassificationCard);