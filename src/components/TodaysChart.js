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
)

/* Este componente muestra el gráfico de barras con las temperaturas por hora. Esta desarrollado con la 
librería Chart.JS */

const TodaysChart = ({ data }) => {
  const inputData = () => {
    return (
      data.current_weather && {
        labels: data.hourly.time.map((hour) => hour.slice(-5)),
        datasets: [
          {
            label: data.hourly_units.temperature_2m,
            data: data.hourly.temperature_2m,
            backgroundColor: `${!data.current_weather.is_day ? "#fcfcfc" : "#030303"}`,
          },
        ],
      }
    );
  }

  const inputOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: -20,
        max: 40,
        ticks: {
          stepSize: 20,
          color: `${!data.current_weather.is_day ? "#fcfcfc" : "#030303"}`,
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
          color: `${!data.current_weather.is_day ? "#fcfcfc" : "#030303"}`,
          font: {
            family: "Oswald",
            size: "8px",
          },
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
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
    },
  };

  return (
    <article className="col-start-1 col-end-1 row-auto sm:col-start-2 sm:col-span-2 md:col-start-2
      md:col-span-3 sm:row-start-1 sm:row-end-1 p-2">
      <h2 className="text-2xl text-OffBlack">Hoy</h2>
      <section className={`border border-OffBlack rounded-md shadow-md shadow-Gray25 p-2
        ${!data.current_weather.is_day
          ? "bg-gradient-to-tr from-indigo-300 to-indigo-600"
          : "bg-gradient-to-tr from-orange-600 to-orange-300"
        }`}
      >
        <Bar data={inputData()} options={inputOptions} />
      </section>
    </article>
  );
};

TodaysChart.propTypes = {
  data: PropTypes.object,
};

export default TodaysChart;
