export default {
    root: 'src',
    base: './',
    publicDir: '../public',
    build: {
        outDir: '../dist',
        rollupOptions: {
            input: {
                index: './src/index.html',
                detail: './src/detail.html',
                catalog: './src/catalog.html',
                registrationPage: './src/registration.html',
                recovery: './src/recovery.html',
                addAddress: './src/add-address.html',
                edit: './src/edit.html',
                editOrganization: './src/edit-organization.html',
                lk: './src/lk.html',
                agreement: './src/agreement.html',
                policy: './src/policy.html',
                guarantee: './src/guarantee.html',
                common: './src/js/common.js',
                'add-cart': './src/js/add-cart.js',
                form: './src/js/form.js',
                'goods-sliders': './src/js/goods-sliders.js',
                main: './src/js/main.js',
                registration: './src/js/registration.js',
                validate: './src/js/validate.js',
                'detail/detail': './src/js/detail/detail.js',
                'catalog/tooltip': './src/js/catalog/tooltip.js',
                'catalog/dropdown-sort': './src/js/catalog/dropdown-sort.js',
            },
            output: {
                assetFileNames: "assets/[name][extname]",
                entryFileNames: "js/[name].js"
            }
        },
    },
    css: {
        devSourcemap: true
    }
}
