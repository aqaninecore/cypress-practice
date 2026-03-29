class EditACarForm {
  get carBrandSelector() {
    return cy.get('#addCarBrand')
  }

  get carModelSelector() {
    return cy.get('#addCarModel')
  }

  get addCarMileageSelector() {
    return cy.get('#addCarMileage')
  }

  get addCarCreationDateInput() {
    return cy.get('#carCreationDate')
  }

  get editACarModal() {
    return cy.get('app-edit-car-modal')
  }

  get carUpdatedAlert() {
    return cy.get('.alert.alert-success').contains('p', 'Car updated')
  }

  get lessMileageEntryAlert() {
    return cy.get('.alert.alert-danger').should('have.text', 'New mileage is less then previous entry')
  }

  get addButton() {
    return cy.get('.modal-footer_group button').eq(1).contains('button', 'Save')
  }

  get removeCarButton() {
    return cy.get('.modal-footer.d-flex.justify-content-between button').eq(0).contains('button', 'Remove car')
  }

  addCarBrand() {
    this.editACarModal.click()

    this.carBrandSelector.find('option').then(($options) => {
      const randomIndex = Math.floor(Math.random() * $options.length)
      const randomValue = $options[randomIndex].value

      this.carBrandSelector.select(randomValue)
    })
  }

  addCarModel() {
    this.editACarModal.click()

    this.carModelSelector.find('option').then(($options) => {
      const randomIndex = Math.floor(Math.random() * $options.length)
      const randomValue = $options[randomIndex].value

      this.carModelSelector.select(randomValue)
    })
  }

  addMileagePlusOne() {
    this.addCarMileageSelector.invoke('val').then((currentValue) => {
      const newMileage = Number(currentValue) + 1

      this.addCarMileageSelector.clear().type(String(newMileage))
    })
  }

  addMileageMinusOne() {
    this.addCarMileageSelector.invoke('val').then((currentValue) => {
      const newMileage = Number(currentValue) - 1

      this.addCarMileageSelector.clear().type(String(newMileage))
    })
  }

  addCarCreationDate() {
    const now = new Date()

    const day = now.getDate()
    const month = now.getMonth() + 1 // months are 0-based
    const year = now.getFullYear()

    const formattedDate = `${day}.${month}.${year}`

    this.addCarCreationDateInput.clear().type(formattedDate)
  }

  clickAddButton() {
    this.addButton.click()
  }

  clickRemoveCarButton() {
    this.removeCarButton.click()
  }
}

export default new EditACarForm()
