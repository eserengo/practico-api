import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import PropTypes from "prop-types"

const TransitMap = ({ data, line }) => {

  const averageLatitude = () => {
    const sum =
      data && data.map((bondi) => bondi.latitude).reduce((a, b) => a + b);
    return (sum / data.length).toFixed(4);
  }

  const averageLongitude = () => {
    const sum =
      data && data.map((bondi) => bondi.longitude).reduce((a, b) => a + b);
    return (sum / data.length).toFixed(4);
  }

  const extractLineNumber = () => {
    const match = line.match(/^\d+/);
    return match ? match[0] : "";
  }

  const customIcon =
    L.icon({
      iconUrl: `https://xcolectivo.com.ar/imagenes/colectivos/identificador/mini/linea${extractLineNumber()}.jpg`,
      iconSize: [32, 32],
      iconAnchor: [0, 32],
      popupAnchor: [16, -30],
    })

  return (
    <MapContainer
      key={`${averageLatitude()}_${averageLongitude()}`}
      center={[averageLatitude(), averageLongitude()]}
      zoom={10}
      scrollWheelZoom={false}
      className="h-full border border-OffBlack rounded-md shadow-md shadow-Gray25"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data &&
        data.map((bondi) => {
          return (
            <Marker
              key={bondi.id}
              position={[`${bondi.latitude}`, `${bondi.longitude}`]}
              icon={customIcon || L.Icon.Default}
            >
              <Popup>
                <div className="text-[0.6rem] text-OffBlack">
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
  line: PropTypes.string,
}

export default TransitMap;