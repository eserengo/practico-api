import { WiBarometer, WiStrongWind, WiSunrise, WiSunset, WiHumidity, WiSmoke } from "react-icons/wi"
import PropTypes from "prop-types"

const Highlights = ({ data }) => {
  const data2 = [
    {
      title: "uv index",
      value: "6",
      icon: < WiBarometer />,
      info: "High",
    },
    {
      title: "wind status",
      value: "11.12 km/h",
      icon: < WiStrongWind />,
      info: "Normal",
    },
    {
      title: "sunrise",
      value: "6:35 AM",
      icon: < WiSunrise />,
      info: "",
    },
    {
      title: "sunset",
      value: "5:42 PM",
      icon: < WiSunset />,
      info: "",
    },
    {
      title: "humidity",
      value: "12%",
      icon: < WiHumidity />,
      info: "Normal",
    },
    {
      title: "air quality",
      value: "105",
      icon: < WiSmoke />,
      info: "Unhealthy",
    },
  ];

  return (
    <article className="col-start-1 col-end-1 row-auto sm:col-start-2 sm:col-span-2 md:col-span-3 sm:row-start-2 sm:row-span-2 p-2 sm:mt-8">
      <h2 className="text-2xl text-OffBlack">Highlights</h2>
      <section className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-[auto] gap-2 mt-2">
        {data2.map((item, index) => {
          return (
            <div
              key={`card_${index}`}
              className="relative flex flex-col items-start justify-evenly gap-2 border border-OffBlack rounded-md 
              shadow-md shadow-Gray25 p-2 overflow-hidden min-h-[10rem]">
              <h3 className="text-Gray25 z-10">{(item.title).toUpperCase()}</h3>
              <p className="text-OffBlack text-4xl font-bold z-10">{item.value}</p>
              <p className="text-Gray25 z-10">{item.info}</p>
              <span className="text-indigo-300 absolute top-0 left-1/2 text-[10rem] z-0">
                {item.icon}
              </span>
            </div>
          )
        })}
      </section>
    </article>
  )
}

Highlights.propTypes = {
  data: PropTypes.object,
}

export default Highlights;
