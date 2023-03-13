import '../scss/main.scss'
import '../scss/style.scss'
import '../scss/pages/main-page/main-page.scss'

document.addEventListener('DOMContentLoaded', () => {
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

    const arSliders = [
        '.js-swiper-goods-new',
        '.js-swiper-goods-promo',
        '.js-swiper-goods-hit'
    ]

    arSliders.forEach(el => initSliderGoods(el))


    // Показать подменю при наведении мыши

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
})
