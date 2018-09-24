module.exports = {
  "env": {
    "es6": true,
    "node": true,
    "mocha": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-console": [
      "warn"
    ],
    "no-unused-vars": [
      "warn"
    ],
    "space-in-brackets": [
      "always"
    ],
    "func-style": [
      "error",
      "expression", {
        "allowArrowFunctions": true
      }
    ],
    "prefer-arrow-callback": [
      "error"
    ],
    "arrow-parens": [
      "error",
      "always"
    ]
  }
};
