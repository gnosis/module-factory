import { JsonRpcProvider } from "@ethersproject/providers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

import {
  deployAndSetUpModule,
  getModuleInstance,
  getFactoryAndMasterCopy,
} from "../src";

import "@nomiclabs/hardhat-ethers";

const PROVIDER = new JsonRpcProvider(
  `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`
);

describe("Factory JS functions ", () => {
  describe("deployAndSetUpModule", () => {
    it("should execute transaction and retrieve expected address ", async () => {
      const network = await ethers.provider.getNetwork();
      const [signer] = await ethers.getSigners();
      const { transaction: deployTx, expectedModuleAddress } =
        await deployAndSetUpModule(
          "dao",
          [
            "0x38063380d21F2d7A2f093cF4FCedBf6A552A1f76",
            "0x3D00D77ee771405628a4bA4913175EcC095538da",
            100,
            180,
            2000,
            100000000,
            1,
          ],
          PROVIDER,
          network.chainId,
          Date.now().toString()
        );

      const transaction = await signer.sendTransaction({
        data: deployTx.data,
        to: deployTx.to,
      });
      const receipt = await transaction.wait();
      expect(receipt.transactionHash).to.be.a("string");
      expect(receipt.status).to.be.eq(1);
      expect(expectedModuleAddress).to.a("string");
    });
  });

  describe("getModuleInstance", () => {
    it("should retreive module instance", async () => {
      const module = await getModuleInstance(
        "dao",
        "0x327F67C24D1F24fcE614ae8a6D7309bf8736C8B3",
        PROVIDER
      );
      expect(module).to.be.instanceOf(Contract);
    });
  });

  describe("getFactoryAndMasterCopy", () => {
    it("should retreive factory and module instance", async () => {
      const network = await ethers.provider.getNetwork();
      const { module, factory } = await getFactoryAndMasterCopy(
        "dao",
        PROVIDER,
        network.chainId
      );
      expect(module).to.be.instanceOf(Contract);
      expect(factory).to.be.instanceOf(Contract);
    });
  });
});
