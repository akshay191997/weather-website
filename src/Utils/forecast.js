const request = require('request')

//' + latitude + "," + longitude + '
//${latitude} "," ${longitude}
//const forecast = (adress, callback)
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fa3485b4b433aa2f1c9e1df316c931e5&query=' + latitude + "," + longitude + '&units=m'
   // const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + adress + '&appid=1cb42ca472db5d2e7c5a9c5f054e23b9'
    request({url,json:true}, (error, {body} = {}) =>{
        if(error){
            callback("Unable to connect Weather Services!",undefined)
        }else if(body.error){
            callback("Unable to find the Location!.",undefined)
        }else{
            callback(undefined,
                (body.current.weather_descriptions[0] +  " Current Temperarure :" + body.current.temperature + " degree it feels like :" + body.current.feelslike + " degree out side :"  + 
                 " Wind Speed :" + body.current.wind_speed + " Humidity :" + body.current.humidity)
                /*
                {
                    description : body.current.weather_descriptions[0],
                    windspeed : body.current.wind_speed,
                    humidity : body.current.humidity,
                    could :body.current.cloudcover
            }
              */ 
              
            )
        }
    })
}


/*
const forecast = (latitude, longitude, callback) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=1cb42ca472db5d2e7c5a9c5f054e23b9&units=metric`
    request({url:url,json:true},(error,response) => {
        const data = response.body;
        if(error){
            callback("Unbale to Connect Weather Services",undefined)
        }else if (response.body.error){
            callback("Please enter the valid code",undefined)
        }else{
            callback(undefined,
                ( data.name + " Current temperature " + data.main.temp + " It feels like " + data.main.feels_like + " degree")
    )
        }
        })
}
*/
/*
const forecast = (latitude, longitude, callback) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=1cb42ca472db5d2e7c5a9c5f054e23b9&units=metric`
    request({url,json:true},(error,{body} = {}) => {
        //const data = response.body;
        if(error){
            callback("Unbale to Connect Weather Services",undefined)
        }else if (body.error){
            callback("Please enter the valid code",undefined)
        }else{
            callback(undefined,
                ( body.name + " Current temperature " + body.main.temp + " It feels like " + body.main.feels_like + " degree")
    )
        }
        })
}
*/
module.exports = forecast;