const request = require('request')

const geoCode = (address , callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoibXVoYW1tYWR3YXNheWtoYW4iLCJhIjoiY2s2MjFwc2dhMDl1YTNtcDI2MGwzbWpnNCJ9.3AcuJ0KOxpg78vXdLAtEFA&limit=1'
    request({url: url, json: true},(error,response)=>{
        if(error){
           callback('unable to connect',undefined)
        }
      //  else if(response.body.features.length === 0){
           // callback('unable to find locataion,Try another search..',undefined)
        //}
        else{
            callback(undefined,{
                latitude: response.body.features[3].center[1],
                longitude:response.body.features[3].center[0],
               
                 location: response.body.features[0].place_name
            })
           
        }
    })
    
    }

    module.exports = geoCode