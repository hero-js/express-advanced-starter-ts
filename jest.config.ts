import { compilerOptions } from 'E:/project/herojs/starters/express-advanced-starter-ts/tsconfig.json';
import { pathsToModuleNameMapper } from 'ts-jest';
import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  roots: ['<rootDir>'],
  testEnvironment: 'node',
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths /*, { prefix: '<rootDir>/' } */
  ),
};

export default jestConfig;
