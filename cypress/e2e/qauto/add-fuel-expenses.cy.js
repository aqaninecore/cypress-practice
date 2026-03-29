/// <reference types="cypress" />

import HomePage from '../../pom/pages/HomePage'
import SignInForm from '../../pom/forms/SignInForm'
import users from '../../fixtures/users.json'
import FuelExpensesPage from '../../pom/pages/FuelExpensesPage'
import GaragePage from '../../pom/pages/GaragePage'
import AddAnExpenseForm from '../../pom/forms/AddAnExpenseForm'
import EditAnExpenseForm from '../../pom/forms/EditAnExpenseForm'
import RemoveEntryForm from '../../pom/forms/RemoveEntryForm'

beforeEach(() => {
  HomePage.visit()
  HomePage.openSignInForm()
  SignInForm.login(users.correctUser1.email, users.correctUser1.password)
  FuelExpensesPage.goToFuelExpensesSection()
  FuelExpensesPage.pageTitle.should('have.text', 'Fuel expenses')
  GaragePage.logInAlert.should('be.visible')
})

describe('Fuel expenses management', () => {
  after(() => {
    HomePage.visit()
    FuelExpensesPage.goToFuelExpensesSection()
    FuelExpensesPage.pageTitle.should('have.text', 'Fuel expenses')
    FuelExpensesPage.clickTriggerDeleteModalButton()
    RemoveEntryForm.clickRemoveButton()
    FuelExpensesPage.fuelExpenseRemovedAlert.should('be.visible')
    FuelExpensesPage.clickCarSelectorDropdown()
    FuelExpensesPage.clickSecondCarSelectorDropdownItem()
    FuelExpensesPage.clickTriggerDeleteModalButton()
    RemoveEntryForm.clickRemoveButton()
    FuelExpensesPage.fuelExpenseRemovedAlert.should('be.visible')
  })
  context.only('Fuel Expenses. Positive scenario', () => {
    context('Add fuel expenses', () => {
      it('Add fuel expense for first car via button', () => {
        FuelExpensesPage.clickAddAnExpenseButton()
        cy.wait(100)
        AddAnExpenseForm.addMileagePlusOne()
        const liter = Cypress._.random(10, 50)
        AddAnExpenseForm.addNumberOfLiters(liter)
        const price = Cypress._.random(5, 50)
        AddAnExpenseForm.addTotalCost(price)
        AddAnExpenseForm.clickAddButton()
        FuelExpensesPage.fuelExpenseAddedAlert.should('be.visible')
      })

      it('Edit fuel expense for first car via Edit icon', () => {
        FuelExpensesPage.clickTriggerEditAnExpenseFormButton()
        const liter = Cypress._.random(10, 50)
        EditAnExpenseForm.addNumberOfLiters(liter)
        const price = Cypress._.random(5, 50)
        EditAnExpenseForm.addTotalCost(price)
        EditAnExpenseForm.clickSaveButton()
        FuelExpensesPage.fuelExpenseEditedAlert.should('be.visible')
      })

      it('Add fuel expense for second car via button', () => {
        FuelExpensesPage.clickCarSelectorDropdown()
        FuelExpensesPage.clickSecondCarSelectorDropdownItem()
        FuelExpensesPage.clickAddAnExpenseButton()
        cy.wait(100)
        AddAnExpenseForm.addMileagePlusOne()
        const liter = Cypress._.random(10, 50)
        AddAnExpenseForm.addNumberOfLiters(liter)
        const price = Cypress._.random(5, 50)
        AddAnExpenseForm.addTotalCost(price)
        AddAnExpenseForm.clickAddButton()
        FuelExpensesPage.fuelExpenseAddedAlert.should('be.visible')
      })

      it('Edit fuel expense for second car via Edit icon', () => {
        FuelExpensesPage.clickCarSelectorDropdown()
        FuelExpensesPage.clickSecondCarSelectorDropdownItem()
        FuelExpensesPage.clickTriggerEditAnExpenseFormButton()
        cy.wait(100)
        AddAnExpenseForm.addMileagePlusOne()
        const liter = Cypress._.random(10, 50)
        EditAnExpenseForm.addNumberOfLiters(liter)
        const price = Cypress._.random(5, 50)
        EditAnExpenseForm.addTotalCost(price)
        EditAnExpenseForm.clickSaveButton()
        FuelExpensesPage.fuelExpenseEditedAlert.should('be.visible')
      })
    })
  })

  context('Fuel Expenses. Negative scenario', () => {
    context('Add fuel expenses', () => {
      it('Add fuel expense with empty fields', () => {
        FuelExpensesPage.clickAddAnExpenseButton()
        AddAnExpenseForm.addButton.should('be.disabled')
      })

      it('Edit An Expense form. Check input validation with LESS boundary', () => {
        FuelExpensesPage.clickAddAnExpenseButton()
        AddAnExpenseForm.addLessLiters()
        AddAnExpenseForm.numberOfLitersInput.blur()
        AddAnExpenseForm.litersAlert.should('be.visible')
        AddAnExpenseForm.addButton.should('be.disabled')
      })

      it('Edit An Expense form. Check input validation with MORE total cost', () => {
        FuelExpensesPage.clickAddAnExpenseButton()
        AddAnExpenseForm.addMoreCost()
        AddAnExpenseForm.totalCostInput.blur()
        AddAnExpenseForm.costAlert.should('be.visible')
        AddAnExpenseForm.addButton.should('be.disabled')
      })

      it('Edit An Expense form. Check EMPTY total cost input validation', () => {
        FuelExpensesPage.clickAddAnExpenseButton()
        AddAnExpenseForm.totalCostInput.focus()
        AddAnExpenseForm.totalCostInput.blur()
        AddAnExpenseForm.costEmptyAlert.should('be.visible')
        AddAnExpenseForm.addButton.should('be.disabled')
        AddAnExpenseForm.clickCloseButton()
      })
    })
  })
})
