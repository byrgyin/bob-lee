import Swiper from 'swiper';
import {Scrollbar} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';

import './influencer.scss';

if (document.querySelector('.influencer__swiper')) {
    let mySwiper = null;
    const slides = document.querySelectorAll('.influencer__swiper-slide');
    const clearClass = () => {
        slides.forEach(slide => {
            slide.classList.remove('influencer__swiper-slide--active');
        });
    }
    const checkResize = () => {
        const width = window.matchMedia("(min-width: 481x)");
        if(width.matches) return true
    }
    slides.forEach((slide, index) => {
        if (index === 4) {
            slide.classList.add('influencer__swiper-slide--active');
        }
        slide.addEventListener('click', (e) => {
            if(checkResize){
                clearClass();
                e.currentTarget.classList.add('influencer__swiper-slide--active');
            }
        });
    });

    const influencerSliderInit = (boolean)=>{
        if(boolean){
            mySwiper = new Swiper('.influencer__swiper', {
                modules: [Scrollbar],
                slidesPerView: 1,
                spaceBetween: 1,
                scrollbar: {
                    el: '.influencer__swiper-scrollbar',
                    hide:false,
                },
                speed: 900,
            });
            mySwiper.destroy(true,true);
            mySwiper = null;
        } else{
            mySwiper = new Swiper('.influencer__swiper', {
                modules: [Scrollbar],
                slidesPerView: 1,
                spaceBetween: 1,
                scrollbar: {
                    el: '.influencer__swiper-scrollbar',
                    hide:false,
                },
                speed: 900,
            });
        }
    }

    const elementToObserve = document.body;
    const handleResize = (entries) => {
        for (let entry of entries) {
            const width = Math.floor(entry.contentRect.width);
            if(width < 480){
                influencerSliderInit();
            } else {
                console.log(width)
                influencerSliderInit(true);
            }
        }
    };
    const observer = new ResizeObserver(handleResize);

    observer.observe(elementToObserve);
}