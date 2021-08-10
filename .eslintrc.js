module.exports = {
  extends: ["airbnb-typescript", "plugin:@typescript-eslint/recommended", "prettier", "plugin:prettier/recommended"],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    "prettier/prettier": [
      "warn",
      {
        trailingComma: "all",
        tabWidth: 2,
        semi: true,
        singleQuote: false,
        bracketSpacing: true,
        eslintIntegration: true,
        printWidth: 120,
        endOfLine: "auto",
      },
    ],
    "no-underscore-dangle": "off",
    "spaced-comment": "warn",
    "prefer-const": "warn",
    "prefer-template": "warn",
    "one-var": "warn",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/no-use-before-define": "off",
    camelcase: "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: {
          String: false,
          Boolean: false,
          Number: false,
          Symbol: false,
          "{}": false,
          Object: false,
          object: false,
          Function: false,
        },
        extendDefaults: true,
      },
    ],
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  ignorePatterns: [".eslintrc.js"],
};
