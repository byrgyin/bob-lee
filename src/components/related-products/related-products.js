import Swiper from 'swiper';
import {Scrollbar} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import './related-products.scss';

if(document.querySelector('.related-products__swiper')) {
 const swiper = new Swiper('.related-products__swiper', {
     modules: [Scrollbar],
     slidesPerView: 2,
     spaceBetween: 12,
     speed: 900,
     scrollbar: {
         el: '.related-products__swiper-scrollbar',
         hide:false,
     },
     breakpoints: {
         991:{
             slidesPerView: 4,
             spaceBetween: 24,
         }
     }
 })
}