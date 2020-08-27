const path=require('path')
const express = require('express')
const hbs = require('hbs')
const geocode=require('./Utils/geocode')
const forecast = require('./Utils/forecast')

const app = express()
const port=process.env.PORT || 3000

//Define path for express config
const viewPath = path.join(__dirname,'../templates/views')
const publicDirectoryPath = path.join(__dirname,'../public')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engines and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//Setup Static library to Server
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) =>{
    res.render('index',{
        title:'Weather App',
        name:'Chaitanya Gujarathi'
    })
})



app.get('/About',(req,res)=>{
    res.render('About',{
        title:'About Me',
        name:'Chaitanya Gujarathi',
        title:'About Me'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        title:'Help',
        name:'Chaitanya Gujarathi'
    })
})

app.get('',(req,res)=>{
 res.send("<h1>weather</h1>")
})


app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:"Address is Required"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
  
    if(error)
    {
       return  res.send({error})
    }
     forecast(latitude,longitude,(error,forecastData)=>{
          
      if(error)
      {
          return res.send({error})
      }
      res.send({
          forecast:forecastData,
          location,
          address:req.query.address
      })
     })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return  res.send({
            error:'You must provide Search term'
        })
    }
    console.log(req.query.search)
    res.send({
    products:[]
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Help article not found',
        errorMessage:'404',
        name:'Andrew Mead'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Andrew Mead',
        errorMessage:'page not found'
    })
 })

app.listen(port,()=>{
    console.log("Listening"+port)
})
