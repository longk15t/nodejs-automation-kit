module.exports = {
  root: true,
  ignorePatterns: ["**/dist/**", "**/node_modules/**"],

  env: {
    node: true,
    es2021: true,
  },

  parser: "@typescript-eslint/parser",

  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    project: ["./tsconfig.json"],
  },

  plugins: [
    "@typescript-eslint",
    "import",
    "unused-imports",
    "prettier",
  ],

  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
  ],

  rules: {
    "prettier/prettier": "error",
    "unused-imports/no-unused-imports": "error",
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
    "@typescript-eslint/no-unused-vars": ["warn"],
  },
};
