import { HardhatUserConfig } from "hardhat/config";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-deploy";
import "solidity-coverage";

const { ETHERSCAN_KEY, ALCHEMY_KEY, ETH_KEY } = process.env;

const PRIVATE_KEY = ETH_KEY || "990b68b61853f6418233b1f502a220a8770bb38849d9bd8fc552ed55f5899365";

const config: HardhatUserConfig = {
  paths: {
    deploy: "src/deploy",
  },
  solidity: "0.8.0",
  namedAccounts: {
    deployer: 0,
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_KEY}`,
        blockNumber: 8450000,
      },
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_KEY}`,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  mocha: {
    timeout: 2000000,
  },
  etherscan: {
    apiKey: ETHERSCAN_KEY,
  },
};

export default config;
