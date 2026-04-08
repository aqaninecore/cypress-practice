/// <reference types="cypress" />

import SignInForm from '../../pom/forms/SignInForm'
import HomePage from '../../pom/pages/HomePage'
import users from '../../fixtures/users.json'
import GaragePage from '../../pom/pages/GaragePage'
import AddACarForm from '../../pom/forms/AddACarForm'
import GaragePageElements from '../../pom/pages/GaragePageElements'
import AddAnExpenseForm from '../../pom/forms/AddAnExpenseForm'
import RemoveCarForm from '../../pom/forms/RemoveCarForm'
import EditACarForm from '../../pom/forms/EditACarForm'
import FuelExpensesPage from '../../pom/pages/FuelExpensesPage'

beforeEach(() => {
  HomePage.visit()
  HomePage.openSignInForm()
  SignInForm.login(users.correctUser.email, users.correctUser.password)
  GaragePage.pageTitle.should('have.text', 'Garage')
  GaragePage.logInAlert.should('be.visible')
})

describe('Cars management', () => {
  context('Garage. Positive scenario', () => {
    after(() => {
      GaragePage.pageTitle.should('have.text', 'Garage')
      GaragePage.logInAlert.should('be.visible')
      GaragePageElements.clickCarEditButton()
      EditACarForm.clickRemoveCarButton()
      RemoveCarForm.clickRemoveButton()
      GaragePage.carRemovedAlert.should('be.visible')
    })
    context('Add cars', () => {
      it('Add first car', () => {
        GaragePage.openAddACarForm()
        AddACarForm.addCarBrand()
        AddACarForm.addCarModel()
        const mileage = Cypress._.random(10, 50)
        AddACarForm.addMileage(mileage)
        AddACarForm.clickAddButton()
        GaragePage.carAddedAlert.should('be.visible')
      })

      it('Add second car', () => {
        GaragePage.openAddACarForm()
        AddACarForm.addCarBrand()
        AddACarForm.addCarModel()
        const mileage = Cypress._.random(10, 50)
        AddACarForm.addMileage(mileage)
        AddACarForm.clickAddButton()
        GaragePage.carAddedAlert.should('be.visible')
      })

      it('Add third car', () => {
        GaragePage.openAddACarForm()
        AddACarForm.addCarBrand()
        AddACarForm.addCarModel()
        const mileage = Cypress._.random(10, 50)
        AddACarForm.addMileage(mileage)
        AddACarForm.clickAddButton()
        GaragePage.carAddedAlert.should('be.visible')
      })

      it('Update mileage for first car in the list', () => {
        const mileage = Cypress._.random(50, 100)
        GaragePageElements.updateMileage(mileage)
        GaragePageElements.clickUpdateMileageButton()
        GaragePage.mileageUpdatedAlert.should('be.visible')
      })

      it('Add fuel expenses for first car', () => {
        GaragePageElements.clickAddFuelExpenseButton()
        const liter = Cypress._.random(10, 50)
        AddAnExpenseForm.addNumberOfLiters(liter)
        const sum = Cypress._.random(20, 80)
        AddAnExpenseForm.addTotalCost(sum)
        AddAnExpenseForm.clickAddButton()
        FuelExpensesPage.fuelExpenseAddedAlert.should('be.visible')
      })

      it('Edit a car', () => {
        GaragePageElements.clickCarEditButton()
        EditACarForm.addCarBrand()
        EditACarForm.addCarModel()
        EditACarForm.addMileagePlusOne()
        const today = new Date().toISOString().split('T')[0]
        EditACarForm.addCarCreationDate(today)
        EditACarForm.clickAddButton()
        EditACarForm.carUpdatedAlert.should('be.visible')
      })
    })
  })

  context('Garage. Negative scenario', () => {
    after(() => {
      GaragePage.pageTitle.should('have.text', 'Garage')
      GaragePage.logInAlert.should('be.visible')
      GaragePageElements.clickCarEditButton()
      EditACarForm.clickRemoveCarButton()
      RemoveCarForm.clickRemoveButton()
      GaragePage.carRemovedAlert.should('be.visible')
    })
    context('Add cars', () => {
      it('Edit A Car form. Decrease & Save mileage value', () => {
        GaragePageElements.clickCarEditButton()
        EditACarForm.addMileageMinusOne()
        const today = new Date().toISOString().split('T')[0]
        EditACarForm.addCarCreationDate(today)
        EditACarForm.clickAddButton()
        EditACarForm.lessMileageEntryAlert.should('be.visible')
      })

      it('Edit An Expense form. Check input validation with LESS boundary', () => {
        GaragePageElements.clickAddFuelExpenseButton()
        AddAnExpenseForm.addLessLiters()
        AddAnExpenseForm.numberOfLitersInput.blur()
        AddAnExpenseForm.litersAlert.should('be.visible')
        AddAnExpenseForm.addButton.should('be.disabled')
      })

      it('Edit An Expense form. Check input validation with MORE boundary', () => {
        GaragePageElements.clickAddFuelExpenseButton()
        AddAnExpenseForm.addMoreLiters()
        AddAnExpenseForm.numberOfLitersInput.blur()
        AddAnExpenseForm.litersAlert.should('be.visible')
        AddAnExpenseForm.addButton.should('be.disabled')
      })

      it('Edit An Expense form. Check EMPTY liters input validation', () => {
        GaragePageElements.clickAddFuelExpenseButton()
        AddAnExpenseForm.numberOfLitersInput.focus()
        AddAnExpenseForm.numberOfLitersInput.blur()
        AddAnExpenseForm.litersEmptyAlert.should('be.visible')
        AddAnExpenseForm.addButton.should('be.disabled')
      })

      it('Edit An Expense form. Check input validation with LESS total cost', () => {
        GaragePageElements.clickAddFuelExpenseButton()
        AddAnExpenseForm.addLessCost()
        AddAnExpenseForm.totalCostInput.blur()
        AddAnExpenseForm.costAlert.should('be.visible')
        AddAnExpenseForm.addButton.should('be.disabled')
      })

      it('Edit An Expense form. Check input validation with MORE total cost', () => {
        GaragePageElements.clickAddFuelExpenseButton()
        AddAnExpenseForm.addMoreCost()
        AddAnExpenseForm.totalCostInput.blur()
        AddAnExpenseForm.costAlert.should('be.visible')
        AddAnExpenseForm.addButton.should('be.disabled')
      })

      it('Edit An Expense form. Check EMPTY total cost input validation', () => {
        GaragePageElements.clickAddFuelExpenseButton()
        AddAnExpenseForm.totalCostInput.focus()
        AddAnExpenseForm.totalCostInput.blur()
        AddAnExpenseForm.costEmptyAlert.should('be.visible')
        AddAnExpenseForm.addButton.should('be.disabled')
        AddAnExpenseForm.clickCloseButton()
      })
    })
  })
})
