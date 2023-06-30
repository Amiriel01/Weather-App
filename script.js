//attaches extended-container html div to a global variable//


function populateExtendedForcast() {
    //append function to container to populate card data//
    let extendedForcastContainer = document.querySelector(".extended-forcast-container");
    // console.log(extendedForcastContainer);
    extendedForcastContainer.appendChild(createForcastCard("Image", "Friday", "Friday Forcast Info"));

    extendedForcastContainer.appendChild(createForcastCard("Image", "Saturday", "Saturday Forcast Info"));

    extendedForcastContainer.appendChild(createForcastCard("Image", "Sunday", "Sunday Forcast Info"));

    extendedForcastContainer.appendChild(createForcastCard("Image", "Monday", "Monday Forcast Info"));

    extendedForcastContainer.appendChild(createForcastCard("Image", "Tuesday", "Tuesday Forcast Info"));
}

populateExtendedForcast();

//create five day forcast cards function to create the cards//
function createForcastCard(img, day, info) {
    let extendedForcastContainer = document.querySelector(".extended-container");

    //create the day info container and attach it to extend container html//
    let forcastFlex = document.createElement("div");
    forcastFlex.classList.add("forcast-flex");
    extendedForcastContainer.appendChild(forcastFlex);

    //create info-day container and append it to extendedForcastContainer//
    let imgDayContainer = document.createElement("div");
    imgDayContainer.classList.add("img-day");
    forcastFlex.appendChild(imgDayContainer);

    //create the img and day divs attach them to imgDayContainer//
    let extendedWeatherImage = document.createElement("img");
    extendedWeatherImage.classList.add("extended-weather-img");
    extendedWeatherImage.setAttribute("src", img);

    let extendedDay = document.createElement("div");
    extendedDay.classList.add("extended-day");
    extendedDay.innerText = day;

    imgDayContainer.appendChild(extendedWeatherImage);
    imgDayContainer.appendChild(extendedDay);

    //create the extendedWeatherForcast div and append it to the extendedForcastContainer//
    let extendedWeatherForcast = document.createElement("div");
    extendedWeatherForcast.classList.add("extended-weather-forcast");
    extendedWeatherForcast.innerText = info;
    forcastFlex.appendChild(extendedWeatherForcast);

    return forcastFlex;
}

// async function logJSONData() {
//     const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=Chicago&days=5&dt=2023-07-01&alerts=alerts%3Dyes&aqi=aqi%3Dno&key=8b8288369c154c74b09154532232806=${searchValue}`, { mode: 'cors' });
//     const jsonData = await response.json();
//     console.log(jsonData);
//   }

let searchButton = document.querySelector('#enter');
searchButton.addEventListener("click", newLocation);

function newLocation(e) {

    // let image = document.querySelector('img');
    let search = document.getElementById('search');
    let searchValue = search.value;

    if (!searchValue) {
        searchValue = 'chicago';
    }
    console.log(e);

    if (!!e) {
        e.preventDefault();
    };
    console.log(searchValue);
    fetch(`https://api.weatherapi.com/v1/forecast.json?q=${searchValue}&days=5&key=8b8288369c154c74b09154532232806`, { mode: 'cors' })
        .then(function (response) {
            return response.json();
        })
        // .then(function (response) {
        //     image.src = response.forcast.forcastday[0].original.url;
        // })
        .catch(function (err) {
            console.error(err);
        });
    return false;
}
newLocation();


