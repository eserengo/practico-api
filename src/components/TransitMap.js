import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import PropTypes from "prop-types"

const TransitMap = ({ data }) => {
  console.log(data);

  return (
    <MapContainer center={[-34.7, -58.5]} zoom={11} scrollWheelZoom={false}
      className='h-full border border-OffBlack rounded-md shadow-md shadow-Gray25'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      { data && data
        .map(bondi => {
          return (
            <Marker key={bondi.id} position={[`${bondi.latitude}`, `${bondi.longitude}`]}>
              <Popup>
                linea: {bondi.route_short_name} <br />
                unidad: {bondi.agency_id} <br />
                destino: {bondi.trip_headsign} <br />
              </Popup>
            </Marker>
          )
        })
      }
    </MapContainer>
  )
};

TransitMap.propTypes = {
  data: PropTypes.array,
};

export default TransitMap;