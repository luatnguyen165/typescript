const Joi = require('joi');

const userChema =Joi.object({
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().required(),
    password_confirmation: Joi.any().valid(Joi.ref('password')).required(),
    email: Joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}})
})
const LoginSchema = Joi.object({
    email: Joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}),
    password: Joi.string().required(),
})

module.exports ={
    userChema:userChema,
    LoginSchema:LoginSchema
}