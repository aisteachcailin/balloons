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

    const dropdownElementList = document.querySelectorAll('.js-dropdown .nav-link')
    const dropdownList = [...dropdownElementList].map(el => new bootstrap.Dropdown(el))

    dropdownElementList.forEach((el, i) => {
        el.addEventListener('mouseenter', e => {
            setTimeout(() => {
                console.log(e)
                dropdownList[i].show()
            }, 200)
        })
        el.closest('.js-dropdown')
            .addEventListener('mouseleave', () => dropdownList[i].hide())
    })
})
