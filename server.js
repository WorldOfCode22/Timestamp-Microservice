ar express = require('express');
var router = express.Router();
var path = require('path');
var app = express();

router.get('/',(req,res)=>{
  res.sendFile('index.html', { root: path.join(__dirname, '/views') });
});

router.get('/:time',(req,res)=>{
  var input = req.params.time;
  var stampExpression = /^[0-9]/;
  var nativeExpression = /^[a-zA-Z]/
  var inputVal = parseInt(input);
  if(stampExpression.test(input)){
    var stamp = new Date(inputVal*1000);
    var year = stamp.getUTCFullYear().toString();
    var month = stamp.getUTCMonth();
    var day = stamp.getUTCDate().toString();
    switch(month){
      case 0:
        month = "January";
        break;
        case 1:
        month = "February";
        break;
        case 2:
        month = "March";
        break;
        case 3:
        month = "April"
        break;
      case 4:
        month = "May";
        break;
      case 5:
        month = "June";
        break;
      case 6:
        month = "July";
        break;
        case 7:
        month = 'August';
        break;
      case 8:
        month = 'September';
        break;
        case 9:
        month = 'October'
        break;
        case 10:
        month = 'November'
        break;
        case 11:
        month = "December"
        break;
                }
    var result = (month+'-'+day+'-'+year);
    var responseObject = {unix:input,native:result};
    res.send(responseObject);
  }
  else{
    var input = req.params.time;
    var stamp = Date.parse(input);
    if(!stamp){
      res.send({unix:'null',native:'null'});
    }
    else{
    responseObject = {unix:stamp,native:input};
    res.send(responseObject);
    }
  }
  //var responseObject = {time:time};
  //res.send(responseObject);
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.use('/',router);
