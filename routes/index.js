const express = require('express');
const xml = require('xml2js');
const fs = require('fs');
const path = require('path')


const builder = new xml.Builder({
  renderOpts: { pretty: false },
  headless: true,
  explicitRoot: true,
  rootName: 'estimate'
});
const router = express.Router();
const covid19ImpactEstimator = require('../estimator');

router.post('/api/v1/on-covid-19', (req, res) => {
  try {
    const data = req.body;
    const result = covid19ImpactEstimator(data);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({ error: error.message});
  }
});


router.post('/api/v1/on-covid-19/json', (req, res) => {
  try {
    const data = req.body;
    const result = covid19ImpactEstimator(data);
    res.set('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({ error: error.message});
  }
});
router.post('/api/v1/on-covid-19/xml', (req, res) => {
  try {
    const data = req.body;
    const result = covid19ImpactEstimator(data);

    const resultXML = builder.buildObject(result);
    res.set('Content-Type', 'application/xml');
    res.status(200).send(resultXML);
  } catch (error) {
    res.status(500).send({ error: error.message});

  }
});

router.get('/api/v1/on-covid-19/logs', (req, res) => {
  try {
    const logPath = path.join(__dirname, '../HttpLog.txt')
    const data = fs.readFileSync(logPath, 'utf8');
    res.set('Content-Type', 'text/plain');
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: error.message});
  }
});

module.exports = router;
