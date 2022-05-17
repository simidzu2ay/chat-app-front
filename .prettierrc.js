module.exports = {
  arrowParens: 'avoid',
  semi: true,
  endOfLine: 'lf',
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'none',
  tabWidth: 2,
  useTabs: false,
  plugins: [
    require('prettier-plugin-organize-imports'),
    require('prettier-plugin-tailwindcss')
  ]
};
