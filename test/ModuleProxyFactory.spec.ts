import { expect } from "chai";
import { deployments, ethers } from "hardhat";
import { BigNumber } from "ethers";

import "@nomiclabs/hardhat-ethers";
import { calculateProxyAddress } from "./utils";

describe("ModuleProxyFactory", async () => {
  const factorySetup = deployments.createFixture(async () => {
    await deployments.fixture();
    const [{ address: ownerAddress }, { address: randomAddress }] =
      await ethers.getSigners();

    const ModuleProxyFactory = await ethers.getContractFactory(
      "ModuleProxyFactory"
    );
    const moduleFactory = await ModuleProxyFactory.deploy();

    const DaoModule = await ethers.getContractFactory("DaoModule");
    const daoModuleMasterCopy = await DaoModule.deploy();

    const AmbModule = await ethers.getContractFactory("AMBModule");
    const ambModuleMasterCopy = await AmbModule.deploy();

    const DelayModule = await ethers.getContractFactory("DelayModule");
    const delayModuleMasterCopy = await DelayModule.deploy();

    return {
      ownerAddress,
      randomAddress,
      moduleFactory,
      daoModuleMasterCopy,
      ambModuleMasterCopy,
      delayModuleMasterCopy,
    };
  });

  describe("deployModule ", () => {
    it("should deploy and set up DAO Module ", async () => {
      const ORACLE_ADDRESS = "0x3D00D77ee771405628a4bA4913175EcC095538da";
      const MINIMUM_BOND = 10000000000;
      const TIMEOUT = 100;
      const COOLDOWN = 180;
      const EXPIRATION = 2000;
      const TEMPLATE_ID = 1;

      const { moduleFactory, daoModuleMasterCopy, ownerAddress } =
        await factorySetup();

      const initializeParams = daoModuleMasterCopy.interface.encodeFunctionData(
        "setUp",
        [
          ownerAddress,
          ORACLE_ADDRESS,
          TIMEOUT,
          COOLDOWN,
          EXPIRATION,
          MINIMUM_BOND,
          TEMPLATE_ID,
        ]
      );

      const nonce = await moduleFactory.nonce();
      const expectedAddress = await calculateProxyAddress(moduleFactory, nonce);

      const moduleDeployment = await moduleFactory.deployModule(
        daoModuleMasterCopy.address,
        initializeParams
      );

      const transaction = await moduleDeployment.wait();

      const [_, { address: moduleAddress }] = transaction.logs;

      expect(moduleAddress).to.be.equals(expectedAddress);

      const newDaoModule = await ethers.getContractAt(
        "DaoModule",
        moduleAddress
      );

      const oracle = await newDaoModule.oracle();
      const timeout = await newDaoModule.questionTimeout();
      const cooldown = await newDaoModule.questionCooldown();
      const expiration = await newDaoModule.answerExpiration();
      const minimumBond = await newDaoModule.minimumBond();
      const templateId = await newDaoModule.template();

      expect(oracle).to.be.equals(ORACLE_ADDRESS);
      expect(timeout).to.be.equals(TIMEOUT);
      expect(cooldown).to.be.equals(COOLDOWN);
      expect(expiration).to.be.equals(EXPIRATION);
      expect(minimumBond).to.be.equals(BigNumber.from(MINIMUM_BOND));
      expect(templateId).to.be.equals(BigNumber.from(TEMPLATE_ID));
    });

    it("should deploy and set up AMB Module", async () => {
      const AMB_ADDRESS = "0xD4075FB57fCf038bFc702c915Ef9592534bED5c1";
      const CHAIN_ID =
        "0x0000000000000000000000000000000000000000000000000000000000000004";
      const {
        moduleFactory,
        ambModuleMasterCopy,
        ownerAddress,
        randomAddress,
      } = await factorySetup();

      const nonce = await moduleFactory.nonce();
      const expectedAddress = await calculateProxyAddress(moduleFactory, nonce);

      const initializeParams = ambModuleMasterCopy.interface.encodeFunctionData(
        "setUp",
        [randomAddress, AMB_ADDRESS, ownerAddress, CHAIN_ID]
      );

      const moduleDeployment = await moduleFactory.deployModule(
        ambModuleMasterCopy.address,
        initializeParams
      );

      const transaction = await moduleDeployment.wait();
      const [_, { address: moduleAddress }] = transaction.logs;

      expect(moduleAddress).to.be.equals(expectedAddress);
      const newAmbModule = await ethers.getContractAt(
        "AMBModule",
        moduleAddress
      );

      const owner = await newAmbModule.owner();
      const chainId = await newAmbModule.chainId();
      const executor = await newAmbModule.executor();
      const amb = await newAmbModule.amb();

      expect(owner).to.be.equals(ownerAddress);
      expect(chainId).to.be.equals(CHAIN_ID);
      expect(executor).to.be.equals(randomAddress);
      expect(amb).to.be.equals(AMB_ADDRESS);
    });

    it("should deploy and set up Delay Module ", async () => {
      const COOLDOWN = 180;
      const EXPIRATION = 2000;
      const { moduleFactory, ownerAddress, delayModuleMasterCopy } = await factorySetup();
      
      const initializeParams = delayModuleMasterCopy.interface.encodeFunctionData("setUp", [
        ownerAddress,
        COOLDOWN,
        EXPIRATION,
      ]);
      
      const nonce = await moduleFactory.nonce();
      const expectedAddress = await calculateProxyAddress(moduleFactory, nonce);
      
      const moduleDeployment = await moduleFactory.deployModule(
        delayModuleMasterCopy.address,
        initializeParams
      );

      const transaction = await moduleDeployment.wait();
      const [_, { address: moduleAddress }] = transaction.logs;
      expect(moduleAddress).to.be.equals(expectedAddress);

      const newDelayModule = await ethers.getContractAt(
        "DelayModule",
        moduleAddress
      );

      const cooldown = await newDelayModule.txCooldown();
      const expiration = await newDelayModule.txExpiration();
      const executor = await newDelayModule.executor();

      expect(cooldown).to.be.equals(COOLDOWN);
      expect(expiration).to.be.equals(EXPIRATION);
      expect(executor).to.be.equals(ownerAddress);
    });
  });
});
