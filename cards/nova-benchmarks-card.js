class NovaBenchmarksCard extends HTMLElement {
  setConfig(config) {
    this.config = {
      title: 'Benchmarks (Am / LPGA / Tour)',
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
      { id: 'sensor.nova_amateur_carry_benchmark', name: 'Amateur carry' },
      { id: 'sensor.nova_lpga_carry_benchmark', name: 'LPGA carry' },
      { id: 'sensor.nova_nova_tour_carry', name: 'Tour carry' },
      { id: 'sensor.nova_carry_distance', name: 'Your carry' },
      { id: 'sensor.nova_carry_vs_amateur', name: 'Carry vs Amateur' },
      { id: 'sensor.nova_carry_vs_lpga', name: 'Carry vs LPGA' },
      { id: 'sensor.nova_nova_carry_vs_tour', name: 'Carry vs Tour' }
    ];
  }

  getCardSize() {
    return 4;
  }
}

customElements.define('nova-benchmarks-card', NovaBenchmarksCard);