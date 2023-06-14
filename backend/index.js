const express = require("express")
const cors = require('cors')
const mongoose = require('mongoose')
const { config } = require("dotenv")
config()

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB is connected"))
    .catch(() => console.log("MongoDB isn't connected"))

app.get('/', async (req, res) => {
    res.json("app is running")
})
const Blogs = require('./router/blog')
const Posts = require('./router/post')
const Comments = require('./router/newComment')
const User = require('./router/user')

app.use('/comments', Comments)
app.use('/blogs', Blogs)
app.use('/posts', Posts)
app.use('/user', User)

const PORT = 8000

app.listen(PORT, () => console.log(`${PORT} is listened`))