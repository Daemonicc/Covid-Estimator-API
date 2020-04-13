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
  let timer = Math.round(time)
  function padDigits(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}
 if (timer < 10) {
   timer = padDigits(timer, 2)
 }
  const log = `${req.method}\t\t${req.url}\t\t${res.statusCode}\t\t${timer}ms\n`;
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
