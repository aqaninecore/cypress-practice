/// <reference types="cypress" />

import SignInForm from '../../pom/forms/SignInForm'
import HomePage from '../../pom/pages/HomePage'
import users from '../../fixtures/users.json'
import GaragePage from '../../pom/pages/GaragePage'

describe('Sign In form', () => {
  beforeEach(() => {
    HomePage.visit()
    cy.pause()
    cy.get('h1').debug()
    HomePage.openSignInForm()
  })
  context('Sign In process', () => {
    it.only('Success Sign In', () => {
      SignInForm.login(users.correctUser1.email, users.correctUser1.password)
      GaragePage.pageTitle.should('have.text', 'Garage')
    })
    it('Invalid password', () => {
      SignInForm.login('rrffdg34now@gmail.com', 'Bdffs3dgafg55')
      SignInForm.verifyWrongDataErrorMessage('Wrong email or password')
    })

    it('Invalid email & password', () => {
      SignInForm.login('r1dfssd65tnow@gmail.com', 'asdSgan12345')
      SignInForm.verifyWrongDataErrorMessage('Wrong email or password')
    })
  })

  context('Email validation', () => {
    it('Empty Email', () => {
      SignInForm.triggerErrorOnField(SignInForm.emailField)
      SignInForm.verifyWrongInputErrorMessage('Email required')
    })

    it('Incorrect Email', () => {
      cy.get('#signinEmail').type('fgfdgsf')
      SignInForm.triggerErrorOnField(SignInForm.emailField)
      SignInForm.verifyWrongInputErrorMessage('Email is incorrect')
    })
  })

  context('Password validation', () => {
    it('Empty Password', () => {
      SignInForm.triggerErrorOnField(SignInForm.passwordField)
      SignInForm.verifyWrongInputErrorMessage('Password required')
    })
  })
})
