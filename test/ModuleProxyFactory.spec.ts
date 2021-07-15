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
  const saltNonce: string = "0x7255";

  beforeEach(async () => {
    const ModuleProxyFactory = await ethers.getContractFactory(
      "ModuleProxyFactory"
    );
    moduleFactory = await ModuleProxyFactory.deploy();

    const MasterCopyModule = await ethers.getContractFactory("ModuleMock");
    moduleMasterCopy = await MasterCopyModule.deploy();
    initData = moduleMasterCopy.interface.encodeFunctionData("initialize", []);
  });

  describe("createProxy", () => {
    it("should deploy the expected address ", async () => {
      const expectedAddress = await calculateProxyAddress(
        moduleFactory,
        moduleMasterCopy.address,
        initData,
        saltNonce
      );

      const deploymentTx = await moduleFactory.deployModule(
        moduleMasterCopy.address,
        initData,
        saltNonce
      );

      const transaction = await deploymentTx.wait();
      const [moduleAddress] = transaction.events[0].args;

      expect(moduleAddress).to.be.equal(expectedAddress);
    });

    it("should fail to deploy module because address is zero ", async () => {
      await expect(
        moduleFactory.deployModule(AddressZero, initData, saltNonce)
      ).to.be.revertedWith("createProxy: address can not be zero");
    });

    it("should failt to deplay because address it already taken ", async () => {
      await moduleFactory.deployModule(
        moduleMasterCopy.address,
        initData,
        saltNonce
      );

      await expect(
        moduleFactory.deployModule(
          moduleMasterCopy.address,
          initData,
          saltNonce
        )
      ).to.be.revertedWith("createProxy: address already taken");
    });
  });

  describe("deployModule ", () => {
    it("should deploy module and call init function ", async () => {
      const deploymentTx = await moduleFactory.deployModule(
        moduleMasterCopy.address,
        initData,
        saltNonce
      );
      const transaction = await deploymentTx.wait();
      const [moduleAddress] = transaction.events[0].args;

      const newModule = await ethers.getContractAt("ModuleMock", moduleAddress);

      const isInitialized = await newModule.isInitialized();
      expect(isInitialized).to.be.equal(true);
    });

    it("should emit event on module deployment", async () => {
      const moduleAddress = await calculateProxyAddress(
        moduleFactory,
        moduleMasterCopy.address,
        initData,
        saltNonce
      );
      await expect(
        moduleFactory.deployModule(
          moduleMasterCopy.address,
          initData,
          saltNonce
        )
      )
        .to.emit(moduleFactory, "ModuleProxyCreation")
        .withArgs(moduleAddress, moduleMasterCopy.address);
    });

    it("should fail to deploy because parameters are not valid ", async () => {
      await expect(
        moduleFactory.deployModule(
          moduleMasterCopy.address,
          "0xaabc",
          saltNonce
        )
      ).to.be.revertedWith("deployModule: initialization failed");
    });
  });
});
