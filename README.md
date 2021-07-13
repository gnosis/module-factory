# Module Factory

[![Build Status](https://github.com/gnosis/module-factory/actions/workflows/ci.yml/badge.svg)](https://github.com/gnosis/module-factory/actions)
[![Coverage Status](https://coveralls.io/repos/github/gnosis/module-factory/badge.svg?branch=master)](https://coveralls.io/github/gnosis/module-factory?branch=master)

The purpose of the Module Factory repository is to make easier the deployment of Safe Modules. Applying the [Minimal Proxy Pattern](https://eips.ethereum.org/EIPS/eip-1167) reduces the gas cost and simplifies the track of deployed modules. Minimal Proxy Pattern has been used because the modules do not need to be upgradeable since a safe can deploy a new one. It's worth mentioning that it costs roughly 5,000 extra gas for each transaction when you use a proxy, so after a certain amount of transactions (~700) it probably will be cheaper to deploy the module from the constructor rather than the proxy.

There's also a JS API, allowing the developers to interact with the ProxyFactory Contract more easily. You can check the [factory](./src/factory.ts) file to see more details, it consists on 4 methods, which are:

### Deploy and set up module

- Interface: `deployAndSetUpModule(moduleName, args, provider, chainId)`
- Arguments:
  - `moduleName`: Name of the module to be deployed, note that it needs to exist as a key in the [CONTRACT_ADDRESSES](./src/constants.ts) object
  - `args`: Arguments of the `setUp` function of the module to deploy
  - `provider`: Ethereum provider, expects an instance of `JsonRpcProvider` from `ethers`
  - `chainId`: Number of network to interact with
- Returns: An object with the transaction built in order to be executed by the Safe, and the expected address of the new module, this will allow developers to batch the transaction of deployment + enable module on safe. Example:

```json
{
  "transaction": {
    "data": "0x",
    "to": "0x",
    "value": "0x"
  },
  "expectedModuleAddress": "0x"
}
```

### Calculate new module address

- Interface: `calculateProxyAddress(factory, masterCopy, initData)`
- Arguments:
  - `factory`: Address of the Module Proxy Factory contract
  - `masterCopy`: Address of the Master Copy of the Module
  - `initData`: Encoded function data that is used to set up the module
- Returns: A string with the expected address

### Get Module

- Interface: `getModule(moduleName, address, provider)`
- Arguments:

  - `moduleName`: Name of the module to be deployed, note that it needs to exist as a key in the [CONTRACT_ADDRESSES](./src/constants.ts) object
  - `address`: Address of the Module contract
  - `provider`: Ethereum provider, expects an instance of `JsonRpcProvider` from `ethers`

- Returns: A Contract instance of the Module

### Get Factory and Master Copy

- Interface: `getFactoryAndMasterCopy(moduleName, provider, chainId)`
- Arguments:
  - `moduleName`: Name of the module to be deployed, note that it needs to exist as a key in the [CONTRACT_ADDRESSES](./src/constants.ts) object
  - `provider`: Ethereum provider, expects an instance of `JsonRpcProvider` from `ethers`
  - `chainId`: Number of network to interact with
- Returns: An object with the the factory contract instance and with the module contracts instance. Example:

```json
{
    "factory": Contract,
    "module": Contract,
}
```


### Deployments

The latest deployments for each networks (currently only rinkeby and mainnet are supported) can be found in the [constants](./src/constants.ts) file