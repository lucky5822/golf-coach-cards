// Importa tutte le card
import './nova-raw-launch-data-card.js';
import './nova-derived-ball-flight-card.js';
import './nova-shot-classification-card.js';
import './nova-tour-benchmarks-card.js';
import './nova-shot-quality-card.js';
import './nova-club-delivery-card.js';
import './nova-trajectory-card.js';
import './nova-optimal-windows-card.js';
import './nova-benchmarks-card.js';

// Aggiungi stili globali
const style = document.createElement('style');
style.textContent = `
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
    padding: 8px 0;
  }
  .entity-name {
    color: var(--secondary-text-color);
    font-size: 0.9em;
  }
  .entity-state {
    text-align: right;
    font-weight: 500;
    color: var(--primary-text-color);
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
    font-size: 1.1em;
    color: var(--primary-text-color);
  }
  .card-content {
    padding: 16px;
  }
  
  /* Stili per valori numerici positivi/negativi */
  .positive-value {
    color: var(--success-color, #4CAF50);
  }
  .negative-value {
    color: var(--error-color, #f44336);
  }
  .neutral-value {
    color: var(--secondary-text-color);
  }
`;

document.head.appendChild(style);

// Funzione per formattare i valori
function formatValue(value) {
  if (!value || value === 'N/A' || value === 'unknown' || value === 'unavailable') {
    return 'N/A';
  }
  
  // Controlla se è un numero
  const num = parseFloat(value);
  if (!isNaN(num)) {
    // Aggiungi segno + per valori positivi
    return num > 0 ? `+${num}` : num.toString();
  }
  
  return value;
}

// Override della funzione set hass per formattare i valori
const originalSetHass = HTMLElement.prototype.setHass;
HTMLElement.prototype.setHass = function(hass) {
  if (this.setHassOriginal) {
    this.setHassOriginal(hass);
  }
  
  // Formatta i valori nelle tabelle
  const tables = this.querySelectorAll('.entities-table');
  tables.forEach(table => {
    const rows = table.querySelectorAll('tr');
    rows.forEach(row => {
      const stateCell = row.querySelector('.entity-state');
      if (stateCell) {
        let value = stateCell.textContent;
        stateCell.textContent = formatValue(value);
        
        // Aggiungi classe per colore
        const num = parseFloat(value);
        if (!isNaN(num)) {
          if (num > 0) {
            stateCell.classList.add('positive-value');
            stateCell.classList.remove('negative-value', 'neutral-value');
          } else if (num < 0) {
            stateCell.classList.add('negative-value');
            stateCell.classList.remove('positive-value', 'neutral-value');
          } else {
            stateCell.classList.add('neutral-value');
            stateCell.classList.remove('positive-value', 'negative-value');
          }
        }
      }
    });
  });
};

console.info(
  '%c Nova GolfCoach Cards %c v1.0.0 ',
  'color: white; background: #4CAF50; padding: 5px 0; border-radius: 3px 0 0 3px;',
  'color: #4CAF50; background: white; padding: 5px 0; border-radius: 0 3px 3px 0; border: 1px solid #4CAF50;'
);