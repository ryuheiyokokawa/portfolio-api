const express = require('express');
const router = express.Router();
const cors = require('cors')
const fetch = require('node-fetch')

const corsOptions = {
  origin: 'http://portfolio.noindex.co:8000',
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
    res.json(body)
  })
})

//Maybe APOD? https://api.nasa.gov/planetary/apod?api_key=2mZ0n02qsUz2wGaHq2XWofoEFfXlNGRmEBpFJ0Rf


module.exports = router;
