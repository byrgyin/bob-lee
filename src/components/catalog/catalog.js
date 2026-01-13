import './catalog.scss';

if (document.querySelector('.filter-prod__range-price')) {
    const slider = document.querySelector('.filter-prod__fieldset-range-price'),
        progress = slider.querySelector('.range-slider__progress'),
        minPriceInput = slider.querySelector('.range-price__min-price'),
        maxPriceInput = slider.querySelector('.range-price__max-price'),
        minInput = slider.querySelector('.range-price__min-input'),
        maxInput = slider.querySelector('.range-price__max-input'),
        form = document.querySelector('.catalog__filter-prod form'),
        legendBtn = document.querySelectorAll('.filter-prod__legend'),
        sortBtn = document.querySelector('.control-panel__open-sort'),
        buttonFilterOpen = document.querySelector('.control-panel__open-filter'),
        buttonFilterClose = document.querySelector('.control-panel__close-sort') ,
        asideFilters = document.querySelector('.catalog__filter-prod'),
        buttonClose = document.querySelector('.filter-prod__close'),
        body = document.querySelector('body'),
        widthMatch = window.matchMedia("(max-width: 767px)");

    let isDragging = false;
    let startOffsetX;


    const checkResize = (content) => {
        if(widthMatch.matches){
            if(content.style.maxHeight){
                body.classList.add('body-active');
            } else {
                body.classList.remove('body-active');
            }
        }
    }
    const updateProgress = ()=>{
      const minValue = parseInt(minInput.value)
      const maxValue = parseInt(maxInput.value);

      const range = maxInput.max - minInput.min;
      const valueRange = maxValue - minValue;
      const width = parseInt(valueRange / range * 100);

      const minOffset = parseInt(((minValue - minInput.min)/range) * 100);

        progress.style.width = `${width}%`;
        progress.style.left = `${minOffset}%`;
      minPriceInput.value = minValue;
      maxPriceInput.value = maxValue;
    };

    const updateRange = (event) => {
        const input = event.target;

        let min = parseInt(minPriceInput.value),
        max = parseInt(maxPriceInput.value);

        if(input === minPriceInput && min > max){
            max = min;
            maxPriceInput.value = max;
        } else if(input === maxPriceInput && max < min){
            min = max;
            minPriceInput.value = min;
        }

        minInput.value = min;
        maxInput.value = max;

        updateProgress();
    }

    minPriceInput.addEventListener('input', updateRange);
    maxPriceInput.addEventListener('input', updateRange);


    minInput.addEventListener('input', (e) => {
        if(parseInt(minInput.value) >= parseInt(maxInput.value)) {
            maxInput.value = parseInt(minInput.value);
        }
        updateProgress();
    });

    maxInput.addEventListener('input', (e) => {
        if(parseInt(maxInput.value) <= parseInt(minInput.value)) {
            minInput.value = parseInt(maxInput.value);
        }
        updateProgress();
    });

    progress.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isDragging = true;

        startOffsetX = e.clientX - progress.getBoundingClientRect().left;

        slider.classList.toggle('dragging', isDragging);
    });

    document.addEventListener('mousemove', (e) => {
        if(isDragging) {
            const sliderRect = slider.getBoundingClientRect();
            const progressWidth = parseFloat(progress.style.width || 0);

            let newLeft = ((e.clientX - sliderRect.left - startOffsetX)/sliderRect.width) * 100;


            newLeft = Math.min(Math.max(newLeft,0), 100 - progressWidth);

            progress.style.left = `${newLeft}%`

            const range = maxInput.max - minInput.min;
            const newMin = Math.round((newLeft/100)*range) + parseInt(minInput.min);
            const newMax = newMin + parseInt(maxInput.value) - parseInt(minInput.value);

            minInput.value = newMin;
            maxInput.value = newMax;
            updateProgress();
        }
        slider.classList.toggle('dragging', isDragging);
    });

    document.addEventListener('mouseup', (e) => {
        if(isDragging) {
            isDragging = false;
        }
        slider.classList.toggle('dragging', isDragging);
    });

    form.addEventListener('reset', () => {
        setTimeout(updateProgress, 0);
    });

    updateProgress();

    legendBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const content = e.target.nextElementSibling;
            if(content.style.maxHeight){
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    sortBtn.addEventListener('click', (e) => {
        const content = e.target.nextElementSibling;
        if(content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
        }
        checkResize(content);
    });
    buttonFilterClose.addEventListener('click', (e) => {
        const content = e.target.closest('.control-panel__wrapper-sort-list');
        if(content){
            content.style.maxHeight = null;
            body.classList.remove('body-active');
        }
    });

    buttonFilterOpen.addEventListener('click', (e) => {
        asideFilters.style.cssText = 'transition: transform .3s ease;';
        asideFilters.classList.add('catalog__filter-prod--active');
        body.classList.add('body-active');
    });
    asideFilters.addEventListener('transitionend', (e) => {
        if(!asideFilters.classList.contains('catalog__filter-prod--active')) {
            asideFilters.style.cssText = '';
        }
    });
    buttonClose.addEventListener('click', (e) => {
        asideFilters.classList.remove('catalog__filter-prod--active');
        body.classList.remove('body-active');
    });
}