/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('/')
})

describe("Get Footers's links", () => {
  context('Social media links', () => {
    context('Social contacts', () => {
      beforeEach(() => {
        cy.get('.contacts_socials.socials')
      })
      it.only('Facebook', () => {
        cy.get('a[href="https://www.facebook.com/Hillel.IT.School"]')
          .children('.socials_icon.icon.icon-facebook')
          .should('exist')
      })

      it.only('Telegram', () => {
        cy.get('a[href="https://t.me/ithillel_kyiv"]').children('.socials_icon.icon.icon-telegram').should('exist')
      })

      it.only('YouTube', () => {
        cy.get('a[href="https://www.youtube.com/user/HillelITSchool?sub_confirmation=1"]')
          .children('.socials_icon.icon.icon-youtube')
          .should('exist')
      })

      it.only('Instagram', () => {
        cy.get('a[href="https://www.instagram.com/hillel_itschool/"]')
          .children('.socials_icon.icon.icon-instagram')
          .should('exist')
      })

      it.only('LinkedIn', () => {
        cy.get('a[href="https://www.linkedin.com/school/ithillel/"]')
          .children('.socials_icon.icon.icon-linkedin')
          .should('exist')
      })
    })
  })

  context('In Touch links', () => {
    context('Contacts', () => {
      beforeEach(() => {
        cy.get(
          '.col-md-6.d-flex.flex-column.align-items-center.align-items-md-end.justify-content-md-end.mb-2.mt-3.mt-md-0',
        )
      })

      it.only('Go To Site link', () => {
        cy.get('a[href="https://ithillel.ua"]').should('exist')
      })

      it.only('MailTo: link', () => {
        cy.get('a[href="mailto:developer@ithillel.ua"]').should('exist')
      })
    })
  })

  context('Footer links', () => {
    context('Up to top', () => {
      beforeEach(() => {
        cy.get('.col.footer_item.-right')
      })
      it.only('Up to top link', () => {
        cy.get('footer a[href="/"]').should('exist')
      })
    })
  })
})
