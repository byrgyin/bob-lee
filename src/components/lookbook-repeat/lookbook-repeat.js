import './lookbook-repeat.scss';
if(document.querySelector('.lookbook-repeat__custom-width')) {
    const bodyWatcher = document.body;
    const lookbookWrapper = document.querySelectorAll('.lookbook-repeat__custom-width');

    const addCSSVariables = () => {
        lookbookWrapper.forEach((el) => {
            const elWidth = el.clientWidth;
            el.style.setProperty('--look-width', `${elWidth}px`);
        })
    }

    const resizeObserver = new ResizeObserver((entries)=>{
        for(let entry of entries){
            if(entry.contentRect.width < 480){
                addCSSVariables();
            }
        }
    });
    resizeObserver.observe(bodyWatcher);
}