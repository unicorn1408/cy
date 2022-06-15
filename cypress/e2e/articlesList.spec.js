const QUERY_URL = 'https://api.realworld.io/api/articles?limit=10&offset=0&tag=implementations'

describe('Articles list by tag', () => {
    before(() => {
        cy.successLogin()
        cy.visit('/')
        cy.intercept('GET', QUERY_URL).as('getArticlesByTag')
    })

    it('Tag button retrieves correct data', () => {
        cy.contains('.sidebar a', 'implementations').click()
        cy.wait('@getArticlesByTag').then((data) => {
            const {articles} = data.response.body
            articles.forEach((article) => {
                expect('implementations').to.be.oneOf(article.tagList)
            })
        })
    })

    it('Current tag is dispayed in navbar', () => {
        cy.get('.nav-pills').should('contain', 'implementations')
    })
})

describe('Articles list is displayed correctly', () => {
    before(() => {
        cy.successLogin()
        cy.intercept('GET', QUERY_URL, {
            fixture: 'articles.json'
        }).as('getArticleByTag')
        cy.visit('/')
    })

    it('get articles', () => {
        cy.contains('.sidebar a', 'implementations').click()
        cy.get('[article=article]').should('have.length', 3)
    })
})

describe('Articles lisrt is displayed correctly', () => {
    before(() => {
        cy.successLogin()
        cy.createArticle().as('articleData');
        cy.visit('/');
    })

  after(() => {
    cy.get('@articleData').then((data) => {
      console.log(data, '####')
    })
  })

  it('check if article is displayed correctly', () => {
    cy.contains('.sidebar a', 'implementations').click()
    cy.get('@articleData').then((data) => {
      cy.contains('h1', data.title).closest('[article=article]').as('article')
      cy.get('@article').find('.tag-list').find('li').should('have.length', 3)
    })
  });
})

describe.only('Liked article', () => {
    before(() => {
        cy.successLogin()
        cy.visit('/')
        cy.contains('a', 'Global Feed').click()
    })

    it('Like counter', () => {
        const LIKE = ('favorite-btn')
        cy.get(LIKE).first().then(($span) => {
            const num1 = parseFloat($span.text())
            console.log(num1, '11111111111')

            cy.get(LIKE).first()
              .click()
              .then(() => {
                const num2 = parseFloat($span.text())
                console.log(num2, '22222222')
                expect(num2).to.eq(num1 + 1)
              })
          })
    })
})