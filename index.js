
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

const apiKey = "1923fc2c491e38ce5b19014cb0677044";


//eventListener on *weatherForm to listen for submit event when button is clicked and perform some operations
weatherForm.addEventListener('submit', async event =>{
    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            //we get our weather data
            const weatherData = await getWeatherData(city); //we added async attribute to event =>{ since await works only in async
            displayWeatherInfo(weatherData); //we display it
        }
        catch(error){
            console.error(error);
            displayError(error)
        }

    }else{
        
        displayError("Please enter a valid city");
    }

});

// for fetching weather data
async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`;

    const response = await fetch(apiUrl);

    //for error incase the response is not ok
    if(!response.ok){
        throw new Error("Could not fetch weather data")
    }

    return await response.json();
}

// for displaying weather data in form of json
function displayWeatherInfo(data){

    const {name: city,
            main: {temp, humidity},
            weather: [{description, id}]
    } = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`; //we converted the fahrenheit temp. to Celcius
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");
    

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.append(weatherEmoji);


}

//for getting weather emoji depending on the weather type
function getWeatherEmoji(weatherId){

    switch(true){
        case(weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case(weatherId >= 300 && weatherId < 400):
            return "🌦️" ;
        case(weatherId >= 500 && weatherId < 600):
            return "🌧️" ;
        case(weatherId >= 600 && weatherId < 700):
            return "☃️" ;
        case(weatherId >= 700 && weatherId < 800):
            return "🌫️" ;
        case(weatherId === 800): //if its strictly 800
            return "☀️" ;
        case(weatherId >= 800 && weatherId < 810):
            return "☁️" ;
        default:
            return "❓"
    }

}

//for displaying error
function displayError(message){

    //we create an element => a paragraph
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;

    //we add already made css styling class to errorDisplay classList
    errorDisplay.classList.add("errorDisplay");

    //we set the text content of the HTML "card" to display only error text
    card.textContent = "";
    card.style.display = "flex";

    //we will append the errorDisplay to the card.
    card.appendChild(errorDisplay);
}


