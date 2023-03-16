/**
 * Created by AndreyBan
 * in PhpStorm
 * 16.03.2023
 **/

document.addEventListener('DOMContentLoaded', () => {
    addToCart()
})

function addToCart() {
    actionBtnCount()
    validateCount()
    addItem()
    setCount()
}

function addItem() {
    const buttons = document.querySelectorAll('.js-add-cart')

    buttons.forEach((el) => {
        el.addEventListener('click', () => {
            const product = el.closest('.goods-card')
            const properties = product.getAttributeNames()
            const propertiesData = properties.filter(el => el.includes('data'))
            const propertiesNames = propertiesData.map(el => el.replace('data-', ''))
            const countProducts = product.querySelector('.js-product-count').value
            const dataCart = {}

            product.setAttribute('data-count', countProducts)

            propertiesNames.forEach((el, i) => {
                dataCart[el] = product.getAttribute(propertiesData[i])
            })

            setLocalCart(dataCart)
        })
    })
}

function setCount() {
    if (localStorage.cart) {
        const data = JSON.parse(localStorage.cart)

        data.forEach((el) => {
            const item = document.querySelector(`.goods-card[data-id='${el.id}']`)
            item.setAttribute('data-count', el.count)
            item.querySelector('.js-product-count').value = el.count
        })
    }
}

function setLocalCart(data) {
    const localCart = localStorage.cart
    const dataLocal = localCart ? JSON.parse(localCart) : []
    if (dataLocal.length) {
        const index = dataLocal.findIndex(el => el.id === data.id)
        if (index !== -1) {
            dataLocal[index] = data
        } else {
            dataLocal.push(data)
        }
    } else {
        dataLocal.push(data)
    }
    localStorage.cart = JSON.stringify(dataLocal)
}

/**
 * Валидация количества товаров
 */
function validateCount() {
    const inputs = document.querySelectorAll('.js-product-count')

    inputs.forEach((el) => {
        el.addEventListener('change', () => {
            if (el.value % 1 > 0) el.value = Math.floor(el.value) // Запрет ввода не целых чисел
            if (el.value < 0) el.value = '1' // Запрет ввода отрицательных чисел
        })
    })
}

/**
 * Действия с кнопок +/- для изменения количества товара
 */
function actionBtnCount() {
    document.addEventListener('click', (e) => {
        const classList = e.target.classList
        if (classList.contains('js-card-btn-inc')) {
            changeCount(e.target)
        } else if (classList.contains('js-card-btn-dec')) {
            changeCount(e.target, false)
        }
    })
}

/**
 * Увеличение/уменьшение количества товара
 * @param el
 * @param increment
 * @returns {boolean}
 */
function changeCount(el, increment = true) {
    const countElement = el.closest('.goods-card-buy__label').querySelector('input')
    let value = Number(countElement.value)

    if (!increment && value - 1 < 1) return false

    countElement.value = increment ? (++value).toString() : (--value).toString()
}
