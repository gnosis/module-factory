import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const daoModule = await deploy("DaoModule", {
    from: deployer,
    args: [],
    log: true,
  });

  const ambModule = await deploy("AMBModule", {
    from: deployer,
    args: [],
    log: true,
  });
  const delayModule = await deploy("DelayModule", {
    from: deployer,
    args: [],
    log: true,
  });
  await hre.run("verify:verify", {
    address: daoModule.address,
    constructorArguments: [],
  });
  await hre.run("verify:verify", {
    address: ambModule.address,
    constructorArguments: [],
  });
  await hre.run("verify:verify", {
    address: delayModule.address,
    constructorArguments: [],
  });
};
export default deploy;
