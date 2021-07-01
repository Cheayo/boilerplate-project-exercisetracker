const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
var usersList = [];

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


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
