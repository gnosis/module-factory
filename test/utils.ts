import { ethers, Contract } from "ethers";

export const calculateProxyAddress = async (
  factory: Contract,
  nonce: number
) => {
  return ethers.utils.getContractAddress({
    from: factory.address,
    nonce,
  });
};
