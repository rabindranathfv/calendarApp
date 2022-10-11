module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["./jest.setup.js", "jest-localstorage-mock"],
  transformIgnorePatterns: [],
  // transformIgnorePatterns: [
  //   `/node_modules/(?!sweetalert2/dist/sweetalert2).min.css`,
  // ],
  // maybe doesn't need this
  // "resetMocks": false

  // ModuleNameMapper sólo si ocupamos importar CSS en nuestros componentes para el testing
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/tests/mocks/styleMock.js",
  },
};
