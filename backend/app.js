const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const app = express()

const postsRoutes = require('./routes/postsRoutes')
const usersRoutes = require('./routes/usersRoutes')
const port = process.env.PORT || 5000
const connectDB = require('./config/db')

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//       next();
//     })
app.use(bodyParser.json({limit : '30mb', extended : true}))
app.use(bodyParser.urlencoded({limit : '30mb', extended : true}))

connectDB()

app.use('/memories/posts', postsRoutes)
app.use('/memories/auth', usersRoutes)


app.listen(port, () => console.log(`server started on port ${port}`))