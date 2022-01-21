/// <reference types="cypress" />

describe('example to-do app', () => {

  it('go to posts page', () => {
    cy.visit('/')
    cy.get('[data-cy=header-nav]').find('a').last().click()
    cy.intercept('GET', 'http://localhost:4300/posts').as('posts')
    cy.wait('@posts').then(res => {
      cy.request('http://localhost:4300/posts').then(response => {
        cy.get('[data-cy=posts-list]').find('li').should('have.length', response.body.length)
      })
    })
  })

  it('show full post', () => {
    cy.visit('/posts')
    cy.get('[data-cy=posts-list]').find('a').eq(1).click()
    cy.intercept('GET', `${Cypress.env('API_BASE_URL')}/posts/2`).as('posts')
    cy.url().should('eq', `${Cypress.env('APP_BASE_URL')}/post/2`)
    cy.wait('@posts').then(e => {
      cy.request(`${Cypress.env('API_BASE_URL')}/posts/2`).then(response => {
        cy.get('[data-cy=post-body]').contains(response.body.title)
        cy.get('[data-cy=post-body]').contains(response.body.body)
      })
    })
  })

  it('add new post', () => {
    cy.visit('/posts')
    let postLength = 0;
    cy.request('http://localhost:4300/posts').then(response => {
      postLength = response.body.length
    })

    cy.get('[data-cy=add-new-post-button]').click()

    cy.get('[data-cy=modal-title]').type('Lorem ipsum dolor')
    cy.get('[data-cy=modal-body]').type('Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, sequi ut. Iure sequi recusandae nihil neque modi libero, est consequuntur ea placeat, atque explicabo minus. At reprehenderit vitae laborum distinctio.')
    cy.intercept('POST', `${Cypress.env('API_BASE_URL')}/posts`).as('new_posts')
    cy.get('[data-cy=modal-add]').click()
    cy.wait('@new_posts').then(e => {
      cy.request('http://localhost:4300/posts').then(response => {
      cy.wrap(postLength).should('eq', response.body.length - 1)
    })
    })
  })

})
