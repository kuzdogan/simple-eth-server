# simple-eth-server
A Truffle repository that:
- Compiles and deploys a contract

and a server that:
- Interacts with the simple contract

The Ethereum account used here in `config.js` is only for development purposes and only used in Ropsten network. Do not share your account seed(mnemonic) publicly.
# Usage

## 1. Install truffle
Install truffle globally by:
```
npm i -g truffle
```

If you'd like you can install truffle locally with `npm i truffle` and run by `node_modules/.bin/truffle`

Just bear in mind having an npm script such as `npm run truffle` does not parse the `--network` flag and causes errors.

## 2. Install dependencies
```
npm install
```

When installing if you encounter an error similar to this:
```
npm ERR! code EISGIT
npm ERR! git /{$HOME}/Desktop/repos/simple-eth-server/node_modules/web3-providers-ws/node_modules/websocket: Appears to be a git repo or submodule.
```
Remove the `.git` folder in websocket. This is due to `truffle-hdwallet-provider` using an older version of web3:
```
rm -r node_modules/web3-providers-ws/node_modules/websocket/.git
```

## 3. Compile the contract
```
truffle compile
```

This will create artifacts in /build/contracts/
These are files which describe the contract addresses, the networks on which the contracts have been deployed and the functions which contracts have.

These *.json files contain descriptions of their respective smart contracts. These files enables Truffle to create a JavaScript wrapper for communicating with the smart contract. For example, when you call contract.address in your JavaScript code, the Truffle framework reads the address from the *.json file and enables effortless transitions between contract versions and networks.[^1]

## 4. Migrate

You can deploy the contract to any network you'd like. In this example we will be using the Ropsten network.
Deploy with
```
truffle migrate --network ropsten
```

## 5. Run the server
Run the express server with
```
node app.js
```

You can access the server at `http://localhost:3000/`


# API

| Endpoints | Function | Type | Params |  |
|--------------|------------------------------------------------------------------|------|------------------|---|
| /getAccounts | Returns accounts associated with the seed provided to the wallet | GET |  |  |
| /getNumber | Returns the number as response | GET |  |  |
| /setNumber | Sets the stored number in the contract to the provided number. Prints the result on the backend console. | POST | { number: uint } |  |

[^1]: https://www.sitepoint.com/truffle-migrations-explained/


Infura 
It is a method for connecting to the Ethereum network without having to run a full node,

To deploy via Infura you'll need a wallet provider (like truffle-hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node.