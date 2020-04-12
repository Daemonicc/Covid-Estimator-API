const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path')

const app = express();

const getDurationInMilliseconds  = (start) => {
  const zeroPad = (num, places) => String(num).padStart(places, '0')
  const NS_PER_SEC = 1e9
  const NS_TO_MS = 1e6
  const diff = process.hrtime(start)

  const time = Math.trunc((diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS)

  if (time <= 9){
    return zeroPad(num, 2)
  }else{
    return time
  }
  
}


app.use((req, res, next) => {
  const start = process.hrtime()
  console.log(start)         
    const durationInMilliseconds = getDurationInMilliseconds (start)
    const log = `${req.method}\t\t${req.url}\t\t${res.statusCode}\t\t${durationInMilliseconds.toLocaleString()}ms\n`;
    const logPath = path.join(__dirname, 'HttpLog.txt')
    console.log('writing')
    fs.appendFileSync(logPath, log, (err) => {
      if (err) {
        console.log(err);
      }
    });
  next()
})

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
;

app.use(routes);


app.listen(process.env.PORT || 8080, process.env.IP, () => {
  console.log('Server Has Started!');
});
