var test = require('tap').test
var openweatherapi = require('../')

test('first test', function (t) {
  openweatherapi.fetchWeather({lat: 5.9, lng: 7.5}).on('data', function (data) {
    t.ok(data.temp, 'temperature should exist')
    t.ok(data.description, 'description should exist')
  }).on('end', function () {
    t.end()
  })
})
