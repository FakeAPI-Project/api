const express = require('express');
const app = express();

app.get('/', (req, res) => {
  return res.json({
    status: 'ok',
    data: {
      message: 'Hello World!'
    },
  });
});

app.listen(3000, () => {
  console.log('Running on port: 3000');
});
