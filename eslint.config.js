// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    typescript: true,
    formatters: true,
    rules: {
      'node/prefer-global/process': 'off',
      'n/prefer-global/buffer': 'off',
    },
  },
)
