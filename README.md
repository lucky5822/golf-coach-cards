# Nova Open GolfCoach Cards

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Home Assistant](https://img.shields.io/badge/home_assistant-2023.8%2B-green)
![HACS](https://img.shields.io/badge/HACS-Custom-orange)

Una collezione completa di card Lovelace per visualizzare i dati del monitor di swing Nova Open GolfCoach in Home Assistant.

## Installazione

### Via HACS
1. Vai a HACS → Integrations
2. Clicca sui 3 puntini in alto a destra
3. Scegli "Custom repositories"
4. Aggiungi l'URL della repository
5. Cerca "Nova Open GolfCoach Cards" e installa

### Manuale
1. Scarica la release più recente
2. Copia `nova-cards-bundle.js` in `/config/www/`
3. Aggiungi come risorsa Lovelace:
   ```yaml
   resources:
     - url: /local/nova-cards-bundle.js
       type: module