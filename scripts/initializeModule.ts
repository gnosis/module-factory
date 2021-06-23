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
    "0x894a5d9197BDF1aD5F48F364c9B344047b97212f",
    signer
  );

  const t = await moduleProxyFactory.deployModule(
    "0x995CF25500fdf9B8c57186EA0B21fB32eB3afe17",
    "0x47b77f91F441688492B7Da74152cDA0dD16f3564",
    "0x3d00d77ee771405628a4ba4913175ecc095538da",
    100,
    180,
    2000,
    10000000000,
    1
  );

  console.log("Transaction of deployModule: ", t);
};

main()
  .then(() => {
    console.log("Interaction sucessful :-D");
  })
  .catch((error) => {
    console.log("An error has happened :(");
    console.log(error);
    console.log(error.message);
  });
