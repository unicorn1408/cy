const {generateArticle} = require('./helpers/generator')

const PUBLISH_BTN = '[type=button]'
const ERROR_MESSAGES = '.error-messages'
const TITLE = '[placeholder="Article Title"]'
const DESCRIPTION = '[placeholder="What\'s this article about?"]'
const ARTICLE_BODY = '[placeholder="Write your article (in markdown)"]'
const ENTER_TAGS = '[placeholder="Enter tags"]'


describe('Article', () => {
    before(() => {
      cy.successLogin();
      cy.getToken().as('token');
    });
  
    beforeEach(function () {
      cy.visit('/#/editor/');
      localStorage.setItem('jwtToken', this.token);
    });
  
    it('active header link is correct', () => {
      cy.get('.navbar .active').as('newArticle');
      cy.get('@newArticle').contains('New Article');
      cy.get('@newArticle').invoke('attr', 'href').should('be.equal', '#/editor/');
    });

    it('Article title is required', () => {
        cy.get(PUBLISH_BTN).click()
        cy.get(ERROR_MESSAGES).invoke('text').should('contain', "title can't be blank")
    })

    it('Description is required', () => {
        cy.get(TITLE).type("Test article title")
        cy.get(PUBLISH_BTN).click()
        cy.get(ERROR_MESSAGES).invoke('text').should('contain', "description can't be blank")
    })

    it('Publish valid article', () => {
        cy.intercept('POST', 'https://api.realworld.io/api/articles').as('route');
        
        const randomArticle = generateArticle(3)
        cy.get(TITLE).type(randomArticle.title)
        cy.get(DESCRIPTION).type(randomArticle.description)
        cy.get(ARTICLE_BODY).type(randomArticle.body)
        cy.get(ENTER_TAGS).type(randomArticle.tagList)
        cy.get(PUBLISH_BTN).click()

        cy.wait('@route').then((resp) => {
            console.log(resp)
            expect(resp.response.body.article).to.be.an('object')
            expect(resp.response.statusCode).to.equal(200)
            cy.url().should('contain', resp.response.body.article.slug)
          });
    })
})

describe('Article page', () => {
  before(() => {
    cy.successLogin()
    cy.visit('/#/editor/');
    const randomArticle = generateArticle(3)
    cy.get(TITLE).type(randomArticle.title)
    cy.get(DESCRIPTION).type(randomArticle.description)
    cy.get(ARTICLE_BODY).type(randomArticle.body)
    cy.get(ENTER_TAGS).type(randomArticle.tagList)
    cy.get(PUBLISH_BTN).click()
  })

  it('comment can be added', () => {
    const testtext = 'test comment'
    cy.get('[placeholder="Write a comment..."]').type(testtext)
    cy.get('[type="submit"]').click()
    cy.get('.card-block p').first().contains(testtext)

  })

  it('article can be deleted', () => {
    cy.successLogin()
    const deleted = cy.url()
    cy.contains('button', "Delete Article").click()
    cy.url().should('eq', Cypress.config('baseUrl')+ '#/')
  })
})

describe('Edit Acticle', () => {
  const slug = ''
  before(() => {
    cy.successLogin()

    cy.visit('/#/editor/');
    const randomArticle = generateArticle(3)
    cy.get(TITLE).type(randomArticle.title)
    cy.get(DESCRIPTION).type(randomArticle.description)
    cy.get(ARTICLE_BODY).type(randomArticle.body)
    cy.get(ENTER_TAGS).type(randomArticle.tagList)
    cy.get(PUBLISH_BTN).click()

  })

  it('Article Title', () => {
    cy.contains('a', "Edit Article").click()
    const randomArticle = generateArticle()

    cy.intercept('PUT', 'https://api.realworld.io/api/articles/**').as('update')

    cy.get(TITLE).clear().type(randomArticle.title)
    cy.get(PUBLISH_BTN).click()

    cy.wait('@update').then((resp) => {
      console.log(resp)
      expect(resp.response.body.article).to.be.an('object')
      expect(resp.response.statusCode).to.equal(200)
      cy.contains('[class="banner"]', randomArticle.title)
    });
   })

   it('Article Body', () => {
    cy.successLogin()
    cy.contains('a', "Edit Article").click()
    const randomArticle = generateArticle()

    cy.intercept('PUT', 'https://api.realworld.io/api/articles/**').as('update')

    cy.get('[placeholder="Write your article (in markdown)"]').clear().type(randomArticle.body)
    cy.get(PUBLISH_BTN).click()

    cy.wait('@update').then((resp) => {
      console.log(resp)
      expect(resp.response.body.article).to.be.an('object')
      expect(resp.response.statusCode).to.equal(200)
      cy.contains('[class="row article-content"]', randomArticle.body)
    });
   })
    
   it('Delete Article', () => {
    cy.successLogin()
    cy.intercept('DELETE', 'https://api.realworld.io/api/articles/**').as('delete')

    cy.contains('button', "Delete Article").click()

    cy.wait('@delete').then(resp => {
      console.log(resp)
      // expect(resp.response.body.article).to.be.an('object')
      expect(resp.response.body.article).to.be.undefined
      expect(resp.response.statusCode).to.equal(200)  
      cy.url().should('eq', Cypress.config('baseUrl')+ '#/')
    })
   })

})

