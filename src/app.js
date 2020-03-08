const path =require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/weather')
const app = express() 

//define path for express config
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
//sets views directory to templates, express path setting
app.set('views',viewsPath)

//hbs 
hbs.registerPartials(partialsPath)

//setup static directory to server
app.use(express.static(publicDir))


//get tells what the server should do when requested

app.get('',(req,res) => {
  res.render('index', {
      title: 'Weather App',
      name : 'Wasay khan'
     
  })
})  

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header(
        'Access-Control-Allow-Headers',
        'Original, X-Requested-with, Content-Type, Accept, Authorization'
    )
    if (req.method === 'OPTIONS'){
        res.header('Access-Control_Allow-Methods','PUT,POST,PATHC,DELETE')
        return res.status(200).json({})
    }
    })

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name : 'wasay khan'
      

    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        Helptext:'How may I help You..!',
        title:'Help',
        name : 'wasay khan'
        

    })
})
app.get('/weather',(req,res)=>{

   if(!req.query.address){
        return res.send({
             error:'You must provide an address'
         })
 
     }

     geocode(req.query.address,(error,{latitude,longitude,location})=>{
        if(error){
            return res.send ({
                error:' You must provide an address'
            })
    }

    forecast(latitude,longitude,(error,foreCastData)=>{
        if(error){
            return res.send({error})
        }
   
    res.send({
        
       forecast: foreCastData,
       location,
       address: req.query.address
            })
        })
    })
   
})
  
 

app.get('/product',(req,res)=>{
    if(!req.query.search){
   return res.send({
        error:'You must provide search terms'
    })
}
    console.log(req.query.search) 
 res.send({
        product:[]
    })
})



app.get('/help/*',(req,res)=>{
    res.render('404',{
        name : 'khan',
        title:'Help page',
        errorMsg:'Help article not found'
    } )
})


// the "*" will match the URL which hasnot been matchh
app.get('*',(req,res)=>{
    res.render('404',{
        name:'wasay',
        title:'Error 404',
        errorMsg : 'Page not found'
    })
})
//app.com                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
//app.com/help
//app.com/about

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})