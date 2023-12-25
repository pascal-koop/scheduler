describe('User Journey', () => {
  it('a user visits the scheduler on default campaign and make an appointment', () => {
    cy.visit('localhost:3000/test-campaign');

    // API stubbing
    cy.intercept('POST', '/api/appointment', (req) => {
      statusCode: 200, req.reply({ body: { success: true } });
    }).as('postAppointment');

    cy.get('.date-picker-date').find('.day').not('.disabled').first().click();

    cy.get('.time-slots').find('.time-slot-content').contains('10:00 Uhr').click();

    cy.get('input#name').type('Max Mustermann');

    // Testet ob der Button zwischendurch immer noch [disabled] ist
    cy.get('.send-button-content').should('have.attr', 'disabled');

    // Negativ Test
    cy.get('.input-email')
      .type('max@mustermann')
      .find('.email-error-msg')
      .should('be.visible')
      .and('contain', 'Bitte gebe eine valide E-mail-Adresse ein!');

    // löscht den falschen wert vom negativ test
    cy.get('input#email').clear();

    // Testet ob der Button zwischendurch immer noch [disabled] ist
    cy.get('.send-button-content').should('have.attr', 'disabled');

    // Happy path
    cy.get('.input-email').type('max@musterman.de');
    cy.get('.email-error-msg').should('not.exist');

    // Testet ob der Button zwischendurch immer noch [disabled] ist
    cy.get('.send-button-content').should('have.attr', 'disabled');

    cy.get('input#company').type('Unternehmen XY');

    cy.get('input#telephone').type('+49014567545454');

    cy.get('#comment').type(
      'Wir das Unternehmen XY sind auf das verarbeiten von Kunden bezogenen Daten spezialisiert und wollen unser internes Programm XYZ ' +
        'mit neuen features XYZ123 updaten und benötigen erfahrene Spezialisten für individual Software'
    );

    // Testet ob der Button zwischendurch immer noch [disabled] ist
    cy.get('.send-button-content').should('have.attr', 'disabled');

    cy.get('input#data-processing').should('not.be.checked');

    cy.get('input#data-processing').check();
    cy.get('input#data-processing').should('be.checked');

    cy.get('.send-button-content').should('not.have.attr', 'disabled');

    cy.get('.send-button-content').invoke('css', 'background-color').should('eq', 'rgb(255, 133, 0)');

    cy.get('.send-button-content').click();

    // wartet bis der HTTP request (stubbing Zeile 6 bis 8) fertig ist, danach wird der Test fortgesetzt
    cy.wait('@postAppointment');

    cy.get('.fetch-success-messages').should('be.visible');
    cy.get('.fetch-success-msg-1').should('contain', 'Vielen Dank für Ihre Anfrage.');

    cy.get('.fetch-success-msg-2').should('contain', 'Wir melden uns bei Ihnen.');
  });
});
