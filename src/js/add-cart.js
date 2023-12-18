/**
 * Created by AndreyBan
 * in PhpStorm
 * 16.03.2023
 **/

document.addEventListener('DOMContentLoaded', addToCart)

function addToCart() {
    actionBtnCount()
    validateCount()
    btnAddCart()
    setCount()
    refreshCart()
}

/**
 * Обновление данных на значке корзины в шапке
 */
// function refreshCart() {
//     const textCountCart = document.querySelector('.js-count-cart')
//     const textCart = textCountCart.parentElement.querySelector('.js-cart-text')
//     const cartData = getLocalStorage('cart')
//     let sumPrice = 0
//
//     textCountCart.innerText = cartData.length ?? '0'
//     textCountCart.classList.toggle('show', !!cartData.length)
//
//     cartData.forEach((el) => sumPrice += el['price'] * el['count'])
//     textCart.innerText = cartData.length ? `${sumPrice} ₽` : 'Корзина'
// }
function refreshCart() {
    const textCountCart = document.querySelectorAll('.js-count-cart')
    const cartData = getLocalStorage('cart')
    let sumPrice = 0

    cartData.forEach((el) => sumPrice += el['price'] * el['count'])

    textCountCart.forEach(el => {
        const textCart = el.parentElement.querySelector('.js-cart-text')

        el.innerText = cartData.length ?? '0'
        el.classList.toggle('show', !!cartData.length)
        textCart.innerText = cartData.length ? `${ sumPrice } ₽` : 'Корзина'
    })
}

/**
 * Функционал при нажатии на кнопку добавить в корзину
 */
function btnAddCart() {
    const buttons = document.querySelectorAll('.js-add-cart')

    buttons.forEach((el) => {
        el.addEventListener('click', () => {
            const product = el.closest('.goods-card')

            addItem(product)
            product.querySelector('.js-product-label')
                .classList
                .add('show')

            el.setAttribute('hidden', 'hidden')
        })
    })
}

/**
 * Добавление элементов в корзину
 * @param product
 */
function addItem(product) {
    const properties = product.getAttributeNames()
    const propertiesData = properties.filter(el => el.includes('data'))
    const propertiesNames = propertiesData.map(el => el.replace('data-', ''))
    const addCountProducts = product.querySelector('.js-product-count').value
    const dataCart = {}

    product.setAttribute('data-count', addCountProducts)

    propertiesNames.forEach((el, i) => {
        dataCart[el] = product.getAttribute(propertiesData[i])
    })

    setLocalCart(dataCart)
    refreshCart()
}

/**
 * При обновленнии страницы расставляем количество товаров из localStorage
 */
function setCount() {
    if (localStorage.cart) {
        const data = JSON.parse(localStorage.cart)

        data.forEach((el) => {
            const item = document.querySelector(`.goods-card[data-id='${ el.id }']`)
            const countElements = item.querySelector('.js-product-count')
            const parentCount = countElements.parentElement

            item.setAttribute('data-count', el.count)
            countElements.value = el.count
            parentCount.classList.add('show')
            parentCount.nextElementSibling.setAttribute('hidden', 'hidden')
        })
    }
}

/**
 * Сохраняем данные с добавленными товарами в localStorage
 * @param data { Object }
 */
function setLocalCart(data) {
    const dataLocal = getLocalStorage('cart')

    if (dataLocal.length) {
        const index = dataLocal.findIndex(el => el.id === data.id)

        if (index >= 0 && +data.count > 0) {
            dataLocal[index] = data
        } else {
            dataLocal.push(data)
        }
    } else {
        dataLocal.push(data)
    }

    setLocalStorage('cart', dataLocal)
}

/**
 * Получение данных из localStorage по имени
 * @param field { String } Имя поля
 * @returns {any|*[]}
 */
function getLocalStorage(field) {
    const local = localStorage[field]
    return local ? JSON.parse(local) : []
}

/**
 * Запись данных в localStorage
 * @param field { String } Имя поля
 * @param data Данные
 */
function setLocalStorage(field, data) {
    localStorage[field] = JSON.stringify(data)
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
    const product = el.closest('.goods-card')
    const countLabel = el.closest('.goods-card-buy__label')
    const countElement = countLabel.querySelector('input')
    let value = Number(countElement.value)

    if (!increment && value - 1 < 1) {
        const dataLocal = getLocalStorage('cart')
        const elID = product.getAttribute('data-id')
        const removeIndex = dataLocal.findIndex(el => el.id === elID)

        countLabel.classList.remove('show')
        countLabel.nextElementSibling.removeAttribute('hidden')
        product.setAttribute('data-count', '0')
        dataLocal.splice(removeIndex, 1)
        setLocalStorage('cart', dataLocal)
        refreshCart()

        return false
    }
        countElement.value = increment ? (++value).toString() : (--value).toString()
        addItem(product)
}
