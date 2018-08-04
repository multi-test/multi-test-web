const filename = '00-wysiwyg-backup-delete-save.js';

export default {
  input: `dist/cattell/state/decode.js`,
  globals: {
    'bit-buffer': 'window',
  },
  external: ['bit-buffer'],
  output: {
    name: 'cattell',
    file: `./lib/cattell/print/print.js`,
    format: 'iife',
  },
};
