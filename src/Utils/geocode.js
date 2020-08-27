const request = require("request")

const geocode = (address,callback) => {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiY2hhaXRhbnlhLWd1amFyYXRoaSIsImEiOiJja2UxOHljYzQwOTB1MnJwNHM0N3dud2Z0In0.zNG7Yskdvaua0pk3S7X66w&limit=1'
    request({url,json:true},(error,{body})=>{
      if(error)
      {
          callback('unable to connect location services',undefined)
      }
      else if(body.features.length === 0)
      {
        callback('Cannot find the location',undefined);
      }
      else 
      {
          callback(undefined,{
           latitude:body.features[0].center[1],
           longitude:body.features[0].center[0],
           location:body.features[0].place_name
          })
      }
    }
    )
   }

   module.exports=geocode