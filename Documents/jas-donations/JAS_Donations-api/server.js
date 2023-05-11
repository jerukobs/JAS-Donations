const express = require('express')
const app = express()
const db = require('./dbConfig/dbConfig')

app.get('', (req, res)=>{

})
app.post('', (req, res)=>{

})
app.put('', (req, res)=>{

})
app.delete('', (req, res)=>{

})


db.connect((err)=>{
    if(err) throw err
    console.log('DB Connected')
    
    app.listen(3006, (err)=>{
        if(err){ throw err}
        console.log('Server Started')
    })
})