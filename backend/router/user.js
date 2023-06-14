const express = require('express')
const router = express.Router()
const { Users, validateUser } = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { config } = require("dotenv")
config()

router.get('/', async (req, res) => {
    try {
        const { sortName, number } = req.query
        const users = await Users.find().select({ password: 0 }).sort(sortName && number ? { [sortName]: +number } : { _id: -1 })
        res.status(200).json({ variant: "success", msg: "all users", innerData: users })
    }
    catch {
        res.status(500).json({ variant: "error", msg: "server error", innerData: null })
    }
})

router.get('/search', async (req, res) => {
    try {
        const { value } = req.query
        const users = await Users.find()
        const searchData = users.filter(i => i.name.toLowerCase().includes(value.toLowerCase()))
        if (!searchData.length) {
            return res.status(404).json({ variant: "error", msg: "user not found", innerData: null })

        }
        res.status(200).json({ variant: "success", msg: "search user", innerData: searchData })
    }
    catch {
        res.status(500).json({ variant: "error", msg: "server error", innerData: null })
    }
})

router.post('/sign-up', async (req, res) => {
    try {
        const { error } = validateUser(res.body)
        if (error) {
            return res.status(400).json({ variant: "error", msg: error.details[0].message, innerData: null })
        }
        const validUser = await Users.findOne({ username: req.body.username })
        if (validUser) {
            return res.status(400).json({ variant: 'success', msg: 'username already been declared', innerData: null })
        }
        // parolni shifrlash
        let salt = 10
        req.body.password = await bcrypt.hash(req.body.password, salt)
        const newUser = await Users.create(req.body)
        res.status(200).json({ variant: "success", msg: "user's created", innerData: newUser })
    }
    catch {
        res.status(500).json({ variant: "error", msg: "server error", innerData: null })
    }
})

router.post('/sign-in', async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await Users.findOne({ username })
        if (!user) {
            return res.status(500).json({ variant: "error", msg: "Username not found", innerData: null })
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                const token = jwt.sign({ _id: user._id, admin: true }, process.env.PRIVATE_KEY)
                // const token = jwt.sign({ _id: user._id, admin: true }, process.env.PRIVATE_KEY, { expiresIn: 30 })
                res.status(200).json({ variant: "success", msg: "successfully log in", innerData: { user, token } })
            } else {
                return res.status(400).json({ variant: "error", msg: "password is incorrect", innerData: null })
            }
        })
    }
    catch {
        res.status(500).json({ variant: "error", msg: "server error", innerData: null })
    }
})

module.exports = router