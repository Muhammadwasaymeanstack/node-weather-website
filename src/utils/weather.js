const request = require('request')

//callback funtion for weather forecast
const forecast = (latitude,longitude,callback)=>{
    const url=  'https://api.darksky.net/forecast/5c191744a60f522c5d5560d0e1fca647/'+ latitude + ',' + longitude + ''
    request ({ url: url,json: true},(error,response)=>{
    if(error){
        callback('unable to find weather updates',undefined)
    } 
    else if(response.body.error){
        callback('unable to find location, try some other search',undefined)
    }
    else{
        callback(response.body.daily.data[0].summary +' It is currently '+ response.body.currently.temperature + ' degrees tempreture. And '+ response.body.currently.precipProbability+'%' +' chances of rain')
 }
    
})
}
    module.exports=forecast
    