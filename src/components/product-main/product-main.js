import './product-main.scss';

// faq-block
document.querySelectorAll('.faq-prod__button').forEach(el => {
    el.addEventListener('click', (e) => {
        if(e.target.nextElementSibling){
            const content = e.target.nextElementSibling;
            if(content.style.maxHeight) {
                content.style.maxHeight = null;
                e.target.classList.remove('faq-prod__button--active');
            } else {
                e.target.classList.add('faq-prod__button--active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        }
    });
    if(window.innerWidth > 767){
        el.click();
    }
});

// thumbs
if(document.querySelector('.product-main__thumb-item')){
    const thumb = document.querySelectorAll('.product-main__thumb-item'),
    gallery = document.querySelectorAll('.product-main__gallery-item'),
    headerHeight = document.querySelector('.header').offsetHeight;

    const resetClass = ()=>{
        thumb.forEach(el => {
            el.classList.remove('product-main__thumb-item--active');
        });
    };
    const scrollToPhoto = (targetIndex) => {
        gallery.forEach((el,index) => {
            if(targetIndex === index){
                const itemTop = el.getBoundingClientRect().top - headerHeight;
                window.scrollBy({
                    top: itemTop,
                    behavior: "smooth",
                });
            }
        });
    };
    const checkPhoto = (targetIndex)=>{
        thumb.forEach((el, index) => {
            if(targetIndex === index){
                resetClass();
                el.classList.add('product-main__thumb-item--active');
            }
        });
    };

    thumb.forEach((el, index) => {
        el.addEventListener('click', (e) => {
            resetClass();
            e.currentTarget.classList.add('product-main__thumb-item--active');
            scrollToPhoto(index)
        });
    });
    window.addEventListener('scroll', ()=>{
        gallery.forEach((el,index) => {
            const itemTop = el.getBoundingClientRect().top - headerHeight;
            if(itemTop < 0){
                checkPhoto(index)
            }
        });
    },{passive: true});
}
// responsive slide
const galleryWrapper = document.querySelector('.product-main__gallery-list');
const bodyWatcher = document.body;

const addCSSVariables = () => {
    const widthGalleryWrapper = galleryWrapper.clientWidth;
    galleryWrapper.style.setProperty('--slide-width', `${widthGalleryWrapper}px`);
}

const resizeObserver = new ResizeObserver((entries)=>{
    for(let entry of entries){
        if(entry.contentRect.width < 480){
            addCSSVariables();
        }
    }
});
resizeObserver.observe(bodyWatcher);
