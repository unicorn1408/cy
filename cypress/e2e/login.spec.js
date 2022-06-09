const EMAIL_INPUT = '[type=email]'
const PASSWORD_INPUT = '[type=password]'
const SUBMIT_BTN = '[type=submit]'
const ERR_MESSAGES = '.error-messages'

const USER_EMAIL = Cypress.env('USEREMAIL')
const PASSWORD = Cypress.env('PASSWORD')


describe('Login page', () => {
    beforeEach(() => {
        cy.visit('/#/login')
    })
    after(() => {

    })

    it('has sign in header', () => {
        cy.contains('h1', 'Sign in')
    })

    it('correct link', () => {
        cy.contains('a', 'Need an account?').should('have.attr', 'href', '#/register')
    })

    it('user can login', () => {
        cy.get(EMAIL_INPUT).type(Cypress.env('USEREMAIL'))
        cy.get(PASSWORD_INPUT).type(PASSWORD)
        cy.get(SUBMIT_BTN).click()
    })

    it('requires email', () => {
        cy.get(PASSWORD_INPUT).type(PASSWORD)
        cy.get(SUBMIT_BTN).click()
        cy.get(ERR_MESSAGES).should('contain', "email can't be blank")
    })

    it('requires password', () => {
        cy.get(EMAIL_INPUT).type(USER_EMAIL)
        cy.get(SUBMIT_BTN).click()
        cy.get(ERR_MESSAGES).should('contain', "password can't be blank")
    })
})