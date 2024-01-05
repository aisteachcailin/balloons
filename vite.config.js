export default {
    root: 'src',
    base: './',
    publicDir: '../public',
    build: {
        outDir: '../dist',
        rollupOptions: {
            input: {
                main: './index.html',
                detail: './detail.html',
            },
        },
    },
    css: {
        devSourcemap: true
    }
}
