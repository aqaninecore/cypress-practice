class EditAnExpenseForm {
  get editAnExpenseModal() {
    return cy.get('.modal-title').contains('h1', 'Edit an expense')
  }

  get mileageExpenseSelector() {
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

  get saveButton() {
    return cy.get('.modal-footer.d-flex.justify-content-end button').eq(1).contains('button', 'Save')
  }

  updateMileage(mileage) {
    this.mileageExpenseSelector.invoke('val').then((currentValue) => {
      const nextMileage = Number(currentValue || 0) + 1
      this.mileageExpenseSelector.clear().type(String(nextMileage))
    })
  }

  addNumberOfLiters(liter) {
    this.numberOfLitersInput.clear()
    this.numberOfLitersInput.click().type(Number(liter))
  }

  addLessLiters() {
    this.numberOfLitersInput.clear()
    this.numberOfLitersInput.click().type('0.001')
  }

  addMoreLiters() {
    this.numberOfLitersInput.click().type('10000')
  }

  addTotalCost(sum) {
    this.totalCostInput.clear()
    this.totalCostInput.click().type(Number(sum))
  }

  addLessCost() {
    this.totalCostInput.clear()
    this.totalCostInput.click().type('0.001')
  }

  addMoreCost() {
    this.totalCostInput.clear()
    this.totalCostInput.click().type('1000001')
  }

  clickSaveButton() {
    this.saveButton.click()
  }
}

export default new EditAnExpenseForm()
