const config = require("./config.js")
const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {

  networks: {

    ropsten: {
      provider: function() {
        return new HDWalletProvider(config.mnemonic, "https://ropsten.infura.io/v3/" + config.infuraKey)
      },
      network_id: 3
    }   
  },
}
