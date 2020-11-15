const path = require('path');
const express = require('express')
const hbs = require('hbs')
const geocode = require('./Utils/geocode');
const forecast = require('./Utils/forecast');


const app = express()

//Define the path for Express Config
const publicPath = path.join(__dirname,"../public")
const viewpath = path.join(__dirname,"../templates/views")
const partialspath = path.join(__dirname,"../templates/partials")

// Path for the Handle bars
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialspath)

//Set up static directory to server
app.use(express.static(publicPath));

app.get('',(req,res) => {
    res.render('index',{
        title : " Weather App",
        name : "Andrew Mead"
    });
})
app.get('/about',(req,res) => {
    res.render('about',{
        title : "About Me",
        name:"Andre Mead"
    })
})
app.get('/help',(req,res) => {
    res.render('help',{
        title:"Help Page",
        name:"Andrew Mead"
    })
})

//Array Object
app.get('/weather' ,(req,res) => {
    //Query String is handled by request
   // const newAddress = req.query.address;
    if(!req.query.address){
      return res.send({
            error: "You Must Enter the Address"
        })
    }
    //console.log(req.query.address)
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
           return res.send({error})
        }
        console.log(longitude, latitude);
        forecast(latitude, longitude, (error,forecastData) => {
            console.log(forecastData)
            if(error){
              return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            })
            console.log(req.query.address)
        })
        
        //
    })
    /*
    res.send({
        location:"Philedelphia",
        forecast:"It is Snowing",
        address:req.query.address
    })
    */
})
app.get('/product',(req,res) => {
    //Query String handled by request
    if(!req.query.search){
       return res.send({
            Error: "You Must Enter The Search Item"
        })
    }
    res.send({
        product:[]
    })
})
app.get('/help/*',(req,res) => {
    res.render('404',{
        title:404,
        name:"Andrew",
        errorMessage:"Help Article not found"
    })
})
app.get('*',(req,res) => {
    res.render('404',{
        title:404,
        name: "Andrew",
        errorMessage:"My 404 Page"
    })
})
app.listen(3000, () => {
    console.log("Server Up and Running!..")
})
