// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  {
    rules: {
      'no-unused-vars': 'warn',
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'indent': ['error', 2],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
    },
  },
);
