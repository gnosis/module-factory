import { HardhatUserConfig } from "hardhat/config";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-deploy";

const { ETH_KEY, ETHERSCAN_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.0",
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/b76cba91dc954ceebff27244923224b1",
      accounts: [`0x${ETH_KEY}`],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_KEY,
  },
};

export default config;
