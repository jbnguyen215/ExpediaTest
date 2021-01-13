module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    //testPathIgnorePatterns: ["/node_modules/", "tests/pageObjects/"],
    testPathIgnorePatterns: ["__tests__/pageObjects/"],
    //setupFilesAfterEnv: ["./jest.setup.js"],
    testTimeout: 30000,
  };