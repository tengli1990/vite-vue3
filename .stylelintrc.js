module.exports = {
  root: true,
  plugins: ['stylelint-order'],
  extends: ['stylelint-config-standard'], // 'stylelint-config-prettier'
  rules: {
    "selector-pseudo-class-no-unknown": [true, {
      ignorePseudoClasses: ["deep"],
    }]
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
};
