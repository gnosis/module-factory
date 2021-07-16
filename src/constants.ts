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
    factory: "0x569F2e024D0aD6bBfBd8135097DFa7D0641Ae79b",
  },
  // for testing purposes
  31337: {
    dao: "0xe40e0F913ABf3C561aE39A72b6D4dDdB9b943793",
    amb: "0x781c968c88EF6eFCBe13d174b876dc9dc0c3A99b",
    delay: "0x3cc7aBD1908906e2102D302249c82d083975e1EF",
    factory: "0x569F2e024D0aD6bBfBd8135097DFa7D0641Ae79b",
  },
};

export const CONTRACT_ABIS = {
  dao: [
    `function setArbitrator(address arbitrator) public`,
    `function setQuestionTimeout(uint32 timeout) public`,
    `function setQuestionCooldown(uint32 cooldown) public`,
    `function setMinimumBond(uint256 bond) public`,
    `function setTemplate(bytes32 template) public`,
    `function setAnswerExpiration(uint32 expiration) public`,
    `function setUp(
      address _executor, 
      address _oracle, 
      uint32 timeout, 
      uint32 cooldown, 
      uint32 expiration, 
      uint256 bond, 
      uint256 templateId
    ) public`,
  ],
  amb: [
    `function setAmb(address _amb) public`,
    `function setChainId(bytes32 _chainId) public`,
    `function setOwner(address _owner) public`,
    `function setUp(
      address _executor,
      address _amb,
      address _owner,
      bytes32 _chainId
    ) public`,
  ],
  delay: [
    `function setTxCooldown(uint256 cooldown) public`,
    `function setTxExpiration(uint256 expiration) public`,
    `function setUp(
      address _executor,
      uint256 cooldown,
      uint256 expiration
    ) public`,
  ],
  factory: [
    `function deployModule(
      address masterCopy, 
      bytes memory initializer,
      uint256 saltNonce
    ) public returns (address proxy)`,
  ],
};
