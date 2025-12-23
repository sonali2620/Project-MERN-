const express = require('express')

const app = express()

// middleware to read JSON body
app.use(express.json())

const courseRouter = require('./routes/course')



app.use('/course', courseRouter)


app.listen(4000, () => {
  console.log('Server started at port 4000')
})
