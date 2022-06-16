// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import {generateArticle} from '../e2e/helpers/generator'

Cypress.Commands.add('login', (email, password) => {
    cy.request({
        method: 'POST',
        url: 'https://api.realworld.io/api/users/login',
        body: {
            user: {
                email,
                password
        }}
    }).then((resp) => {
        const {token} = resp.body.user
        localStorage.setItem('jwtToken', token)
    })
})

Cypress.Commands.add('successLogin', () => {
    cy.login(Cypress.env('USEREMAIL'), Cypress.env('PASSWORD'))
})

Cypress.Commands.add('getToken', () => {
    return localStorage.getItem('jwtToken')
})

Cypress.Commands.add('logout', () => {
    localStorage.removeItem('jwtToken');
  });

Cypress.Commands.add('createArticle', (params) => {
    cy.request({
      method: 'POST',
      url: 'https://api.realworld.io/api/articles',
      body: {
        article: generateArticle(params),
      },
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwtToken'),
      },
    }).then((response) => {
      return response.body.article;
    });
});