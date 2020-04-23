const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

const listRoutes = require('./routes/list-routes')
const taskRoutes = require('./routes/task-routes')

app.use(express.json())
app.use(cors())

// ROUTES
app.use('/list', listRoutes)
app.use('/task', taskRoutes)

// connect to DB --  Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1:2809/my_todo_db'
try {
  mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log(`Connected to MongoDB! Server is running on Port:${port}`)
  })
} catch (err) {
  console.log(err)
}

// Listening To server
app.listen(port, () => {
  console.log('Server is running on ', port)
})
