module.exports = {
  skipFiles: [
    "test/DaoModuleMock.sol",
    "test/AMBModuleMock.sol",
    "test/DelayModuleMock.sol",
  ],
  mocha: {
    grep: "@skip-on-coverage", // Find everything with this tag
    invert: true, // Run the grep's inverse set.
  },
};
