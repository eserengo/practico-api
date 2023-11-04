import { useState, useEffect } from "react"
import { FaCloudSun } from "react-icons/fa"
import Menu from "../components/Menu.js"
import Spinner from "../components/Spinner.js"
import Error from "../components/Error.js"
import Forecast from "../components/Forecast.js"
import Chart from "../components/Chart.js"
import Highlights from "../components/Highlights.js"
import Locations from "../components/Locations.js"

/* Esta es la página principal del clima. Maneja la solicitud a la API del clima mediante un hook de efecto, 
almacena el resultado en un hook de estado y lo envía a sus descendientes mediante props.
Renderiza un mensaje temporal con un spinner mientras vuelve la solicitud o un mensaje de error si esta 
no es exitosa.
Cuando se reciben los datos se renderizan los componentes correspondientes. */

const Weather = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [$lat, set$lat] = useState(0);
  const [$lon, set$lon] = useState(0);
  const [location, setLocation] = useState("el AMBA");
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      const API_ENDPOINT = "https://apis.datos.gob.ar/georef/api/provincias?nombre=ciudad%20autonoma%20de%20buenos%20aires";

      try {
        const response = await fetch(API_ENDPOINT);
        if (response.ok) {
          const json = await response.json();
          set$lat(json.provincias[0].centroide.lat);
          set$lon(json.provincias[0].centroide.lon);
          return;
        }
        throw new Error();
      } catch (err) {
        return setData({ error: "No se pudo obtener datos." });
      }
    })();
  }, [])

  useEffect(() => {
    (async () => {
      if ($lat && $lon) {
        const API_ENDPOINT = "https://api.open-meteo.com/v1/forecast";
        const API_QUERY_PARAMS = `?latitude=${$lat}&longitude=${$lon}&hourly=temperature_2m,relativehumidity_2m,visibility&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&current_weather=true&timezone=America%2FSao_Paulo&forecast_days=1`;

        try {
          const response = await fetch(API_ENDPOINT + API_QUERY_PARAMS);
          if (response.ok) {
            const json = await response.json();
            setIsLoading(false);
            return setData(json);
          }
          throw new Error();
        } catch (err) {
          return setData({ error: "No se pudo obtener datos." });
        }
      }
      return false;
    })();
  }, [$lat, $lon])

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
          isLoading
            ? <main className="flex flex-row items-center justify-center p-2 w-screen h-screen">
              <Spinner />
              <h1 className="text-5xl font-bold text-OffBlack">Cargando...</h1>
            </main>

            : <main className="p-2 max-sm:mt-32 sm:mt-12">
              <article className="w-full flex flex-col items-start justify-evenly gap-2 md:flex-row md:items-center md:justify-start
              md:gap-4 text-OffBlack mb-2 max-sm:mx-2">
                <Locations setLat={set$lat} setLon={set$lon} setLocation={setLocation} />
              </article>
              <article className="grid grid-cols-1 grid-rows-[auto] sm:grid-cols-3 md:grid-cols-4 sm:grid-rows-4 md:grid-rows-3">
                <Forecast data={ data } location={ location } />
                <Chart data={ data } />
                <Highlights data={ data } />
              </article>
            </main>
        }
      </>
      : <Error data={ data } />
  )
}

export default Weather;
