const express = require('express')
const router = express.Router()
const { Blogs, validateBlog } = require('../models/blogSchema')

router.get('/', async (req, res) => {
    try {
        const blogs = await Blogs.find().sort({ _id: -1 })
        res.status(200).json({ variant: "success", msg: "All blogs", innerData: blogs })
    }
    catch {
        res.status(500).json({ variant: "error", msg: "server error", innerData: null })
    }
})

router.get('/single/:id', async (req, res) => {
    try {
        const { id } = req.params
        const blogs = await Blogs.findById(id)
        res.status(200).json({ variant: "success", msg: "All blogs", innerData: blogs })
    }
    catch {
        res.status(500).json({ variant: "error", msg: "server error", innerData: null })
    }
})

router.post('/', async (req, res) => {
    try {
        const { error } = validateBlog(req.body)
        if (error) {
            return res.status(400).json({ variant: "error", msg: error.details[0].message, innerData: null })
        }
        const newBlog = await Blogs.create(req.body)
        res.status(201).json({ variant: "success", msg: "New Blog", innerData: newBlog })
    }
    catch {
        res.status(500).json({ variant: "error", msg: "server error", innerData: null })
    }
})

router.put("/:id", async (req, res) => {
    try {
        let { id } = req.params
        let { title, info, tags } = req.body

        await Blog.findByIdAndUpdate(id, { title, info, tags })
        res.status(200).json({ variant: "success", msg: "updated", innerData: null })
    }
    catch {
        res.status(500).json({ variant: "error", msg: "server error", innerData: null })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        await Blogs.findByIdAndRemove(id)
        res.status(201).json({ variant: "success", msg: 'succesfully deleted', innerData: null })
    }
    catch {
        res.status(500).json({ variant: "error", msg: "server error", innerData: null })
    }
})

module.exports = router