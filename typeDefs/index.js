const { gql } = require("apollo-server");

const typeDefs = gql`

	type DailyData{
		date: Float
		icon: String
		minTemperature: Float
		maxTemperature: Float
	}

	type Current{
		temperature: Float
		icon: String
		main: String
		sunrise: Float
		sunset: Float
		pop: Float
		uv: Float
		dewDrops: Float
		windSpeed: Float
		humidity: Float
	}

	type HourData {
		time: Float
		icon: String
		temperature: Float
	}

	type City {
		name: String
		dt:Float
		current: Current
		hourData: [HourData]
		dailyData: [DailyData]
	}

	input ConfigInput {
		units: Unit
		lang: Language
	}

	type Query {
		getCityByName(name: String!, country: String, config: ConfigInput): City
	}

	enum Unit {
		metric
		imperial
		kelvin
	}

	enum Language {
		af
		al
		ar
		az
		bg
		ca
		cz
		da
		de
		el
		en
		eu
		fa
		fi
		fr
		gl
		he
		hi
		hr
		hu
		id
		it
		ja
		kr
		la
		lt
		mk
		no
		nl
		pl
		pt
		pt_br
		ro
		ru
		sv
		se
		sk
		sl
		sp
		es
		sr
		th
		tr
		ua
		uk
		vi
		zh_cn
		zh_tw
		zu
	}
`;

module.exports = {
	typeDefs,
};
