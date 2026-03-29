class RemoveCarForm {
  get removeButton() {
    return cy.get('.modal-footer.d-flex.justify-content-end button').eq('1').contains('button', 'Remove')
  }

  clickRemoveButton() {
    this.removeButton.click()
  }
}

export default new RemoveCarForm()
