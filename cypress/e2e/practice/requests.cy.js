/// <reference types="cypress" />

describe('Public API requests', () => {
  it('Get brands', () => {
    cy.request('GET', 'api/cars/brands').then(response, () => {
      const cars = response.body.data

      expect(response).to.eq(200)
      expect(cars).to.have.length(5)
      expect(cars[0].title).to.eq('Audi')
    })
  })

  it('Get brands 2', () => {
    cy.request('GET', 'api/cars/brands').then(response, () => {
      const cars = response.body.data

      cy.wrap(cars).should('have.length', 5)
      cy.wrap(response.status).should('eq', 200)
    })
  })

  it('Get brands 3', () => {
    cy.request('GET', 'api/cars/brands').its('status').should('eq', 200)
  })
})

describe('Private API Requests', () => {
  it('Auth', () => {
    cy.request('POST', '/api/auth/signin', { carBrandId: 1, carModelId: 1, mileage: 122 }).then(response, () => {
      cy.log(JSON.stringify(response))
    })
  })
})
