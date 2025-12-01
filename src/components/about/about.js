import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './about.scss';

if (document.querySelector('.about__swiper')) {
    const swiper = new Swiper('.about__swiper', {
        modules: [Pagination, Navigation],
        slidesPerView: 1.01,
        speed: 900,
        pagination: {
            el: '.about__swiper-pagination',
            type:'progressbar',
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
    })
}