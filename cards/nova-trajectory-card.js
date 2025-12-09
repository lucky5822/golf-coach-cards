class NovaTrajectoryCard extends HTMLElement {
  setConfig(config) {
    this.config = {
      title: 'Trajectory',
      icon: 'mdi:chart-bell-curve',
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
      { id: 'sensor.nova_nova_apex_height', name: 'Apex height (yd)' },
      { id: 'sensor.nova_nova_hang_time', name: 'Hang time (s)' },
      { id: 'sensor.nova_nova_descent_angle', name: 'Descent angle (°)' }
    ];
  }

  getCardSize() {
    return 2;
  }
}

customElements.define('nova-trajectory-card', NovaTrajectoryCard);