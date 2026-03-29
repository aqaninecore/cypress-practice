class AddACarForm {
  constructor() {
    this.selectedCarBrand = ''
    this.selectedCarModel = ''
  }

  get carBrandSelector() {
    return cy.get('#addCarBrand')
  }

  get carModelSelector() {
    return cy.get('#addCarModel')
  }

  get addCarMileageSelector() {
    return cy.get('#addCarMileage')
  }

  get addACarModal() {
    return cy.get('app-add-car-modal')
  }

  get addButton() {
    return cy.get('.modal-footer.d-flex.justify-content-end button').eq(1).contains('button', 'Add')
  }

  get selectedCarName() {
    return `${this.selectedCarBrand} ${this.selectedCarModel}`.trim()
  }

  get carsLimitReachedAlert() {
    return cy.get('.alert.alert-danger').contains('p', 'Cars limit reached')
  }

  addCarBrand() {
    this.addACarModal.click()

    this.carBrandSelector.find('option').then(($options) => {
      const randomIndex = Math.floor(Math.random() * $options.length)
      const randomValue = $options[randomIndex].value
      const randomText = $options[randomIndex].text.trim()

      this.carBrandSelector.select(randomValue)
      this.selectedCarBrand = randomText
    })
  }

  addCarModel() {
    this.addACarModal.click()

    this.carModelSelector.find('option').then(($options) => {
      const randomIndex = Math.floor(Math.random() * $options.length)
      const randomValue = $options[randomIndex].value
      const randomText = $options[randomIndex].text.trim()

      this.carModelSelector.select(randomValue)
      this.selectedCarModel = randomText
    })
  }

  addMileage(mileage) {
    this.addCarMileageSelector.clear().type(Number(mileage))
  }

  clickAddButton() {
    this.addButton.click()
  }
}

export default new AddACarForm()
