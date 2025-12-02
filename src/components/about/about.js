import Swiper from 'swiper';
import { Scrollbar, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import './about.scss';

if (document.querySelector('.about__swiper')) {
    const swiper = new Swiper('.about__swiper', {
        modules: [Scrollbar, Navigation],
        slidesPerView: 1.01,
        speed: 900,
        scrollbar: {
            el: '.about__swiper-scrollbar',
            hide:false,
        },
        navigation: {
            prevEl: '.about__button-slide--prev',
            nextEl: '.about__button-slide--next',
        },
        breakpoints: {
            991:{
                slidesPerView: 2.025,
            }
        }
    });
}