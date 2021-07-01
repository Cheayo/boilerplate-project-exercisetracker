const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
var usersList = [];
var usersExerciseLog = {};

require('dotenv').config();

app.use(cors());
app.use(express.static('public'));
app.use('/api/users', bodyParser.urlencoded({extended: false}));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/users', function (req, res) {
  let usersResponse = [];

  for (var [_id, username] of usersList.entries()) {
    _id = _id.toString();
    usersResponse.push({username, _id});
  }
  
  res.json(usersResponse);
});


app.post('/api/users', function (req, res) {
  if (!usersList.includes(req.body.username)) {
    usersList.push(req.body.username);
  };
  
  res.json({username: req.body.username, _id: usersList.indexOf(req.body.username)});

});

app.post('/api/users/:_id/exercises', function (req, res) {
  let exDate = "";

  if (req.body.date === '' || req.body.date === undefined) {
    exDate = new Date().toDateString();
  } else {
    exDate = new Date(req.body.date).toDateString();
  }

  if (req.body._id in usersExerciseLog) {
    usersExerciseLog[req.params._id].push({date: exDate, duration: parseInt(req.body.duration), description: req.body.description});
  } else {
    usersExerciseLog[req.params._id] = [{date: exDate, duration: parseInt(req.body.duration), description: req.body.description}];
  }

  res.json({username: usersList[req.params._id], _id: parseInt(req.params._id), date: exDate, duration: parseInt(req.body.duration), description: req.body.description});
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
