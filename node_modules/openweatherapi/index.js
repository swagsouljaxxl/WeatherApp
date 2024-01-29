var http = require('http')
var through = require('through')
var JSONStream = require('JSONStream')

module.exports.fetchWeather = function (params) {
  if (!params.lat || !params.lng) throw new Error('set latitude and longitude')
  var returnStream = through(function write (data) {
    if (data.main && data.main.temp)
      this.emit('data', {temp: data.main.temp, description: data.weather[0].description})
  })
  this.params = params
  http.get("http://api.openweathermap.org/data/2.5/weather?lat=" + params.lat + "&lon=" + params.lng + "&units=metric", function (res) { res.pipe(JSONStream.parse()).pipe(returnStream) })
  return returnStream
}
