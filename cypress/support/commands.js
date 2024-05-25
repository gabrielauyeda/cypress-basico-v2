Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Gabriela')
    cy.get('#lastName').type('Ando')
    cy.get('#email').type('gabriela.uyeda@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('#phone').type('985409010')
    cy.get('button[type="submit"]').click()
})