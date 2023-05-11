const express = require('express')
const app = express()
const db = require('./dbConfig/dbConfig')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretkey = "JAS@12345"

app.use (express.json())

app.get('', (req, res)=>{

})
app.post('/signup', (req, res)=>{
    const {user_name, user_password, user_email} = req.body
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(user_password, salt, (err, hash)=>{
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
                    const token = jwt.sign(user_name, secretkey)               
                    res.status(200).json({
                        message : `Welcome ${user_name}, please do well to make a donation`,
                        token : token
                    })
            })
        }
    })
})

app.post('/donation',(res,req)=>{
    
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
    
    app.listen(3006, (err)=>{
        if(err){ throw err}
        console.log('Server Started ')
    })
})