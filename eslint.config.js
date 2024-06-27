import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  react: true,
  rules: {
    'curly': 'off',
    'no-console': 'off',
    'react-hooks/exhaustive-deps': 'error',
  },
})
