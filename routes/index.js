const express = require('express');
const router = express.Router();
const cors = require('cors')
const fetch = require('node-fetch')
const Sentiment = require('sentiment');

const corsOptions = {
  origin: [
      'http://localhost:9000',
      'http://localhost:8000',
      'http://portfolio.noindex.co',
      'https://portfolio.noindex.co'
    ],
  optionSuccessStatus: 200
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/history/:month/:date', cors(corsOptions), function(req, res, next) {
  let month = req.params.month
  let date = req.params.date
  let apiCall = `https://history.muffinlabs.com/date/${month}/${date}`
  fetch(apiCall)
  .then(res => res.json())
  .then(body => {
    let result = body.data.Events ? injectSentiment(body) : []
    res.json(result)
  })
})

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


//Maybe APOD? https://api.nasa.gov/planetary/apod?api_key=2mZ0n02qsUz2wGaHq2XWofoEFfXlNGRmEBpFJ0Rf


module.exports = router;
