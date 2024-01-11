const express = require('express');
const router = require('./routes/userRoutes.js')
const router1 = require('./routes/factRouter.js')
const cors = require('cors')
const connect = require("./database/db.js")

const app = express();
const port = 8080;
connect();
app.use(express.json())
app.use(cors())

app.use(router);
app.use(router1)

app.listen(port, () => {
  console.log(`backend server is running on ${port}`)
})