const { Schema, model } = require('mongoose')
const Joi = require('joi')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

const Users = model("user", userSchema)

const validateUser = (body) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
    })
    return schema.validate(body)
}

module.exports = { Users, validateUser }