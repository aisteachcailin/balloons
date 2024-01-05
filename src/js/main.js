/**
 * Created by AndreyBan
 * in PhpStorm
 * 07.03.2023
 **/

document.addEventListener('DOMContentLoaded', () => {
    const arSliders = [
        '.js-swiper-goods-new',
        '.js-swiper-goods-promo',
        '.js-swiper-goods-hit'
    ]

    arSliders.forEach(el => initSliderGoods(el)) // Инициализация слайдеров с товарами
})

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
