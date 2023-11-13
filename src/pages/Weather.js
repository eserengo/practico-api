import { useState, useEffect } from "react"
import { FaCloudSun } from "react-icons/fa"
import { RxMagnifyingGlass } from "react-icons/rx"
import Menu from "../components/Menu.js"
import Spinner from "../components/Spinner.js"
import Error from "../components/Error.js"
import TodaysInfo from "../components/TodaysInfo.js"
import TodaysChart from "../components/TodaysChart.js"
import TodaysHighlights from "../components/TodaysHighlights.js"
import Locations from "../components/Locations.js"
import Forecast from "../components/Forecast.js"

/* Esta es la página principal del clima. Maneja la solicitud a la API del clima mediante un hook de efecto, 
almacena el resultado en un hook de estado y lo envía a sus descendientes mediante props.
Renderiza un mensaje temporal con un spinner mientras vuelve la solicitud o un mensaje de error si esta 
no es exitosa.
Cuando se reciben los datos se renderizan los componentes correspondientes.

Para el TP4 se incluye una nueva API que proporciona datos de geolocalización, se la llama al montarse el componente para 
que proporcione los datos de la locación por defecto; y tambien se crea un nuevo componente hijo (Locations), que proporciona
la posibilidad de cambiar la provincia y municipio. Si el usuario solo selecciona provincia, se muestran datos climáticos de 
esa locación y a continuación da la posibilidad de elegir un municipio, si ese es el caso se muestran los datos climáticos 
de ese municipio en particular.
También se cambió la paleta de colores: una paleta de colores fríos y tipografía clara con imágenes nocturnas, o una 
paleta de colores cálidos, tipografía oscura e imágenes de fondo diurnas, dependiendo de si es de día o de noche en la 
locación seleccionada.
Por último se crea una nueva característica, pronóstico, que muestra 5 días con los siguientes datos: fecha, tipo de clima,
temperatura máxima y mínima. Se accede al mismo a través de un botón en la página de clima.
*/

const Weather = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isForecastOn, setIsForecastOn] = useState(false);
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

  const toggleForecast = () => {
    setIsForecastOn(!isForecastOn);
  }

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

            : !isForecastOn
              ? <>
                <header className="w-full flex flex-col items-start justify-evenly gap-4 sm:flex-row sm:items-end 
                sm:justify-between text-OffBlack p-2 mt-32 sm:mt-12">
                  <Locations setLat={set$lat} setLon={set$lon} setLocation={setLocation} />
                  <section
                    className="border border-OffBlack rounded shadow-md shadow-Gray25 py-0 px-4 opacity-75
                    bg-gradient-to-r from-sky-600 to-sky-300 hover:cursor-pointer hover:opacity-100"
                    onClick={() => toggleForecast()}>
                    <span className="inline text-sm">Ver pronóstico</span>
                    <RxMagnifyingGlass className="inline ms-1 mb-1 w-6 h-6" />
                  </section>
                </header>
                <main className="grid grid-cols-1 grid-rows-[auto] sm:grid-cols-3 md:grid-cols-4 sm:grid-rows-4 md:grid-rows-5
                p-2">
                  <TodaysInfo data={ data } location={ location } />
                  <TodaysChart data={ data } />
                  <TodaysHighlights data={ data } />
                </main>
              </>

              : <Forecast lat={$lat} lon={$lon} location={location} isForecastOn={isForecastOn} setIsForecastOn={setIsForecastOn} />
        }
      </>
      : <Error data={ data } />
  )
}

export default Weather;
