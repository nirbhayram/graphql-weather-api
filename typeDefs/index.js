const { gql } = require("apollo-server");

const typeDefs = gql`

  type DailyData{
    date: String
    icon: String
    minTemperature: String
    maxTemperature: String
  }

  type Current{
    temperature: String
    icon: String
    main: String
    sunrise: String
    sunset: String
    pop: String
    uv: String
    dewDrops: String
  }

  type HourData {
    time: String
    icon: String
    temperature: String
  }

  type City {
    id: ID
    name: String
    country: String
    coord: Coordinates
    weather: Weather
    current: Current
    hourData: [HourData]
    dailyData: [DailyData]
  }

  type Coordinates {
    lon: Float
    lat: Float
  }

  type Summary {
    title: String
    description: String
    icon: String
  }

  type Temperature {
    actual: Float
    feelsLike: Float
    min: Float
    max: Float
  }

  type Wind {
    speed: Float
    deg: Int
  }

  type Clouds {
    all: Int
    visibility: Int
    humidity: Int
  }

  type Weather {
    summary: Summary
    temperature: Temperature
    wind: Wind
    clouds: Clouds
    timestamp: Int
  }

  input ConfigInput {
    units: Unit
    lang: Language
  }

  type Query {
    getCityByName(name: String!, country: String, config: ConfigInput): City
    getCityById(id: [String!], config: ConfigInput): [City]
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
