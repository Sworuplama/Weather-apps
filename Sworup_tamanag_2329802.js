

let API_KEY = "906a0c4ccf675aa8b3e19c94ce02db3f";

const name_head = document.getElementById('city_name')
const temp = document.getElementById('temp')
const min = document.getElementById('min')
const max = document.getElementById('max')
const rain = document.getElementById('rain')
const humidity = document.getElementById('humidity')
const pressure = document.getElementById('pressure')
const wind = document.getElementById('wind')
const status = document.getElementById('status')
const img = document.getElementById('icon')
const list = document.querySelector('ul')
const da_te = document.querySelector('.date')
const ti_me = document.querySelector('.time')

window.addEventListener('load', ()=> {
    getWeather("southampton")
});

function submit_click(){
    const city_name = document.getElementById('search_city').value
    console.log(city_name)
    getWeather(city_name)
}
function close_info(){
    document.getElementsByClassName('info')[0].classList.add('hidden')
    document.getElementsByClassName('search')[0].classList.remove('hidden')
}
function getWeather(city_name){
    document.getElementsByClassName('search')[0].classList.add('hidden')
    document.getElementsByClassName('loading')[0].classList.remove('hidden')
    console.log("inside")
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        name_head.innerHTML = response.name
        temp.innerHTML = `${response.main.temp}°C`
        min.innerHTML = `${response.main.temp_min}°C`
        max.innerHTML = `${response.main.temp_max}°C`
        humidity.innerHTML = `${response.main.humidity}%`
        pressure.innerHTML = `${response.main.pressure} hPa`
        const now_time = new Date(response.dt * 1000);
        wind.innerHTML = `${response.wind.speed} m/s ${response.wind.deg} °`
        status.innerHTML = `${response.weather[0].description.toUpperCase()}`
        
        const time = new Date(now_time.getTime() + response.timezone * 1000);
        const hours = time.getUTCHours();
        const minutes = time.getUTCMinutes();
        const seconds = time.getUTCSeconds();
        const date = now_time.toLocaleDateString(response.dt * 1000);
        const day = now_time.toLocaleDateString('en-US', { weekday: 'long' });

        da_te.innerHTML = `Date: ${date}, ${day}`;
        ti_me.innerHTML = `Time: ${hours} : ${minutes} : ${seconds}`

        if (response.rain){
            rain.innerHTML = `<i class="fas fa-cloud-showers-heavy"></i> ${response.rain["1h"]} mm/hr`
    }


    img.src = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
    document.getElementsByClassName('loading')[0].classList.add('hidden')
    document.getElementsByClassName('info')[0].classList.remove('hidden')
    
    }).catch((e) =>{
        document.getElementsByClassName('loading')[0].classList.add('hidden')
        document.getElementsByClassName('info')[0].innerHTML = "<h1>Invalid City Name</h1>"
        document.getElementsByClassName('info')[0].classList.remove('hidden')
    })
 



    
}