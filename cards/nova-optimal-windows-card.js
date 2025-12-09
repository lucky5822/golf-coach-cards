class NovaOptimalWindowsCard extends HTMLElement {
  setConfig(config) {
    this.config = {
      title: 'Optimal Windows',
      icon: 'mdi:check-decagram',
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
      { id: 'sensor.nova_launch_in_window', name: 'Launch in window' },
      { id: 'sensor.nova_spin_in_window', name: 'Spin in window' },
      { id: 'sensor.nova_start_line_in_window', name: 'Start line in window' }
    ];
  }

  getCardSize() {
    return 2;
  }
}

customElements.define('nova-optimal-windows-card', NovaOptimalWindowsCard);