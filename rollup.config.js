// rollup.config.js
export default {
    input: './tmp/index.js',
    output: {
        file: './dist/index.js',
        format: 'iife',
        globals: {
            'hyperapp': 'hyperapp',
            "@hyperapp/router": 'hyperappRouter',
        },
    },
    plugins: [],
    external: [
        "hyperapp",
        "@hyperapp/router",
    ],
};