const Joi = require('joi')


function userValidateSignUp (req, res, next){
    const schema = Joi.object({
        user_name: Joi.string().alphanum().min(3).max(30).required(),
        user_password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        user_email: Joi.string().email().required()
    }).with('user_name', 'user_password').with('user_email')

    const {error,value} = schema.validate(req.body)    
    if(error){
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    next()
}

function userValidateSignIn (req, res, next){
    const schema = Joi.object({
        user_name: Joi.string().alphanum().min(3).max(30).required(),
        user_password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    }).with('user_name', 'user_password')

    const {error,value} = schema.validate(req.body)
    if(error){
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    next()
}

module.exports = {userValidateSignUp, userValidateSignIn}