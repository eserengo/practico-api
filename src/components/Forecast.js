import {
  WiCloudy, WiFog, WiRain, WiRainMix, WiShowers, WiSleet, WiSnow, WiSnowflakeCold, WiSprinkle, WiThermometer,
  WiDayCloudy, WiDayCloudyHigh, WiDayLightning, WiDaySleet, WiDaySnow, WiDaySunny, WiDayRain, WiDayRainMix,
  WiDayShowers, WiDaySprinkle, WiDaySnowThunderstorm, WiDayStormShowers,
  WiNightClear, WiNightAltCloudy, WiNightAltCloudyHigh, WiNightAltLightning, WiNightAltRain, WiNightAltRainMix,
  WiNightAltShowers, WiNightAltSprinkle, WiNightAltSleet, WiNightAltSnow, WiNightAltSnowThunderstorm, WiNightAltStormShowers
} from "react-icons/wi"
import PropTypes from "prop-types"

const Forecast = ({ data }) => {

  const date = () => {
    return data.current_weather && new Date(data.current_weather.time);
  }

  const WeatherCode = () => {
    if (!data.current_weather.is_day) {
      switch (data.current_weather.weathercode) {
        case 1: return (<span className="text-2xl text-center">Principalmente despejado <WiNightAltCloudyHigh className="text-8xl mx-auto" /></span>);
        case 2: return (<span className="text-2xl text-center">Parcialmente nublado <WiNightAltCloudy className="text-8xl mx-auto" /></span>);
        case 3: return (<span className="text-2xl text-center">Nublado <WiCloudy className="text-8xl mx-auto" /></span>);
        case 45: return (<span className="text-2xl text-center">Niebla <WiFog className="text-8xl mx-auto" /></span>);
        case 48: return (<span className="text-2xl text-center">Niebla de escarcha <WiSnowflakeCold className="text-8xl mx-auto" /></span>);
        case 51: return (<span className="text-2xl text-center">LLovizna ligera <WiNightAltSprinkle className="text-8xl mx-auto" /></span>);
        case 53: return (<span className="text-2xl text-center">LLovizna moderada <WiNightAltShowers className="text-8xl mx-auto" /></span>);
        case 55: return (<span className="text-2xl text-center">LLovizna intensa <WiNightAltRain className="text-8xl mx-auto" /></span>);
        case 56: return (<span className="text-2xl text-center">LLovizna helada ligera <WiNightAltSleet className="text-8xl mx-auto" /></span>);
        case 57: return (<span className="text-2xl text-center">LLovizna helada intensa <WiNightAltRainMix className="text-8xl mx-auto" /></span>);
        case 61: return (<span className="text-2xl text-center">Lluvias ligeras <WiSprinkle className="text-8xl mx-auto" /></span>);
        case 63: return (<span className="text-2xl text-center">Lluvias moderadas <WiShowers className="text-8xl mx-auto" /></span>);
        case 65: return (<span className="text-2xl text-center">Lluvias intensas <WiRain className="text-8xl mx-auto" /></span>);
        case 66: return (<span className="text-2xl text-center">Lluvias heladas ligeras <WiSleet className="text-8xl mx-auto" /></span>);
        case 67: return (<span className="text-2xl text-center">Lluvias heladas intensas <WiRainMix className="text-8xl mx-auto" /></span>);
        case 71: return (<span className="text-2xl text-center">Nevadas ligeras <WiNightAltSnow className="text-8xl mx-auto" /></span>);
        case 73: return (<span className="text-2xl text-center">Nevadas moderadas <WiNightAltSnow className="text-8xl mx-auto" /></span>);
        case 75: return (<span className="text-2xl text-center">Nevadas intensas <WiSnow className="text-8xl mx-auto" /></span>);
        case 77: return (<span className="text-2xl text-center">Nevizca <WiNightAltSleet className="text-8xl mx-auto" /></span>);
        case 80: return (<span className="text-2xl text-center">Lluvias aisladas ligeras <WiNightAltSprinkle className="text-8xl mx-auto" /></span>);
        case 81: return (<span className="text-2xl text-center">Lluvias aisladas moderadas <WiNightAltShowers className="text-8xl mx-auto" /></span>);
        case 82: return (<span className="text-2xl text-center">Lluvias aisladas intensas <WiNightAltRain className="text-8xl mx-auto" /></span>);
        case 85: return (<span className="text-2xl text-center">Nevadas aisladas ligeras <WiNightAltSnow className="text-8xl mx-auto" /></span>);
        case 86: return (<span className="text-2xl text-center">Nevadas aisladas intensas <WiSnow className="text-8xl mx-auto" /></span>);
        case 95: return (<span className="text-2xl text-center">Tormentas eléctricas <WiNightAltLightning className="text-8xl mx-auto" /></span>);
        case 96: return (<span className="text-2xl text-center">Tormentas eléctricas con granizo ligero <WiNightAltSnowThunderstorm className="text-8xl mx-auto" /></span>);
        case 99: return (<span className="text-2xl text-center">Tormentas eléctricas con granizo intenso <WiNightAltStormShowers className="text-8xl mx-auto" /></span>);
        default: return (<span className="text-2xl text-center">Despejado <WiNightClear className="text-8xl mx-auto" /></span>);
      }

    } else {
      switch (data.current_weather.weathercode) {
        case 1: return (<span className="text-2xl text-center">Principalmente despejado <WiDayCloudyHigh className="text-8xl mx-auto" /></span>);
        case 2: return (<span className="text-2xl text-center">Parcialmente nublado <WiDayCloudy className="text-8xl mx-auto" /></span>);
        case 3: return (<span className="text-2xl text-center">Nublado <WiCloudy className="text-8xl mx-auto" /></span>);
        case 45: return (<span className="text-2xl text-center">Niebla <WiFog className="text-8xl mx-auto"  /></span>);
        case 48: return (<span className="text-2xl text-center">Niebla de escarcha <WiSnowflakeCold className="text-8xl mx-auto"  /></span>);
        case 51: return (<span className="text-2xl text-center">LLovizna ligera <WiDaySprinkle className="text-8xl mx-auto"  /></span>);
        case 53: return (<span className="text-2xl text-center">LLovizna moderada <WiDayShowers className="text-8xl mx-auto"  /></span>);
        case 55: return (<span className="text-2xl text-center">LLovizna intensa <WiDayRain className="text-8xl mx-auto" /></span>);
        case 56: return (<span className="text-2xl text-center">LLovizna helada ligera <WiDaySleet className="text-8xl mx-auto"  /></span>);
        case 57: return (<span className="text-2xl text-center">LLovizna helada intensa <WiDayRainMix className="text-8xl mx-auto"  /></span>);
        case 61: return (<span className="text-2xl text-center">Lluvias ligeras <WiSprinkle className="text-8xl mx-auto"  /></span>);
        case 63: return (<span className="text-2xl text-center">Lluvias moderadas <WiShowers className="text-8xl mx-auto"  /></span>);
        case 65: return (<span className="text-2xl text-center">Lluvias intensas <WiRain className="text-8xl mx-auto"  /></span>);
        case 66: return (<span className="text-2xl text-center">Lluvias heladas ligeras <WiSleet className="text-8xl mx-auto"  /></span>);
        case 67: return (<span className="text-2xl text-center">Lluvias heladas intensas <WiRainMix className="text-8xl mx-auto"  /></span>);
        case 71: return (<span className="text-2xl text-center">Nevadas ligeras <WiDaySnow className="text-8xl mx-auto"  /></span>);
        case 73: return (<span className="text-2xl text-center">Nevadas moderadas <WiDaySnow className="text-8xl mx-auto" /></span>);
        case 75: return (<span className="text-2xl text-center">Nevadas intensas <WiSnow className="text-8xl mx-auto"  /></span>);
        case 77: return (<span className="text-2xl text-center">Nevizca <WiDaySleet className="text-8xl mx-auto"  /></span>);
        case 80: return (<span className="text-2xl text-center">Lluvias aisladas ligeras <WiDaySprinkle className="text-8xl mx-auto"  /></span>);
        case 81: return (<span className="text-2xl text-center">Lluvias aisladas moderadas <WiDayShowers className="text-8xl mx-auto"  /></span>);
        case 82: return (<span className="text-2xl text-center">Lluvias aisladas intensas <WiDayRain className="text-8xl mx-auto"  /></span>);
        case 85: return (<span className="text-2xl text-center">Nevadas aisladas ligeras <WiDaySnow className="text-8xl mx-auto" /></span>);
        case 86: return (<span className="text-2xl text-center">Nevadas aisladas intensas <WiSnow className="text-8xl mx-auto" /></span>);
        case 95: return (<span className="text-2xl text-center">Tormentas eléctricas <WiDayLightning className="text-8xl mx-auto" /></span>);
        case 96: return (<span className="text-2xl text-center">Tormentas eléctricas con granizo ligero <WiDaySnowThunderstorm className="text-8xl mx-auto" /></span>);
        case 99: return (<span className="text-2xl text-center">Tormentas eléctricas con granizo intenso <WiDayStormShowers className="text-8xl mx-auto" /></span>);
        default: return (<span className="text-2xl text-center">Despejado <WiDaySunny className="text-8xl mx-auto" /></span>);
      }
    }
  }

  return (
    <article className="col-start-1 col-end-1 row-auto sm:row-start-1 sm:row-span-3 border border-OffBlack rounded-md shadow-md
    shadow-Gray25 sm:me-2">
      { !data.current_weather
        ? <section className="flex flex-col items-center justify-around span-2 h-full">
          <h1 className="text-[2rem] font-bold text-OffBlack">Cargando...</h1>
        </section>
        : <section className={`p-2 h-full flex flex-col items-center justify-evenly gap-4
          ${!data.current_weather.is_day ? "nighttime text-OffWhite" : "daytime text-OffBlack"}`}>
          <p className="text-2xl">{ !data.current_weather.is_day ? "Buenas noches" : "Buenos dias" }</p>
          <h1 className="inline text-5xl font-bold">
            { data.current_weather.temperature }
            <sup className="inline text-[2rem]">
              { data.hourly_units.temperature_2m }
            </sup>
            <WiThermometer className="inline" />
          </h1>
          <WeatherCode />
          <p className="text-2xl text-center">
            {date() && date().toLocaleString("es", { timeStyle: "short", dateStyle: "long", })}
          </p>
          <aside className="flex flex-row flex-wrap items-center justify-evenly rounded-md border border-OffBlack
            shadow-md shadow-Gray25 divide-x p-4 bg-gradient-to-tr from-orange-700 to-orange-400 w-full">
            <div className="flex flex-col items-center justify-between gap-2 pe-4 w-1/2 h-full">
              <h2 className="text-[2rem] font-bold">
                {data.daily.temperature_2m_max[0]}
                <sup className="inline text-2xl">
                  {data.daily_units.temperature_2m_max}
                </sup>
              </h2>
              <p className="text-2xl text-center">
                Maxima
              </p>
            </div>
            <div className="flex flex-col items-center justify-between gap-2 ps-4 w-1/2 h-full">
              <h2 className="text-[2rem] font-bold">
                {data.daily.temperature_2m_min[0]}
                <sup className="inline text-2xl">
                  {data.daily_units.temperature_2m_min}
                </sup>
              </h2>
              <p className="text-2xl text-center">
                Minima
              </p>
            </div>
          </aside>
        </section>
      }
    </article>
  )
}

Forecast.propTypes = {
  data: PropTypes.object,
}

export default Forecast;
