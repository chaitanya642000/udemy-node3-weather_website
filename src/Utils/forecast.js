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
               'It is '+body.current.weather_descriptions[0]+' but feels like '
               +body.current.feelslike+' degree Fahrenhit.'+' Weather Description is '+body.current.weather_descriptions[0]+'. Wind Speed is about '+body.current.wind_speed+' mph blowing at an angle of '+body.current.wind_degree+" degress "+body.current.wind_dir+'. Precipitation level is '+body.current.precip+' and humidity level is '+body.current.humidity+'. The visibility level is '+body.current.visibility+' and uv index is about '+body.current.uv_index+'. The weather is recorded at '+body.location.localtime+'.'
           )
       }
   })
}

module.exports=forecast

