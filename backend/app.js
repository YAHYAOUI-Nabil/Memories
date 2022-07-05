const express = require('express')
const app = express()
const port = process.env.PORT || 5000


app.use('/', (req,res)=>{
    res.send('hello nabil')
})

app.listen(port, () => console.log(`server started on port ${port}`))