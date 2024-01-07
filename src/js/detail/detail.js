/**
 * Created by AndreyBan
 * in PhpStorm
 * 05.01.2024
 **/

import('../../scss/pages/detail/detail.scss')
document.addEventListener('DOMContentLoaded', () => {
    initDetailSlider()
})
function initDetailSlider() {
    let thumbs = new Swiper(".detail-thumbs-slider", {
        spaceBetween: 24,
        slidesPerView: 3,
        freeMode: true,
        watchSlidesProgress: true,
        breakpoints: {
            320: {
                spaceBetween: 8,
            },
            768: {
                spaceBetween: 16,
            },
            1024: {
                spaceBetween: 24,
            }
        }
    });

    new Swiper(".detail-slider", {
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: thumbs,
        }
    });
}
