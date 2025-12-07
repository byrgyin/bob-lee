import "./header.scss";

const header = document.querySelector('.header'),
    nav = document.querySelector('.header__nav'),
    bodyForClose = document.querySelector('body'),
    buttonMenu = document.querySelector('.header__button-menu');

const navTransit = (nav) => {
    nav.addEventListener('transitionend', (e) => {
        if (!header.classList.contains('header--active')) {
            nav.style.cssText = '';
        }
    });
}
const clearOpenHeaderMenu = () => {
    header.classList.remove('header--active');
    navTransit(nav);
}

window.addEventListener('scroll', (e) => {
    const scrollTop = window.pageYOffset;
    if(scrollTop >= 100) {
        header.classList.add('header--scrolled');
    } else{
        header.classList.remove('header--scrolled');
    }
});
buttonMenu.addEventListener('click', (e) => {
    header.classList.toggle('header--active');
    nav.style.cssText = 'transition: transform 0.4s ease-out;';
    navTransit(nav);
});
const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
        if (entry.contentRect.width >= 992) {
            clearOpenHeaderMenu()
        }
    }
});

resizeObserver.observe(bodyForClose);
if(window.location.pathname !== '/') {
 header.classList.add('header--not-hp');
}
