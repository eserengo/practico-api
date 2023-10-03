import { useState, useEffect } from "react"
import { FaCloudSun } from "react-icons/fa"
import Menu from "../components/Menu.js"
import Error from "../components/Error.js"
import Forecast from "../components/Forecast.js"
import Chart from "../components/Chart.js"
import Highlights from "../components/Highlights.js"

const Weather = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    (async function fetchData() {
      const END_POINT = "https://api.open-meteo.com/v1/forecast";
      const QUERY_PARAMS = "?latitude=-34.6131&longitude=-58.3772&hourly=temperature_2m,relativehumidity_2m,visibility&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&current_weather=true&timezone=America%2FSao_Paulo&forecast_days=1";

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
          <main className="grid grid-cols-1 grid-rows-[auto] sm:grid-cols-3 md:grid-cols-4 sm:grid-rows-3 p-2 mt-32">
            <Forecast data={ data } />
            <Chart data={ data } />
            <Highlights data={ data } />
          </main>
        </>
      : <Error data={ data } />
  )
}

export default Weather;
