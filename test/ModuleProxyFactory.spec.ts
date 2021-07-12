import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";
import { AddressZero } from "@ethersproject/constants";
import { calculateProxyAddress } from "../src/factory";

import "@nomiclabs/hardhat-ethers";

describe("ModuleProxyFactory", async () => {
  let moduleFactory: Contract;
  let moduleMasterCopy: Contract;
  let initData: string;

  beforeEach(async () => {
    const ModuleProxyFactory = await ethers.getContractFactory(
      "ModuleProxyFactory"
    );
    moduleFactory = await ModuleProxyFactory.deploy();

    const MasterCopyModule = await ethers.getContractFactory("ModuleMock");
    moduleMasterCopy = await MasterCopyModule.deploy();
    initData = moduleMasterCopy.interface.encodeFunctionData("initialize", []);
  });

  describe("deployModule ", () => {
    it("should deploy module and call init function ", async () => {
      const deploymentTx = await moduleFactory.deployModule(
        moduleMasterCopy.address,
        initData
      );
      const transaction = await deploymentTx.wait();
      const [moduleAddress] = transaction.events[0].args;

      const newModule = await ethers.getContractAt("ModuleMock", moduleAddress);

      const isInitialized = await newModule.isInitialized();
      expect(isInitialized).to.be.equal(true);
    });

    it("should deploy the expected address ", async () => {
      const expectedAddress = await calculateProxyAddress(
        moduleFactory,
        moduleMasterCopy.address,
        initData
      );

      const deploymentTx = await moduleFactory.deployModule(
        moduleMasterCopy.address,
        initData
      );

      const transaction = await deploymentTx.wait();
      const [moduleAddress] = transaction.events[0].args;

      expect(moduleAddress).to.be.equal(expectedAddress);
    });
    it("should fail to deploy module because address is zero ", async () => {
      await expect(
        moduleFactory.deployModule(AddressZero, initData)
      ).to.be.revertedWith("createProxy: address can not be zero");
    });
  });
});
