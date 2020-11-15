const request = require('request')
// ' + encodeURIComponent(address) + '
//${address}

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + (address) + '.json?access_token=pk.eyJ1IjoiYWtzaGF5OTciLCJhIjoiY2tneXh1bHJhMG1nNDJ5cGRsMGxjYjVobyJ9.JhQT53NskKd6wcFitZZUAA&limit=1'
    request({url,json:true}, (error, {body} = {} ) => {
        if(error){
            callback("Unable to connect the map location services!." ,undefined)
        }else if(body.features.length === 0){
            callback("Unable to find the location and try another search!.",undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
/*
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYWtzaGF5OTciLCJhIjoiY2tneXh1bHJhMG1nNDJ5cGRsMGxjYjVobyJ9.JhQT53NskKd6wcFitZZUAA&limit=1`
    request({url,json:true}, (error,{body} = {}) => {
        if(error){
            callback("Unbale to connect the Map Location Services",undefined)
        }else if(body.features.length === 0){
            callback("Unable to  find the Location try another search",undefined)
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
*/
module.exports = geocode;