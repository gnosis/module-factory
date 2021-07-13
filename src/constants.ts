import { ContractAddresses } from "./types";

export const CONTRACT_ADDRESSES: Record<number, ContractAddresses> = {
  1: {
    dao: "",
    amb: "",
    delay: "",
    factory: "",
  },
  4: {
    dao: "0x0049B9A81E602C846807873026C20CC56038E571",
    amb: "0x399E5e6424DF1448dB19fccFbc9E3DCef95c9f34",
    delay: "0xC67cE465f76eAa84bb7560d19F7339D1aEdA201a",
    factory: "0xE9E80739Af9D0DD8AaE6255c96a1266c059469ba",
  },
  // for testing purposes
  31337: {
    dao: "0xe40e0F913ABf3C561aE39A72b6D4dDdB9b943793",
    amb: "0x781c968c88EF6eFCBe13d174b876dc9dc0c3A99b",
    delay: "0x3cc7aBD1908906e2102D302249c82d083975e1EF",
    factory: "0xd067410a85ffC8C55f7245DE4BfE16C95329D232",
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
