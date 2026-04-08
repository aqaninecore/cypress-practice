/// <reference types="cypress" />

import SignInForm from '../../pom/forms/SignInForm'
import HomePage from '../../pom/pages/HomePage'
import users from '../../fixtures/users.json'
import GaragePage from '../../pom/pages/GaragePage'

describe('Sign In Form', () => {
  context('Sign In process', () => {
    it.only('Success sign in', () => {
      let response = {
        status: 'ok',
        data: [
          {
            id: 485975,
            carBrandId: 2,
            carModelId: 8,
            initialMileage: 1000,
            updatedMileageAt: '2026-02-26T17:42:00.000Z',
            carCreatedAt: '2026-02-26T17:42:00.000Z',
            mileage: 1000,
            brand: 'BMW',
            model: 'X5',
            logo: 'bmw.png',
          },
        ],
      }
      cy.intercept('GET', '/api/cars', response)
      //cy.intercept('GET', '/api/cars', response).as('carsResp')
      HomePage.visit()
      HomePage.openSignInForm()
      SignInForm.login(users.correctUser.email, users.correctUser.password)
      // cy.wait('@carsResp').then((resp) => {
      //   cy.log(JSON.stringify(resp))
      // })
      GaragePage.pageTitle.should('have.text', 'Garage')
    })
  })
})
