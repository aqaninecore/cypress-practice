/// <reference types="cypress" />

// FIELD 'Name'
// 1. check empty field -> Name is required --------------
// 2. check special chars -> Name is invalid --------------
// 3. check input with 1 symbol -> [text from screenshot] --------------
// 4. check input with 21 symbol -> [text from screenshot] --------------
// 5. check CSS trigger -> border color --------------
// 6. check in cyrillic -> Name is invalid --------------
// 7. check numbers -> Name is invalid --------------
// 8. check valid input with 2 symbols --------------
// 9. check valid input with 10 symbols --------------
// 10. check valid input with 20 symbols --------------
// 11. check spaces input -> Name is invalid --------------
// 12. check CSS trigger when valid input-> border color back to default --------

// FIELD 'Last name'
// same 12 from the suite above --------

// FIELD 'Email'
// 1. check valid email input --------
// 2. check empty input -> Email required --------
// 3. check input missing '@' -> Email is incorrect --------
// 4. check missing domain -> Email is incorrect --------
// 5. check invalid format [@gmail.com] -> Email is incorrect --------
// 6. check with spaces -> Email is incorrect --------
// 7. check emails with subdomains --------
// 8. check CSS trigger -> border color --------
// 9. check CSS trigger when valid input-> border color back to default --------

// FIELD 'Password'
// 1. Valid password (boundary 8) --------
// 2. Valid password (boundary 15) --------
// 3. check empty input -> Password is required --------
// 4. check less then 8 chars -> [text from screenshot] --------
// 5. check more then 15 chars -> [text from screenshot] --------
// 6. check no uppercase --------
// 7. check no lowercase --------
// 8. check no numbers --------
// 9. check only numbers --------
// 10. check CSS trigger -> border color --------
// 11. check CSS trigger when valid input-> border color back to default --------
// 12. Valid password (boundary 10) --------
// 13. Valid password with spaces (based on requirements) --------

// FIELD 'Re-enter password'
// 1. check a 'password match' flow --------
// 2. check empty input -> Re-enter password is required --------
// 3. check a 'password value mismatch' flow --------
// 4. check a 'case mismatch' flow --------

// SUCCESSFUL REGISTRATION
// 1. check that button enabled when form fields data are valid --------
// 2. check successful sign-up (use API-call status / success msg?)
// 3. check that button disabled when form fields data is invalid at least at one i.f. --------
// 4. check progressive validation (fill field-by-field validly) --------
// 5. check when sign up with all empty fields (validation error) --------
// 6. check sign-up with already registered email (validation error) --------

beforeEach(() => {
  cy.visit('/')
  cy.get('header')
  cy.get('.btn.btn-outline-white.header_signin').click()
  cy.get('.modal-footer').children().eq(0).click()
})

describe('Sign Up Form. Name field validation', () => {
  context('Positive cases', () => {
    it('Check valid input with 2 symbols', () => {
      cy.get('#signupName').type('Go', { delay: 100 })
      cy.get('#signupName').should('have.css', 'border-color', 'rgb(92, 179, 253)').focus()
      //     cy.get('#signupName').should('have.attr', 'class', 'form-control ng-touched ng-dirty ng-valid')
      cy.get('#signupName').clear()
    })

    it('Check valid input with 10 symbols', () => {
      cy.get('#signupName').type('LENGTHtest', { delay: 100 })
      cy.get('#signupName').should('have.css', 'border-color', 'rgb(92, 179, 253)')
      cy.get('#signupName').clear()
    })

    it('Check valid input with 20 symbols', () => {
      cy.get('#signupName').type('LENGTHtestMOREsymbol', { delay: 100 })
      cy.get('#signupName').should('have.css', 'border-color', 'rgb(92, 179, 253)')
      cy.get('#signupName').clear()
    })
  })

  context('Negative cases', () => {
    it('Check input validation with 1 symbol', () => {
      cy.get('#signupName').type('G', { delay: 100 })
      cy.get('#signupName').blur()
      cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should('have.text', 'Name has to be from 2 to 20 characters long')
      cy.get('#signupName').clear()
    })

    it('Check input validation with 21 symbol', () => {
      cy.get('#signupName').type('LENGTHtestMOREsymbols', { delay: 100 })
      cy.get('#signupName').blur()
      cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should('have.text', 'Name has to be from 2 to 20 characters long')
      cy.get('#signupName').clear()
    })

    it('Check input validation with special characters', () => {
      cy.get('#signupName').type('!@#$%^', { delay: 100 })
      cy.get('#signupName').blur()
      cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should('have.text', 'Name is invalid')
      cy.get('#signupName').clear()
    })

    it('Check input validation with Cyrillic characters', () => {
      cy.get('#signupName').type('ТестЮзер', { delay: 100 })
      cy.get('#signupName').blur()
      cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should('have.text', 'Name is invalid')
      cy.get('#signupName').clear()
    })

    it('Check input validation with digits', () => {
      cy.get('#signupName').type('123456', { delay: 100 })
      cy.get('#signupName').blur()
      cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should('have.text', 'Name is invalid')
      cy.get('#signupName').clear()
    })

    it('Check input validation with spaces', () => {
      cy.get('#signupName').type('    ', { delay: 100 })
      cy.get('#signupName').blur()
      cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should('have.text', 'Name is invalid')
      cy.get('#signupName').clear()
    })

    it('Check empty input', () => {
      cy.get('#signupName').focus().blur()
      cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should('have.text', 'Name is required')
    })
  })
})
// -----------------------------------------------------------------------------------------------------------------//
describe('Sign Up Form. Last name field validation', () => {
  context('Positive cases', () => {
    it('Check valid input with 2 symbols', () => {
      cy.get('#signupLastName').type('Go', { delay: 100 })
      cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(92, 179, 253)')
      cy.get('#signupLastName').clear()
    })

    it('Check valid input with 10 symbols', () => {
      cy.get('#signupLastName').type('LENGTHtest', { delay: 100 })
      cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(92, 179, 253)')
      cy.get('#signupLastName').clear()
    })

    it('Check valid input with 20 symbols', () => {
      cy.get('#signupLastName').type('LENGTHtestMOREsymbol', { delay: 100 })
      cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(92, 179, 253)')
      cy.get('#signupLastName').clear()
    })
  })

  context('Negative cases', () => {
    it('Check input validation with 1 symbol', () => {
      cy.get('#signupLastName').type('G', { delay: 100 })
      cy.get('#signupLastName').blur()
      cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should('have.text', 'Last name has to be from 2 to 20 characters long')
      cy.get('#signupLastName').clear()
    })

    it('Check input validation with 21 symbol', () => {
      cy.get('#signupLastName').type('LENGTHtestMOREsymbols', { delay: 100 })
      cy.get('#signupLastName').blur()
      cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should('have.text', 'Last name has to be from 2 to 20 characters long')
      cy.get('#signupLastName').clear()
    })

    it('Check input validation with special characters', () => {
      cy.get('#signupLastName').type('!@#$%^', { delay: 100 })
      cy.get('#signupLastName').blur()
      cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should('have.text', 'Last name is invalid')
      cy.get('#signupLastName').clear()
    })

    it('Check input validation with Cyrillic characters', () => {
      cy.get('#signupLastName').type('ТестЮзер', { delay: 100 })
      cy.get('#signupLastName').blur()
      cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should('have.text', 'Last name is invalid')
      cy.get('#signupLastName').clear()
    })

    it('Check input validation with digits', () => {
      cy.get('#signupLastName').type('123456', { delay: 100 })
      cy.get('#signupLastName').blur()
      cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should('have.text', 'Last name is invalid')
      cy.get('#signupLastName').clear()
    })

    it('Check input validation with spaces', () => {
      cy.get('#signupLastName').type('    ', { delay: 100 })
      cy.get('#signupLastName').blur()
      cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should('have.text', 'Last name is invalid')
      cy.get('#signupLastName').clear()
    })

    it('Check empty input', () => {
      cy.get('#signupLastName').focus().blur()
      cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should('have.text', 'Last name is invalid')
    })
  })
})
// -----------------------------------------------------------------------------------------------------------------//
describe('Sign Up Form. Email field validation', () => {
  context('Positive cases', () => {
    it('Check valid Email input', () => {
      cy.get('#signupEmail').type('!testUser123@gmail.com', { delay: 100 }).focus()
      cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(92, 179, 253)')
      cy.get('#signupEmail').clear()
    })

    it('Check valid Email input with subdomain', () => {
      cy.get('#signupEmail').type('!testUser123@gmail.com', { delay: 100 })
      cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(92, 179, 253)')
      cy.get('#signupEmail').clear()
    })
  })
  context('Negative cases', () => {
    it('Check with missing @ input', () => {
      cy.get('#signupEmail').type('!testUser123gmail.com', { delay: 100 })
      cy.get('#signupEmail').blur()
      cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should('have.text', 'Email is incorrect')
      cy.get('#signupEmail').clear()
    })

    it('Check with missing domain', () => {
      cy.get('#signupEmail').type('!testUser123@', { delay: 100 })
      cy.get('#signupEmail').blur()
      cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should('have.text', 'Email is incorrect')
      cy.get('#signupEmail').clear()
    })

    it('Check with invalid format', () => {
      cy.get('#signupEmail').type('@gmail.com', { delay: 100 })
      cy.get('#signupEmail').blur()
      cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should('have.text', 'Email is incorrect')
      cy.get('#signupEmail').clear()
    })

    it('Check input validation with spaces', () => {
      cy.get('#signupEmail').type('te st@mail.com', { delay: 100 })
      cy.get('#signupEmail').blur()
      cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should('have.text', 'Email is incorrect')
      cy.get('#signupEmail').clear()
    })

    it('Check empty input', () => {
      cy.get('#signupEmail').focus().blur()
      cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should('have.text', 'Email required')
    })
  })
})
// -----------------------------------------------------------------------------------------------------------------//
describe('Sign Up Form. Password field validation', () => {
  context('Positive cases', () => {
    it('Check valid Password input. Boundary 8', () => {
      cy.get('#signupPassword')
        .type('PassTes1', { delay: 100 })
        .should('be.focused')
        .and(($el) => {
          const boxShadow = $el.css('box-shadow')
          expect(boxShadow).to.not.equal('none')
        })
      cy.get('#signupPassword').blur()
      cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(206, 212, 218)')
      cy.get('#signupPassword').clear()
    })

    it('Check valid Password input. Boundary 10', () => {
      cy.get('#signupPassword')
        .type('PassTes12', { delay: 100 })
        .should('be.focused')
        .and(($el) => {
          const boxShadow = $el.css('box-shadow')
          expect(boxShadow).to.not.equal('none')
        })
      cy.get('#signupPassword').blur()
      cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(206, 212, 218)')
      cy.get('#signupPassword').clear()
    })

    it('Check valid Password input. Boundary 15', () => {
      cy.get('#signupPassword')
        .type('PassTest1234567', { delay: 100 })
        .should('be.focused')
        .and(($el) => {
          const boxShadow = $el.css('box-shadow')
          expect(boxShadow).to.not.equal('none')
        })
      cy.get('#signupPassword').blur()
      cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(206, 212, 218)')
      cy.get('#signupPassword').clear()
    })

    it('Check valid Password input with spaces', () => {
      cy.get('#signupPassword')
        .type('PassTest 34567 ', { delay: 100 })
        .should('be.focused')
        .and(($el) => {
          const boxShadow = $el.css('box-shadow')
          expect(boxShadow).to.not.equal('none')
        })
      cy.get('#signupPassword').blur()
      cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(206, 212, 218)')
      cy.get('#signupPassword').clear()
    })
  })

  context('Negative cases', () => {
    it('Check Password with less then 8 chars', () => {
      cy.get('#signupPassword').type('PassTes', { delay: 100 })
      cy.get('#signupPassword').blur()
      cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should(
        'have.text',
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
      )
      cy.get('#signupPassword').clear()
    })

    it('Check Password with more then 15 chars', () => {
      cy.get('#signupPassword').type('!te stUser123@14', { delay: 100 })
      cy.get('#signupPassword').blur()
      cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should(
        'have.text',
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
      )
      cy.get('#signupPassword').clear()
    })

    it('Check Password without uppercase', () => {
      cy.get('#signupPassword').type('passtes1', { delay: 100 })
      cy.get('#signupPassword').blur()
      cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should(
        'have.text',
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
      )
      cy.get('#signupPassword').clear()
    })

    it('Check Password without lowercase', () => {
      cy.get('#signupPassword').type('PASSTES1', { delay: 100 })
      cy.get('#signupPassword').blur()
      cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should(
        'have.text',
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
      )
      cy.get('#signupPassword').clear()
    })

    it('Check Password without numbers', () => {
      cy.get('#signupPassword').type('PassTestNoDigit', { delay: 100 })
      cy.get('#signupPassword').blur()
      cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should(
        'have.text',
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
      )
      cy.get('#signupPassword').clear()
    })

    it('Check Password with numbers only', () => {
      cy.get('#signupPassword').type('012345678987654', { delay: 100 })
      cy.get('#signupPassword').blur()
      cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should(
        'have.text',
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
      )
      cy.get('#signupPassword').clear()
    })

    it('Check empty input', () => {
      cy.get('#signupPassword').focus().blur()
      cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should('have.text', 'Password required')
    })
  })
})
// ----------------------------------------------------------------------------------------------------------------- //
describe('Sign Up Form. Re-enter password field validation', () => {
  context('Positive cases', () => {
    it('Check a Valid Passwords Match', () => {
      cy.get('#signupPassword').type('PassTes1', { delay: 100 })
      cy.get('#signupRepeatPassword').type('PassTes1', { delay: 100 }).should('be.focused')
      cy.contains('Passwords do not match').should('not.exist')
      cy.get('#signupRepeatPassword').should('have.attr', 'class', 'form-control ng-untouched ng-dirty ng-valid')
      cy.get('#signupRepeatPassword').blur()
      cy.get('#signupRepeatPassword').should('have.css', 'border-color', 'rgb(206, 212, 218)')
      cy.get('#signupRepeatPassword').clear()
    })
  })
  context('Negative cases', () => {
    it('Check Password Value Mismatch', () => {
      cy.get('#signupPassword').type('PassTes1', { delay: 100 })
      cy.get('#signupRepeatPassword').type('PassTes123', { delay: 100 }).blur()
      cy.get('#signupRepeatPassword').should(
        'have.attr',
        'class',
        'form-control ng-touched ng-dirty ng-valid is-invalid',
      )
      cy.get('#signupRepeatPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should('have.text', 'Passwords do not match')
      cy.wait(300)
      cy.get('#signupRepeatPassword').clear()
    })

    it('Check Password Case Symbol Mismatch', () => {
      cy.get('#signupPassword').type('Abcdef1gG', { delay: 100 })
      cy.get('#signupRepeatPassword').type('Abcdef1g', { delay: 100 }).should('be.focused')
      cy.get('#signupRepeatPassword').blur()
      cy.contains('Passwords do not match').should('exist')
      cy.get('#signupRepeatPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)')
      cy.get('.invalid-feedback').should('have.text', 'Passwords do not match')
      cy.get('#signupRepeatPassword').clear()
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
      cy.get('.modal-footer button').should('have.text', 'Register').and('be.disabled')
      cy.get('#signupName').type('Go')
      cy.get('#signupLastName').type('LENGTHtestMOREsymbol')
      cy.get('#signupEmail').type('razorbackrightnow+1@gmail.com')
      cy.get('#signupPassword').type('qweQWE123')
      cy.get('#signupRepeatPassword').type('qweQWE123')
      cy.get('.modal-footer button').should('have.text', 'Register').and('not.be.disabled')
    })
    it('Check progressive validation (fill field-by-field validly)', () => {
      cy.get('.modal-footer button').should('have.text', 'Register').and('be.disabled')
      cy.get('#signupName').type('Go', { delay: 100 })
      cy.get('#signupLastName').type('LENGTHtestMOREsymbol', { delay: 100 })
      cy.get('#signupEmail').type('razorbackrightnow+1@gmail.com', { delay: 100 })
      cy.get('#signupPassword').type('qweQWE123', { delay: 100 })
      cy.get('#signupRepeatPassword').type('qweQWE123', { delay: 100 })
      cy.get('.modal-footer button').should('have.text', 'Register').and('not.be.disabled')
    })

    it('Check successful Sign Up', () => {
      cy.intercept('POST', '/api/auth/signup').as('suRequest')
      cy.get('.modal-footer button').should('have.text', 'Register').and('be.disabled')
      cy.get('#signupName').type('Go')
      cy.get('#signupLastName').type('LENGTHtestMOREsymbol')
      cy.get('#signupEmail').type('razorbackrightnow+6@gmail.com') // regenerate alias each run
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
      cy.get('#signupRepeatPassword').clear()
      cy.get('.modal-footer button').should('have.text', 'Register').and('be.disabled')
    })

    it('Check sign-up with already registered email', () => {
      cy.intercept('POST', '/api/auth/signup').as('signupRequest')
      cy.get('.modal-footer button').should('have.text', 'Register').and('be.disabled')
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
