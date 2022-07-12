const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv').config()

const app = express()

const postsRoutes = require('./routes/postsRoutes')
const port = process.env.PORT || 5000
const connectDB = require('./config/db')


app.use(bodyParser.json({limit : '30mb', extended : true}))
app.use(bodyParser.urlencoded({limit : '30mb', extended : true}))

connectDB()

app.use('/memories/posts', postsRoutes)

app.listen(port, () => console.log(`server started on port ${port}`))