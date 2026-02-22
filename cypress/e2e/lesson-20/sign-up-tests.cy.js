/// <reference types="cypress" />

const { Children } = require('react')

// FIELD 'Name'
// 1. check empty field -> Name is required
// 2. check special chars data -> Name is invalid
// 3. check input with 1 symbol -> [text from screenshot]
// 4. check input with 21 symbol -> [text from screenshot]
// 5. check CSS trigger -> border color
// 6. check in cyrillic -> Name is invalid
// 7. check numbers -> Name is invalid
// 8. check valid input with 2 symbols
// 9. check valid input with 10 symbols
// 10. check valid input with 20 symbols
// 11. check spaces input -> Name is invalid
// 12. check CSS trigger when valid input-> border color back to default

// FIELD 'Last name'
// same 12 from the suite above

// FIELD 'Email'
// 1. check valid email input
// 2. check empty input -> Email is required
// 3. check input missing '@' -> Email is incorrect
// 4. check missing domain -> Email is incorrect
// 5. check invalid format [@gmail.com] -> Email is incorrect
// 6. check with spaces -> Email is incorrect
// 7. check emails with subdomains
// 8. check CSS trigger -> border color
// 9. check CSS trigger when valid input-> border color back to default

// FIELD 'Password'
// 1. Valid password (boundary 8)
// 2. Valid password (boundary 15)
// 3. check empty input -> Password is required
// 4. check less then 8 chars -> [text from screenshot]
// 5. check more then 15 chars -> [text from screenshot]
// 6. check no uppercase
// 7. check no lowercase
// 8. check no numbers
// 9. check only numbers
// 10. check CSS trigger -> border color
// 11. check CSS trigger when valid input-> border color back to default

// FIELD 'Re-enter password'
// 1. check a 'password match' flow
// 2. check empty input -> Re-enter password is required
// 3. check a 'password mismatch' flow
// 4. check a 'case mismatch' flow

// SUCCESSFUL REGISTRATION
// 1. check that button enabled when form fields data are valid
// 2. check successful sign-up (use API-call status / success msg?)
// 3. check that button disabled when form fields data is invalid at least at one i.f.
// 4. check progressive validation (fill field-by-field validly)
// 5. check when sign up with all empty fields (validation error)
// 6. check sign-up with already registered email (validation error)

before(() => {
  cy.visit('/')
  cy.get('header')
  cy.get('.btn.btn-outline-white.header_signin').click()
})

describe('Sign Up Form. Name field validation', () => {
  beforeEach(() => {
    cy.get('.modal-footer').children().eq(0).click()
  })

  context('Name field', () => {
    it.only('Check valid input with 2 symbols', () => {
      cy.get('#signupName').click()
      cy.get('#signupName').type('Go', { delay: 300 })
    })
  })
})
