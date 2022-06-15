const EMAIL_INPUT = '[type=email]'
const PASSWORD_INPUT = '[type=password]'
const SUBMIT_BTN = '[type=submit]'
const ERR_MESSAGES = '.error-messages'

const USER_EMAIL = Cypress.env('USEREMAIL')
const PASSWORD = Cypress.env('PASSWORD')

describe('Login page', () => {
    beforeEach(() => {
        cy.logout()
        cy.visit('/#/login')
    })

    after(() => {
        cy.logout()
    })

    it('has "Sign in" header', () => {
        cy.contains('h1', 'Sign in')
    })

    it('"Need an account?" contains correct link', () => {
        cy.contains('a', 'Need an account?').should('have.attr', 'href', '#/register')
    })

    it('"Home" contains correct link', () => {
        cy.contains('a','Home').should('have.attr', 'href', '#/')
    } )

    it('email is required to login', () => {
        cy.get(PASSWORD_INPUT).type(PASSWORD)
        cy.get(SUBMIT_BTN).click()
        cy.get(ERR_MESSAGES).should('contain', "email can't be blank")
    })

    it('password is required to login', () => {
        cy.get(EMAIL_INPUT).type(USER_EMAIL)
        cy.get(SUBMIT_BTN).click()
        cy.get(ERR_MESSAGES).should('contain', "password can't be blank")
    })

    it('user with invalid email is not allowed to login', () => {
        cy.get(EMAIL_INPUT).type('invalidemail@gmail.com')
        cy.get(PASSWORD_INPUT).type(PASSWORD)
        cy.get(SUBMIT_BTN).click()
        cy.get(ERR_MESSAGES).should('contain', "email or password is invalid")
    })

    it('user with invalid email is not allowed to login', () => {
        cy.get(EMAIL_INPUT).type(USER_EMAIL)
        cy.get(PASSWORD_INPUT).type('invalidpsw')
        cy.get(SUBMIT_BTN).click()
        cy.get(ERR_MESSAGES).should('contain', "email or password is invalid")
    })

    it('login by mouse click', () => {
        cy.get(EMAIL_INPUT).type(USER_EMAIL)
        cy.get(PASSWORD_INPUT).type(PASSWORD)
        cy.get(SUBMIT_BTN).click()
        cy.url().should('be.equal', Cypress.config('baseUrl') + '#/')
    })

    it('login by enter', () => {
        cy.get(EMAIL_INPUT).type(USER_EMAIL)
        cy.get(PASSWORD_INPUT).type(`${PASSWORD}{enter}`)
        cy.url().should('be.equal', Cypress.config('baseUrl') + '#/')
    })
})