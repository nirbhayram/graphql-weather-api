# 🌦️ GraphQL Weather API
#### A GraphQL Wrapper for the [Open Weather Map API](https://openweathermap.org/api)

Retrieve the current weather for any given city. Since this GraphQL API uses the free-tier of the Open Weather Map API, it is restricted to 60 calls/minute. 

## How to Use

#### Queries

* getCityByName (`name` *required*, `country` *optional*, `config` *optional*)

*Language and unit system can be specified via `config`.*

#### Example with all weather data

```graphql
query {
  getCityByName(name:"pune"){
    name
    dt
    current{
      temperature
      icon
      main
      sunrise
      sunset
      pop
      uv
      dewDrops
      windSpeed
      humidity
    }
    hourData{
      time
      icon
      temperature
    }
    dailyData{
      date
      icon
      minTemperature
      maxTemperature
    }
  }
}
```

## How to Install

For running this project locally, you must register your own application at [Open Weather Map](https://openweathermap.org/api). Then, create an .env file and add the following variable: `KEY=<YOUR-APP-ID>`

```sh
npm install
npm run dev # Using nodemon for auto-reloading
```
The server starts at http://localhost:4000/

