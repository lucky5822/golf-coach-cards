class NovaRawLaunchDataCard extends HTMLElement {
  setConfig(config) {
    this.config = {
      title: 'Raw Launch Data',
      icon: 'mdi:golf-tee',
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
      { id: 'sensor.nova_session_shot_count', name: 'Session shot count' },
      { id: 'sensor.nova_last_shot', name: 'Last shot' },
      { id: 'sensor.nova_ball_speed', name: 'Ball speed' },
      { id: 'sensor.nova_vertical_launch_angle', name: 'Vertical launch angle' },
      { id: 'sensor.nova_horizontal_launch_angle', name: 'Horizontal launch angle' },
      { id: 'sensor.nova_total_spin', name: 'Total spin' },
      { id: 'sensor.nova_spin_axis', name: 'Spin axis' }
    ];
  }

  getCardSize() {
    return 4;
  }
}

customElements.define('nova-raw-launch-data-card', NovaRawLaunchDataCard);