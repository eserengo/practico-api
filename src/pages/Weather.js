import { FaCloudSun } from "react-icons/fa"
import Menu from "../components/Menu.js"
import Forecast from "../components/Forecast.js"
import Chart from "../components/Chart.js"
import Highlights from "../components/Highlights.js"

const Weather = () => {
  const Logo = () => (
    <span className="absolute top-0 left-0 p-2">
      <FaCloudSun className="inline w-6 h-6 me-1" />
      Clima
    </span>
  );

  return (
    <>
      <Logo />
      <Menu />

      <main className="grid grid-cols-1 grid-rows-[auto] md:grid-cols-4 md:grid-rows-3 sm:p-2 max-sm:mx-0 max-sm:mt-32 sm:m-12">
        <Forecast />
        <Chart />
        <Highlights />
      </main>
    </>
  )
}

export default Weather;
