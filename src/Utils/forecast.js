const request = require('request')

const url='http://api.weatherstack.com/current?access_key=1ae875680c7ca4647d7c63bde7521a97&query=37.8267,-122.4233&units=f'

const forecast = (lat,lon,callback) => {
   const url='http://api.weatherstack.com/current?access_key=1ae875680c7ca4647d7c63bde7521a97&query=' + lat + ',' + lon + '&units=f'
   request({url,json:true},(error,{body}) =>{
       if(error)
       {
        callback('Unable to connect.. Check Internet Connection',undefined)
       }
       else if(body.error)
       {
         callback('Unable to find the location',undefined)
       }
       else
       {
           callback(undefined,
               'It is '+body.current.weather_descriptions[0]+'but feels like '
               +body.current.feelslike+' degree Fahrenhit'
           )
       }
   })
}

module.exports=forecast