/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('/')
  cy.get('.hero-descriptor_btn.btn.btn-primary').click()
  cy.get('app-signup-modal').find('.modal-footer').find('button').should('have.text', 'Register').and('be.disabled')
})

describe('Sign Up Form. Name field validation', () => {
  context('Positive cases', () => {
    it('Check valid input with 2 symbols', () => {
      cy.get('#signupName').type('Go')
    })

    it('Check valid input with 10 symbols', () => {
      cy.get('#signupName').type('LENGTHtest')
    })

    it('Check valid input with 20 symbols', () => {
      cy.get('#signupName').type('LENGTHtestMOREsymbol')
    })
  })

  context('Negative cases', () => {
    it('Check input validation with 1 symbol', () => {
      cy.get('#signupName').type('G')
      cy.get('#signupName').blur()
      cy.get('.invalid-feedback').should('have.text', 'Name has to be from 2 to 20 characters long')
    })

    it('Check input validation with 21 symbol', () => {
      cy.get('#signupName').type('LENGTHtestMOREsymbols')
      cy.get('#signupName').blur()
      cy.get('.invalid-feedback').should('have.text', 'Name has to be from 2 to 20 characters long')
    })

    it('Check input validation with special characters', () => {
      cy.get('#signupName').type('!@#$%^')
      cy.get('#signupName').blur()
      cy.get('.invalid-feedback').should('have.text', 'Name is invalid')
    })

    it('Check input validation with Cyrillic characters', () => {
      cy.get('#signupName').type('ТестЮзер')
      cy.get('#signupName').blur()
      cy.get('.invalid-feedback').should('have.text', 'Name is invalid')
    })

    it('Check input validation with digits', () => {
      cy.get('#signupName').type('123456')
      cy.get('#signupName').blur()
      cy.get('.invalid-feedback').should('have.text', 'Name is invalid')
    })

    it('Check input validation with spaces', () => {
      cy.get('#signupName').type('    ')
      cy.get('#signupName').blur()
      cy.get('.invalid-feedback').should('have.text', 'Name is invalid')
    })

    it('Check empty input', () => {
      cy.get('#signupName').focus().blur()
      cy.get('.invalid-feedback').should('have.text', 'Name is required')
    })
  })
})
// -----------------------------------------------------------------------------------------------------------------//
describe('Sign Up Form. Last name field validation', () => {
  context('Positive cases', () => {
    it('Check valid input with 2 symbols', () => {
      cy.get('#signupLastName').type('Go')
    })

    it('Check valid input with 10 symbols', () => {
      cy.get('#signupLastName').type('LENGTHtest')
    })

    it('Check valid input with 20 symbols', () => {
      cy.get('#signupLastName').type('LENGTHtestMOREsymbol')
    })
  })

  context('Negative cases', () => {
    it('Check input validation with 1 symbol', () => {
      cy.get('#signupLastName').type('G')
      cy.get('#signupLastName').blur()
      cy.get('.invalid-feedback').should('have.text', 'Last name has to be from 2 to 20 characters long')
    })

    it('Check input validation with 21 symbol', () => {
      cy.get('#signupLastName').type('LENGTHtestMOREsymbols')
      cy.get('#signupLastName').blur()
      cy.get('.invalid-feedback').should('have.text', 'Last name has to be from 2 to 20 characters long')
    })

    it('Check input validation with special characters', () => {
      cy.get('#signupLastName').type('!@#$%^')
      cy.get('#signupLastName').blur()
      cy.get('.invalid-feedback').should('have.text', 'Last name is invalid')
    })

    it('Check input validation with Cyrillic characters', () => {
      cy.get('#signupLastName').type('ТестЮзер')
      cy.get('#signupLastName').blur()
      cy.get('.invalid-feedback').should('have.text', 'Last name is invalid')
    })

    it('Check input validation with digits', () => {
      cy.get('#signupLastName').type('123456')
      cy.get('#signupLastName').blur()
      cy.get('.invalid-feedback').should('have.text', 'Last name is invalid')
    })

    it('Check input validation with spaces', () => {
      cy.get('#signupLastName').type('    ')
      cy.get('#signupLastName').blur()
      cy.get('.invalid-feedback').should('have.text', 'Last name is invalid')
    })

    it('Check empty input', () => {
      cy.get('#signupLastName').focus().blur()
      cy.get('.invalid-feedback').should('have.text', 'Last name is invalid')
    })
  })
})
// -----------------------------------------------------------------------------------------------------------------//
describe('Sign Up Form. Email field validation', () => {
  context('Positive cases', () => {
    it('Check valid Email input', () => {
      cy.get('#signupEmail').type('!testUser123@gmail.com').focus()
    })

    it('Check valid Email input with subdomain', () => {
      cy.get('#signupEmail').type('!testUser123@gmail.com')
    })
  })
  context('Negative cases', () => {
    it('Check with missing @ input', () => {
      cy.get('#signupEmail').type('!testUser123gmail.com')
      cy.get('#signupEmail').blur()
      cy.get('.invalid-feedback').should('have.text', 'Email is incorrect')
    })

    it('Check with missing domain', () => {
      cy.get('#signupEmail').type('!testUser123@')
      cy.get('#signupEmail').blur()
      cy.get('.invalid-feedback').should('have.text', 'Email is incorrect')
    })

    it('Check with invalid format', () => {
      cy.get('#signupEmail').type('@gmail.com')
      cy.get('#signupEmail').blur()
      cy.get('.invalid-feedback').should('have.text', 'Email is incorrect')
    })

    it('Check input validation with spaces', () => {
      cy.get('#signupEmail').type('te st@mail.com')
      cy.get('#signupEmail').blur()
      cy.get('.invalid-feedback').should('have.text', 'Email is incorrect')
    })

    it('Check empty input', () => {
      cy.get('#signupEmail').focus().blur()
      cy.get('.invalid-feedback').should('have.text', 'Email required')
    })
  })
})
// -----------------------------------------------------------------------------------------------------------------//
describe('Sign Up Form. Password field validation', () => {
  context('Positive cases', () => {
    it('Check valid Password input. Boundary 8', () => {
      cy.get('#signupPassword').type('PassTes1')
    })

    it('Check valid Password input. Boundary 10', () => {
      cy.get('#signupPassword').type('PassTes12')
    })

    it('Check valid Password input. Boundary 15', () => {
      cy.get('#signupPassword').type('PassTest1234567')
    })

    it('Check valid Password input with spaces', () => {
      cy.get('#signupPassword').type('PassTest 34567 ')
    })
  })

  context('Negative cases', () => {
    it('Check Password with less then 8 chars', () => {
      cy.get('#signupPassword').type('PassTes')
      cy.get('#signupPassword').blur()
      cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should(
        'have.text',
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
      )
    })

    it('Check Password with more then 15 chars', () => {
      cy.get('#signupPassword').type('!te stUser123@14')
      cy.get('#signupPassword').blur()
      cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should(
        'have.text',
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
      )
    })

    it('Check Password without uppercase', () => {
      cy.get('#signupPassword').type('passtes1')
      cy.get('#signupPassword').blur()
      cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should(
        'have.text',
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
      )
    })

    it('Check Password without lowercase', () => {
      cy.get('#signupPassword').type('PASSTES1')
      cy.get('#signupPassword').blur()
      cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should(
        'have.text',
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
      )
    })

    it('Check Password without numbers', () => {
      cy.get('#signupPassword').type('PassTestNoDigit')
      cy.get('#signupPassword').blur()
      cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should(
        'have.text',
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
      )
    })

    it('Check Password with numbers only', () => {
      cy.get('#signupPassword').type('012345678987654')
      cy.get('#signupPassword').blur()
      cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should(
        'have.text',
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
      )
    })

    it('Check empty input', () => {
      cy.get('#signupPassword').focus().blur()
      cy.get('.invalid-feedback').should('have.text', 'Password required')
    })
  })
})
// ----------------------------------------------------------------------------------------------------------------- //
describe('Sign Up Form. Re-enter password field validation', () => {
  context('Positive cases', () => {
    it('Check a Valid Passwords Match', () => {
      cy.get('#signupPassword').type('PassTes1')
      cy.get('#signupRepeatPassword').type('PassTes1')
      cy.contains('Passwords do not match').should('not.exist')
      cy.get('#signupRepeatPassword').should('have.attr', 'class', 'form-control ng-untouched ng-dirty ng-valid') // I keep it fo checking that state on valid status is present also. Correct me if no it's unnecessary
      cy.get('#signupRepeatPassword').blur()
    })
  })
  context('Negative cases', () => {
    it('Check Password Value Mismatch', () => {
      cy.get('#signupPassword').type('PassTes1')
      cy.get('#signupRepeatPassword').type('PassTes123').blur()
      cy.get('#signupRepeatPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should('have.text', 'Passwords do not match')
    })

    it('Check Password Case Symbol Mismatch', () => {
      cy.get('#signupPassword').type('Abcdef1gG')
      cy.get('#signupRepeatPassword').type('Abcdef1g').blur()
      cy.get('#signupRepeatPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.contains('Passwords do not match').should('exist')
      cy.get('.invalid-feedback').should('have.text', 'Passwords do not match')
    })

    it('Check empty input', () => {
      cy.get('#signupRepeatPassword').focus().blur()
      cy.get('#signupRepeatPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should('have.text', 'Re-enter password required')
    })
  })
})
// --------------------------------------------------------------------------------------------------------------- //
describe('Successful Sign Up. Functional testing', () => {
  context('Positive cases', () => {
    it('Check that button enabled when form fields data are valid', () => {
      cy.get('#signupName').type('Go')
      cy.get('#signupLastName').type('LENGTHtestMOREsymbol')
      cy.get('#signupEmail').type('razorbackrightnow+1@gmail.com')
      cy.get('#signupPassword').type('qweQWE123')
      cy.get('#signupRepeatPassword').type('qweQWE123')
      cy.get('.modal-footer button').should('have.text', 'Register').and('not.be.disabled')
    })
    it('Check progressive validation (fill field-by-field validly)', () => {
      cy.get('#signupName').type('Go')
      cy.get('#signupLastName').type('LENGTHtestMOREsymbol')
      cy.get('#signupEmail').type('razorbackrightnow+1@gmail.com')
      cy.get('#signupPassword').type('qweQWE123')
      cy.get('#signupRepeatPassword').type('qweQWE123')
      cy.get('.modal-footer button').should('have.text', 'Register').and('not.be.disabled')
    })

    it('Check successful Sign Up', () => {
      const uniqueEmail = `alias_${Date.now()}@example.com`

      cy.intercept('POST', '/api/auth/signup').as('suRequest')
      cy.get('#signupName').type('Go')
      cy.get('#signupLastName').type('LENGTHtestMOREsymbol')
      cy.get('#signupEmail').type(uniqueEmail)
      cy.get('#signupPassword').type('qweQWE123')
      cy.get('#signupRepeatPassword').type('qweQWE123')
      cy.get('.modal-footer button').should('have.text', 'Register').and('not.be.disabled').click()
      cy.wait('@suRequest').its('response.statusCode').should('eq', 201)
      cy.url().should('eq', 'https://qauto.forstudy.space/panel/garage')
    })
  })

  context('Negative cases', () => {
    it('Check that button disabled when at least input is filled invalidly', () => {
      cy.get('#signupName').type('Go')
      cy.get('#signupLastName').type('LENGTHtestMOREsymbol')
      cy.get('#signupEmail').type('razorbackrightnow+1gmail.com')
      cy.get('#signupPassword').type('qweQWE123')
      cy.get('#signupRepeatPassword').type('qweQWE123')
      cy.get('.modal-footer button').should('have.text', 'Register').and('be.disabled')
    })

    it('Check Empty Fields Sign Up', () => {
      cy.get('#signupName').focus()
      cy.get('#signupLastName').focus()
      cy.get('#signupEmail').focus()
      cy.get('#signupPassword').focus()
      cy.get('#signupRepeatPassword').focus()
      cy.get('#signupRepeatPassword').blur()
      cy.get('.modal-footer button').should('have.text', 'Register').and('be.disabled')
    })

    it('Check sign-up with already registered email', () => {
      cy.intercept('POST', '/api/auth/signup').as('signupRequest')
      cy.get('#signupName').type('Go')
      cy.get('#signupLastName').type('LENGTHtestMOREsymbol')
      cy.get('#signupEmail').type('razorbackrightnow@gmail.com')
      cy.get('#signupPassword').type('qweQWE123')
      cy.get('#signupRepeatPassword').type('qweQWE123')
      cy.get('.modal-footer button').should('have.text', 'Register').and('not.be.disabled').click()
      cy.wait('@signupRequest').its('response.statusCode').should('eq', 400)
      cy.contains('User already exist').should('be.visible')
    })
  })
})
