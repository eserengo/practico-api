/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useId, useRef, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import PropTypes from "prop-types"

/* El componente diseñado para el TP4, para manejar datos de ubicación. 
Resumen de lo que hace este componente:
Importa varios hooks de React y bibliotecas, incluyendo useState, useId, useRef, useEffect, y useSearchParams de varias 
paquetes como "react" y "react-router-dom." También importa PropTypes para definir tipos de propiedades.
El componente recibe tres propiedades como entrada: setLat, setLon, y setLocation, todas las cuales son funciones.
El componente gestiona varios estados, incluyendo filteredByState y filteredByCity para almacenar datos de ubicación 
seleccionados por el usuario, statesData y citiesData para almacenar datos de ubicación obtenidos y otras referencias e 
identificadores.
Realiza llamadas asincrónicas a la API para obtener datos de ubicación utilizando la función fetch, y luego llena los estados 
statesData y citiesData. Maneja errores en caso de que las llamadas a la API fallen.
El componente utiliza useSearchParams para gestionar los parámetros de la URL y actualiza filteredByState y filteredByCity en 
función de los parámetros de la consulta. Si el usuario cambia manualmente los parámetros en la URL, el componente se actualiza en 
virtud de esta elección o muestra un mensaje de error si el parámetro no es correcto.
Hay funciones auxiliares como listOfStates y listOfCities que devuelven listas de estados y ciudades disponibles, respectivamente.
El componente incluye dos manejadores de eventos, handleStateChange y handleCityChange, que actualizan los parámetros de la consulta 
en función de las selecciones del usuario en los menús desplegables.
Renderiza JSX para mostrar menús desplegables para seleccionar un estado y una ciudad. Las opciones en los menús desplegables se 
llenan en función de los datos de ubicación obtenidos. Se muestran mensajes de error cuando falla la obtención de datos.
Utiliza la representación condicional para manejar errores y mostrar mensajes apropiados.
*/

const Locations = ({setLat, setLon, setLocation }) => {
  const [filteredByState, setFilteredByState] = useState("");
  const [filteredByCity, setFilteredByCity] = useState("");
  const [statesData, setStatesData] = useState({});
  const [citiesData, setCitiesData] = useState({});
  const statesRef = useRef(null);
  const statesId = useId();
  const citiesRef = useRef(null);
  const citiesId = useId();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    (async () => {
      const API_ENDPOINT = "https://apis.datos.gob.ar/georef/api/provincias";

      try {
        const response = await fetch(API_ENDPOINT);
        if (response.ok) {
          const json = await response.json();
          return setStatesData(json);
        }
        throw new Error();
      } catch (err) {
        return setStatesData({ error: "No se pudo obtener datos." });
      }
    })();
  }, [])

  useEffect(() => {
    (async () => {
      if (filteredByState) {
        const INPUT = filteredByState.toLowerCase().replace(/\s+/g, "%20");
        const API_ENDPOINT = `https://apis.datos.gob.ar/georef/api/municipios?provincia=${INPUT}&max=500`;

        try {
          const response = await fetch(API_ENDPOINT);
          if (response.ok) {
            const json = await response.json();
            return setCitiesData(json);
          }
          throw new Error();
        } catch (err) {
          return setCitiesData({ error: "No se pudo obtener datos." });
        }
      }
      return false;
    })();
  }, [filteredByState])

  useEffect(() => {
    if (filteredByState) {
      if (statesData.provincias) {
        const target = Array.from(statesData.provincias).find(prov => prov.nombre.toLowerCase() === filteredByState.toLowerCase());
        if (target) {
        setLat(target.centroide.lat);
        setLon(target.centroide.lon);
        setLocation(target.nombre);
        } else {
          setLocation("Error: No se pudo obtener la localización.");
          setFilteredByState("");
        }
      } else {
        setLocation("Cargando localización...");
      }
    }
  }, [filteredByState, statesData.provincias])

  useEffect(() => {
    if (filteredByCity) {
      if (citiesData.municipios) {
        const target = Array.from(citiesData.municipios).find(muni => muni.nombre.toLowerCase() === filteredByCity.toLowerCase());
        if (target) {
          setLat(target.centroide.lat);
          setLon(target.centroide.lon);
          setLocation(`${target.nombre}, ${filteredByState}`);
        } else {
          setLocation("Error: No se pudo obtener la localización.");
          setFilteredByCity("");
        }
      } else {
        setLocation("Cargando localización...");
      }
    }
  }, [filteredByCity, citiesData.municipios])

  useEffect(() => {
    searchParams.get("provincia") && setFilteredByState(searchParams.get("provincia"));
    searchParams.get("municipio") && setFilteredByCity(searchParams.get("municipio"));
  }, [searchParams])

  const listOfStates = () => {
    return (
      !statesData.error &&
        statesData.provincias &&
          statesData.provincias
            .map(prov => prov.nombre)
            .sort()
    );
  }

  const listOfCities = () => {
    return (
      !citiesData.error &&
        citiesData.municipios &&
          citiesData.municipios
            .map(muni => muni.nombre)
            .sort()
    );
  }

  const handleStateChange = () => {
    if (statesRef.current.value) {
      setSearchParams(searchParams => {
        searchParams.set("provincia", statesRef.current.value);
        searchParams.delete("municipio");
        return searchParams;
      });
    }
    return false;
  }

  const handleCityChange = () => {
    if (citiesRef.current.value) {
      setSearchParams(searchParams => {
        searchParams.set("municipio", citiesRef.current.value);
        return searchParams;
      });
    }
    return false;
  }

  return (
    !statesData.error
      ? statesData.provincias &&
        <>
          <p className="text-sm text-OffBlack">Para cambiar la localización:</p>
          <label htmlFor={statesId} className="hidden">Seleccionar provincia:</label>
          <select
            ref={statesRef}
            id={statesId}
            name="states"
            value={ filteredByState }
            onChange={() => handleStateChange()}
            className="cursor-pointer text-sm text-OffBlack border border-OffBlack rounded shadow-md shadow-Gray25 pb-1 z-10"
          >
            <option value={""} className="text-Gray75"> -- Seleccione una provincia --</option>
            { listOfStates() && listOfStates()
              .map((prov, index) => {
                return (
                  <option key={`state_${index}`} value={prov}>
                    {prov}
                  </option>
                );
            })}
          </select>
          { !citiesData.error
            ? filteredByState &&
              <>
                <label htmlFor={citiesId} className="hidden">Seleccionar municipio:</label>
                <select
                  ref={citiesRef}
                  id={citiesId}
                  name="cities"
                  value={ filteredByCity }
                  onChange={() => handleCityChange()}
                  className="cursor-pointer text-sm text-OffBlack border border-OffBlack rounded shadow-md shadow-Gray25 pb-1 z-10"
                >
                  <option value={""} className="text-Gray75"> -- Seleccione un municipio --</option>
                  { listOfCities() && listOfCities()
                    .map((muni, index) => {
                      return (
                        <option key={`city_${index}`} value={muni}>
                          {muni}
                        </option>
                      );
                    })
                  }
                </select>
              </>
            : <p className="text-red-600">Error: { citiesData.error }</p>
          }
        </>
      : <p className="text-red-600">Error: { statesData.error }</p>
  )
}

Locations.propTypes = {
  setLat: PropTypes.func,
  setLon: PropTypes.func,
  setLocation: PropTypes.func,
};

export default Locations;
