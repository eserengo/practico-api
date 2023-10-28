import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import * as ReactDOMServer from "react-dom/server"
import { FaBusAlt } from "react-icons/fa"
import PropTypes from "prop-types"

/* El componente que renderiza el mapa.
Las funciones averrage.. devuelven el promedio de latitud o longitud de todos los marcadores para poder centrar
la vista del mapa. 
*/

const TransitMap = ({ data }) => {

  const averageLatitude = () => {
    const sum = data && data
      .map((bondi) => bondi.latitude)
      .reduce((a, b) => a + b);
    return ( sum / data.length ).toFixed(4);
  }

  const averageLongitude = () => {
    const sum = data && data
      .map((bondi) => bondi.longitude)
      .reduce((a, b) => a + b);
    return ( sum / data.length ).toFixed(4);
  }

  return (
      <MapContainer
        key={`${averageLatitude()}_${averageLongitude()}`}
        center={[averageLatitude(), averageLongitude()]}
        zoom={11}
        scrollWheelZoom={false}
        className="h-full border border-OffBlack rounded-md shadow-md shadow-Gray25"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        { data && data
          .map((bondi) => {
            return (
              <Marker
                key={bondi.id}
                position={[bondi.latitude, bondi.longitude]}
                icon={L.divIcon({
                  className: "icon bg-orange-500 z-0",
                  html: ReactDOMServer.renderToString(
                    <FaBusAlt
                      className="w-8 h-8 text-OffBlack border-[3px] border-orange-500 rounded-2xl 
                      bg-OffWhite p-1 -translate-x-[1px] -translate-y-[1px] z-10"
                    />
                  ),
                  popupAnchor: [9, -1],
                })}
              >
                <Popup> 
                  <div className="text-xs text-OffBlack -my-1 -ml-3">
                    Linea:{" "}{bondi.route_short_name} <br />
                    Empresa:{" "}{bondi.agency_name} <br />
                    Destino:{" "}{bondi.trip_headsign} <br />
                    Velocidad:{" "}{bondi.speed.toFixed(2)}
                  </div>
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
  );
}

TransitMap.propTypes = {
  data: PropTypes.array,
}

export default TransitMap;
