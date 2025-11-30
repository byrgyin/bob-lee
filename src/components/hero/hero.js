import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import './hero.scss';

if (document.querySelector('.hero__swiper')) {
    const swiper = new Swiper('.hero__swiper', {
        modules: [Autoplay],
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        speed: 900,
    })
}