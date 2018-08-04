module.exports = {
  "roots": [
    "<rootDir>/lib"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testURL": "http://localhost",
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "coveragePathIgnorePatterns": [
    "lib/utils/base64.ts",
  ],
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
}
