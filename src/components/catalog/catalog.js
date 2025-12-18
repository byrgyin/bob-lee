import './catalog.scss';

if (document.querySelector('.filter-prod__range-price')) {
    const slider = document.querySelector('.filter-prod__fieldset-range-price'),
        progress = slider.querySelector('.range-slider__progress'),
        minPriceInput = slider.querySelector('.range-price__min-price'),
        maxPriceInput = slider.querySelector('.range-price__max-price'),
        minInput = slider.querySelector('.range-price__min-input'),
        maxInput = slider.querySelector('.range-price__max-input');

    let isDragging = false;
    let startOffsetX;


    const updateProgress = ()=>{
      const minValue = parseInt(minInput.value)
      const maxValue = parseInt(maxInput.value);

      const range = maxInput.max - minInput.min;
      const valueRange = maxValue - minValue;
      const width = parseInt(valueRange / range * 100);

      const minOffset = parseInt(((minValue - minInput.min)/range) * 100);

      slider.style.setProperty('--widthProgress', `${width}%`);
      slider.style.setProperty('--leftOffset', `${minOffset}%`);
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

            let newLeft = ((e.clientX - sliderRect.left - startOffsetX)/sliderRect.width) * 100;
            slider.style.setProperty('--leftOffset', `${newLeft}%`);

        }
        slider.classList.toggle('dragging', isDragging);
    });

    document.addEventListener('mouseup', (e) => {
        if(isDragging) {
            isDragging = false;
            console.log('stop dragging')
        }
        slider.classList.toggle('dragging', isDragging);
    })


    updateProgress();
}