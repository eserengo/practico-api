import { useState, useRef, useId, useEffect, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { FaBusAlt, FaSearch } from "react-icons/fa"
import Menu from "../components/Menu.js"
import Spinner from "../components/Spinner.js"
import Error from "../components/Error.js"
import TransitMap from "../components/TransitMap.js"

/* Esta es la página principal del tráfico. Maneja la solicitud a la API del clima mediante un hook de efecto, 
almacena el resultado en un hook de estado y lo envía a sus descendientes mediante props.
Renderiza un mensaje temporal con un spinner mientras vuelve la solicitud o un mensaje de error si esta no es exitosa.
Cuando se reciben los datos se renderizan los componentes correspondientes. */

const Traffic = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filteredBy, setFilteredBy] = useState("");
  const [data, setData] = useState([]);
  const filterRef = useRef(null);
  const filterId = useId();
  const searchRef = useRef(null);
  const searchId = useId();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    (async function fetchData() {
      try {
        const res = await fetch("trafficData.json");
        const json = await res.json();
        setIsLoading(false);
        return setData(json);
      } catch (err) {
        return setData({ error: err.message });
      }
    })();
  }, []);

  useEffect(() => {
    setFilteredBy(searchParams.get("linea"));
  }, [searchParams]);

  // const fetchData = async () => {
  //   const END_POINT = "https://apitransporte.buenosaires.gob.ar/colectivos/vehiclePositionsSimple";
  //   const QUERY_PARAMS = "?client_id=cb6b18c84b3b484d98018a791577axxx&client_secret=3e3DB105Fbf642Bf88d5eeB8783EExxx";

  //   try {
  //     const res = await fetch(END_POINT + QUERY_PARAMS);
  //     if (res.ok) {
  //       const json = await res.json();
  //       setIsLoading(false);
  //       return setData(json);
  //     }
  //     throw new Error(res.status);
  //   } catch (err) {
  //     return setData({ error: err.message });
  //   }
  // }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetchData();
  //   }, 31000);

  //   return () => clearInterval(interval);
  // }, [data]);

  const listOfBusLines = useMemo(() => {
    return (
      data && Array.from(new Set(data.map((item) => item.route_short_name)))
    );
  }, [data])

  const filteredData = () => {
    return (
      data && data
        .filter(
          item =>
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
          className="cursor-pointer bg-OffBlack rounded-r shadow-md shadow-Gray25 p-[0.6rem] z-10 opacity-80 hover:opacity-100"
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
