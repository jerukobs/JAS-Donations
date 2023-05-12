const express = require('express')
const app = express()
const db = require('./dbConfig/dbConfig')
const bcrypt = require('bcrypt')
const {userValidate} = require('./validators/userValidator')
const {authMiddleware} = require('./middlewares/userMiddleware')
const jwt = require('jsonwebtoken')
const cors = require('cors')
require('dotenv').config()

app.use (express.json())
app.use(cors())

app.get('/filter', (req, res)=>{
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
})

app.post('/signup', userValidate,(req, res)=>{
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
})

app.post('/login',(req,res)=>{
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
})

app.post('/donation', authMiddleware, (req, res)=>{
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
})

app.put('', (req, res)=>{

})
app.delete('', (req, res)=>{

})



db.connect((err)=>{
    if(err) {
        throw err
    }
    else{
        console.log('DB Connected ')
    }
    
    app.listen(process.env.PORT, (err)=>{
        if(err){ throw err}
        console.log('Server Started on Port ' + process.env.PORT)
    })
})