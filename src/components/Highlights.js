import { WiBarometer, WiStrongWind, WiSunrise, WiSunset, WiHumidity, WiSmoke } from "react-icons/wi";

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
    <article className="col-start-1 col-end-1 row-auto md:col-start-2 md:col-span-3 md:row-start-2 md:row-span-2 p-2">
      <h2 className="text-2xl text-OffBlack">Highlights</h2>
      <section className="flex flex-row flex-wrap items-center justify-start gap-2 py-2">
        {data.map((item, index) => {
          return (
            <div
              key={`card_${index}`}
              className="relative flex flex-col items-start justify-center gap-2 border border-OffBlack rounded-md 
              shadow-md shadow-Gray75 py-4 px-2 max-sm:w-full sm:w-[10rem] sm:h-[10rem]">
              <h3 className="text-Gray25 z-10">{(item.title).toUpperCase()}</h3>
              <p className="text-OffBlack text-3xl font-bold z-10">{item.value}</p>
              <p className="text-OffBlack z-10">{item.info}</p>
              <span className="text-orange-300 absolute top-1 right-0 text-7xl z-0">
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