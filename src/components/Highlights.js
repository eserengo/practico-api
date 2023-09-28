import { WiBarometer, WiStrongWind, WiSunrise, WiSunset, WiHumidity, WiSmoke } from "react-icons/wi"

const Highlights = () => {
  const data = [
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
    <article className="col-start-1 col-end-1 row-auto md:col-start-2 md:col-span-3 md:row-start-2 md:row-span-2 p-2 md:mt-8">
      <h2 className="text-2xl text-OffBlack">Highlights</h2>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-[auto] gap-2 mt-2">
        {data.map((item, index) => {
          return (
            <div
              key={`card_${index}`}
              className="relative flex flex-col items-start justify-evenly gap-2 border border-OffBlack rounded-md 
              shadow-md shadow-Gray25 p-2 overflow-hidden min-h-[10rem]">
              <h3 className="text-Gray25 z-10">{(item.title).toUpperCase()}</h3>
              <p className="text-OffBlack text-4xl font-bold z-10">{item.value}</p>
              <p className="text-Gray25 z-10">{item.info}</p>
              <span className="text-indigo-300 absolute top-0 left-1/3 text-[10rem] z-0">
                {item.icon}
              </span>
            </div>
          )
        })}
      </section>
    </article>
  )
}

export default Highlights;
