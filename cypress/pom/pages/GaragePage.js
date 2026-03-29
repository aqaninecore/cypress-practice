class GaragePage {
  get pageTitle() {
    return cy.contains('h1', 'Garage')
  }

  get logInAlert() {
    return cy.get('.alert.alert-success').contains('p', 'You have been successfully logged in')
  }

  get carAddedAlert() {
    return cy.get('.alert.alert-success').contains('p', 'Car added')
  }

  get carRemovedAlert() {
    return cy.get('.alert.alert-success').contains('p', 'Car removed')
  }

  get mileageUpdatedAlert() {
    return cy.get('.alert.alert-success').contains('p', 'Mileage updated')
  }

  get addCarButton() {
    return cy.get('.panel-page_heading.d-flex.justify-content-between button')
  }

  openAddACarForm() {
    this.addCarButton.click()
  }
}

export default new GaragePage()
