const express = require('express');
const cors = require('cors');
const candidateRoute = require('./routers/candidateRoute');
const createQueryRoute = require('./routers/createQueryRoutes')
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/candidate', candidateRoute)
app.use('/api/query', createQueryRoute)

module.exports = app