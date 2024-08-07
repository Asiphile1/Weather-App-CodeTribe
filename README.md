React Weather App


Overview


This project is a React-based weather application that provides real-time weather information, location-based forecasting, weather alerts, and support for multiple locations. The app includes customization options for theme and units, offline access through a service worker, and is optimized for performance and security.


Features


Real-time Weather Information: Get current weather data for a selected location.


Location-based Forecasting: Automatically fetch weather data based on user's location.


Weather Alerts: Display weather alerts and notifications.


Hourly and Daily Forecasts: Detailed weather forecasts for the next hours and days.


Multiple Locations: Support for searching and saving multiple locations.


Customization: Options to switch between light/dark themes and different units (metric/imperial).


Offline Access: Cached data for offline access using a service worker.


Performance Optimization: Lazy loading and code splitting for better performance.


Privacy and Security: Secure API keys using environment variables and serve the app over HTTPS.



Installation

A. Clone the repository:


git clone https://github.com/Asiphile/Weather-App-CodeTribe.git

cd react-weather-app

B. Install dependencies:


npm install


Start the development server:

npm start


The app should now be running on http://localhost:3000.

Deployment
Build the project:

npm run build


Deploy the build folder to your preferred hosting service.




File Structure

react-weather-app/
├── public/
│   ├── index.html
│   ├── manifest.json
│   ├── service-worker.js
├── src/
│   ├── components/
│   │   ├── Weather.js
│   │   ├── Locations.js
│   │   ├── Customization.js
│   │   ├── WeatherDetails.js
│   │   ├── FormattedDate.js
│   ├── App.js
│   ├── index.js
│   ├── App.css
│   ├── index.css
│   ├── serviceWorkerRegistration.js
│   ├── reportWebVitals.js
├── .env
├── .gitignore
├── package.json
├── README.md



Usage


Search for a City: Enter a city name in the search bar and click "Search".


View Weather Data: The app will display the current weather, hourly, and daily forecasts for the selected city.


Change Theme and Units: Use the customization options to switch between light/dark themes and metric/imperial units.


Location-based Forecasting: Allow the app to access your location to fetch weather data based on your current position.



Contributing
For any contributions email me on siphilemthethwa@gmail.com

License

This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgements
OpenWeatherMap API
React
Bootstrap
React Toastify
Material UI

![wEATHER APP FILE STRUCTURE](https://github.com/user-attachments/assets/3a73f28e-679c-4b1e-9dc2-cfb6a5179ff3)

