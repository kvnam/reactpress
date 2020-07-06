const { off } = require("process");

module.exports = {
  eslint: {
    "enable": true,
    configure: {
      "extends": [
        "eslint:recommended",
        "airbnb-typescript/base",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "prettier/@typescript-eslint",
        "plugin:prettier/recommended"
      ],
      "parserOptions": {
        "ecmaVersion": 2020,
        "project": "./tsconfig.json",
        "sourceType": "module",
        "ecmaFeatures": {
          "jsx": true,
        }
      },
      "env": {
        "browser": true,
        "node": true,
        "es6": true
      },
      "rules":{
        'prettier/prettier': [
          'warn',
          {
            trailingComma: 'all',
            tabWidth: 2,
            semi: true,
            singleQuote: false,
            bracketSpacing: true,
            eslintIntegration: true,
            printWidth: 120,
            "endOfLine":"auto",
          },
        ],
        "no-underscore-dangle": "off",
        "spaced-comment" : "warn",
        "prefer-const": "warn",
        "prefer-template": "warn",
        "one-var": "warn",
        "@typescript-eslint/camelcase": "warn"
      }
    }
  },
  typescript: {
    enableTypeChecking: true
  }
}