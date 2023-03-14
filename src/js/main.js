import '../scss/main.scss'
import '../scss/style.scss'
import '../scss/pages/main-page/main-page.scss'

window.addEventListener('load', () => document.body.classList.add('loaded'))
document.addEventListener('DOMContentLoaded', () => {
    const arSliders = [
        '.js-swiper-goods-new',
        '.js-swiper-goods-promo',
        '.js-swiper-goods-hit'
    ]

    arSliders.forEach(el => initSliderGoods(el)) // Инициализация слайдеров с товарами
    showSubmenu() // Отображение подменю
    hoverShowCategory() // Переключение отображения категорий в каталоге


    // Поиск. Пример для демонстрации подсказки.
    const search = document.getElementById('search')

    search.addEventListener('input', () => {
        let hint = (search.value.length > 2).toString()

        search.closest('.header-search').setAttribute('data-hint', hint)
    })

    // Открыть/закрыть каталог
    const btnCatalog = document.querySelector('.js-open-catalog')
    btnCatalog.addEventListener('click', () => document.body.classList.toggle('show-catalog'))
})

/**
 * Инициализация слайдера с товарами
 * @param sliderClass { String }
 */
function initSliderGoods(sliderClass) {
    new Swiper(sliderClass, {
        breakpoints: {
            1270: {
                slidesPerView: 4,
                spaceBetween: 24
            },
        },
        // Navigation arrows
        navigation: {
            nextEl: `.swiper-goods-nav.swiper-button-next`,
            prevEl: `.swiper-goods-nav.swiper-button-prev`,
        }
    });

}

/**
 * Показать подменю при наведении мыши
 */
function showSubmenu() {
    const dropdownElementList = document.querySelectorAll('.js-dropdown .nav-link')
    const dropdownList = [...dropdownElementList].map(el => new bootstrap.Dropdown(el))

    dropdownElementList.forEach((el, i) => {
        const parent = el.closest('.js-dropdown')
        let timeOut

        el.addEventListener('mouseenter', () => {
            parent.classList.add('dropdown-show')

            // Задержку показа подменю, чтобы избавиться от случайного наведения на пункт меню
            timeOut = setTimeout(() => {
                if (parent.classList.contains('dropdown-show')) {
                    dropdownList[i].show()
                }
            }, 200)
        })

        parent.addEventListener('mouseleave', () => {
            parent.classList.remove('dropdown-show')
            clearTimeout(timeOut)
            dropdownList[i].hide()
        })
    })
}

function hoverShowCategory () {
    const categories = document.querySelectorAll('.js-catalog-list > li')

    categories.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            const category = el.getAttribute('data-category')
            const content = document.querySelector(`.catalog-category-content[data-content-category='${category}']`)

            if (content) {
                content.classList.add('show')
                content.getSiblings().forEach(el => el.classList.remove('show'))
            }

            el.classList.add('active')
            el.getSiblings().forEach(el => el.classList.remove('active'))
        })
    })
}


/********************************* Service scripts *****************************************/


/**
 * Получение соседних элементов
 *
 * @param el
 * @param next
 * @param arr
 * @returns {*|*[]}
 */
function getNextPrevElements(el, next, arr = [],) {
    let checkEl = next ? el.nextElementSibling : el.previousElementSibling;

    if (checkEl != null) {
        arr.push(checkEl);
        return getNextPrevElements(checkEl, next, arr);

    } else return arr;
}

Object.prototype.getSiblings = function () {
    return [...getNextPrevElements(this, false), ...getNextPrevElements(this, true)];
}
