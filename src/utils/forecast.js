const request = require('request');
const forecast = (lattitude , longitude , callback) => {
    const url = 'https://api.darksky.net/forecast/72463e4e91fcee711de15e124f777699/'+lattitude+','+longitude+"?unit=in";
        request({url:url , json:true } , (error , response) => {
        if (error) {
           callback("unable to connect to location service" , undefined);
       } else if (response.body.error) {
           callback("unable to find location , try another search" , undefined);
       } else {
           callback(undefined ,response.body.daily.data[0].summary+' it is currently '+response.body.currently.temperature+' degrees out');
       }
    })
}
module.exports = forecast;