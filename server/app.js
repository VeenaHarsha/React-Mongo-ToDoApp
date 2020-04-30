const express = require('express')
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5500
const app = express()
const connectDB = require('./database')
// connect to DB --  Set up default mongoose connection
connectDB()

const listRoutes = require('./routes/list-routes')
const taskRoutes = require('./routes/task-routes')

app.use(express.json())
app.use(cors())

// ROUTES
app.use('/list', listRoutes)
app.use('/task', taskRoutes)

// Listening To server
app.listen(port, () => {
  console.log('Server is running on ', port)
})
