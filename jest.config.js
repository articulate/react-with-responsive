module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    '<rootDir>/source/**/*.js'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/test/setup.js'
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer'
  ]
}
