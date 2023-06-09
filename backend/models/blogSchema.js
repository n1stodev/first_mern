const mongoose = require('mongoose')
const Joi = require("joi")

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    }
})

const Blogs = mongoose.model("blog", blogSchema)

const validateBlog = (b) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        info: Joi.string().required(),
        tags: Joi.array().required()
    })
    return schema.validate(b)
}

module.exports = { Blogs, validateBlog }