import { HardhatUserConfig } from "hardhat/config";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-deploy";
import "solidity-coverage";

const { ETH_KEY, ETHERSCAN_KEY, INFURA_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.0",
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
      accounts: [`0x${ETH_KEY}`],
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
