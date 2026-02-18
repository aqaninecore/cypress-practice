/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('/')
  cy.get('header')
})

describe("Search header's buttons", () => {
  context('About button', () => {
    it.only('Get About button', () => {
      cy.get('[appscrollto="aboutSection"]').click()
    })

    it.only('Parent About button', () => {
      cy.get('[appscrollto="aboutSection"]').parent().click()
    })

    it.only('Children About button', () => {
      cy.get('.header_nav').children('button[appscrollto="aboutSection"]').click()
      //cy.get('.header_nav button[appscrollto="aboutSection"]'); if no need to specify a 'children'
    })
  })

  context('Contacts button', () => {
    it.only('Get Contacts button', () => {
      cy.get('[appscrollto="contactsSection"]').click()
    })

    it.only('Closest Contacts button', () => {
      cy.get('[appscrollto="contactsSection"]').closest('div.container').click()
    })

    it.only('Children Contacts button', () => {
      cy.get('.header_nav').children().eq(2).click()
    })
  })

  context('Guest log in button', () => {
    it.only('Get Guest log in button', () => {
      cy.get('.header-link.-guest').parent().click()
    })

    it.only('Alias+Children Guest log in button', () => {
      cy.get('.header_right.d-flex.align-items-center').children().eq(0).as('signInButton').click()
    })
  })

  context('Sign In button', () => {
    it.only('Invoke Sign In button', () => {
      cy.contains('button', 'Sign In').invoke('text').should('eq', 'Sign In')
    })

    it.only('Alias+Children Sign In button', () => {
      cy.get('.btn.btn-outline-white.header_signin').click()
    })
  })
})
