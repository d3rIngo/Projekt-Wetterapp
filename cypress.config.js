const { defineConfig } = require("cypress");

// Exportieren der Cypress-Konfiguration
module.exports = defineConfig({
  // Konfiguration für End-to-End-Tests
  e2e: {
    // Funktion zum Einrichten von Node.js-Events für End-to-End-Tests
    setupNodeEvents(on, config) {
      // Implementierung von Node.js-Event-Listeners hier
    },
  },
});
