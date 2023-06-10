const express = require("express")
const router = express.Router()
const { Comments, validateComment } = require('../models/commentSchemaa')

router.get("/", async (req, res) => {
    try {
        const comments = await Comments.find()
        res.status(200).json({ variant: "success", msg: "all comments", innerData: comments })
    }
    catch {
        res.status(500).json({ variant: "error", msg: "server error", innerData: null })
    }
})

router.get("/single/:id", async (req, res) => {
    try {
        const { id } = req.params
        const comment = await Comments.find({ blogId: id })
        res.status(200).json({ variant: "success", msg: "one comment", innerData: comment })
    }
    catch {
        res.status(500).json({ variant: "error", msg: "server error", innerData: null })
    }
})

router.post('/', async (req, res) => {
    try {
        const { error } = validateComment(req.body)
        if (error) {
            return res.status(400).json({ variant: "error", msg: error.details[0].message, innerData: null })
        }
        const newComment = await Comments.create(req.body)
        res.status(201).json({ variant: "success", msg: "New Comment", innerData: newComment })
    }
    catch {
        res.status(500).json({ variant: "error", msg: "server error", innerData: null })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        await Comments.findByIdAndRemove(id)
        res.status(201).json({ variant: "success", msg: 'succesfully deleted', innerData: null })
    }
    catch {
        res.status(500).json({ variant: "error", msg: "server error", innerData: null })
    }
})

module.exports = router