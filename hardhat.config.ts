import { HardhatUserConfig } from "hardhat/config";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-deploy";
import "solidity-coverage";

const { ETHERSCAN_KEY } = process.env;

const INFURA_KEY = process.env.INFURA_KEY || "b76cba91dc954ceebff27244923224b1";
const ETH_KEY =
  process.env.ETH_KEY ||
  "990b68b61853f6418233b1f502a220a8770bb38849d9bd8fc552ed55f5899365";

const config: HardhatUserConfig = {
  paths: {
    deploy: "src/deploy",
  },
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
