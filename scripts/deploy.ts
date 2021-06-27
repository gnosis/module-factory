import { ethers } from "hardhat";

const main = async () => {
  const ModuleProxyFactory = await ethers.getContractFactory(
    "ModuleProxyFactory"
  );
  const moduleProxyFactory = await ModuleProxyFactory.deploy();

  console.log(moduleProxyFactory.address);
  console.log("ModuleProxyFactory deployed");
  return moduleProxyFactory.address;
};

// const main = async () => {
//   const DaoModule = await ethers.getContractFactory("DaoModule");
//   const daoModule = await DaoModule.deploy();

//   console.log("DaoModule deployed");
//   console.log(daoModule.address);
//   return daoModule;
// };

main()
  .then((address) => address)
  .catch((error) => {
    console.log("An error has happened :(");
    console.log(error);
    console.log(error.message);
  });

// import { HardhatRuntimeEnvironment } from "hardhat/types";
// import { DeployFunction } from "hardhat-deploy/types";

// const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
//   const { ethers } = hre;
// };
// export default func;
