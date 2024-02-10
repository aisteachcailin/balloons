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
                catalog: './src/catalog.html',
            },
            output: {
                assetFileNames: "assets/[name][extname]"
            }
        },
    },
    css: {
        devSourcemap: true
    }
}
