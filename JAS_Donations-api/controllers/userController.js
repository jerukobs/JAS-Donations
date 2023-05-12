const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcrypt')
const db = require('../dbConfig/dbConfig')

const userRegister = (req, res)=>{
    const {user_name, user_password, user_email} = req.body
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(user_password, salt, (err, hash)=>{
            const existingUser = db.query(`SELECT * FROM users WHERE user_name = '${user_name}'`, (err, result)=>{
                if(err) throw err
                if(result.length > 0){
                    return res.status(400).json({
                        message: 'User already exists'
                    })
                }
                else{
                    db.query(`INSERT INTO users VALUES ('', '${user_name}', '${hash}', '${user_email}')`, (err, result)=>{
                        if(err) throw err
                        if(result){
                            res.status(200).json(
                                {
                                    message: `Sign up succesfull, ${user_name}`
                                }
                            )
                        }
                    })
                }
            })
        })
    })
}

const userLogin =(req,res)=>{
    const {user_name, user_password} = req.body
    db.query(`SELECT * FROM users WHERE user_name = '${user_name}'`,(err,result)=>{
        if(err) throw err
        if(result){
            bcrypt.compare(user_password, result[0].user_password, (err,success)=>{
                if(err) throw err
                if(!success){
                    return res.status(400).json({
                        message : `Incorrect Logins`,
                    })
                }
                const {user_id} = result[0]
                    const token = jwt.sign(user_id, process.env.SECRET_KEY)               
                    res.status(200).json({
                        message : `Welcome ${user_name}, please do well to make a donation`,
                        token : token
                    })
            })
        }
    })
}

const userDonation = (req, res)=>{
    const {title,description,amount} = req.body

    const user_id =req.headers.verifyToken

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;

    db.query(`INSERT INTO donations VALUES ('', '${user_id}', '${title}', '${description}', '${amount}', '', '${currentDate}')`, (err, result)=>{
        if(err) throw err
        if(result){
            res.status(200).json({
                message: `Donation succesfull`
            })
        }
    })
}

const userFilter = (req, res)=>{
    const {location,cause,organization_size} =req.body
      if(organization_size || cause){
        db.query(`SELECT * FROM recepients WHERE organization_size = '${organization_size}' OR cause = '${cause}'`, (err, result)=>{
            if(err) throw err
            res.status(200).json(result)
        })
     }else if (location || cause){
        db.query(`SELECT * FROM recepients WHERE location = '${location}' OR cause = '${cause}'`, (err, result)=>{
            if(err) throw err
            res.status(200).json(result)
        })
     }else if(location || organization_size){
        db.query(`SELECT * FROM recepients WHERE location = '${location}' OR organization_size = '${organization_size}'`, (err, result)=>{
            if(err) throw err
            res.status(200).json(result)
        })
     }
}

module.exports = {userRegister,userLogin, userDonation, userFilter}