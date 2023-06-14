const { Schema, model } = require("mongoose")
const Joi = require("joi")

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
})

const Posts = model("post", PostSchema)

const validatePost = (b) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        desc: Joi.string().required(),
        url: Joi.string().required()
    })
    return schema.validate(b)
}

module.exports = { Posts, validatePost }