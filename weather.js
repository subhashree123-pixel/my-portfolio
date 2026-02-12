
        document.addEventListener('DOMContentLoaded', function() {
            const apiKey = '53e7bf141b99437cb82144412251810';
            const cityInput = document.getElementById('city-input');
            const searchBtn = document.getElementById('search-btn');
            const weatherInfo = document.getElementById('weather-info');
            const errorMessage = document.getElementById('error-message');
            const loading = document.querySelector('.loading');
            const forecastCards = document.getElementById('forecast-cards');
            
            // Elements to update
            const locationElement = document.getElementById('location');
            const dateElement = document.getElementById('date');
            const weatherIcon = document.getElementById('weather-icon');
            const conditionElement = document.getElementById('condition');
            const temperatureElement = document.getElementById('temperature');
            const feelsLikeElement = document.getElementById('feels-like');
            const humidityElement = document.getElementById('humidity');
            const windSpeedElement = document.getElementById('wind-speed');
            const pressureElement = document.getElementById('pressure');
            const visibilityElement = document.getElementById('visibility');
            const uvIndexElement = document.getElementById('uv-index');
            
            // Format date
            function formatDate(dateString) {
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                return new Date(dateString).toLocaleDateString('en-US', options);
            }
            
            // Format day for forecast
            function formatDay(dateString) {
                const options = { weekday: 'short', month: 'short', day: 'numeric' };
                return new Date(dateString).toLocaleDateString('en-US', options);
            }
            
            // Fetch weather data
            function fetchWeather(city) {
                // Show loading, hide other elements
                loading.style.display = 'block';
                weatherInfo.style.display = 'none';
                errorMessage.style.display = 'none';
                
                // For demo purposes, we'll use mock data since the API only returns current weather
                // In a real implementation, you would need a forecast API endpoint
                setTimeout(() => {
                    // Mock data for demonstration
                    const mockWeatherData = {
                        location: {
                            name: city,
                            country: "Country",
                            localtime: new Date().toISOString()
                        },
                        current: {
                            temp_c: Math.round(Math.random() * 30 + 5),
                            feelslike_c: Math.round(Math.random() * 30 + 5),
                            condition: {
                                text: ["Sunny", "Cloudy", "Partly Cloudy", "Rainy"][Math.floor(Math.random() * 4)],
                                icon: "//cdn.weatherapi.com/weather/64x64/day/113.png"
                            },
                            humidity: Math.round(Math.random() * 50 + 30),
                            wind_kph: Math.round(Math.random() * 30 + 5),
                            pressure_mb: Math.round(Math.random() * 50 + 1000),
                            vis_km: Math.round(Math.random() * 10 + 5),
                            uv: Math.round(Math.random() * 10 + 1)
                        }
                    };
                    
                    // Generate mock forecast data
                    const mockForecastData = [];
                    const today = new Date();
                    for (let i = 1; i <= 7; i++) {
                        const date = new Date(today);
                        date.setDate(today.getDate() + i);
                        
                        mockForecastData.push({
                            date: date.toISOString().split('T')[0],
                            day: {
                                maxtemp_c: Math.round(Math.random() * 30 + 10),
                                mintemp_c: Math.round(Math.random() * 10 + 5),
                                condition: {
                                    text: ["Sunny", "Cloudy", "Partly Cloudy", "Rainy"][Math.floor(Math.random() * 4)],
                                    icon: "//cdn.weatherapi.com/weather/64x64/day/113.png"
                                }
                            }
                        });
                    }
                    
                    updateWeatherUI(mockWeatherData, mockForecastData);
                    
                    // In a real implementation, you would use:
                    // const currentUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;
                    // const forecastUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=yes`;
                    
                    // Promise.all([
                    //     fetch(currentUrl).then(res => res.json()),
                    //     fetch(forecastUrl).then(res => res.json())
                    // ])
                    // .then(([currentData, forecastData]) => {
                    //     updateWeatherUI(currentData, forecastData.forecast.forecastday);
                    // })
                    // .catch(error => {
                    //     console.error('Error fetching weather data:', error);
                    //     loading.style.display = 'none';
                    //     errorMessage.style.display = 'block';
                    // });
                }, 1000);
            }
            
            // Update UI with weather data
            function updateWeatherUI(currentData, forecastData) {
                // Update current weather
                locationElement.textContent = `${currentData.location.name}, ${currentData.location.country}`;
                dateElement.textContent = formatDate(currentData.location.localtime);
                weatherIcon.src = `https:${currentData.current.condition.icon}`;
                conditionElement.textContent = currentData.current.condition.text;
                temperatureElement.textContent = `${Math.round(currentData.current.temp_c)}°C`;
                feelsLikeElement.textContent = `${Math.round(currentData.current.feelslike_c)}°C`;
                humidityElement.textContent = `${currentData.current.humidity}%`;
                windSpeedElement.textContent = `${currentData.current.wind_kph} km/h`;
                pressureElement.textContent = `${currentData.current.pressure_mb} mb`;
                visibilityElement.textContent = `${currentData.current.vis_km} km`;
                uvIndexElement.textContent = currentData.current.uv;
                
                // Update forecast
                forecastCards.innerHTML = '';
                forecastData.forEach(day => {
                    const forecastCard = document.createElement('div');
                    forecastCard.className = 'forecast-card';
                    forecastCard.innerHTML = `
                        <div class="forecast-date">${formatDay(day.date)}</div>
                        <img class="forecast-icon" src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
                        <div class="forecast-temp">${Math.round(day.day.maxtemp_c)}° / ${Math.round(day.day.mintemp_c)}°</div>
                        <div class="forecast-condition">${day.day.condition.text}</div>
                    `;
                    forecastCards.appendChild(forecastCard);
                });
                
                // Show weather info, hide loading
                loading.style.display = 'none';
                weatherInfo.style.display = 'block';
                weatherInfo.style.animation = 'fadeIn 0.5s ease-in-out';
            }
            
            // Event listeners
            searchBtn.addEventListener('click', function() {
                const city = cityInput.value.trim();
                if (city) {
                    fetchWeather(city);
                }
            });
            
            cityInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const city = cityInput.value.trim();
                    if (city) {
                        fetchWeather(city);
                    }
                }
            });
            
            // Load default city (London) on page load
            fetchWeather('London');
        });
