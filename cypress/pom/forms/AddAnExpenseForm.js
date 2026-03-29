class AddAnExpenseModal {
  get addCarMileageSelector() {
    return cy.get('#addExpenseMileage')
  }

  get numberOfLitersInput() {
    return cy.get('#addExpenseLiters')
  }

  get litersAlert() {
    return cy.get('.invalid-feedback p').contains('p', 'Liters has to be from 0.01 to 9999')
  }

  get litersEmptyAlert() {
    return cy.get('.invalid-feedback p').contains('p', 'Liters required')
  }

  get totalCostInput() {
    return cy.get('#addExpenseTotalCost')
  }

  get costAlert() {
    return cy.get('.invalid-feedback p').contains('p', 'Total cost has to be from 0.01 to 1000000')
  }

  get costEmptyAlert() {
    return cy.get('.invalid-feedback p').contains('p', 'Total cost required')
  }

  get addButton() {
    return cy.get('.modal-footer.d-flex.justify-content-end button').eq(1).contains('button', 'Add')
  }

  get closeButton() {
    return cy.get('button.close')
  }

  addMileagePlusOne() {
    this.addCarMileageSelector.invoke('val').then((currentValue) => {
      const newMileage = Number(currentValue) + 1

      this.addCarMileageSelector.clear().type(String(newMileage))
    })
  }

  addNumberOfLiters(liter) {
    this.numberOfLitersInput.click().type(Number(liter))
  }

  addLessLiters() {
    this.numberOfLitersInput.click().type('0.001')
  }

  addMoreLiters() {
    this.numberOfLitersInput.click().type('10000')
  }

  addTotalCost(sum) {
    this.totalCostInput.click().type(Number(sum))
  }

  addLessCost() {
    this.totalCostInput.click().type('0.001')
  }

  addMoreCost() {
    this.totalCostInput.click().type('1000001')
  }

  clickAddButton() {
    this.addButton.click()
  }

  clickCloseButton() {
    this.closeButton.click()
  }
}

export default new AddAnExpenseModal()
