const express = require('express');
const router = require('./routes/userRoutes.js')
const router1 = require('./routes/factRouter.js')
const cors = require('cors')
const connect = require("./database/db.js")


const app = express();
const port = 8080;
app.use(express.json())
app.use(cors())


connect();


app.use(router);
app.use(router1)

app.get('/', (req,res) => {
  res.status(200).send({message: 'API is running'})
})

app.listen(port, () => {
  console.log(`backend server is running on ${port}`)
})