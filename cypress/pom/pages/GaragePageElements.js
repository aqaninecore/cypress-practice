class GaragePageElements {
  get updateMileageInput() {
    return cy.get('[formcontrolname="miles"]').eq(0)
  }

  get carEditButton() {
    return cy.get('.car_edit.btn.btn-edit').eq(0)
  }

  get updateMileageInputButton() {
    return cy.get('.update-mileage-form_submit.btn.btn-secondary.btn-sm').eq(0)
  }

  get addFuelExpenseButton() {
    return cy.get('.car_add-expense.btn.btn-success').eq(0)
  }

  updateMileage(mileage) {
    this.updateMileageInput.clear().type(Number(mileage))
  }

  clickUpdateMileageButton() {
    this.updateMileageInputButton.click()
  }

  clickCarEditButton() {
    this.carEditButton.click()
  }

  clickAddFuelExpenseButton() {
    this.addFuelExpenseButton.click()
  }
}

export default new GaragePageElements()
