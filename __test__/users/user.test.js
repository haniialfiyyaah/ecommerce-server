const request = require('supertest')
const app = require('../../app')
const { sequelize } = require('../../models')
const { queryInterface } = sequelize

// afterAll(done => {
//   queryInterface.bulkDelete('Users')
//     .then(() => {
//       done()
//     })
//     .catch(done)
// })

describe('POST /login', () => {
  describe('Success', () => {
    test('Login Success', (done) => {
      request(app)
        .post('/login')
        .set('Accept', 'application/json')
        .send({ email: 'admin@mail.com', password: '123456'})
        .then(response => {
          const { body, status } = response
          expect(status).toBe(200)
          expect(body).toHaveProperty('access_token', expect.any(String))
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })

  describe('Failed', () => {
    test('failed login email exist with wrong password', (done) => {
      request(app)
        .post('/login')
        .set('Accept', 'application/json')
        .send({ email: 'admin@mail.com', password: 'wrong123456'})
        .then(response => {
          const { body, status } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', 'Email or password wrong!')
          done()
        })
        .catch(err => {
          done(err)
        })
    })

    test('failed login email doesnt exist', (done) => {
      request(app)
        .post('/login')
        .set('Accept', 'application/json')
        .send({ email: 'wrongadmin@mail.com', password: '123456'})
        .then(response => {
          const { body, status } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', 'Email or password wrong!')
          done()
        })
        .catch(err => {
          done(err)
        })
    })

    test('empty email or password', (done) => {
      request(app)
        .post('/login')
        .set('Accept', 'application/json')
        .send({ email: '', password: ''})
        .then(response => {
          const { body, status } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', 'Email or password cannot be empty!')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })
})

