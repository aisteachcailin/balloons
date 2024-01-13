export default {
    root: 'src',
    base: './',
    publicDir: '../public',
    build: {
        outDir: '../dist',
        rollupOptions: {
            input: {
                main: './src/index.html',
                detail: './src/detail.html',
            },
        },
    },
    css: {
        devSourcemap: true
    }
}
