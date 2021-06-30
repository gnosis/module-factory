import { ethers, Contract } from "ethers";
import { JsonRpcProvider } from "@ethersproject/providers";
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from "./constants";
import { KnownModules } from "./types";

export const deployAndSetUpModule = async (
  moduleName: keyof KnownModules,
  args: Array<number | string>,
  provider: JsonRpcProvider,
  chainId?: number
) => {
  const { factory, module } = await getFactoryAndModule(
    moduleName,
    provider,
    chainId
  );
  const moduleSetupData = module.interface.encodeFunctionData("setUp", args);

  const expectedModuleAddress = await calculateProxyAddress(factory);

  const deployData = factory.interface.encodeFunctionData("deployModule", [
    module.address,
    moduleSetupData,
  ]);
  const transaction = {
    data: deployData,
    to: factory.address,
    value: "0",
  };
  return {
    transaction,
    expectedModuleAddress,
  };
};

export const calculateProxyAddress = async (factory: Contract) => {
  const nonce = await factory.nonce();
  return ethers.utils.getContractAddress({
    from: factory.address,
    nonce,
  });
};

export const getFactoryAndModule = async (
  moduleName: keyof KnownModules,
  provider: JsonRpcProvider,
  chainId?: number
) => {
  const moduleIsNotSupported = !Object.keys(CONTRACT_ABIS).includes(moduleName);
  if (moduleIsNotSupported) {
    throw new Error("Module " + moduleName + " not supported");
  }

  if (!chainId) {
    const network = await provider.getNetwork();
    chainId = network.chainId;
  }

  const masterCopyAddress = CONTRACT_ADDRESSES[chainId][moduleName];
  const factoryAddress = CONTRACT_ADDRESSES[chainId].factory;

  const factory = new Contract(factoryAddress, CONTRACT_ABIS.factory, provider);
  const module = new Contract(
    masterCopyAddress,
    CONTRACT_ABIS[moduleName],
    provider
  );

  return {
    factory,
    module,
  };
};
