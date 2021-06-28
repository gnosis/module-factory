import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  await deploy("DaoModule", {
    from: deployer,
    args: [],
    log: true,
  });
  await deploy("AMBModule", {
    from: deployer,
    args: [],
    log: true,
  });
  await deploy("DelayModule", {
    from: deployer,
    args: [],
    log: true,
  });
};
export default deploy;
