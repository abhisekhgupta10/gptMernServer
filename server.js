const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const Port = process.env.PORT || 8000
const app = express()
const cors = require('cors')
const os = require('os');
const { Configuration, OpenAIApi} = require('openai')
// app.use(cors({
//   origin: 'https://gptclon.onrender.com',
//   methods:['GET','POST'],
//   allowedHeaders: ['Content-Type'],
//   credentials:true,  
// }))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


const configuration = new Configuration({
  apiKey: process.env.URI_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/text',async (req,res)=>{
 

const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt:req.body.prompt,
  max_tokens:3000,
  temperature:0.2,
  stop:'/n',
});

res.json(response.data.choices[0].text)
})

app.post('/image',async(req,res)=>{
// console.log(os.networkInterfaces())

    const response = await openai.createImage({
        prompt:req.body.prompt,
        n:3,
        size: "512x512",
      });
      res.json(response.data.data)
})



app.listen(Port,()=>{
    console.log('listening...',Port)
})