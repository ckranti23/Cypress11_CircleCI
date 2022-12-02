describe('Test',()=>{

    it('Pass',()=>{
        
        cy.visit('https://ued310.duckcreekondemand.com/Policy/default.aspx')
        cy.get('#username-inputEl').type('ckonapala')
        cy.get('#password-inputEl').type('password')
      //  cy.contain('Login').click()

    })
})


beforeEach('hit url', () => {
    Cypress.on("uncaught:exception", () => {
        return false;
    });
})