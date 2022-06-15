
describe('Profile settings page', () => {
    before(() => {
        cy.successLogin()
        cy.visit('/#/settings')
        cy.getToken().as('token')
    })

    beforeEach(function () {
        localStorage.setItem('jwtToken', this.token)
    })

    it('Settings page has correct header', () => {
        cy.contains('h1', 'Your Settings')
    })

    it('Active header link is correct', () => {
        cy.get('.navbar .active').as('settingsItem')
        cy.get('@settingsItem').contains('Settings')
        cy.get('@settingsItem').invoke('attr', 'href').should('be.equal', '#/settings')
      })

    it('Logout', () => {
        cy.contains('button', 'Or click here to logout').click()
        cy.getToken().should('eq', null)
        cy.url().should('eq', Cypress.config('baseUrl') + '#/')
    })
})