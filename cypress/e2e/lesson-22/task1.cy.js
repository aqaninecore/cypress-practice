/// <reference types="cypress" />

import users from '../../fixtures/users.json'

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
      body: { carBrandId: 1, carModelId: 1, mileage: 9999 },
      headers: { Cookie: sid },
      failOnStatusCode: false,
    }).then((response) => {
      cy.log(JSON.stringify(response.body))
      expect(response.status).to.eq(201)
      expect(response.body.data.carBrandId).to.eq(1)
      expect(response.body.data.carModelId).to.eq(1)
      expect(response.body.data.mileage).to.eq(9999)
    })
  })

  it('Add second car', () => {
    cy.api({
      url: '/api/cars',
      method: 'POST',
      body: { carBrandId: 1, carModelId: 2, mileage: 11111 },
      headers: { Cookie: sid },
      failOnStatusCode: false,
    }).then((response) => {
      cy.log(JSON.stringify(response.body))
      expect(response.status).to.eq(201)
      expect(response.body.data.carBrandId).to.eq(1)
      expect(response.body.data.carModelId).to.eq(2)
      expect(response.body.data.mileage).to.eq(11111)
    })
  })

  it('Add third car', () => {
    cy.api({
      url: '/api/cars',
      method: 'POST',
      body: { carBrandId: 1, carModelId: 3, mileage: 447 },
      headers: { Cookie: sid },
      failOnStatusCode: false,
    }).then((response) => {
      cy.log(JSON.stringify(response.body))
      expect(response.status).to.eq(201)
      expect(response.body.data.carBrandId).to.eq(1)
      expect(response.body.data.carModelId).to.eq(3)
      expect(response.body.data.mileage).to.eq(447)
    })
  })

  it('Get current user cars', () => {
    cy.api({ url: '/api/cars', method: 'GET', headers: { Cookie: sid }, failOnStatusCode: false }).then((response) => {
      cy.log(JSON.stringify(response.body))
      expect(response.status).to.eq(200)
      expect(response.body.data).to.have.length.greaterThan(0)
      expect(response.body.data[0]).to.have.property('id')
      expect(response.body.data[0]).to.have.property('carBrandId')
      expect(response.body.data[0]).to.have.property('carModelId')
      expect(response.body.data[0]).to.have.property('initialMileage')
      expect(response.body.data[0]).to.have.property('mileage')
    })
  })

  it('Get current user car by id', () => {
    cy.api({ url: '/api/cars', method: 'GET', headers: { Cookie: sid }, failOnStatusCode: false }).then(
      (carsResponse) => {
        cy.log(JSON.stringify(carsResponse.body))
        expect(carsResponse.status).to.eq(200)
        expect(carsResponse.body.data).to.have.length.greaterThan(0)

        const carId = carsResponse.body.data[0].id

        cy.api({ url: `/api/cars/${carId}`, method: 'GET', headers: { Cookie: sid }, failOnStatusCode: false }).then(
          (response) => {
            cy.log(JSON.stringify(response.body))
            expect(response.status).to.eq(200)
            expect(response.body.data).to.have.property('id', carId)
            expect(response.body.data).to.have.property('carBrandId')
            expect(response.body.data).to.have.property('carModelId')
            expect(response.body.data).to.have.property('initialMileage')
            expect(response.body.data).to.have.property('mileage')
          },
        )
      },
    )
  })

  it('Edit existing car by id', () => {
    const payload = { carBrandId: 1, carModelId: 1, mileage: 12345 }

    cy.api({ url: '/api/cars', method: 'GET', headers: { Cookie: sid }, failOnStatusCode: false }).then(
      (carsResponse) => {
        cy.log(JSON.stringify(carsResponse.body))
        expect(carsResponse.status).to.eq(200)
        expect(carsResponse.body.data).to.have.length.greaterThan(0)

        const carId = carsResponse.body.data[0].id

        cy.api({
          url: `/api/cars/${carId}`,
          method: 'PUT',
          body: payload,
          headers: { Cookie: sid },
          failOnStatusCode: false,
        }).then((response) => {
          cy.log(JSON.stringify(response.body))
          expect(response.status).to.eq(200)
          expect(response.body.data).to.have.property('id', carId)
          expect(response.body.data).to.have.property('carBrandId', payload.carBrandId)
          expect(response.body.data).to.have.property('carModelId', payload.carModelId)
          expect(response.body.data).to.have.property('mileage', payload.mileage)
        })
      },
    )
  })

  it('Delete existing car by id', () => {
    cy.api({ url: '/api/cars', method: 'GET', headers: { Cookie: sid }, failOnStatusCode: false }).then(
      (carsResponse) => {
        cy.log(JSON.stringify(carsResponse.body))
        expect(carsResponse.status).to.eq(200)
        expect(carsResponse.body.data).to.have.length.greaterThan(0)

        const carId = carsResponse.body.data[0].id

        cy.api({ url: `/api/cars/${carId}`, method: 'DELETE', headers: { Cookie: sid }, failOnStatusCode: false }).then(
          (response) => {
            cy.log(JSON.stringify(response.body))
            expect(response.status).to.eq(200)

            cy.api({ url: '/api/cars', method: 'GET', headers: { Cookie: sid }, failOnStatusCode: false }).then(
              (carsAfterDeleteResponse) => {
                cy.log(JSON.stringify(carsAfterDeleteResponse.body))
                expect(carsAfterDeleteResponse.status).to.eq(200)

                const deletedCar = carsAfterDeleteResponse.body.data.find((car) => car.id === carId)
                expect(deletedCar).to.be.undefined
              },
            )
          },
        )
      },
    )
  })
})
