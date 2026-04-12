/// <reference types="cypress" />

import SignInForm from '../../pom/forms/SignInForm'
import HomePage from '../../pom/pages/HomePage'
import users from '../../fixtures/users.json'
import GaragePage from '../../pom/pages/GaragePage'
import ProfilePage from '../../pom/pages/ProfilePage'

describe('Sign In Form', () => {
  context('Sign In process', () => {
    it('Success sign in', () => {
      const response = {
        status: 'ok',
        data: { lastName: 'Bear', name: 'Polar', photoFilename: 'default-user.png', userId: 328349 },
      }
      cy.intercept('GET', '/api/users/profile', response).as('profileResp')
      HomePage.visit()
      HomePage.openSignInForm()
      SignInForm.login(users.correctUser.email, users.correctUser.password)
      GaragePage.pageTitle.should('have.text', 'Garage')
      ProfilePage.openProfileTab()
      cy.wait('@profileResp').then((resp) => {
        cy.log(JSON.stringify(resp))
        expect(resp.response.statusCode).to.eq(200)
        expect(resp.response.body).to.deep.equal(response)
      })
      ProfilePage.profileName.should('have.text', `${response.data.name} ${response.data.lastName}`)
    })
  })
})
