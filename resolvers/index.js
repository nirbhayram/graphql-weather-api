const axios = require("axios");
const { UserInputError } = require("apollo-server");

const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.KEY}`;
const WEATHER_API_DETAIL = (lat, lon) => (`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${process.env.KEY}&units=metric`)

const resolvers = {

	Query: {

		getCityByName: async (obj, args, context, info) => {
			// name is required | country and config are optional
			const { name, country, config } = args;
			let url = `${WEATHER_API}&q=${name}`;

			// Add other fields if possible
			if (country) url = url + `,${country}`;
			if (config && config.units) url = url + `&units=${config.units}`;
			if (config && config.lang) url = url + `&lang=${config.lang}`;

			try {
				const { data } = await axios.get(url);

				if (country && country.toUpperCase() !== data.sys.country) {
					throw new UserInputError("Country code was invalid", {
						invalidArgs: { country: country },
					});
				}

				const response = await axios.get(WEATHER_API_DETAIL(data.coord.lat, data.coord.lon))
				const current = {
					temperature: response.data.current.temp,
					icon: response.data.current.weather[0].icon,
					main: response.data.current.weather[0].main,
					sunrise: response.data.current.sunrise,
					sunset: response.data.current.sunset,
					pop: response.data.daily[0].pop,
					uv: response.data.daily[0].uvi,
					dewDrops: response.data.daily[0].dew_point,
					windSpeed: response.data.current.wind_speed,
					humidity: response.data.current.humidity
				}
				const hourData = [];
				let i = 0;
				while (i < 10) {
					hourData.push({
						time: response.data.hourly[i].dt,
						icon: response.data.hourly[i].weather[0].icon,
						temperature: response.data.hourly[i].temp
					})
					i = i + 1;
				}
				const dailyData = [];
				i = 0;
				while (i < 8) {
					dailyData.push({
						date: response.data.daily[i].dt,
						icon: response.data.daily[i].weather[0].icon,
						minTemperature: response.data.daily[i].temp.min,
						maxTemperature: response.data.daily[i].temp.max
					})
					i = i + 1;
				}
				console.log(`${data.name} : ${new Date(data.dt*1000).toString()}`)

				return {
					name: data.name,
					dt:data.dt,
					hourData: hourData,
					dailyData: dailyData,
					current: current
				};
			} catch (e) {
				console.log(e);
				throw new Error('Something went wrong!')
			}
		}

	}

};

module.exports = {
	resolvers,
};
