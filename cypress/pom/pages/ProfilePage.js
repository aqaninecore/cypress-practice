class ProfilePage {
  get profileTabIcon() {
    return cy.get('[routerlink="profile"]')
  }

  get profileName() {
    return cy.get('.profile_name.display-4')
  }

  visit() {
    cy.visit('/panel/profile')
  }

  openProfileTab() {
    this.profileTabIcon.click()
  }
}

export default new ProfilePage()
