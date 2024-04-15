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
                login: './src/login.html',
                agreement: './src/agreement.html',
                policy: './src/policy.html',
                guarantee: './src/guarantee.html',
                common: './src/js/common.js',
                'add-cart': './src/js/add-cart.js',
                'goods-sliders': './src/js/goods-sliders.js',
                main: './src/js/main.js',
                registration: './src/js/registration.js',
                validate: './src/js/validate.js',
                'detail/detail': './src/js/detail/detail.js',
                'catalog/tooltip': './src/js/catalog/tooltip.js',
                'catalog/dropdown-sort': './src/js/catalog/dropdown-sort.js',
                about: './src/about.html',
                generalInfo: './src/contacts.html', 'delivery-pickup': './src/delivery-pickup.html',
                consumption: './src/consumption.html',
                delivery: './src/delivery-russia.html', 'delivery-city': './src/delivery-city.html',
                payment: './src/payment.html',
                manufacturers: './src/manufacturers.html', 'manufacturers-detail': './src/manufacturers-detail.html',
                news: './src/news.html', 'news/detail': './src/news-detail.html',
                states: './src/states.html', 'states/detail': './src/states-detail.html',
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
