/// <reference types="cypress" />

import SignInForm from '../../pom/forms/SignInForm'
import HomePage from '../../pom/pages/HomePage'
import users from '../../fixtures/users.json'
import GaragePage from '../../pom/pages/GaragePage'
import AddACarForm from '../../pom/forms/AddACarForm'
import GaragePageElements from '../../pom/pages/GaragePageElements'
import EditACarForm from '../../pom/forms/EditACarForm'
import RemoveCarForm from '../../pom/forms/RemoveCarForm'

beforeEach(() => {
  HomePage.visit()
  HomePage.openSignInForm()
  SignInForm.login(users.correctUser1.email, users.correctUser1.password)
  GaragePage.pageTitle.should('have.text', 'Garage')
  GaragePage.logInAlert.should('be.visible')
})

describe('Cars management', () => {
  context('Check cars limit validation', () => {
    after(() => {
      const deleteAllCars = () => {
        cy.get('body').then(($body) => {
          const editButtons = $body.find('.car_edit.btn.btn-edit')

          if (!editButtons.length) {
            return
          }

          GaragePageElements.clickCarEditButton()
          EditACarForm.clickRemoveCarButton()
          RemoveCarForm.clickRemoveButton()
          GaragePage.carRemovedAlert.should('be.visible')

          deleteAllCars()
        })
      }

      deleteAllCars()
    })

    const carsCount = 27

    Array.from({ length: carsCount }).forEach((_, index) => {
      it(`Add car #${index + 1}`, () => {
        GaragePage.openAddACarForm()
        AddACarForm.addCarBrand()
        cy.wait(100)
        AddACarForm.addCarModel()

        const mileage = Cypress._.random(50, 500)
        cy.log(`Adding car with mileage: ${mileage}`)

        AddACarForm.addMileage(mileage)
        AddACarForm.clickAddButton()

        if (index < 25) {
          GaragePage.carAddedAlert.should('be.visible')
        } else {
          AddACarForm.carsLimitReachedAlert.should('be.visible')
        }
      })
    })
  })
})
