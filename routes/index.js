require('dotenv').config()//Gotta load some api keys
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')
const Sentiment = require('sentiment');
const phq = require('predicthq');
const pClient = new phq.Client({access_token: process.env.PREDICT_KEY, fetch: fetch });



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * Day in history part of the weather app
 */
router.get('/history/:month/:date', function(req, res, next) {
  let month = req.params.month
  let date = req.params.date
  let apiCall = `https://history.muffinlabs.com/date/${month}/${date}`
  fetch(apiCall)
  .then(res => res.json())
  .then(body => {
    //If the data exists, pass it off to the sentiment injector.
    let result = body.data.Events ? injectSentiment(body) : []
    res.json(result)
  })
})

/**  
 * Injects sentiment so we can figure out if the event has positive or negative connotations based on language used.
 * This isn't perfect, but its sort of fun!
 */
const injectSentiment = (body)=> {
  let events = body.data.Events.reverse() //year,text
  let event_sentiment = []
  let sentiment = new Sentiment();
  events.forEach(event => {
    let wSentiment = {
      year: event.year,
      text: event.text,
      sentiment: sentiment.analyze(event.text)
    }
    event_sentiment.push(wSentiment)
  })
  return event_sentiment
}

/**
 * Pulls weather from the openweathermap.org data sets.
 * 
 */
router.get('/weather', function(req,res,next) {
  let apiCall = "http://api.openweathermap.org/data/2.5/forecast?q=Seattle,US&units=metric&appid="+process.env.WEATHER_KEY
  fetch(apiCall)
  .then(res => res.json())
  .then(body => {
    res.json(body)
  })
})


/**
 * Pulls event data from predictHQ
 */
router.get('/events/:today',function(req,res,next) {  
  const withinParam = '10km@47.6062101,-122.3320717';//Downtown Seattle
  pClient.events.search({
      'start.gte': req.params.today,
      'start.lte': req.params.today,
      within: withinParam
  }).then((results) => {
      res.json(results)
  }).catch(error => {
      res.json(error)
  })

})


module.exports = router;
