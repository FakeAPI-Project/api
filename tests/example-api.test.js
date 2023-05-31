const request = require('supertest');
const app = require('../src/server');

app.get('/example', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

test('responds with json object with a name property', async () => {
  const response = await request(app)
    .get('/example')
    .set('Accept', 'application/json');

  expect(response.headers['content-type']).toMatch(/json/);
  expect(response.status).toEqual(200);
  expect(response.body.message).toEqual('Hello World!');
});
