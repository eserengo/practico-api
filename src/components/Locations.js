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
      if (statesData.provincias) {
        const target = Array.from(statesData.provincias).filter(prov => prov.nombre.toLowerCase() === filteredByState.toLowerCase());
        setLat(target[0].centroide.lat);
        setLon(target[0].centroide.lon);
        setLocation(target[0].nombre);
      } else {
        setLocation("Error: No se pudo obtener localización.");
        setFilteredByState("");
      }
    }
  }, [filteredByState])

  useEffect(() => {
    if (filteredByCity) {
      if (citiesData.municipios) {
        const target = Array.from(citiesData.municipios).filter(muni => muni.nombre.toLowerCase() === filteredByCity.toLowerCase());
        setLat(target[0].centroide.lat);
        setLon(target[0].centroide.lon);
        setLocation(`${target[0].nombre}, ${filteredByState}`);
      } else {
        setLocation("Error: No se pudo obtener localización.");
        setFilteredByCity("");
      }
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
