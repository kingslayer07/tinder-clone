import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Cards from './dbCards.js'

// app config
const app = express()
const port = process.env.PORT || 8001
const connection_url = 'mongodb+srv://admin:J5SkrC75cX1xJ807@cluster0.1f6ht.mongodb.net/tinderdb?retryWrites=true&w=majority' 
// middleware
app.use(express.json())
app.use(cors())

// db config
mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
// password - J5SkrC75cX1xJ807

// api endpoints
app.get('/',(req,res)=> res.status(200).send('hemlo bolte'))

app.post('/tinder/card', (req, res)=>{
    const dbCard =req.body 

    Cards.create(dbCard, (err, data)=>{
        if(err){
            res.status(500).send(err)
        } else{
            res.status(200).send(data)
        }
    })

})

app.get('/tinder/card', (req, res)=>{
     
    Cards.find((err, data)=>{
        if(err){
            res.status(500).send(err)
        } else{
            res.status(200).send(data)
        }
    })

})
// listners
app.listen(port, ()=> console.log(`listening at port : ${port}` ))