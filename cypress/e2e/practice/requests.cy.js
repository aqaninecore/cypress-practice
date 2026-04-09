/// <reference types="cypress" />

import users from '../../fixtures/users.json'

describe('Public API requests', () => {
  it('Get brands', () => {
    cy.request('GET', 'api/cars/brands').then((response) => {
      const cars = response.body.data

      expect(response.status).to.eq(200)
      expect(cars).to.have.length(5)
      expect(cars[0].title).to.eq('Audi')
    })
  })

  it('Get brands 2', () => {
    cy.request('GET', 'api/cars/brands').then((response) => {
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
  let sid
  before(() => {
    cy.request('POST', '/api/auth/signin', {
      email: users.correctUser.email,
      password: users.correctUser.password,
    }).then((response) => {
      const headers = response.headers
      sid = headers['set-cookie'][0].split(';')[0]
      cy.log(sid)
    })
  })

  it('Add a car', () => {
    cy.api({
      url: '/api/cars',
      method: 'POST',
      body: { carBrandId: 1, carModelId: 1, mileage: 50000 },
      headers: { Cookie: sid },
      failOnStatusCode: false,
    }).then((response) => {
      cy.log(JSON.stringify(response.body))
      expect(response.status).to.eq(201)
      expect(response.body.data.carBrandId).to.eq(1)
      expect(response.body.data.carModelId).to.eq(1)
      expect(response.body.data.mileage).to.eq(50000)
    })
  })

  it('Add one more car', () => {
    cy.api({
      url: '/api/cars',
      method: 'POST',
      body: { carBrandId: 1, carModelId: 2, mileage: 47000 },
      headers: { Cookie: sid },
      failOnStatusCode: false,
    }).then((response) => {
      cy.log(JSON.stringify(response.body))
      expect(response.status).to.eq(201)
      expect(response.body.data.carBrandId).to.eq(1)
      expect(response.body.data.carModelId).to.eq(2)
    })
  })
})
