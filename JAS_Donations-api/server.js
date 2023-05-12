const express = require('express')
const app = express()
const db = require('./dbConfig/dbConfig')
const {userValidateSignUp, userValidateSignIn} = require('./validators/userValidator')
const {authMiddleware} = require('./middlewares/userMiddleware')
const cors = require('cors')
const { userLogin, userRegister, userDonation, userFilter } = require('./controllers/userController')

require('dotenv').config()

app.use (express.json())
app.use(cors())

app.get('/filter', userFilter)

app.post('/signup', userValidateSignUp, userRegister)

app.post('/login',userValidateSignIn, userLogin)

app.post('/donation', authMiddleware, userDonation)

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