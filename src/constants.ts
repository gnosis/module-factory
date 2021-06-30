import { ContractAddresses } from "./types";

export const CONTRACT_ADDRESSES: Record<number, ContractAddresses> = {
  1: {
    dao: "",
    amb: "",
    delay: "",
    factory: "",
  },
  4: {
    dao: "0x8a5218F72A9F77eA737cc0FE3466f37a42dAF632",
    amb: "0x3edd483F59bE021940dc27475e21E74Daf3fE531",
    delay: "0x3e4405E7ABeBA5af7e724E9642857963026Fa05E",
    factory: "0x184Befc81F0A6983c37d8ae2F5de10AA247409f2",
  },
};

export const CONTRACT_ABIS = {
  dao: require("../artifacts/contracts/lib/DaoModule.sol/DaoModule.json").abi,
  amb: require("../artifacts/contracts/lib/AMBModule.sol/AMBModule.json").abi,
  delay: require("../artifacts/contracts/lib/DelayModule.sol/DelayModule.json").abi,
  factory: [
    `function deployModule(
      address singleton, 
      bytes memory initializer
    ) public returns (address clone)`,
    `function nonce() view returns (uint32)`,
  ],
};
