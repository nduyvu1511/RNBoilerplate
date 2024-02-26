module.exports = {
  env: {
    'jest/globals': true,
  },
  root: true,
  extends: ['@react-native'],
  rules: {
    semi: 'off',
    curly: ['error', 'ignore'],
    '@typescript-eslint/semi': 'off',
    ignoreRestSiblings: true,
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'avoid',
        bracketSameLine: true,
        singleQuote: true,
        trailingComma: 'all',
        tabWidth: 2,
        printWidth: 100,
        semi: false,
      },
    ],
  },
}
