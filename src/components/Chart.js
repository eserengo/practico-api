import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import PropTypes from "prop-types"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ data }) => {

  const inputData = () => {
    return data.current_weather && {
      labels: data.hourly.time.map(hour => hour.slice(-5)),
      datasets: [
        {
          label: data.hourly_units.temperature_2m,
          data: data.hourly.temperature_2m,
          backgroundColor: "#fcfcfc",
        }
      ]
    }
  }

  const inputOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 40,
        ticks: {
          stepSize: 10,
          color: "#fcfcfc",
          font: {
            family: "Oswald",
            size: "16px",
          },
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      x: {
        ticks: {
          color: "#fcfcfc",
          font: {
            family: "Oswald",
            size: "8px",
          }
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      }
    },
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        titleColor: "#fcfcfc",
        bodyFont: {
          family: "Oswald",
        },
      },
    }
  }

  return (
    <article className="col-start-1 col-end-1 row-auto sm:col-start-2 sm:col-span-2 md:col-span-3 sm:row-start-1 sm:row-end-1 p-2">
      {!data.current_weather
        ? <section className="flex flex-col items-center justify-around border border-OffBlack rounded-md shadow-md 
          shadow-Gray25 bg-gradient-to-tr from-orange-600 to-orange-300 w-full h-full">
          <h1 className="text-[2rem] font-bold text-OffBlack">Cargando...</h1>
        </section>
        : <>
          <h2 className="text-2xl text-OffBlack">Today</h2>
          <section className="border border-OffBlack rounded-md shadow-md shadow-Gray25 bg-gradient-to-tr 
          from-orange-600 to-orange-300 p-2">
            <Bar data={ inputData() } options={ inputOptions } />
          </section>
        </>
      }
    </article>
  )
}

Chart.propTypes = {
  data: PropTypes.object,
}

export default Chart;
