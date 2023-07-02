//attaches extended-container html div to a global variable//


function populateExtendedForcast(response) {
    //append function to container to populate card data//
    extendedForcastContainer = document.querySelector(".extended-forcast-container");
    console.log(response);
    response.forecast.forecastday.forEach((forecastDay)=> {
        extendedForcastContainer.appendChild(createForcastCard(`http:${forecastDay.day.condition.icon}`, forecastDay.date, forecastDay.day.condition.text, forecastDay.day.mintemp_f, forecastDay.day.maxtemp_c, forecastDay.day.mintemp_c, forecastDay.day.maxtemp_c));
    })

}

//create five day forcast cards function to create the cards//
function createForcastCard(img, day, info, lowF, highF, lowC, highC) {
    let extendedForcastContainer = document.querySelector(".extended-container");

    //create the day info container and attach it to extend container html//
    let forcastFlex = document.createElement("div");
    forcastFlex.classList.add("forcast-flex");
    extendedForcastContainer.appendChild(forcastFlex);

    //create info-day container and append it to forcast flex//
    // let imgDayContainer = document.createElement("div");
    // imgDayContainer.classList.add("img-day");
    // forcastFlex.appendChild(imgDayContainer);

    let extendedDay = document.createElement("div");
    extendedDay.classList.add("extended-day");
    extendedDay.innerText = day;

    let extendedWeatherImage = document.createElement("img");
    extendedWeatherImage.classList.add("extended-weather-img");
    extendedWeatherImage.setAttribute("src", img);

    forcastFlex.appendChild(extendedDay);
    forcastFlex.appendChild(extendedWeatherImage);


    //create the extendedWeatherForcast div and append it to the forcast flex container//
    let extendedContidion = document.createElement("div");
    extendedContidion.classList.add("extended-weather-condition");
    extendedContidion.innerText = info;
    forcastFlex.appendChild(extendedContidion);

    //create the temp low div and append it to the forcast flex container//
    let tempLowF = document.createElement("div");
    tempLowF.classList.add("low-temp-f", "temp-f");
    tempLowF.innerText = lowF + '\u00B0 F';
    forcastFlex.appendChild(tempLowF);

    //create the temp high div and append it to the forcast flex container//
    let tempHighF = document.createElement("div");
    tempHighF.classList.add("high-temp-f", "temp-f");
    tempHighF.innerText = highF + '\u00B0 F';
    forcastFlex.appendChild(tempHighF);

    //create the temp low div and append it to the forcast flex container//
    let tempLowC = document.createElement("div");
    tempLowC.classList.add("low-temp-c", "temp-c");
    tempLowC.innerText = lowC + '\u00B0 C';
    forcastFlex.appendChild(tempLowC);

    //create the temp high div and append it to the forcast flex container//
    let tempHighC = document.createElement("div");
    tempHighC.classList.add("high-temp-c", "temp-c");
    tempHighC.innerText = highC + '\u00B0 C';
    forcastFlex.appendChild(tempHighC);

    return forcastFlex;
}
let searchButton = document.querySelector('#enter');
searchButton.addEventListener("click", locationSearch);

function locationSearch(e) {
    //set the button for the location name input to run location search//

    // let image = document.querySelector('img');
    let search = document.getElementById('search');
    let searchValue = search.value;

    if (!searchValue) {
        searchValue = 'chicago';
    }
    // console.log(e);

    if (!!e) {
        e.preventDefault();
    };
    // console.log(searchValue);
    //fetch data from the api site//
    fetch(`https://api.weatherapi.com/v1/forecast.json?q=${searchValue}&days=5&key=8b8288369c154c74b09154532232806`, { mode: 'cors' })
        //return JSON info from api//
        .then(function (response) {
            return response.json();
        })
        //check to make sure the JSON data is logging on the console//
        // .then(responseJson => console.log(responseJson))

        //display icon on the page//
        .then(function (response) {
            //creates current forcast data//
            let currentImage = document.querySelector("#current-image");
            currentImage.src = `http:${response.current.condition.icon}`;

            let currentCondition = document.querySelector("#current-condition");
            currentCondition.innerText = response.current.condition.text;

            let cityName = document.querySelector("#city-name")
            cityName.innerText = response.location.name

            let currentTemperatureF = document.querySelector("#current-temp-f")
            currentTemperatureF.innerText = response.current.temp_f + '\u00B0 F'

            let currentTemperatureC = document.querySelector("#current-temp-c")
            currentTemperatureC.innerText = response.current.temp_c + '\u00B0 C'

            // //creates extended weather dates data//
            populateExtendedForcast(response); 
        })

    return false;
}
locationSearch();

let toggleF = document.querySelector("#toggle-F");
toggleF.addEventListener("click", fahrenheitOrCelsius);

let toggleC = document.querySelector("#toggle-C");
toggleC.addEventListener("click", fahrenheitOrCelsius);

function fahrenheitOrCelsius() {
    
    if (document.querySelector("#toggle-F").checked) {
        document.querySelector(".temp-f").style.display = 'block';
        document.querySelector(".temp-c").style.display = 'none';
    } else {
        document.querySelector(".temp-f").style.display = 'none';
        document.querySelector(".temp-c").style.display = 'block';
    }
}


