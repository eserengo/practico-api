/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { RxChevronLeft } from "react-icons/rx"
import WeatherCode from "./WeatherCode.js"
import Spinner from "./Spinner.js"
import Error from "./Error.js"
import PropTypes from "prop-types"

/* El componente es responsable de mostrar los datos del pronóstico del tiempo para una ubicación específica. 
Incluye funciones para obtener y presentar la información meteorológica, gestionar las interacciones del usuario 
y renderizar el pronóstico. Se muestra el pronóstico para cinco días a partir del día de hoy.
*/

const Forecast = ({ lat, lon, location, isForecastOn, setIsForecastOn }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    (async () => {
      if (lat && lon) {
        const API_ENDPOINT = "https://api.open-meteo.com/v1/forecast";
        const API_QUERY_PARAMS = `?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=America%2FSao_Paulo&forecast_days=5`;

        try {
          const response = await fetch(API_ENDPOINT + API_QUERY_PARAMS);
          if (response.ok) {
            const json = await response.json();
            setIsLoading(false);
            setSearchParams(() => {
              searchParams.set("pronostico", true);
              return searchParams;
            });
            return setData(json);
          }
          throw new Error();
        } catch (err) {
          return setData({ error: "No se pudo obtener datos." });
        }
      }
      return false;
    })();
  }, [])

  const createArrayOfObjects = (...arrays) => {
    const length = arrays[0].length;
    const result = [];

    for (let i = 0; i < length; i++) {
      const obj = {};
      for (let j = 0; j < arrays.length; j++) {
        switch (j) {
          case 0:
            obj["time"] = arrays[j][i];
            break;
          case 1:
            obj["weathercode"] = arrays[j][i];
            break;
          case 2:
            obj["max"] = arrays[j][i];
            break;
          default:
            obj["min"] = arrays[j][i];
        }
      }
      result.push(obj);
    }
    return result;
  }

  const arrangedData =
    data.daily &&
      createArrayOfObjects(
        data.daily.time,
        data.daily.weather_code,
        data.daily.temperature_2m_max,
        data.daily.temperature_2m_min
    )

  const bgDisplay = (code) => {
    switch (code) {
      case 0:
      case 1:
        return "dia-despejado text-OffBlack";
      case 2:
      case 3:
        return "dia-nublado text-OffWhite";
      case 45:
      case 48:
        return "dia-niebla text-OffWhite";
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
        return "dia-lluvioso text-OffWhite";
      case 71:
      case 73:
      case 75:
      case 77:
      case 85:
      case 86:
        return "dia-nieve text-OffBlack";
      default:
        return "dia-tormenta text-OffWhite";
    }
  }

  const handleClick = () => {
    setIsForecastOn(!isForecastOn);
    setSearchParams(() => {
      searchParams.delete("pronostico");
      return searchParams;
    });
  }

  return (data && !data.error
    ? <>
      {isLoading
        ? <main className="flex flex-row items-center justify-center p-2 w-screen h-screen">
          <Spinner />
          <h1 className="text-5xl font-bold text-OffBlack">Cargando...</h1>
        </main>
        : <main className="p-2 max-sm:mt-32 sm:mt-12">
          <aside className="mb-2">
            <button
              type={"button"}
              onClick={() => handleClick()}
              className="flex flex-row items-center justify-end opacity-60 text-Gray25 mb-2 w-full
                hover:opacity-100 hover:text-OffBlack"
            >
              <span className="me-2 border-2 border-OffBlack rounded shadow-md shadow-Gray25">
                <RxChevronLeft className="w-10 h-8" />
              </span>
              <span className="text-2xl font-bold">Volver</span>
            </button>
          </aside>
          <article>
            <h3 className="text-OffBlack text-xl md:text-2xl mb-2">
              Pronóstico para {location}
            </h3>
            <section className="flex flex-col items-start md:flex-row md:items-center md:justify-between gap-4">
              {arrangedData &&
                arrangedData.map((item, index) => {
                  return (
                    <div
                      key={`forecast_card_${index}`}
                      className= {
                        `flex flex-row items-center justify-between md:flex-col md:items-start w-full gap-2 md:gap-4
                        p-2 max-xs:min-h-[6rem] min-h-[8rem] md:min-h-[22rem] lg:min-h-[28rem] border border-OffBlack rounded shadow-md
                        shadow-Gray25 custom-bg ${bgDisplay(item.weathercode)}`
                      }
                    >
                      <span
                        className="max-sm:text-sm md:text-xl lg:text-2xl max-sm:w-1/4"
                      >
                        {new Date(item.time).toLocaleString("es", {
                          dateStyle: "long",
                          timeZone: "UTC",
                        })}
                      </span>
                      <WeatherCode
                        is_day={1}
                        code={item.weathercode}
                        text={"max-sm:text-sm md:text-xl lg:text-2xl max-md:text-center"}
                        icon={"max-md:mx-auto text-4xl md:text-6xl lg:text-8xl"}
                      />
                      <span
                        className="max-sm:text-sm md:text-xl lg:text-2xl max-xs:w-1/4"
                      >
                        max: <br /> {item.max} {data.daily_units.temperature_2m_max}
                      </span>
                      <span
                        className="max-sm:text-sm md:text-xl lg:text-2xl max-xs:w-1/4"
                      >
                        min: <br /> {item.min} {data.daily_units.temperature_2m_min}
                      </span>
                    </div>
                  );
                })}
            </section>
          </article>
        </main>
      }
    </>
    : <Error data={data} />
  );
}

Forecast.propTypes = {
  lat: PropTypes.number,
  lon: PropTypes.number,
  location: PropTypes.string,
  isForecastOn: PropTypes.bool,
  setIsForecastOn: PropTypes.func,
}

export default Forecast;
