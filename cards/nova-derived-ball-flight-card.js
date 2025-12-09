class NovaDerivedBallFlightCard extends HTMLElement {
  setConfig(config) {
    this.config = {
      title: 'Derived Ball Flight',
      icon: 'mdi:chart-areaspline',
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
      { id: 'sensor.nova_carry_distance', name: 'Carry distance' },
      { id: 'sensor.nova_total_distance', name: 'Total distance' },
      { id: 'sensor.nova_offline_distance', name: 'Offline distance' },
      { id: 'sensor.nova_backspin', name: 'Backspin' },
      { id: 'sensor.nova_sidespin', name: 'Sidespin' },
      { id: 'sensor.nova_club_speed', name: 'Club speed' },
      { id: 'sensor.nova_smash_factor', name: 'Smash factor' }
    ];
  }

  getCardSize() {
    return 4;
  }
}

customElements.define('nova-derived-ball-flight-card', NovaDerivedBallFlightCard);