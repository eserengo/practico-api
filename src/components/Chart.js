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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {

  const data = {
    labels: ["12:00 AM", "3:00 AM", "6:00 AM", "9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"],
    datasets: [
      {
        label: "temperatura",
        data: [18, 16, 18, 20, 25, 23, 21, 18, 16],
        backgroundColor: "#fcfcfc",
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 40,
        ticks: {
          stepSize: 20,
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
            size: "16px",
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
        display: false
      },
      tooltip: {
        enabled: true,
        bodyFont: {
          family: "Oswald",
        }
      },
    }
  }

  return (
    <article className="col-start-1 col-end-1 row-auto md:col-start-2 md:col-span-3 md:row-start-1 md:row-end-1 p-2">
      <h2 className="text-2xl text-OffBlack">Today</h2>
      <section className="border border-OffBlack rounded-md shadow-md shadow-Gray75 p-2 
        bg-gradient-to-tr from-orange-500 to-orange-300">
        <Bar data={data} options={options} />
      </section>
    </article>
  )
}

export default Chart;