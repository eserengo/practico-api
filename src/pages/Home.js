import { Link } from "react-router-dom"
import { ArrowLeftCircle, ArrowRightCircle } from "react-feather"
// import "../../node_modules/weather-icons/css/weather-icons.css"


const Home = () => {

  return (
    <>
      <main className="flex items-center justify-center h-screen w-screen">
        <section
          className="bg-OffWhite flex flex-col sm:flex-row items-center justify-center max-sm:divide-y sm:divide-x
          border-OffBlack border rounded-md shadow-md max-sm:w-full sm:w-3/4 md:w-2/3 h-1/4 max-sm:mx-2">
          <Link to={"weather"} className="text-OffBlack py-4 px-8">
            <ArrowLeftCircle className="inline text-lg me-2" /> Weather
          </Link>
          <Link to={"traffic"} className="text-OffBlack py-4 px-8">
            Traffic <ArrowRightCircle className="inline text-lg ms-2" />
          </Link>
        </section>
      </main>
    </>
  )
}

export default Home;