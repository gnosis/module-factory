import { ContractAddresses } from "./types";

export const CONTRACT_ADDRESSES: Record<number, ContractAddresses> = {
  1: {
    dao: "",
    amb: "",
    delay: "",
    factory: "",
  },
  4: {
    dao: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    amb: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    delay: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    factory: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  },
};

export const CONTRACT_ABIS = {
  dao: [
    `function setUp(
      Executor _executor,
      Realitio _oracle,
      uint32 timeout,
      uint32 cooldown,
      uint32 expiration,
      uint256 bond,
      uint256 templateId
    ) external`,
  ],
  amb: [
    `function setUp(
      Executor _executor,
      IAMB _amb,
      address _owner,
      bytes32 _chainId
    ) external`,
  ],
  delay: [
    `function setUp(
      Executor _executor,
      uint256 cooldown,
      uint256 expiration
    ) external`,
  ],
  factory: [
    `function deployModule(
      address singleton, 
      bytes memory initializer
    ) public returns (address clone)`,
  ],
};

