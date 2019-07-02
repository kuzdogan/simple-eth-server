const contract = require('truffle-contract');

const storage_artifact = require('../build/contracts/Storage.json');
var Storage = contract(storage_artifact);

module.exports = {
  start: function(callback) {
    var self = this;
    console.log('Inside start')
    // Bootstrap the Storage abstraction for Use.
    Storage.setProvider(self.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    self.web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      // self.accounts = accs;
      // self.account = self.accounts[2];

      // callback(self.accounts);
      callback(accs)
    });
  },
  getNumber: function(callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    Storage.setProvider(self.web3.currentProvider);
    
    Storage.deployed().then(function(instance) {
      return instance.getNumber.call();
    }).then(function(value) {
        callback(value.valueOf());
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  },
  setNumber: function(number, callback) {
    var self = this;

    Storage.setProvider(self.web3.currentProvider);
    console.log('Setting number in truffle_connect')
    Storage.deployed().then(function(instance) {
      console.log('DEPLOYED')
      instance.setNumber(number, {from: self.account}).then( (result) => {
        callback(result);
        return result;
      });
    }).then(function() {
        
    }).catch(function(e) {
        console.log('FAILED')
        console.log(e);
        callback("Error 404");
    });
  }
}