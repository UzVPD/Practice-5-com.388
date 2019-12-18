const express = require('express')
const app = express()
const session = require('express-session')

const port = 80

const messages = []
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.use(session({
     secret: 'vlad',
     resave: false,
     saveUninitialized: true,
     cookie: { secure: false }
}))

app.get('/', (req, res) => {
     const session = req.session
     res.render('index', { messages, session })
     req.session.errorMessage = undefined
})

app.post('/entry/create', (req, res) => {
     const body = req.body

     const name = body.username
     if (!name) {
          req.session.errorMessage = ("Name must be provided.")
     }

     const message = body.message
     if (!message) {
          req.session.errorMessage = ("Message must be provided.")
     }
     if (!req.session.errorMessage) {
          messages.push({ name, message })
     }

     res.redirect('/')
})

app.listen(port, () => {
     console.log(`app is listening on port ${port}`)
})