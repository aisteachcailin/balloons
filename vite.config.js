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
                registration: './src/registration.html',
                recovery: './src/recovery.html',
                addAddress: './src/add-address.html',
                edit: './src/edit.html',
                editOrganization: './src/edit-organization.html',
                lk: './src/lk.html',
                agreement: './src/agreement.html',
                policy: './src/policy.html',
                guarantee: './src/guarantee.html'
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
