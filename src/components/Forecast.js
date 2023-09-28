import { WiCelsius, WiDayCloudyWindy, WiDaySunny, WiNightClear } from "react-icons/wi"

const Forecast = () => {

  const data = [
    {
      day: "Monday",
      time: "17.00",
      temp: "20",
      high: "29",
      low: "13",
    }
  ];

  return (
    data.map((item, index) => {
      return (
        <article
          key={`article_${index}`}
          className={`col-start-1 col-end-1 row-auto md:row-start-1 md:row-span-3 border border-OffBlack rounded-md shadow-md
          shadow-Gray25 p-2 m-2 { ${item.time > 18 || item.time < 6 ? "nighttime text-OffWhite" : "daytime text-OffBlack"}`}>
          <h1 className="flex flex-col items-center font-bold">
            <span className="inline text-2xl">{item.time > 18 || item.time < 6 ? "Good night" : "Good day"}</span>
            <br />
            <span className="inline text-6xl">
              {item.temp}
              <sup>
                <WiCelsius className="inline text-8xl -mx-4" />
              </sup>
            </span>
          </h1>
          <WiDayCloudyWindy className="text-6xl" />
          <h3 className="text-3xl my-4">{item.day}, {item.time}</h3>
          <section className="flex flex-col flex-nowrap items-center gap-2">
            <div className="flex flex-col items-center gap-2 border border-OffBlack rounded-md shadow-md shadow-Gray75
              p-4 w-full bg-gradient-to-tr from-orange-700 to-orange-400 text-OffWhite">
              <h2 className="inline text-3xl font-bold">
                {item.high}
                <sup>
                  <WiCelsius className="inline text-6xl -mx-2" />
                </sup>
              </h2>
              <h4 className="uppercase inline text-xl">
                high
                <WiDaySunny className="inline text-4xl mb-2" />
              </h4>
            </div>
            <div className="flex flex-col items-center gap-2 border border-OffBlack rounded-md shadow-md shadow-Gray75
              p-4 w-full bg-gradient-to-tr from-indigo-700 to-indigo-400 text-OffWhite">
              <h2 className="inline text-3xl font-bold">
                {item.low}
                <sup>
                  <WiCelsius className="inline text-6xl -mx-2" />
                </sup>
              </h2>
              <h4 className="uppercase inline text-xl">
                low
                <WiNightClear className="inline text-4xl mb-1" />
              </h4>
            </div>
          </section>
        </article>
      )
    })
  );
}

export default Forecast;
