const { generateEmail, generateUserName, generatePassword } = require('./helpers/generator')

const SIGNUP_BTN = '[type="submit"]'
const EMAIL = '[type="email"]'
const ERR_MESSAGES = '.error-messages'
const USERNAME = '[placeholder="Username"]'
const PASSWORD = '[type="password"]'



describe('Required fields', () => {
    before (() => {
        cy.visit('/#/register')
    })

    afterEach(() => {
        cy.get(EMAIL).clear()
        cy.get(USERNAME).clear()
    })
    
    it ('Email is required', () => {
        cy.get(SIGNUP_BTN).click()
        cy.contains(ERR_MESSAGES, "email can't be blank")
    })

    it('Username is required', () => {
        cy.get(EMAIL).type('test@gmail.com')
        cy.get(SIGNUP_BTN).click()
        cy.contains(ERR_MESSAGES, "username can't be blank")
    })

    it('Password is required', () => {
        cy.get(EMAIL).type('test@gmail.com')
        cy.get(USERNAME).type('test user')
        cy.get(SIGNUP_BTN).click()
        cy.contains(ERR_MESSAGES, "password can't be blank")
    })


})

describe('Sign up', () => {
    const newUserName = generateUserName()
    const newUserEmail = generateEmail()

    beforeEach(() => {
        cy.visit('/#/register')
    })

    it('User can be signed up', () => {
        cy.get(EMAIL).type(newUserEmail)
        cy.get(USERNAME).type(newUserName)
        cy.get(PASSWORD).type(generatePassword())
        cy.get(SIGNUP_BTN).click()
        cy.url().should('eq', Cypress.config('baseUrl') + '#/')
    })

    it('User can not sign up with already existing email', () => {
        cy.get(EMAIL).type(newUserEmail)
        cy.get(USERNAME).type(generateUserName())
        cy.get(PASSWORD).type(generatePassword())
        cy.get(SIGNUP_BTN).click()
        cy.contains(ERR_MESSAGES, "email has already been taken")
    })

    it('User can not sign up with already existing username', () => {
        cy.get(EMAIL).type(generateEmail())
        cy.get(USERNAME).type(newUserName)
        cy.get(PASSWORD).type(generatePassword())
        cy.get(SIGNUP_BTN).click()
        cy.contains(ERR_MESSAGES, "username has already been taken")
    })
})