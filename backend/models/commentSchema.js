// const mongoose = require('mongoose')
// const Joi = require("joi")

// const commentSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     msg: {
//         type: String,
//         required: true
//     }
// })

// const Comments = mongoose.model("coment", commentSchema)

// const validateComment = (b) => {
//     const schema = Joi.object({
//         name: Joi.string().required(),
//         msg: Joi.string().required()
//     })
//     return schema.validate(b)
// }

// module.exports = { Comments, validateComment }