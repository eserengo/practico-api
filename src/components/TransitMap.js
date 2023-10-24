import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import * as ReactDOMServer from "react-dom/server"
import { FaBusAlt } from "react-icons/fa"
import Error from "./Error"
import PropTypes from "prop-types"

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
    !data.length
      ? <Error data={{ error: "No se encontraron resultados" }} />
      : <MapContainer
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
                      className="w-8 h-8 text-OffBlack border-[3px] border-orange-500 rounded-2xl bg-OffWhite p-1
                      -translate-x-[1px] -translate-y-[1px] z-10"
                    />
                  ),
                  popupAnchor: [9, 0],
                })}
              >
                <Popup> 
                  <div className="text-[0.6rem] text-OffBlack -my-1 -ml-3">
                    <span className="font-bold">Linea:</span>{" "}
                    {bondi.route_short_name} <br />
                    <span className="font-bold">Empresa:</span>{" "}
                    {bondi.agency_name} <br />
                    <span className="font-bold">Destino:</span>{" "}
                    {bondi.trip_headsign} <br />
                    <span className="font-bold">Velocidad:</span>{" "}
                    {bondi.speed.toFixed(2)} <br />
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