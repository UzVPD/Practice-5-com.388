const express = require('express')
const app = express()

const port = 80

const messages = []

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
     res.render('index', { messages })
})

app.post('/entry/create', (req, res) => {
     const body = req.body
     console.log(body)
     const name = body.username
     if (!name) {
          console.error("Name must be provided.")
     }

     const message = body.message
     if (!message) {
          console.error("Message must be provided.")
     }

     messages.push({ name, message })

     res.redirect('/')
})

app.listen(port, () => {
     console.log(`app is listening on port ${port}`)
})