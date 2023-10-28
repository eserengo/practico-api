import { useState, useRef, useId, useEffect, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { FaBusAlt, FaSearch } from "react-icons/fa"
import { CLIENT_ID, CLIENT_SECRET } from "../config/APIKeys.js"
import Menu from "../components/Menu.js"
import Spinner from "../components/Spinner.js"
import Error from "../components/Error.js"
import TransitMap from "../components/TransitMap.js"

/* Esta es la página principal del tráfico. Maneja la solicitud a la API mediante un hook de efecto, 
almacena el resultado en un hook de estado y lo envía a sus descendientes mediante props.
Renderiza un mensaje temporal con un spinner mientras vuelve la solicitud o un mensaje de error si esta no es 
exitosa.
Cuando se reciben los datos se renderizan los componentes correspondientes.

Opté por desarrollar un enfoque mixto, en principio se realiza la solicitud a la API, pero ya que esto puede
fallar por varias razones, ya sea porque se cayó la API (poco probable), o porque esta no acepta las credenciales 
o se llegó al límite de solicitudes disponibles (ya que todos usamos las mismas credenciales, es mucho mas probable), 
o porque el usuario no tiene la extensión de CORS (recontra probable). Entonces pensé en implementar un respaldo  
mediante dos bloques try-catch anidados, si por cualquiera de estas situaciones el fetch a la API falla, 
el programa pasa a hacer un fetch a un archivo json estático, que contiene los datos de una llamada normal a la API.
*/

const Traffic = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filteredBy, setFilteredBy] = useState("");
  const [data, setData] = useState([]);
  const filterRef = useRef(null);
  const filterId = useId();
  const searchRef = useRef(null);
  const searchId = useId();
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchData = async () => {
    const API_ENDPOINT = "https://apitransporte.buenosaires.gob.ar/colectivos/vehiclePositionsSimple";
    const API_QUERY_PARAMS = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
    const JSON_FILE_URL = "trafficData.json";

    try {
      const response = await fetch(API_ENDPOINT + API_QUERY_PARAMS);
      if (response.ok) {
        const json = await response.json();
        setIsLoading(false);
        return setData(json);
      }
      throw new Error();
    } catch (err) {
      try {
        const response = await fetch(JSON_FILE_URL);
        const json = await response.json();
        if (json) {
          setIsLoading(false);
          return setData(json);
        }
        throw new Error();
      } catch (err) {
        return setData({ error: "No se pudo obtener datos." });
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 31000);

    return () => clearInterval(interval);
  }, [data]);

  useEffect(() => {
    setFilteredBy(searchParams.get("linea"));
  }, [searchParams]);

  /* Devuelve una lista con las líneas de colectivos sin repetir. Utiliza memo para no recalcular el valor a 
  traves de los rerenderizados si la dependencia no cambia.
  */

  const listOfBusLines = useMemo(() => {
    return (
      !data.error && Array.from(new Set(data.map((item) => item.route_short_name)))
    );
  }, [data])

  /* Devuelve una lista con los datos filtrados por la línea de colectivos seleccionada (filteredBy), la cual 
  es una variable de estado. Como en la primera iteración está vacía, usa el primer item de la lista de líneas de 
  colectivos, por lo cual los datos que se envían al mapa siempre van a estar filtrados y este solo va 
  a mostrar una sola línea de colectivos solamente.
  */

  const filteredData = () => {
    return (
      !data.error && data
        .filter(item =>
          item.route_short_name.toLowerCase() ===
            (filteredBy
              ? filteredBy.toLowerCase()
              : listOfBusLines[0].toLowerCase()
            )
        )
    );
  }

  const Logo = () => (
    <span className="absolute top-0 left-0 p-2">
      <FaBusAlt className="inline w-4 h-4 me-1 mb-1" />
      Trafico
    </span>
  );

  // El componente de menu desplegable para seleccionar una línea de colectivos.

  const LineSelect = () => {
    const handleChange = () => {
      setSearchParams({ linea: filterRef.current.value });
    };

    return (
      listOfBusLines &&
        <section className="flex flex-row items-center w-full sm:w-1/3 order-2 sm:order-1">
          <label htmlFor={ filterId } className="text-OffBlack me-2">Filtrar por linea:</label>
          <select
            ref={ filterRef }
            id={ filterId }
            name="lines"
            value={ filteredBy ? filteredBy : listOfBusLines[0] }
            onChange={() => handleChange()}
            className="cursor-pointer text-OffBlack border border-OffBlack rounded shadow-md shadow-Gray25 pb-1"
          >
            {listOfBusLines.map((bondi, index) => {
              return (
                <option key={`linea_${index}`} value={ bondi }>
                  { bondi }
                </option>
              );
            })}
          </select>
        </section>
    );
  }

  // El componente de búsqueda de líneas de colectivos.

  const LineSearch = () => {
    const handleClick = () => {
      setSearchParams({ linea: searchRef.current.value });
    };

    return (
      <section className="flex flex-row items-center w-full sm:w-2/3 order-1 sm:order-2">
        <label htmlFor={searchId} className="text-OffBlack me-2">Buscar linea:</label>
        <input
          type={"search"}
          ref={searchRef}
          id={searchId}
          size={20}
          autoComplete={"off"}
          autoCorrect={"off"}
          spellCheck={false}
          placeholder={"por ej. 7B ó 505R5"}
          onKeyUp={ (event) => event.key === "Enter" ? handleClick() : null }
          className="text-OffBlack border border-OffBlack rounded-l shadow-md shadow-Gray25 -mt-[1px] p-1"
        />
        <button
          type={"button"}
          onClick={() => handleClick()}
          className="cursor-pointer bg-OffBlack rounded-r shadow-md shadow-Gray25 p-[0.6rem] z-10 opacity-80 
          hover:opacity-100"
        >
          <FaSearch className="text-OffWhite" />
        </button>
      </section>
    )
  }

  const LineInfo = () => (
    <article className="flex flex-row items-center justify-between text-OffBlack text-xs pt-2 px-1">
      <section>Linea: { filteredBy ? filteredBy : listOfBusLines[0] }</section>
      <section>Cant. de unidades: { filteredData().length }</section>
    </article>
  );

  return (
    data && !data.error
      ? isLoading
        ? <>
          <Logo />
          <Menu />
          <main className="flex flex-row items-center justify-center p-2 w-screen h-screen">
            <Spinner />
            <h1 className="text-5xl font-bold text-OffBlack">Cargando...</h1>
          </main>
        </>
        : !filteredData().length
          ? <Error data={{ error: "No se encontraron resultados" }} />
          : <>
            <Logo />
            <Menu />
            <main className="flex flex-col p-2 max-sm:mt-32 sm:mt-12">
              <article className="w-full flex flex-col items-start justify-evenly gap-2 sm:flex-row sm:items-center
              sm:justify-start sm:gap-4 text-OffBlack mb-2">
                <LineSelect />
                <LineSearch />
              </article>
              <article className="h-[100vh] sm:h-[75vh]">
                <TransitMap data={filteredData()} />
              </article>
              <LineInfo />
            </main>
          </>
      : <Error data={ data } />
  );
}

export default Traffic;
