/* eslint-env node */

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'airbnb', // or any other config you want to extend
    'airbnb-typescript/base',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['**/*.js', '**/*.cjs', '**/*.mjs'],
  rules: {
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@server/**',
            group: 'internal',
          },
          {
            pattern: '@tests/**',
            group: 'internal',
          },
        ],
      },
    ],
    'no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    'no-param-reassign': 'off',
    'import/prefer-default-export': 'off',
    'no-await-in-loop': 'off',
  },
}
