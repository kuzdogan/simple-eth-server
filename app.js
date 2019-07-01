const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const Web3 = require('web3');
const truffle_connect = require('./connection/truffle_connect.js');
const bodyParser = require('body-parser');
const config = require("./config.js")
const HDWalletProvider = require("truffle-hdwallet-provider");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/', express.static('public_static'));

app.get('/getAccounts', (req, res) => {
  console.log("**** GET /getAccounts ****");
  truffle_connect.start(function (answer) {
    res.send(answer);
  })
});

app.get('/getNumber', (req, res) => {
  console.log("**** GET /getNumber ****");
  console.log(req.body);

  truffle_connect.getNumber( (answer) => {
    let number = answer;
    res.send(`The number is ${number}`);
  });
});

app.get('/getAccounts', (req, res) => {
  console.log("**** GET /getAccounts ****");
  console.log(req.body);

  truffle_connect.start( (accs) => {
    console.log(`Accounts are ${accs}`)
    res.send(`The number is ${accs}`);
  });
})

app.post('/setNumber', (req, res) => {
  console.log("**** POST /setNumber ****");
  console.log(req.body)
  let number = JSON.parse(req.body.number);
  console.log(`Setting number: ${number}`)
  truffle_connect.setNumber(number, (tx_result) => {
    console.log(tx_result)
    res.send(tx_result);
  });
});

app.listen(port, () => {

  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  truffle_connect.web3 = new Web3(new HDWalletProvider(config.mnemonic, "https://ropsten.infura.io/v3/" + config.infuraKey))
  truffle_connect.web3.eth.getAccounts(function(err, accs) {
    truffle_connect.account = accs[0]
  })
  console.log("Express Listening at http://localhost:" + port);

});