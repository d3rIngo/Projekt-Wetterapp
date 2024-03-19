describe('Wetter-App Tests', () => {
  it('Zeige Wetterdaten nach Eingabe des Ortsnamens', () => {
    const location = 'Berlin'; // Beispielort für den Test

    // Besuche die Seite und überprüfe, ob sie geladen wird
    cy.visit('https://wetterapp-two.vercel.app/');
    cy.contains('Wetter-App').should('be.visible');

    // Gib den Ort ein und überprüfe, ob das Eingabefeld aktualisiert wird
    cy.get('input[type="text"]').type(location).should('have.value', location);

    // Klicke auf den Button "Wetter abrufen" und überprüfe, ob die Wetterdaten angezeigt werden
    cy.get('button').click();
    cy.contains(`Aktuelles Wetter für ${location}:`).should('be.visible');

    // Überprüfe, ob die Temperatur, der Wetterzustand und die Luftfeuchtigkeit angezeigt werden
    cy.contains('Temperatur:').should('be.visible');
    cy.contains('Wetterzustand:').should('be.visible');
    cy.contains('Luftfeuchtigkeit:').should('be.visible');
  });
});
