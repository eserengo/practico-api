import Menu from "../components/Menu.js"
import Forecast from "../components/Forecast.js"
import Highlights from "../components/Highlights.js"
import Chart from "../components/Chart.js"

const Weather = () => {

  return (
    <>
      <Menu />
      <main className="grid grid-cols-1 grid-rows-[auto] md:grid-cols-4 md:grid-rows-3 gap-4 m-2 me-24">
        <Forecast />
        <Chart />
        <Highlights />
      </main>
    </>
  )
}

export default Weather;