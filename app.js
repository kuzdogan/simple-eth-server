const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const Web3 = require('web3');
const truffle_connect = require('./connection/truffle_connect.js');
const bodyParser = require('body-parser');
const config = require("./config.js")
const HDWalletProvider = require("truffle-hdwallet-provider");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

// app.use('/', express.static('public_static'));

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
app.get('/getString', (req, res) => {
  console.log("**** GET /getString ****");
  console.log(req.body);

  truffle_connect.getString( (answer) => {
    let str = answer;
    res.send(`The string is: ${str}`);
  });
});

app.post('/setString', (req, res) => {
  console.log("**** POST /setString ****");
  console.log(req.body)
  let string = JSON.stringify(req.body.string);
  console.log(`Setting string: ${string}`)
  truffle_connect.setString(string, (tx_result) => {
    console.log(tx_result)
    res.send(tx_result);
  });
});

app.listen(port, () => {
  // Use the HDWalletProvider as the Web3 procider. 
  // Input the wallet seed and connect to the Infura node 
  truffle_connect.web3 = new Web3(new HDWalletProvider(config.mnemonic, "https://ropsten.infura.io/v3/" + config.infuraKey))
  truffle_connect.web3.eth.getAccounts(function(err, accs) {
    truffle_connect.account = accs[0]
  })
  console.log("Express Listening at http://localhost:" + port);

});