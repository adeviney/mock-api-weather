const express = require('express')
const app = express()
const port = 3000
const sampledata_corvallis = require("./sampledata_corvallis.json")
const sampledata_boulder = require("./sampledata_boulder.json")
const sampledata_corvallis_imperial = require("./sampledata_corvallis_imperial.json")
const sampledata_corvallis_tempContainsEight = require("./sampledata_corvallis_tempContainsAnEight.json")

app.get('/', (req, res) => {
  res.send(`
  You've reached the index of a Mock API. <br/>
  To get a response, GET /data/2.5/weather?lat=[x]&lon=[x]&appid=[x]  <br/>
  API Key is 1234. <br/>
  <br/>
  Weather from two locations is available <br/>
  <ul>
    <li>Corvallis, OR -- this is the default for any lat or lon</li>
    <li>Boulder, CO -- lat=40.015&lon=105.2705</li>
  </ul>
`)
})

app.get('/data/2.5/weather', (req, res) => {
    if (req.query.appid != "1234" && req.query.appid != "d7c9477357dddb826aec055177569789") {
      res.send("Oops! Please use your API key. (1234)")
    }
    else if ((!req.query.lat || !req.query.lon) && !req.query.q) {
      res.send("Oops! Please provide parameters for either q or both latitude and longitude. (these can be dummy values)")
    }
    else if (req.query.units === "imperial") {
      res.json(sampledata_corvallis_imperial)
    }
    else if (req.query.lat === "40.015" && req.query.lon === "105.2705") {
      res.json(sampledata_boulder)
    }
    else if (req.query.lat === "44.56" && req.query.lon == "123.26") {
      res.json(sampledata_corvallis)
    }
    else {
      res.redirect("http://localhost:3000/data/2.5/weather?appid=1234&lat=44.56&lon=123.26")
    }

  })

  app.get('/lucky/data/2.5/weather', (req, res) => {
    if (req.query.appid != "1234" && req.query.appid != "d7c9477357dddb826aec055177569789") {
      res.send("Oops! Please use your API key. (1234)")
    }
    else {
      res.json(sampledata_corvallis_tempContainsEight)
    }
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})