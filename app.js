const express = require('express');
const cors = require('cors');
const candidateRoute = require('./routers/candidateRoute');
const createQueryRoute = require('./routers/createQueryRoutes')
// const messageRoute = require('./routers/messageRoute');
// const statusRoute = require('./routers/statusRoute');
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/candidate', candidateRoute)
app.use('/api/query', createQueryRoute)
// app.use('/api/message', messageRoute)
// app.use('/api/status', statusRoute)

module.exports = app