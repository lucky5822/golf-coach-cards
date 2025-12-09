class NovaTourBenchmarksCard extends HTMLElement {
  setConfig(config) {
    this.config = {
      title: 'Tour Benchmarks (PGA style)',
      icon: 'mdi:trophy',
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
      { id: 'sensor.nova_amateur_carry_benchmark', name: 'Amateur carry benchmark' },
      { id: 'sensor.nova_lpga_carry_benchmark', name: 'LPGA carry benchmark' },
      { id: 'sensor.nova_nova_tour_carry', name: 'Tour carry benchmark' },
      { id: 'sensor.nova_carry_distance', name: 'Your carry (actual)' },
      { id: 'sensor.nova_nova_carry_vs_tour', name: 'Carry vs Tour (yd)' }
    ];
  }

  getCardSize() {
    return 3;
  }
}

customElements.define('nova-tour-benchmarks-card', NovaTourBenchmarksCard);