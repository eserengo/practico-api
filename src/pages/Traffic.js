import { useState, useRef, useId, useEffect, useMemo } from "react"
import { FaBusAlt } from "react-icons/fa"
import Menu from "../components/Menu.js"
import Error from "../components/Error.js"
import TransitMap from "../components/TransitMap.js"

/* Esta es la página principal del tráfico. Maneja la solicitud a la API del clima mediante un hook de efecto, 
almacena el resultado en un hook de estado y lo envía a sus descendientes mediante props.
Renderiza un mensaje temporal con un spinner mientras vuelve la solicitud o un mensaje de error si esta no es exitosa.
Cuando se reciben los datos se renderizan los componentes correspondientes. */

const Traffic = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState("253A");
  const [data, setData] = useState([]);
  const lineRef = useRef(null);
  const lineId = useId();

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

  const Logo = () => (
    <span className="absolute top-0 left-0 p-2">
      <FaBusAlt className="inline w-4 h-4 me-1 mb-1" />
      Trafico
    </span>
  );

  const busLines = useMemo(() => {
    return (
      data && Array.from(new Set(data.map((item) => item.route_short_name)))
    );
  }, [data]);

  const FilterByLine = () => {
    const setValue = () => {
      setIsFiltering(lineRef.current.value);
    };

    return (
      busLines && (
        <article className="flex flex-row items-center gap-2 pb-2 text-OffBlack w-full md:w-1/3">
          <label htmlFor={lineId}>Filtrar por linea:</label>
          <select
            ref={lineRef}
            id={lineId}
            name="lines"
            value={isFiltering}
            onChange={() => setValue()}
            className="cursor-pointer border border-OffBlack rounded-md shadow-md shadow-Gray25"
          >
            {busLines.map((bondi, index) => {
              return (
                <option key={`linea_${index}`} value={bondi}>
                  {bondi}
                </option>
              );
            })}
          </select>
        </article>
      )
    );
  };

  const filteredData = () => {
    return data && data.filter((item) => item.route_short_name === isFiltering);
  };

  const LineInfo = () => (
    <section className="flex flex-row items-center justify-between text-OffBlack text-xs pt-2">
      <span>Linea: { isFiltering }</span>
      <span>Cant. de unidades: { filteredData().length }</span>
    </section>
  );

  return data && !data.error
    ? <>
      <Logo />
      <Menu />
      { isLoading
        ? <main className="flex flex-row items-center justify-center p-2 w-screen h-screen">
          <svg
            aria-hidden="true"
            className="animate-spin h-12 w-12 mr-4 text-Gray75 fill-sky-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <h1 className="text-5xl font-bold text-OffBlack">Cargando...</h1>
        </main>
        : <main className="flex flex-col p-2 max-sm:mt-32 sm:mt-12 h-[90vh]">
          <FilterByLine />
          <TransitMap data={ filteredData() } line={ isFiltering } />
          <LineInfo />
        </main>
      }
    </>
    : <Error data={ data } />
}

export default Traffic;
