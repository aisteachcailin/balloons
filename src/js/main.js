/**
 * Created by AndreyBan
 * in PhpStorm
 * 07.03.2023
 **/

import '../scss/pages/main-page/main-page.scss'
import '../js/add-cart'

window.addEventListener('load', () => document.body.classList.add('loaded'))
document.addEventListener('DOMContentLoaded', () => {
    const arSliders = [
        '.js-swiper-goods-new',
        '.js-swiper-goods-promo',
        '.js-swiper-goods-hit'
    ]

    arSliders.forEach(el => initSliderGoods(el)) // Инициализация слайдеров с товарами
    initScripts()
})

/**
 * Инициализация всех скриптов
 */
function initScripts() {
    showSubmenu()
    hoverShowCategory()
    stickyHeader()
    showHintSearch()
    openCatalog()
    mobileShowCategory()
}

/**
 * Подсказка результатов поиска
 */
function showHintSearch() {
    const search = document.querySelectorAll('[data-search]')
    const hintContent = document.querySelector('.js-hint-result')

    search.forEach(el => {
        el.addEventListener('input', () => {

            //TODO: Пример для демонстрации подсказки. Тут нужно будет реализовать свой код.
            // Рекомендация добавить debounce функцию от Lodash

            let hint = el.value.length > 2


            if (hint) {
                // Имитация результата запроса
                let result = [
                    {
                        name: 'Шарики сердце',
                        link: 'link-1'
                    },
                    {
                        name: 'Шарики 8 марта',
                        link: 'link-2'
                    },
                    {
                        name: 'Шарики с днем рожденья',
                        link: 'link-3'
                    }
                ]

                hintContent.innerHTML = '' // очищаем все что есть в подсказках

                // Добавляем новые подсказки из полученного результата запроса
                result.forEach((item) => {
                    const html = `<li class="header-search-hint__item">
                                <a href="#${ item.link }" class="header-search-hint__link">${ item.name }</a>
                            </li>`
                    hintContent.insertAdjacentHTML('afterbegin', html)
                })
            }

            //** Отображем подсказку **//
            el.closest('.header-search').setAttribute('data-hint', hint)

        })
    })
}

/**
 * Открыть/закрыть каталог
 */
function openCatalog() {
    const btnCatalog = document.querySelectorAll('.js-open-catalog')
    const closeMobile = document.querySelector('.catalog-menu-head__close')
    const bodyClass = document.body.classList
    const catalogShow = 'show-catalog'
    btnCatalog.forEach(el => el.addEventListener('click', () => bodyClass.toggle(catalogShow)))
    closeMobile.addEventListener('click', () => bodyClass.remove(catalogShow))
}

/**
 * Инициализация слайдера с товарами
 * @param sliderClass { String }
 */
function initSliderGoods(sliderClass) {
    new Swiper(sliderClass, {
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 16
            },
            1170: {
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
            }, 100)
        })

        parent.addEventListener('mouseleave', () => {
            parent.classList.remove('dropdown-show')
            clearTimeout(timeOut)
            dropdownList[i].hide()
        })
    })
}

/**
 * Отображение подкатегорий при наведении мыши на категорию в каталоге
 */
function hoverShowCategory() {
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

/**
 * Отображение подкатегорий на мобильных устройствах
 */
function mobileShowCategory() {
    const categories = document.querySelectorAll('.js-catalog-list-mobile li > a')

    categories.forEach(el => {
        el.addEventListener('click', () => {
            const menuItem = el.parentElement

            menuItem.getSiblings().forEach(li => li.classList.remove('is-open'))
            menuItem.querySelectorAll('.is-open').forEach(element => {
                element.classList.remove('is-open')
            })
            menuItem.classList.toggle('is-open')
        })
    })
}

/**
 * Приклеенная шапка к верху страницы
 */
function stickyHeader() {
    setStickyHeader()
    window.addEventListener('scroll', setStickyHeader)
}

function setStickyHeader() {
    if (matchMedia('(min-width: 992px)').matches) {
        if (scrollY > 72) {
            document.body.classList.add('header-fixed')
        } else {
            document.body.classList.remove('header-fixed')
        }
    }
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
