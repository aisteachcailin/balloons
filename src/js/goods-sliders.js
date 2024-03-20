/**
 * Created by AndreyBan
 * in PhpStorm
 * 07.01.2024
 **/

(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const arSliders = [
            '.js-swiper-goods-new',
            '.js-swiper-goods-promo',
            '.js-swiper-goods-hit',
            '.js-swiper-goods-viewed',
            '.js-swiper-goods-collection'
        ]

        arSliders.forEach(el => initSliderGoods(el)) // Инициализация слайдеров с товарами
    })

    function initSliderGoods(sliderClass) {
        new Swiper(sliderClass, {
            breakpoints: {
                320: {
                    spaceBetween: 16,
                    slidesPerView: 1,
                    allowTouchMove: false,
                    direction: 'vertical',
                    height: 412
                },
                576: {
                    direction: 'horizontal',
                    spaceBetween: 16,
                    slidesPerView: 2,
                },
                768: {
                    direction: 'horizontal',
                    slidesPerView: 3,
                    spaceBetween: 16
                },
                1170: {
                    direction: 'horizontal',
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
})()
