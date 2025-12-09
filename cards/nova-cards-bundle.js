// GolfCoach Cards Bundle
// Version 1.0.0

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

// Stili globali
const style = document.createElement('style');
style.textContent = `
  .golfcoach-card {
    font-family: var(--paper-font-body1_-_font-family);
  }
  .golfcoach-card .card-header {
    display: flex;
    align-items: center;
    padding: 16px 16px 12px 16px;
    border-bottom: 1px solid var(--divider-color);
  }
  .golfcoach-card .card-header ha-icon {
    margin-right: 12px;
    color: var(--primary-color);
  }
  .golfcoach-card .card-title {
    font-weight: 500;
    font-size: 16px;
    color: var(--primary-text-color);
  }
  .golfcoach-card .card-content {
    padding: 16px;
  }
  .golfcoach-card .entities-table {
    width: 100%;
    border-collapse: collapse;
  }
  .golfcoach-card .entities-table tr {
    border-bottom: 1px solid var(--divider-color);
  }
  .golfcoach-card .entities-table tr:last-child {
    border-bottom: none;
  }
  .golfcoach-card .entities-table td {
    padding: 8px 0;
    vertical-align: middle;
  }
  .golfcoach-card .entity-name {
    color: var(--secondary-text-color);
    font-size: 14px;
  }
  .golfcoach-card .entity-state {
    text-align: right;
    font-weight: 500;
    font-size: 14px;
    color: var(--primary-text-color);
  }
  .golfcoach-card .positive {
    color: var(--success-color, #4CAF50);
  }
  .golfcoach-card .negative {
    color: var(--error-color, #F44336);
  }
`;
document.head.appendChild(style);

console.info('%c 🏌️ GolfCoach Cards loaded', 'color: #4CAF50; font-weight: bold;');