const { Schema, model } = require("mongoose")
const Joi = require("joi")

const commentSchema = new Schema({
    msg: {
        type: String,
        required: true
    },
    blogId: {
        type: String,
        required: true
    }
})

const Comments = model("comment", commentSchema)

const validateComment = (b) => {
    const schema = Joi.object({
        msg: Joi.string().required(),
        blogId: Joi.string().required()
    })
    return schema.validate(b)
}

module.exports = { Comments, validateComment }