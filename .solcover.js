module.exports = {
  skipFiles: [
    "lib/DaoModule.sol",
    "lib/AMBModule.sol",
    "lib/DelayModule.sol",
    "interfaces/Executor.sol",
    "interfaces/Realitio.sol",
  ],
  mocha: {
    grep: "@skip-on-coverage", // Find everything with this tag
    invert: true, // Run the grep's inverse set.
  },
};
