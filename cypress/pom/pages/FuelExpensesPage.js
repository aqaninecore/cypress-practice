import AddACarForm from '../forms/AddACarForm'

class FuelExpensesPage {
  get pageTitle() {
    return cy.contains('h1', 'Fuel expenses')
  }

  get expensesTable() {
    return cy.get('tbody tr').first()
  }

  // get fuelExpenseRow() {
  //   return cy.get('tbody tr:has(button.btn-delete):has(button.btn-edit)').first()
  // }

  get fuelExpensesSection() {
    return cy.contains('[routerlink="expenses"]', 'Fuel expenses')
  }

  get addAnExpenseButton() {
    return cy.get('.btn.btn-primary').contains('button', 'Add an expense')
  }

  get carSelectorDropdown() {
    return cy.get('#carSelectDropdown')
  }

  get carSelectorDropdownItems() {
    return cy.get('.car-select-dropdown_menu.dropdown-menu.show').find('li')
  }

  get triggerDeleteModalButton() {
    return cy.get('tbody tr td:nth-child(5) > button.btn.btn-delete')
  }

  get triggerEditAnExpenseFormButton() {
    return cy.get('tbody tr td:nth-child(5) > button.btn.btn-edit')
  }

  get fuelExpenseAddedAlert() {
    return cy.get('.alert.alert-success').contains('p', 'Fuel expense added')
  }

  get fuelExpenseEditedAlert() {
    return cy.get('.alert.alert-success').contains('p', 'Fuel expense edited')
  }

  get fuelExpenseRemovedAlert() {
    return cy.get('.alert.alert-success').contains('p', 'Fuel expense entry removed')
  }

  clickAddAnExpenseButton() {
    this.addAnExpenseButton.click()
  }

  clickCarSelectorDropdown() {
    this.carSelectorDropdown.click()
  }

  clickSecondCarSelectorDropdownItem() {
    this.carSelectorDropdownItems.eq(1).click()
  }

  clickCarSelectorDropdownItemFromAddedCar() {
    if (!AddACarForm.selectedCarName) {
      throw new Error('No selected car data in AddACarForm. Call addCarBrand() and addCarModel() first.')
    }

    this.clickCarSelectorDropdown()
    cy.contains('.car-select-dropdown_item', AddACarForm.selectedCarName).click()
  }

  clickTriggerDeleteModalButton() {
    this.triggerDeleteModalButton.eq(0).click({ force: true })
  }

  clickTriggerEditAnExpenseFormButton() {
    this.triggerEditAnExpenseFormButton.eq(0).click({ force: true })
  }

  goToFuelExpensesSection() {
    this.fuelExpensesSection.click()
  }
}

export default new FuelExpensesPage()
