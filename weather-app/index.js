'use strict'

const baseUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
const key = '93XJ43SYRLR9MLCTN86ZTLNUF'

// DOM elements
const searchInput = document.getElementById('search')
const searchBtn = document.querySelector('.search')
const resultContainer = document.querySelector('.result-container')

async function getWeather(location, apiKey) {
    // if (location === null) {
    //     location = 'Lagos'
    // }
  const url = `${baseUrl}${encodeURIComponent(location)}?key=${apiKey}&contentType=json`
  
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    displayWeather(data)
  } catch (error) {
    console.error('Error fetching weather data:', error)
    resultContainer.innerHTML = `<p class="error">⚠️ Could not fetch weather data.</p>`
  }
}

// Display weather data
function displayWeather(data) {
  const location = data.address
  const current = data.currentConditions

  resultContainer.innerHTML = `
    <h2>${location}</h2>
    <div class="weather-detail">
      <span>🌡️ Temperature</span>
      <span>${current.temp}°C</span>
    </div>
    <div class="weather-detail">
      <span>☁️ Condition</span>
      <span>${current.conditions}</span>
    </div>
    <div class="weather-detail">
      <span>💧 Humidity</span>
      <span>${current.humidity}%</span>
    </div>
    <div class="weather-detail">
      <span>💨 Wind Speed</span>
      <span>${current.windspeed} km/h</span>
    </div>
    <div class="weather-detail">
      <span>🔥 Feels Like</span>
      <span>${current.feelslike}°C</span>
    </div>
  `
}

// Event listener for search
searchBtn.addEventListener('click', () => {
  const location = searchInput.value.trim()
  if (location) {
    getWeather(location, key)
  } else {
    return;
  }

  searchInput.value = ''
})

// Default load (Lagos)
getWeather('lagos', key)


