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
  dao: [
    `function setUp(
      address _executor,
      address _oracle,
      uint32 timeout,
      uint32 cooldown,
      uint32 expiration,
      uint256 bond,
      uint256 templateId
    ) external`,
  ],
  amb: [
    `function setUp(
      address _executor,
      address _amb,
      address _owner,
      bytes32 _chainId
    ) external`,
  ],
  delay: [
    `function setUp(
      address _executor,
      uint256 cooldown,
      uint256 expiration
    ) external`,
  ],
  factory: [
    `function deployModule(
      address singleton, 
      bytes memory initializer
    ) public returns (address clone)`,
    `function nonce() view returns (uint32)`,
  ],
};
