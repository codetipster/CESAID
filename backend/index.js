const express = require('express');
const app = express();
const cors = require('cors');

const connectDB = require('./database');
connectDB();



const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
