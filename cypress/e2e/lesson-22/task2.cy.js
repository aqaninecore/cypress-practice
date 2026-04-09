/// <reference types="cypress" />

import users from '../../fixtures/users.json'

describe('Private API Requests', () => {
  let sid

  before(() => {
    cy.api('POST', '/api/auth/signin', { email: users.correctUser.email, password: users.correctUser.password }).then(
      (response) => {
        sid = response.headers['set-cookie'][0].split(';')[0]
      },
    )
  })

  after(() => {
    cy.api({ url: '/api/cars', method: 'GET', headers: { Cookie: sid } }).then((carsResponse) => {
      expect(carsResponse.status).to.eq(200)

      cy.wrap(carsResponse.body.data).each((car) => {
        cy.api({ url: `/api/cars/${car.id}`, method: 'DELETE', headers: { Cookie: sid } }).then((deleteResponse) => {
          expect(deleteResponse.status).to.eq(200)

          cy.api({ url: '/api/cars', method: 'GET', headers: { Cookie: sid } }).then((carsAfterDeleteResponse) => {
            expect(carsAfterDeleteResponse.status).to.eq(200)
            const deletedCar = carsAfterDeleteResponse.body.data.find((c) => c.id === car.id)
            expect(deletedCar).to.be.undefined
          })
        })
      })
    })
  })

  it('Get current user cars for deletion', () => {
    cy.api({ url: '/api/cars', method: 'GET', headers: { Cookie: sid }, failOnStatusCode: false }).then((response) => {
      cy.log(JSON.stringify(response.body))
      expect(response.status).to.eq(200)
      expect(response.body.data).to.have.length.greaterThan(0)
    })
  })
})
