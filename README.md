# Wetter-Now-App

This is a weather application built with Next.js, a React framework for building server-side rendered and statically generated web applications. Tailwind CSS is used for styling, providing a utility-first CSS framework that allows for rapid development and customization. The application fetches weather data from the OpenWeather API to provide real-time weather information.

For the German version of this README, click [here](./README-de.md).

## Live Demo

Check out the live demo hosted on Vercel:

[<img src="./src/app/favicon.ico" alt="Wetter Now" width="50">](https://wetter-now.vercel.app)
[Wetter Now](https://wetter-now.vercel.app)

## Features
- Enter a location or zip code to fetch current weather data.
- View current weather conditions including temperature, description, and humidity.
- Get a 3-day weather forecast.
- Dynamic background color based on weather conditions.

## Technologies Used
- Next.js
- Tailwind CSS
- OpenWeather API
- ESLint
- GitHub Actions (for CI/CD)
- Cypress (for End-to-End Testing)
- Vercel (for Deployment and Hosting)

## CI/CD Pipeline

Continuous Integration/Continuous Deployment (CI/CD) is set up using GitHub Actions. The CI/CD pipeline automates the process of building, testing, and deploying the application.

## Testing

Cypress is used for end-to-end testing to ensure the application functions correctly.

## Performance Optimization

The Speed Insights tool provided by Vercel is utilized to analyze and optimize the performance of the application.

## Getting Started

First, clone the repository:

```bash
git clone https://github.com/d3rIngo/Projekt-Wetterapp.git
cd Projekt-Wetterapp
```

Then, install the dependencies:

```bash
npm install
```
## Set Up API Key

Make sure to add an API key for the OpenWeather API in your environment variables. Create a file named .env.local in the root directory of your project and add the following line:

```bash
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```

## Start the Development Server

Run the Server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser to see the application.

## Deploy on Vercel
The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out the [Next.js](https://nextjs.org/docs/pages/building-your-application/deploying) deployment documentation for more details.