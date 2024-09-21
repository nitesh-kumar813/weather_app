<div align="center">
  <h3 align="center">Weather Application</h3>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🔗 [Assets](#links)

---

## 🤖 Introduction

This weather application allows users to check the current weather as well as a 5-day forecast for any city, with the ability to toggle between Celsius and Fahrenheit. It also includes a "Pull to Refresh" feature to update the weather data.

---

## ⚙️ Tech Stack

- React
- TypeScript
- TailwindCSS
- OpenWeather API
- React Toastify
- React Icons
- Dotenv

---

## 🔋 Features

👉 **Search for City Weather**: Enter a city name to get the current weather conditions and a 5-day forecast.

👉 **Toggle Celsius/Fahrenheit**: Switch between Celsius and Fahrenheit to display temperatures.

👉 **Current Location Weather**: Option to fetch weather data based on the user's current location.

👉 **Weather Details**: Displays information such as temperature, humidity, wind speed, and more.

👉 **Responsive Design**: The application is fully responsive and works across all devices and screen sizes.

---

## 🤸 Quick Start

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en) (v14 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Cloning the Repository

```bash
git clone https://github.com/your-username/weather_app.git
cd weather_app
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:
```env
REACT_APP_WEATHER_API_KEY=your_openweather_api_key
```
**Running the Project**

```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## Assets
- Weather Icons: The icons used for weather conditions come from the [OpenWeather API](https://openweathermap.org/).
- Banner: Replace the placeholder banner image link with your own custom image or design.
