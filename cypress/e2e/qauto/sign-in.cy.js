/// <reference types="cypress" />

describe('Sign In form', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('.header_signin').click()
  })
  context('Sign In process', () => {
    it('Success Sign In', () => {
      cy.get('#signinEmail').type('razorbackrightnow@gmail.com')
      cy.get('#signinPassword').type('Balagan1234')
      cy.get('.modal-content .btn-primary').click()
      cy.get('h1').should('have.text', 'Garage')
    })
    // Test 1 - Success Sign In
    // Tets 2 - Invalid Password
    // Test 3 - Invalid Email & Password
  })

  context('Email validation', () => {
    it('Incorrect Email', () => {
      cy.get('#signinEmail').focus()
      cy.get('#signinEmail').blur()
      cy.get('.invalid-feedback').should('have.text', 'Email is required')
    })
  })
  // Test 4 - Empty Fields Validation
  // Test 5 - Syntax email validation

  context('Password validation', () => {
    it('Empty Password', () => {
      cy.get('#signinPassword').focus()
      cy.get('#signinPassword').blur()
      cy.get('.invalid-feedback').should('have.text', 'Password is required')
    })
  })
  // Test 6 - Empty Password Validation
})
