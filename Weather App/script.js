console.log("Let's write JavaScript")

document.addEventListener("DOMContentLoaded", () => {

    const OWM_API_KEY = "f923fb6791aba2307846ba9e8ba65c4e";
    let clockInterval = null;

    const searchForm = document.getElementById("search-form");
    const cityInput = document.getElementById("city-input")
    const geolocationBtn = document.getElementById("geolocation-btn");
    const loadingOverlay = document.getElementById("loading-overlay");
    const weatherContent = document.getElementById("weather-content");
    const errorModal = document.getElementById("error-modal");
    const errorMessage = document.getElementById("error-message");
    const closeModalBtn = document.getElementById("close-modal-btn");
    const animationContainer = document.getElementById("animation-container");
    const suggestionsBox = document.getElementById("suggestions-box");
    const cityNameEl = document.getElementById("city-name");
    const currentDateEl = document.getElementById("current-date");
    const currentTimeEl = document.getElementById("current-time");
    const currentTempEl = document.getElementById("current-temp");
    const currentWeatherDescEl = document.getElementById("current-weather-desc");
    const currentWeatherIconEl = document.getElementById("current-weather-icon");
    const forecastContainer = document.getElementById("forecast-container");
    const sunriseTimeEl = document.getElementById("sunrise-time");
    const sunsetTimeEl = document.getElementById("sunset-time");
    const humidityEl = document.getElementById("humidity");
    const windSpeedEl = document.getElementById("wind-speed")
    const feelsLikeEl = document.getElementById("feels-like");
    const pressureEl = document.getElementById("pressure");
    const visibilityEl = document.getElementById("visibility");
    const airQualityEl = document.getElementById("air-quality");
    const healthRecommendationsEl = document.getElementById("health-recommendations");




    const backgroundImageDay = {
        Clear: "https://images.unsplash.com/photo-1599221885458-8b203b2bb0a8?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        Clouds: "https://images.unsplash.com/photo-1500740516770-92bd004b996e?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        Rain: "https://images.unsplash.com/photo-1534265854528-0c270f95e0d8?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        Drizzle: "https://images.unsplash.com/photo-1600415684478-744cf4f8f8d7?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        Thunderstorm: "https://plus.unsplash.com/premium_photo-1726818265070-c08eb719d77c?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        Snow: "https://images.unsplash.com/photo-1418985991508-e47386d96a71?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        Mist: "https://plus.unsplash.com/premium_photo-1675826774700-bda8f88f2bd2?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        Default: "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?w=500&%20auto=format&fit=crop&q=60&ixlib=rb-4.1.0&%20ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D"
    };


    const backgroundImageNight = {
        Clear: "https://plus.unsplash.com/premium_photo-1672070779337-e5655d9bbd9e?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        Clouds: "https://plus.unsplash.com/premium_photo-1700595207005-28a361f88f6e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        Rain: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&%20fit=crop&w=2000",
        Drizzle: "https://images.unsplash.com/photo-1634356067859-251dd7a49d56?w=500&%20auto=format&fit=crop&q=60&ixlib=rb-4.1.0&%20ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5pZ2h0JTIwZHJpenpsZXxlbnwwfHwwfHx8MA%3D%3D",
        Thunderstorm: "https://images.unsplash.com/photo-1533164054403-ca0c6540637d?%20w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&%20ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG5pZ2h0JTIwdGh1bmRlcnN0b3JtfGVufDB8fDB8fHww%27",
        Snow: "https://media.istockphoto.com/id/1279126420/photo/winter-background-merry-christmas-and-happy-new-year-greeting-card-with-copy-space-christmas.webp?a=1&b=1&s=612x612&w=0&k=20&c=WP2ijuzHplQzXxN5heVUxvHzVK2ANAukMRygSO5Rw68=",
        Mist: "https://plus.unsplash.com/premium_photo-1709474708878-92c1c384c7a1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWlzdCUyMG5pZ2h0fGVufDB8fDB8fHww",
        Default: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&%20auto=format&fit=crop&q=60&ixlib=rb-4.1.0&%20ixid=M3wxMjA3fDB8MHxzZWFjjY2h8NHx8bmF0dXJlJTIwbmlnaHR8ZW58MHx8MHx8fDA%3D"
    };




    const fetchWeather = async ({ lat, lon, city }) => {
        showLoading();
        if (clockInterval) clearInterval(clockInterval);

        try {
            if (!OWM_API_KEY) throw new Error("OpenWeatherMap API Key is missing.")
            let latitude = lat;
            let longitude = lon;

            if (city) {
                const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${OWM_API_KEY}`;
                const getResponce = await fetch(geoUrl);
                if (!getResponce.ok) throw new Error(`Could not find Location Data for "${city}".`);
                const geoData = await getResponce.json();
                if (geoData.length === 0) throw new Error(`Could not find Location Data for "${city}".`)
                latitude = geoData[0].lat;
                longitude = geoData[0].lon;
            }

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OWM_API_KEY}&units=metric`;
            const forecatUrl = `https://api.openweathermap.org/data/2.5/forecast?
lat=${latitude}&lon=${longitude}&appid=${OWM_API_KEY}&units=metric`;
            const aqiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?
lat=${latitude}&lon=${longitude}&appid=${OWM_API_KEY}`;

            const [weatherResponce, forecastResponce, aqiResponce] = await Promise.all([
                fetch(weatherUrl),
                fetch(forecatUrl),
                fetch(aqiUrl)
            ]);

            if ([weatherResponce, forecastResponce, aqiResponce].some(res => !res.ok)) {
                throw new Error("Failed to fetch all Weather Data. Please check your API Key and network connection.")
            }

            const weatherData = await weatherResponce.json();
            const forecastData = await forecastResponce.json();
            const aqiData = await aqiResponce.json();

            updateUI(weatherData, forecastData, aqiData);

        } catch (error) {
            console.error("Weather data fetch error: ", error);
            showError(error.message);
        } finally {
            hideLoading();
        }

    }

    const updateUI = (weather, forecast, aqi) => {
        let weatherConditionForBg = weather.weather[0].main;
        if (weatherConditionForBg === "Clouds" && weather.clouds.all < 20) {
            weatherConditionForBg = "Clear";
        }
        updateClock(weather.timezone);
        clockInterval = setInterval(()=> updateClock(weather.timezone),1000);

        const currentTimeUTC = weather.dt;
        const sunriseUTC = weather.sys.sunrise;
        const sunsetUTC = weather.sys.sunset;
        const isNight = (currentTimeUTC < sunriseUTC || currentTimeUTC > sunsetUTC);

        const backgroundSet = isNight? backgroundImageNight : backgroundImageDay;
        document.body.style.backgroundImage = `url('${backgroundSet[weatherConditionForBg] || backgroundSet.Default}')`;

        currentWeatherIconEl.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;

        cityNameEl.textContent = `${weather.name}, ${weather.sys.country}`;
        const localDate = new Date((weather.dt + weather.timezone) * 1000);
        currentDateEl.textContent = localDate.toLocaleDateString("en-US", {weekday:"long",month:"long",day:"numeric",timeZone:"UTC"});
        currentTempEl.textContent = `${Math.round(weather.main.temp)}°`;
        currentWeatherDescEl.textContent = weather.weather[0].description;
        const formatTime = (timestamp) => new Date(timestamp*1000).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:true,timeZone:"UTC"});
        sunriseTimeEl.textContent = formatTime(weather.sys.sunrise + weather.timezone);
        sunsetTimeEl.textContent = formatTime(weather.sys.sunset + weather.timezone);

        humidityEl.textContent = `${weather.main.humidity}%`;
        windSpeedEl.textContent = `${(weather.wind.speed * 3.6).toFixed(1)} km/h`;
feelsLikeEl.textContent = `${Math.round(weather.main.feels_like)}°`;
pressureEl.textContent = `${weather.main.pressure} hPa`;
visibilityEl.textContent = `${(weather.visibility / 1000).toFixed(1)} km`;

const aqiValue = aqi.list[0].main.aqi;
const aqiInfo = getAqiInfo(aqiValue);
airQualityEl.textContent = aqiInfo.text;
airQualityEl.className = `font-bold px-3 py-1 rounded-full text-sm ${aqiInfo.color}`;
healthRecommendationsEl.innerHTML = `<p class="text-gray-200 text-sm">${aqiInfo.recommendation}</p>`;

const dailyForecasts = processForecast(forecast.list);
forecastContainer.innerHTML = "";
dailyForecasts.forEach(day =>{
    const card = document.createElement("div");
    card.className = `p-4 rounded-2xl text-center card backdrop-blur-xl`;
    card.innerHTML = `<p class="dont-bold text-lg">${new Date (day.dt_txt).toLocaleDateString("en-US",{weekday:"short"})}</p>
    <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt = "${day.weather[0].description}" class="w-16 h-16 mx-auto">
    <p class="font-semibold">${Math.round(day.main.temp_max)}°/ ${Math.round(day.main.temp_min)}°</p>`;
    forecastContainer.appendChild(card);
});

updateNightAnimation(isNight, weatherConditionForBg);

}


const updateNightAnimation = (isNight, condition)=>{
    animationContainer.innerHTML = "";
    if(!isNight) return;

    if(condition === "Clear"){
        for(let i=0;i<20;i++){
            const star = document.createElement("div");
            star.className = "star";
            star.style.top = `${Math.random()*100}%`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.width = `${Math.random() *2 + 1}px`;
            star.style.height = star.style.width;
            star.style.animationDelay = `${Math.random() * 5}s`;
            star.style.animationDuration = `${Math.random() *3+2}s`;
            animationContainer.appendChild(star);
        }
    } else if(condition === "Rain" || condition === "Drizzle"){
        for(let i=0;i<50;i++){
            const drop = document.createElement("div");
            drop.className = "rain-drop";
            drop.style.left = `${Math.random() * 100}%`;
            drop.style.animationDelay = `${Math.random() * 2}s`;
            drop.style.animationDuration = `${Math.random() *0.5 + 0.5}s`;
            animationContainer.appendChild(drop);
        }
    } else if(condition === "Snow"){
        for(let i=0;i<50;i++){
            const flake = document.createElement("div");
            flake.className = "snowFlake";
            flake.style.left = `${Math.random() * 100}%`;
            flake.style.animationDelay = `${Math.random() * 10}s`;
            flake.style.animationDuration = `${Math.random() *5 + 5}s`;
            flake.style.opacity = `${Math.random()*0.5 + 0.3}`;
            animationContainer.appendChild(flake);
    }
}
}


const getAqiInfo = (aqi) =>{
    switch(aqi){
        case 1: return{
            text:"Good", color:"bg-green-500 text-white", recommendation:"Air quality is great. It's a perfect day to be active outside." };
        case 2: return { text: 'Fair', color: 'bg-yellow-500 text-black',
recommendation: "Air quality is acceptable. Unusually sensitive people should consider reducing prolonged or heavy exertion." };
case 3: return { text: 'Moderate', color: 'bg-orange-500 text-white',
recommendation: "Sensitive groups may experience health effects. The general public is less likely to be affected." };
case 4: return { text: 'Poor', color: 'bg-red-500 text-white',
recommendation: "Everyone may begin to experience health effects. Members of sensitive groups may experience more serious health effects." };
case 5: return { text: 'Very Poor', color: 'bg-purple-700 text-white',
recommendation: "Health alert: The risk of health effects is increased for everyone. Avoid outdoor activities." };
default: return { text: 'Unknown', color: 'bg-gray-500 text-white',
recommendation: "Air quality data is not available at the moment." }

        }
    };

const processForecast =(forecastList)=>{
    const dailyData = {};
    forecastList.forEach(entry => {
        const date = entry.dt_txt.split(' ')[0];
        if(!dailyData[date]){
            dailyData[date] = { temps_max: [], temps_min: [], icons:{}, entry:null}
        }
        dailyData[date].temps_max.push(entry.main.temps_max);
        dailyData[date].temps_min.push(entry.main.temps_min);
        const icon = entry.weather[0].icon;
        dailyData[date].icons[icon] = (dailyData[date].icons[icon] || 0) + 1;
        if(!dailyData[date].entry || entry.dt_txt.includes("12:00:00")){
            dailyData[date].entry = entry;
        }
    });

    const processed = [];
    for(const date in dailyData){
        const day = dailyData[date];
        const mostCommonIcon = Object.keys(day.icons).reduce((a,b)=> day.icons>day.icons[b] ? a:b);
        day.entry.weather[0].icon = mostCommonIcon;
        day.entry.main.temps_max = Math.max(...day.temps_max);
        day.entry.main.temps_min = Math.max(...day.temps_min);
        processed.push(day.entry);
    }
    return processed.slice(0,5);
}

const debounce = (func,delay)=>{
    let timeout;
    return(...args) =>{
        clearTimeout(timeout);
        timeout = setTimeout(()=> func.apply(this,args),delay);
    }
}

const handleCityInput = async (event) => {
    const query = event.target.value;
    if(query.length < 3){
        suggestionsBox.classList.add("hidden");
        return;
    }

    try {

        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${OWM_API_KEY}`;
                const responce = await fetch(geoUrl);
                if (!responce.ok) return;
                const cities = await responce.json();

                suggestionsBox.innerHTML = "";
                if(cities.length > 0){
                    suggestionsBox.classList.remove("hidden");
                    cities.forEach(city =>{
                        const div = document.createElement("div");
                        div.className = 'p-3 hover:bg-white/10 cursor-pointer';
                    
                    div.textContent = `${city.name}, ${city.state ? city.state + ',' : ' '}${city.country}`
                    div.onclick = ()=>{
                        cityInput.value = city.name;
                        suggestionsBox.classList.add("hidden");
                        fetchWeather({lat:city.lat, lon:city.lon})
                    };
                    suggestionsBox.appendChild(div);

                    })
                } else{
                    suggestionsBox.classList.add("hidden")
                }
        
    } catch (error) {
        console.error("Suggestion fetch error: ",error)
    }
}


    const updateClock = (timezoneOffset) =>{
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset()*60000);
        const localTime = new Date(utc + (timezoneOffset*1000))
        currentTimeEl.textContent = localTime.toLocaleTimeString("en-US", {hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:true})
    }



    const showLoading = () => {
        loadingOverlay.classList.remove("hidden");
        loadingOverlay.classList.add("flex");
    }

    const hideLoading = () => {
        loadingOverlay.classList.add("hidden");
        loadingOverlay.classList.remove("flex");
        weatherContent.classList.remove("opacity-0");
    }

    const showError = (message) => {
        errorMessage.textContent = message;
        errorModal.classList.remove("hidden");
    }

    searchForm.addEventListener("submit",(e)=>{
        e.preventDefault();
        const city = cityInput.value.trim();
        if(city) fetchWeather({city});
        suggestionsBox.classList.add("hidden");
        cityInput.value="";
    })

    cityInput.addEventListener("input",debounce(handleCityInput,300))

    document.addEventListener("click",(e)=>{
        if(!searchForm.contains(e.target)){
            suggestionsBox.classList.add("hidden")
        }
    });

    geolocationBtn.addEventListener('click',()=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (position) => fetchWeather({lat:position.coords.latitude, lon:position.coords.longitude}),
                ()=>{
                    console.log("Geolocation failed or was denied. Falling back to default city.");
                    fetchWeather({city:"New Delhi"});
                },
                {enableHighAccuracy:true, timeout:30000,maximumAge:0}
            );
        } else{
            console.log("Geolocation not supported. Falling back to default city.");
            fetchWeather({city:"New Delhi"});
        }
    });

    closeModalBtn.addEventListener("click",()=>
        errorModal.classList.add("hidden")
    );

    geolocationBtn.click();

})




