export default {
  testEnvironment:      'node',
  roots:                ['<rootDir>/src/tests'],
  moduleFileExtensions: ['js', 'json'],
  transform:            {'^.+\\.js$': 'babel-jest'},
  verbose:              true
};