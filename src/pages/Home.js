import { Link } from "react-router-dom"
import { FiArrowLeftCircle, FiArrowRightCircle, FiGithub } from "react-icons/fi";
import Menu from "../components/Menu.js"

const Home = () => {

  return (
    <>
      <Menu />
      <main className="flex items-center justify-center h-screen w-screen">
        <article
          className="bg-OffWhite flex flex-col sm:flex-row items-center justify-center max-sm:divide-y sm:divide-x
          border border-OffBlack rounded-md shadow-md max-sm:w-full sm:w-3/4 md:w-2/3 h-1/3 max-sm:mx-2">
          <Link to={"weather"} className="weather text-OffWhite text-2xl rounded-tl-md rounded-bl-md py-16 ps-56 pe-8">
            <FiArrowLeftCircle className="inline me-2" />
            Clima
          </Link>
          <Link to={"traffic"} className="traffic text-OffWhite text-2xl rounded-tr-md rounded-br-md py-16 pe-56 ps-8">
            Trafico
            <FiArrowRightCircle className="inline ms-2" />
          </Link>
        </article>
      </main>
      <footer className="w-screen absolute bottom-2 text-center text-OffBlack text-sm p-2">
        Trabajo practico creado por FAMAF-UNC y realizado por Federico Borzani.
        <br />
        <a href="https://github.com/eserengo/practico-api" target="_blank" rel="noreferrer">
          Ver codigo fuente en <FiGithub className="inline w-4 h-4"/>
        </a>
      </footer>
    </>
  )
}

export default Home;