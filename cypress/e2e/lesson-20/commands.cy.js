/// <reference types="cypress" />

describe('QAuto', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Click', () => {
    cy.get('.btn-primary').click()
  })

  it.only('Type', () => {
    cy.get('.btn-primary').click()
    cy.get('#signupName').type('First Name', { delay: 300 })
    cy.get('#signupName').clear()
    cy.get('#signupName').type('Last Name', { delay: 300 })
  })

  it('Focus', () => {
    cy.get('.header_signin').click()
    cy.get('#signinEmail').focus()
    cy.get('#signinEmail').blur()
  })
})

describe('ExpandTesting', () => {
  it.only('checkboxes', () => {
    cy.visit('https://practice.expandtesting.com/checkboxes')
    cy.get('#checkbox1').check()
    cy.get('#checkbox1').check().should('be.checked')
    cy.wait(2000)
    cy.get('#checkbox1').uncheck()
    cy.get('#checkbox1').uncheck().should('not.be.checked')
  })

  it.only('radio buttons', () => {
    cy.visit('https://practice.expandtesting.com/radio-buttons')
    cy.get('#black').check()
    cy.get('#black').check().should('be.checked')
  })

  it.only('dropdowns', () => {
    cy.visit('https://practice.expandtesting.com/dropdown')
    cy.get('#country').select('MT')
    cy.get('#country').should('have.value', 'MT')
  })

  // it.only('custom dropdowns', () => {
  //   cy.visit('https://practice.expandtesting.com/dropdown')
  //   cy.get('#select-control').click()
  //   cy.contains('Option Two').click()
  //   cy.get('#debug-val').should('have.text', '2')
  // })

  it.only('multiple tabs', () => {
    cy.visit('/')
    cy.get('.icon-facebook').parent().invoke('removeAttr', 'target').click()
    cy.contains('h1').should('have.text', 'Sorry, something went wrong')
    cy.origin('https://www.facebook.com', () => {
      cy.get('h1').should('have.text', 'Sorry, something went wrong')
    })
  })
})
