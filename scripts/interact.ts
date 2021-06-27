import { Interface } from "ethers/lib/utils";
import { ethers } from "hardhat";

// const main = async () => {
//   const daoModule = await ethers.getContractAt(
//     "DaoModule",
//     "0xa6c304790053b024b1d0713a21cb87f78a2b73a9"
//   );

//   const isInitialized = await daoModule.isInitialized();
//   console.log({ isInitialized });
// };

const main = async () => {
  const [signer] = await ethers.getSigners();
  const moduleProxyFactory = await ethers.getContractAt(
    "ModuleProxyFactory",
    "0x596adB09cb93A0B181471cA4A0118658d6350143",
    signer
  );

  const daoModule = new Interface([
    "function setUp(address _executor, address _oracle, uint32 timeout, uint32 cooldown, uint32 expiration, uint256 bond, uint256 templateId)",
  ]);

  const params = daoModule.encodeFunctionData("setUp", [
    "0x47b77f91F441688492B7Da74152cDA0dD16f3564",
    "0x3d00d77ee771405628a4ba4913175ecc095538da",
    100,
    180,
    2000,
    10000000000,
    1,
  ]);

  const t = await moduleProxyFactory.deployModule(
    "0x995CF25500fdf9B8c57186EA0B21fB32eB3afe17",
    params
  );

  const trans = await t.wait();
  console.log(trans);
};

main()
  .then(() => {
    console.log("Interaction sucessful :-D");
  })
  .catch((error) => {
    console.log(error);
    console.log("An error has happened :(");
    console.log(JSON.stringify(error.error));
  });
