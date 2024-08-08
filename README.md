# Weather App
A React-based Weather Application that provides current weather conditions and hourly forecasts for any city. The app uses the OpenWeather API to fetch weather data and displays it with a user-friendly interface.

## Features
* Search by City: Users can search for weather information by entering the name of any city.
* Current Weather: Displays the current weather conditions including temperature, wind speed, and humidity.
* Hourly Forecast: Provides a forecast for the next six hours with temperature and weather conditions.
 * Day of the Week: Shows the day of the week for each weather update.
* Responsive Design: Works well on both desktop and mobile devices.
  
## Installation
To run this project locally, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/Asiphile1/Weather-App-CodeTribe.git
cd weather-app
Install dependencies:

bash
Copy code
npm install
Create a .env file in the root of the project and add your OpenWeather API key:

plaintext
Copy code
VITE_API_KEY=your_openweather_api_key_here
Start the development server:

bash
Copy code
npm run dev
Open your browser and go to http://localhost:3000.

## Usage

* Search for a City: Enter the name of a city in the search bar and press Enter to view the weather forecast.
* View Current Weather: The current weather conditions will be displayed at the top of the page.
* View Hourly Forecast: Scroll through the horizontal list below the current weather to view the forecast for the next six hours.
* Environment Variables
* VITE_API_KEY: Your OpenWeather API key. Sign up on the OpenWeather website to obtain a free API key.

  
## Components

* App.jsx: The main component that renders the search bar, current weather, and hourly forecast.
* Context.jsx: Manages global state using React Context API, including fetching and storing weather data.
* WeatherCard.jsx: Displays current weather conditions.
* MiniCard.jsx: Displays weather information for a specific time or day.
* MiniHourCard.jsx: Displays hourly weather updates (currently part of the main file).

  
## APIs Used
OpenWeather API: Used to fetch weather data including current conditions and hourly forecasts. API Documentation


![Screenshot (69)](https://github.com/user-attachments/assets/08fe86a2-fd42-482f-b4ea-45f5ad7c2edc)
![Screenshot (70)](https://github.com/user-attachments/assets/22d2f153-b3cd-435d-b9b2-38c608e8e5b8)
![Screenshot (71)](https://github.com/user-attachments/assets/3d68dd3e-cfc6-477f-a18e-adff57c15e41)
![Screenshot (72)](https://github.com/user-attachments/assets/0323bf15-228a-4227-9f7f-97dd3d1e8406)
