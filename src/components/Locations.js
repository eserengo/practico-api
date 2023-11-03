/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useId, useRef, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import PropTypes from "prop-types"

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
      const target = Object.values(statesData.provincias).filter(prov => prov.nombre === filteredByState);
      setLat(target[0].centroide.lat);
      setLon(target[0].centroide.lon);
      setLocation(target[0].nombre);
    }
  }, [filteredByState])

  useEffect(() => {
    if (filteredByCity) {
      const target = Object.values(citiesData.municipios).filter(muni => muni.nombre === filteredByCity);
      setLat(target[0].centroide.lat);
      setLon(target[0].centroide.lon);
      setLocation(`${target[0].nombre}, ${filteredByState}`);
    }
  }, [filteredByCity])

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
    setSearchParams(searchParams => {
      searchParams.set("provincia", statesRef.current.value);
      searchParams.delete("municipio");
      return searchParams;
    });
  }

  const handleCityChange = () => {
    setSearchParams(searchParams => {
      searchParams.set("municipio", citiesRef.current.value);
      return searchParams;
    });
  }

  return (
    !statesData.error
      ? statesData.provincias &&
        <>
          <section className="flex flex-col items-start justify-evenly sm:flex-row sm:items-center sm:justify-start z-10 
          w-full md:w-1/2">
            <label htmlFor={statesId} className="text-OffBlack me-2">Seleccionar provincia:</label>
            <select
              ref={statesRef}
              id={statesId}
              name="states"
              value={ filteredByState }
              placeholder="Seleccione una provincia"
              onChange={() => handleStateChange()}
              className="cursor-pointer text-sm text-OffBlack border border-OffBlack rounded shadow-md shadow-Gray25 pb-1"
            >
              { listOfStates() && listOfStates()
                .map((prov, index) => {
                  return (
                    <option key={`state_${index}`} value={prov}>
                      {prov}
                    </option>
                  );
              })}
            </select>
          </section>
          { !citiesData.error
            ? filteredByState &&
              <section className="flex flex-col items-start justify-evenly sm:flex-row sm:items-center sm:justify-start z-10 
              w-full md:w-1/2">
                <label htmlFor={citiesId} className="text-OffBlack me-2">Seleccionar municipio:</label>
                <select
                  ref={citiesRef}
                  id={citiesId}
                  name="cities"
                  value={filteredByCity}
                  placeholder="Seleccione un municipio"
                  onChange={() => handleCityChange()}
                  className="cursor-pointer text-sm text-OffBlack border border-OffBlack rounded shadow-md shadow-Gray25 pb-1"
                >
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
              </section>
            : <p className="text-red-500">Error: { citiesData.error }</p>
          }
        </>
      : <p className="text-red-500">Error: { statesData.error }</p>
  )
}

Locations.propTypes = {
  setLat: PropTypes.func,
  setLon: PropTypes.func,
  setLocation: PropTypes.func,
};


export default Locations;