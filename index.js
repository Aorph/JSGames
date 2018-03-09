const express = require('express');
const app = express();
const Chance = require('chance');
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
var chance = new Chance();
var result;
var IAChoice;
var USRChoice;
var choices;

app.get('/init', function (req, res) {
  choices = [
    "pierre",
    "feuille",
    "ciseaux",
  ];
  //console.log(choices);
  res.send(true);
});

app.post('/turn', function (req, res) {
  IAChoice = chance.integer({min: 0, max: 2});
  USRChoice = req.body.usrChoice;
  result = choices[IAChoice];
  //console.log(USRChoice);
  //console.log(result);
  if (result == USRChoice) {
    res.send({
      IAchoice: result,
      victory: "draw",
    });
  } else if (USRChoice == "pierre" && result == "feuille") {
    res.send({
      IAchoice: result,
      victory: "computer",
    });
  } else if (USRChoice == "feuille" && result == "ciseaux") {
    res.send({
      IAchoice: result,
      victory: "computer",
    });
  } else if (USRChoice == "ciseaux" && result == "pierre") {
    res.send({
      IAchoice: result,
      victory: "computer",
    });
  } else {
    res.send({
      IAchoice: result,
      victory: "user",
    });
  }
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
