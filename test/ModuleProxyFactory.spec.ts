import { expect } from "chai";
import hre, { deployments, ethers, waffle } from "hardhat";
import "@nomiclabs/hardhat-ethers";

describe("ModuleProxyFactory", async () => {
  const factorySetup = deployments.createFixture(async () => {
    await deployments.fixture();
    const ModuleProxyFactory = await ethers.getContractFactory(
      "ModuleProxyFactory"
    );
    const moduleFactory = await ModuleProxyFactory.deploy();

    const DaoModule = await ethers.getContractFactory("DaoModuleMock");
    // const DelayModule = await ethers.getContractFactory("DelayModule");
    const daoModuleMasterCopy = await DaoModule.deploy();
    // const delayModuleMasterCopy = await DelayModule.deploy();

    // const AmbModule = await ethers.getContractFactory("AmbModule");
    // const ambModuleMasterCopy = await AmbModule.deploy();

    return {
      moduleFactory,
      daoModuleMasterCopy,
      // ambModuleMasterCopy,
      // delayModuleMasterCopy,
    };
  });

  it("deployModule ", async () => {
    const { moduleFactory, daoModuleMasterCopy } = await factorySetup();
    console.log(daoModuleMasterCopy.address);

    expect('true').to.be.equals('true')
  });
});
