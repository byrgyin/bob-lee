import './contacts.scss';

if (document.querySelector('.contacts__map')) {
    const arrayEvent = ['scroll', 'mousemove', 'touchstart'];
    let flagLoad = false;

    const initYMAP = () => {
        const wrapMAP = document.querySelector('.contacts__map');
        const starIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAN7SURBVHgB5ZuNdaJAFIVvtgI7cDqIHUgH2gF0sOkAO3A7wA42HZAO1ApgK9AOZuciZicsCMqbAcx3zo1J8DzmPd78Dy9wjzIKjF7L36lZ+WmTG53Lz4PRsfzMMUECo61RZqR7ijaS0uao4VPdGJ3Q3+lbwQjxf/YMig/Hq+K9mGEKA/MGv443ZYR3lFGK4RyvC4SCJ4Z+6reqxRsc8wuAHrk2cMQOgJ6IEgizB6Anpj2E2AHQE1WCnmwA6Ilriwd5A6CfRHf3Dgrj7Ooe1Ql3jhMyYNACu1CKjkTA4IV1pdaqoODx6UdRpIMg8BkAVoXZrQB4HellWVZoNpv5DELc5LyCx4Zvs9noK3Ec+wxAYxZEvgqhlNI2p9Op+J+v+6MhCzIJ40znNmeSJNFV0jRtDZpgVTlVnQ+EDH8+XdZtOrper78EhA1fE3aDSGf53e12W9giwlkS2AFIBA1/Fthmv98XAam7doXXbIer1yTLiMoQOZM0TiekYfCEA0Cf8QP/1urFOB6PkOb9/R3CKKM5f1lDNrJF/ZXGUS8RMgNeIcz5fEae55DicDiI2rNYMAALOEAyZRkARyj+EF/uYnd2q7W/F9oKw9BFFSiWzTIpg6ynHNC4gj2BcFtA3/sbYqPHsT2HtD7gvQSD0M+AdLp3RapasBHshUlJDIVUzyCSSpzS+oDVjPcSnBjJNoJ1Mz0p2MC6aATFu0HO4qS7weVyqaXLWfqO3w4Mi2YCJ1cuykjf2QjmcMBiITfANGsKcEQxxIwgHNnqkpcEjhZOV8yADwgj+fSvrFYrOOB4rQI5BHFRWAdBzWH5zeUhsdRqWtJqWu6yv8PGk8tnddcky4jK1nkgZdheFKXDHK7a9ZdD5ybsoS3tmEz6so44n88lA7BEBZFNETrbVtC6GWPbmp/wsniGGmIh452ypDpz9LwxEtYFgNtF3rbG7LnDAFtjCg3EvgrCdL5ujvq6Z6mbR2a8ZgEbREdLXU3K0GEL4JnOBlUVoiMpMHhhXTz9zih880NS5Jmqwk88iOgQeSDF6MkOgJ6oEgjxrQ9LX9kB0BNRAkfEAPTI9fDh6K6M+ZWZh1v7e1EY13niFAO9Qhdh2EB4fepNKFzqne8XJ2O0nPv1jYL7jBil43UscemKJIJBG1vUrOFJ8AL3KFwOYi1K8e+21+cp7tp8GP2BQ/4CNnoB0ITWrmUAAAAASUVORK5CYII='

        const otherPlacemarksData = [
            {
                coords: [55.758405, 37.631439],
                title: 'YAUZA STORE',
                description: 'YAUZA STORE',
                icon: `${starIcon}`,
                url: 'https://yandex.ru/maps/-/CLgPBS9W'
            },
            {
                coords: [55.754865, 37.645362],
                title: 'ODMO',
                description: 'МODMO',
                icon: `${starIcon}`,
                url: 'https://yandex.ru/maps/-/CLgPB6p5'
            },
        ];

        const init = () => {
            const myMap = new ymaps.Map(wrapMAP, {
                center: [55.755547, 37.636328],
                zoom: 14,
                controls: []
            });

            const CustomPlacemarkLayout = ymaps.templateLayoutFactory.createClass(
                '<div class="contacts__custom-placemark">' +
                '<img class="contacts__custom-placemark-icon" src="$[properties.icon]" alt="">' +
                '<div class="contacts__custom-placemark-title">$[properties.title]</div>' +
                '</div>',
                {
                    build: function () {
                        CustomPlacemarkLayout.superclass.build.call(this);
                        const element = this.getElement();
                        if (element) {
                            const size = element.getBoundingClientRect();
                            element.style.marginLeft = -size.width / 2 + 'px';
                            element.style.marginTop = -size.height + 'px';
                        }
                    }
                }
            );

            const collection = new ymaps.GeoObjectCollection({}, {
                draggable: false,
                balloonCloseButton: true,
                hideIconOnBalloonOpen: false,
            });

            otherPlacemarksData.forEach(pm => {
                const placemark = new ymaps.Placemark(
                    pm.coords,
                    {
                        title: pm.title,
                        description: pm.description,
                        icon: pm.icon,
                    },
                    {
                        iconLayout: CustomPlacemarkLayout,
                    }
                );

                collection.add(placemark);
            });

            myMap.geoObjects.add(collection);
        };

        ymaps.ready(init);
    };

    const loadYmap = () => {
        const scriptYmap = document.createElement('script'),
            my_API_KEY = 'ea8dec4c-11b2-497d-92de-221013b3eee5';

        scriptYmap.src = `https://api-maps.yandex.ru/2.1/?apikey=${my_API_KEY}&lang=ru_RU`;
        scriptYmap.defer = true;

        document.body.appendChild(scriptYmap);

        scriptYmap.addEventListener('load', () => {
            initYMAP();
        });
    };

    arrayEvent.forEach(item => {
        window.addEventListener(item, (e) => {
            if (!flagLoad) {
                loadYmap();
                flagLoad = true;
            }
        }, {passive: true, once: true});
    });
}