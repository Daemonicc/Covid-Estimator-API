const express = require('express');
const bodyParser = require('body-parser');
const responseTime = require('response-time');
const fs = require('fs');
const path = require('path')

const app = express();


const routes = require('./routes/index');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Orgin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET, PATCH');
    return res.status(200).json({});
  }
  next();
});

app.use(responseTime((req, res, time) => {
  const log = `${req.method}\t\t${req.url}\t\t${res.statusCode}\t\t${Math.trunc(time)} ms\n`;
  const logPath = path.join(__dirname, 'HttpLog.txt')
  fs.appendFile(logPath, log, (err) => {
    if (err) {
      console.log(err);
    }
  });
}));

app.use(routes);


app.listen(process.env.PORT || 8080, process.env.IP, () => {
  console.log('Server Has Started!');
});
