import { useState, useEffect } from "react"
import { FaCloudSun } from "react-icons/fa"
import Menu from "../components/Menu.js"
import Error from "../components/Error.js"
import Forecast from "../components/Forecast.js"
import Chart from "../components/Chart.js"
import Highlights from "../components/Highlights.js"

/* Esta es la página principal del clima. Maneja la solicitud a la API del clima mediante un hook de efecto, 
almacena el resultado en un hook de estado y lo envía a sus descendientes mediante props.
Renderiza un mensaje temporal con un spinner mientras vuelve la solicitud o un mensaje de error si esta no es exitosa.
Cuando se reciben los datos se renderizan los componentes correspondientes. */

const Weather = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    (async function fetchData() {
      const END_POINT = "https://api.open-meteo.com/v1/forecast";
      const QUERY_PARAMS =
          "?latitude=-34.6131&longitude=-58.3772&hourly=temperature_2m,relativehumidity_2m,visibility&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&current_weather=true&timezone=America%2FSao_Paulo&forecast_days=1";

      try {
        const res = await fetch(END_POINT + QUERY_PARAMS);
        if (res.ok) {
          const json = await res.json();
          return setData(json);
        }
        throw new Error(res.status);
      } catch (err) {
        return setData({ error: err.message });
      }
    }
    )();
  }, [])

  const Logo = () => (
    <span className="absolute top-0 left-0 p-2">
      <FaCloudSun className="inline w-6 h-6 me-1" />
      Clima
    </span>
  );

  return (
    data && !data.error
      ? <>
        <Logo />
        <Menu />
        {
          !data.current_weather
            ? <main className="flex flex-row items-center justify-center p-2 w-screen h-screen">
              <svg
                aria-hidden="true"
                className="animate-spin h-12 w-12 mr-4 text-Gray75 fill-sky-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor" />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill" />
              </svg>
              <h1 className="text-5xl font-bold text-OffBlack">Cargando...</h1>
            </main>

            : <main className="grid grid-cols-1 grid-rows-[auto] sm:grid-cols-3 md:grid-cols-4 sm:grid-rows-4
              md:grid-rows-3 p-2 max-sm:mt-32 sm:mt-12">
              <Forecast data={ data } />
              <Chart data={ data } />
              <Highlights data={ data } />
            </main>
        }
      </>
      : <Error data={data} />
  )
}

export default Weather;
