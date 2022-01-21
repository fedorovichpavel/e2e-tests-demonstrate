/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays 3 nav link in header', () => {

    cy.get('[data-cy=header-nav]').find('a').should('have.length', 3)

  })

  it('displays 2 link on main page', () => {

    cy.get('[data-cy=layout]').find('a').should('have.length', 2)

  })

  

})
