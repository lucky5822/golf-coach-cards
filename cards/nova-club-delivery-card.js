class NovaClubDeliveryCard extends HTMLElement {
  setConfig(config) {
    this.config = {
      title: 'Club Delivery (Estimates)',
      icon: 'mdi:golf',
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
      { id: 'sensor.nova_nova_spin_loft', name: 'Spin loft (°)' },
      { id: 'sensor.nova_nova_attack_angle', name: 'Attack angle (°)' },
      { id: 'sensor.nova_nova_face_angle', name: 'Face angle (°)' },
      { id: 'sensor.nova_nova_face_to_path', name: 'Face to path (°)' },
      { id: 'sensor.nova_nova_club_path', name: 'Club path (°)' }
    ];
  }

  getCardSize() {
    return 3;
  }
}

customElements.define('nova-club-delivery-card', NovaClubDeliveryCard);