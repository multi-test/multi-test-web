import resolve from 'rollup-plugin-node-resolve';

// rollup.config.js
export default {
    input: './tmp/index.js',
    output: {
        file: './dist/index.js',
        format: 'iife',
        globals: {
            'hyperapp': 'hyperapp',
            // 'hyperapp-hash-router': 'hyperappRouter',
        },
    },
    plugins: [resolve()],
    external: [
        'hyperapp',
        // 'hyperapp-hash-router',
    ],
};
