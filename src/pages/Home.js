import { Link } from "react-router-dom"
import { FaHome, FaArrowLeft, FaArrowRight, FaGithub } from "react-icons/fa"
import Menu from "../components/Menu.js"

const Home = () => {

  const Logo = () => (
    <span className="absolute top-0 left-0 p-2">
      <FaHome className="inline w-4 h-4 me-1 mb-1" />
      Inicio
    </span>
  );

  return (
    <>
      <Logo />
      <Menu />

      <main className="flex items-center justify-center h-screen w-screen">
        <article
          className="grid max-md:grid-cols-1 max-md:grid-rows-2 md:grid-cols-2 md:grid-rows-1
          border border-OffBlack rounded-md shadow-md shadow-Gray25 max-sm:mx-4 max-sm:w-full sm:w-3/4 md:w-2/3 h-1/3">
          <Link
            to={"/practico-api/weather"}
            className="weather text-OffWhite text-3xl max-md:col-start-1 max-md:row-start-1 md:col-start-1 md:row-start-1
            max-md:rounded-tr-md max-md:rounded-tl-md md:rounded-tl-md md:rounded-bl-md flex flex-row
            items-center justify-center gap-2 opacity-90 hover:opacity-100">
            <FaArrowLeft className="inline mt-1" />
            <span className="inline">Clima</span>
          </Link>
          <Link
            to={"/practico-api/traffic"}
            className="traffic text-OffWhite text-3xl max-md:col-start-1 max-md:row-start-2 md:col-start-2 md:row-start-1
            max-md:rounded-br-md max-md:rounded-bl-md md:rounded-tr-md md:rounded-br-md flex flex-row
            items-center justify-center gap-2 opacity-90 hover:opacity-100">
            <span className="inline">Trafico</span>
            <FaArrowRight className="inline mt-1" />
          </Link>
        </article>
      </main>

      <footer className="w-screen absolute bottom-0 text-center text-OffBlack text-sm p-2">
        Trabajo practico creado por FAMAF-UNC y realizado por Federico Borzani.
        <br />
        <a href="https://github.com/eserengo/practico-api" target="_blank" rel="noreferrer">
          Ver codigo fuente en <FaGithub className="inline w-4 h-4"/>
        </a>
      </footer>
    </>
  )
}

export default Home;