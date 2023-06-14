const express = require('express')
const router = express.Router()
const { Posts, validatePost } = require('../models/postSchema')

router.get('/', async (req, res) => {
    try {
        const post = await Posts.find().sort({ _id: -1 })
        res.status(200).json({ variant: "success", msg: "All posts", innerData: post })
    }
    catch {
        res.status(500).json({ variant: "error", msg: "server error", innerData: null })
    }
})

router.get('/single/:id', async (req, res) => {
    try {
        const { id } = req.params
        const post = await Posts.findById(id)
        res.status(200).json({ variant: "success", msg: "one post", innerData: post })
    }
    catch {
        res.status(500).json({ variant: "error", msg: "server error", innerData: null })
    }
})

router.post('/', async (req, res) => {
    try {
        const { error } = validatePost(req.body)
        if (error) {
            return res.status(400).json({ variant: "error", msg: error.details[0].message, innerData: null })
        }
        const newPost = await Posts.create(req.body)
        res.status(201).json({ variant: "success", msg: "New Post", innerData: newPost })
    }
    catch {
        res.status(500).json({ variant: "error", msg: "server error", innerData: null })
    }
})

router.put("/:id", async (req, res) => {
    try {
        let { id } = req.params
        let { title, desc, url } = req.body

        await Posts.findByIdAndUpdate(id, { title, desc, url })
        res.status(200).json({ variant: "success", msg: "updated", innerData: null })
    }
    catch {
        res.status(500).json({ variant: "error", msg: "server error", innerData: null })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        await Posts.findByIdAndRemove(id)
        res.status(201).json({ variant: "success", msg: 'succesfully deleted', innerData: null })
    }
    catch {
        res.status(500).json({ variant: "error", msg: "server error", innerData: null })
    }
})

module.exports = router