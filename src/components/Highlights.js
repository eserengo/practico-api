import { WiHorizon, WiHorizonAlt, WiHumidity, WiStrongWind, WiUmbrella, WiWindDeg } from "react-icons/wi"
import { BiShow, BiTachometer } from "react-icons/bi";
import PropTypes from "prop-types"

const Highlights = ({ data }) => {

  const filteredData = () => {
    return data.current_weather &&
    [
      {
        title: "indice uv",
        value: `${data.daily.uv_index_max}`,
        icon: < BiTachometer />,
        level: data.daily.uv_index_max > 5 ? "Alto" : data.daily.uv_index_max <= 2 ? "Bajo" : "Moderado",
      },
      {
        title: "velocidad del viento",
        value: `${data.current_weather.windspeed} ${data.current_weather_units.windspeed}`,
        icon: < WiStrongWind />,
        level: data.current_weather.windspeed > 50 ? "Fuerte" : data.current_weather.windspeed < 20 ? "Leve" : "Moderada",
      },
      {
        title: "direccion del viento",
        value: `${data.current_weather.winddirection}${data.current_weather_units.winddirection}`,
        icon: < WiWindDeg />,
        level: windDir(data.current_weather.winddirection),
      },
      {
        title: "salida del sol",
        value: `${data.daily.sunrise[0].slice(-5)} hs`,
        icon: < WiHorizon />,
        level: "",
      },
      {
        title: "puesta del sol",
        value: `${data.daily.sunset[0].slice(-5)} hs`,
        icon: < WiHorizonAlt />,
        level: "",
      },
      {
        title: "probabilidad de precipitaciones",
        value: `${data.daily.precipitation_probability_max[0]}${data.daily_units.precipitation_probability_max}`,
        icon: < WiUmbrella />,
        level: data.daily.precipitation_probability_max[0] > 66 ? "Alta" : data.daily.precipitation_probability_max[0] <= 33 ? "Baja" : "Moderada",
      },
      {
        title: "humedad relativa",
        value: `${humidity()}${data.hourly_units.relativehumidity_2m}`,
        icon: < WiHumidity />,
        level: humidity() > 60 ? "Alta" : humidity() < 40 ? "Baja" : "Normal",
      },
      {
        title: "visibilidad",
        value: `${visibility() / 1000} km`,
        icon: < BiShow />,
        level: visibility() > 10000 ? "Buena" : visibility() < 1000 ? "Escasa" : "Reducida",
      },
    ]
  }

  const windDir = (input) => {
    if (input < 45 || input >= 315) {
      return "Predominante Norte";
    } else if (input >= 45 && input < 135) {
      return "Predominante Este";
    } else if (input >= 135 && input < 225) {
      return "Predominante Sur";
    } else {
      return "Predominante Oeste";
    }
  }

  const humidity = () => {
    const currentHour = data.current_weather && data.current_weather.time.slice(-5).slice(0, 2);
    return data.hourly && data.hourly.relativehumidity_2m[currentHour];
  }

  const visibility = () => {
    const currentHour = data.current_weather && data.current_weather.time.slice(-5).slice(0, 2);
    return data.hourly && data.hourly.visibility[currentHour];
  }

  return (
    <article className="col-start-1 col-end-1 row-auto sm:col-start-2 sm:col-span-2 md:col-span-3 sm:row-start-2 sm:row-span-3 md:row-span-2 p-2 sm:mt-8">
      <h2 className="text-2xl text-OffBlack">Destacados</h2>
      <section className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-[auto] gap-2 mt-2">
        {
          filteredData().map((item, index) => {
            return (
              <div
                key={`card_${index}`}
                className="relative flex flex-col items-start justify-evenly gap-2 border border-OffBlack rounded-md shadow-md shadow-Gray25 p-2 overflow-hidden min-h-[10rem] bg-gradient-to-tr from-orange-500 to-orange-300">
                <h3 className="text-OffBlack z-10 uppercase">{ item.title }</h3>
                <p className="text-indigo-800 text-[2.5rem] font-bold z-10">{ item.value }</p>
                <p className="text-OffBlack text-xl z-10">{ item.level }</p>
                <span className="text-OffWhite opacity-25 absolute -top-4 left-1/3 text-[12rem] z-0">{ item.icon }</span>
              </div>
            )
          })
        }
      </section>
    </article>
  )
}

Highlights.propTypes = {
  data: PropTypes.object,
}

export default Highlights;
