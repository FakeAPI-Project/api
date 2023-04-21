const request = require('supertest');
const express = require('express');

const app = express();

app.get('/user', (req, res) => {
  res.status(200).json({ name: 'vincent' });
});

test('responds with json object with a name property', async () => {
  const response = await request(app)
    .get('/user')
    .set('Accept', 'application/json');

  expect(response.headers['content-type']).toMatch(/json/);
  expect(response.status).toEqual(200);
  expect(response.body.name).toEqual('vincent');
});
