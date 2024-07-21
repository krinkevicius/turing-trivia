module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            // using gitignore syntax
            group: [
              'app',
              'config',
              'database',
              'entities',
              'middleware',
              'modules',
              'trpc',
              'types',
              'utils',
            ].flatMap(path => [`@server/${path}`, `@mono/server/src/${path}`]),
            message: 'Please only import from @server/shared or $mono/server/src/shared.',
          },
        ],
      },
    ],
    '@typescript-eslint/consistent-type-imports': 'error',
  },
}
