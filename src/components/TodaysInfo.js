import { WiThermometer } from "react-icons/wi"
import WeatherCode from "./WeatherCode.js"
import PropTypes from "prop-types"

/* Este componente muestra los datos a la izquierda de la pantalla, a saber:
- La temperatura actual.
- El código de clima, para renderizarlo se usa el minicomponente WeatherCode, cuya lógica es un condicional switch. 
Dependiendo del número del código suministrado por la API devuelve un texto descriptivo y un ícono correspondiente 
de la librería Weather Icons. Dependiendo de si la variable is_day es verdadera o falsa corresponde un ícono diurno 
o nocturno. Algunos íconos son indistintos.
- La fecha y la hora.
- Temperaturas máxima y mínima del día.
El componente muestra una imagen de fondo ejemplificativa y texto oscuro o claro dependiendo nuevamente si la 
variable is_day es verdadera o falsa.

Para el TP4 se agregan:
- La locación de provincia y municipio.
- Imágenes ejemplificativas de fondo según el tipo de clima que devuelve la API, porque antes solo había imágenes de 
fondo de día o de noche, pero no ejemplificaban el tipo de clima.
*/

const TodaysInfo = ({ data, location }) => {
  const date = () => {
    return data.current_weather && new Date(data.current_weather.time);
  };

  const bgDisplay = () => {
    if (!data.current_weather.is_day) {
      switch (data.current_weather.weathercode) {
        case 0:
        case 1:
          return "noche-despejado text-OffWhite";
        case 2:
        case 3:
          return "noche-nublado text-OffWhite";
        case 45:
        case 48:
          return "noche-niebla text-OffWhite";
        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
        case 61:
        case 63:
        case 65:
        case 66:
        case 67:
        case 80:
        case 81:
        case 82:
          return "noche-lluvioso text-OffWhite";
        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
          return "noche-nieve text-OffWhite";
        default:
          return "noche-tormenta text-OffWhite";
      }
    } else {
      switch (data.current_weather.weathercode) {
        case 0:
        case 1:
          return "dia-despejado text-OffBlack";
        case 2:
        case 3:
          return "dia-nublado text-OffBlack";
        case 45:
        case 48:
          return "dia-niebla text-OffBlack";
        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
        case 61:
        case 63:
        case 65:
        case 66:
        case 67:
        case 80:
        case 81:
        case 82:
          return "dia-lluvioso text-OffBlack";
        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
          return "dia-nieve text-OffBlack";
        default:
          return "dia-tormenta text-OffBlack";
      }
    }
  }

  return (
    <article className="col-start-1 col-end-1 row-auto sm:row-start-1 sm:row-span-4 md:row-span-3 border
      border-OffBlack rounded-md shadow-md shadow-Gray25 max-sm:mx-2 sm:me-2 sm:mb-2 sm:mt-10 lg:mb-4 xl:mb-6">
      <section className={`flex flex-col items-center justify-evenly gap-4 p-2 h-full custom-bg ${bgDisplay()}`}>
        <p className="text-xl">
          {!data.current_weather.is_day ? "Buenas noches" : "Buenos dias"}
        </p> 
        <h1 className="inline text-5xl font-bold">
          {data.current_weather.temperature}
          <sup className="inline text-[2rem]">
            {data.hourly_units.temperature_2m}
          </sup>
          <WiThermometer className="inline" />
        </h1>
        { location.includes("Error")
          ? (
            <p className="text-xl text-center text-red-600">
              {location}
            </p>
          )
          : (
            <p className="text-xl text-center">
              en {location}
            </p> 
          )
        }
        <WeatherCode
          is_day={data.current_weather.is_day}
          code={data.current_weather.weathercode}
          text={"text-xl text-center"}
          icon={"text-8xl mx-auto"}
        />
        <p className="text-xl text-center">
          {date() &&
            date().toLocaleString("es", {
              timeStyle: "short",
              dateStyle: "long",
            })}
        </p>
        <aside
          className={`flex flex-row flex-wrap items-center justify-evenly rounded-md border border-OffBlack shadow-md 
          shadow-Gray25 divide-x p-4
          ${!data.current_weather.is_day
            ? "divide-OffWhite bg-gradient-to-r from-indigo-200 via-indigo-400 to-indigo-800"
            : "divide-OffBlack bg-gradient-to-r from-orange-700 via-orange-400 to-orange-200"
          }`}
          >
          <div className="flex flex-col items-center justify-between gap-2 pe-4 w-1/2 h-full">
            <h2 className="text-[2rem] font-bold">
              {data.daily.temperature_2m_max[0]}
              <sup className="inline text-2xl">
                {data.daily_units.temperature_2m_max}
              </sup>
            </h2>
            <p className="text-xl text-center">Maxima</p>
          </div>
          <div className="flex flex-col items-center justify-between gap-2 ps-4 w-1/2 h-full">
            <h2 className="text-[2rem] font-bold">
              {data.daily.temperature_2m_min[0]}
              <sup className="inline text-2xl">
                {data.daily_units.temperature_2m_min}
              </sup>
            </h2>
            <p className="text-xl text-center">Minima</p>
          </div>
        </aside>
      </section>
    </article>
  );
};

TodaysInfo.propTypes = {
  data: PropTypes.object,
  location: PropTypes.string,
};

export default TodaysInfo;
