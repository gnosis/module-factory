import { ethers, Contract, Signer } from "ethers";
import { JsonRpcProvider } from "@ethersproject/providers";
import { keccak256, solidityKeccak256, solidityPack } from "ethers/lib/utils";
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from "./constants";
import { KnownModules } from "./types";

export const deployAndSetUpModule = async (
  moduleName: keyof KnownModules,
  args: Array<number | string>,
  provider: JsonRpcProvider,
  chainId: number
) => {
  const { factory, module } = await getFactoryAndMasterCopy(
    moduleName,
    provider,
    chainId
  );
  const moduleSetupData = module.interface.encodeFunctionData("setUp", args);

  const expectedModuleAddress = await calculateProxyAddress(
    factory,
    module.address,
    moduleSetupData
  );

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

export const calculateProxyAddress = async (
  factory: Contract,
  masterCopy: string,
  initData: string
) => {
  const masterCopyAddress = masterCopy.toLowerCase().replace(/^0x/, "");
  const byteCode =
    "0x3d602d80600a3d3981f3363d3d373d3d3d363d73" +
    masterCopyAddress +
    "5af43d82803e903d91602b57fd5bf3";
  const deploymentCode = solidityPack(["bytes"], [byteCode]);
  const salt = solidityKeccak256(["bytes"], [initData]);
  return ethers.utils.getCreate2Address(
    factory.address,
    salt,
    keccak256(deploymentCode)
  );
};

export const getModule = (
  moduleName: keyof KnownModules,
  address: string,
  provider: JsonRpcProvider | Signer
) => {
  const moduleIsNotSupported = !Object.keys(CONTRACT_ABIS).includes(moduleName);
  if (moduleIsNotSupported) {
    throw new Error("Module " + moduleName + " not supported");
  }
  const module = new Contract(address, CONTRACT_ABIS[moduleName], provider);
  return module;
};

export const getFactoryAndMasterCopy = async (
  moduleName: keyof KnownModules,
  provider: JsonRpcProvider,
  chainId: number
) => {
  const masterCopyAddress = CONTRACT_ADDRESSES[chainId][moduleName];
  const factoryAddress = CONTRACT_ADDRESSES[chainId].factory;
  const module = getModule(moduleName, masterCopyAddress, provider);
  const factory = new Contract(factoryAddress, CONTRACT_ABIS.factory, provider);

  return {
    factory,
    module,
  };
};