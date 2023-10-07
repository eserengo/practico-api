import { Link } from "react-router-dom"
import { FaHome, FaArrowLeft, FaArrowRight, FaGithub } from "react-icons/fa"
import Menu from "../components/Menu.js"

/* La página de bienvenida a la App. Muestra un pequeño logo, el menu, un footer con información y link y dos opciones 
para dirigirse ya sea a la página de clima o a la de tráfico. */

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
          className="grid max-sm:grid-cols-1 max-sm:grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 border border-OffBlack rounded-md
          shadow-md shadow-Gray25 max-sm:mx-4 max-sm:w-full sm:w-3/4 md:w-2/3 h-1/2">
          <Link
            to={"/practico-api/clima"}
            className="weather text-OffWhite text-3xl max-sm:col-start-1 max-sm:row-start-1 sm:col-start-1 sm:row-start-1
            max-sm:rounded-tr-md max-sm:rounded-tl-md sm:rounded-tl-md sm:rounded-bl-md flex flex-row
            items-center justify-center gap-2 opacity-80 hover:opacity-100">
            <FaArrowLeft className="inline mt-1" />
            <span className="inline">Clima</span>
          </Link>
          <Link
            to={"/practico-api/trafico"}
            className="traffic text-OffWhite text-3xl max-sm:col-start-1 max-sm:row-start-2 sm:col-start-2 sm:row-start-1
            max-sm:rounded-br-md max-sm:rounded-bl-md sm:rounded-tr-md sm:rounded-br-md flex flex-row
            items-center justify-center gap-2 opacity-80 hover:opacity-100">
            <span className="inline">Trafico</span>
            <FaArrowRight className="inline mt-1" />
          </Link>
        </article>
      </main>

      <footer className="w-screen absolute bottom-0 text-center text-OffBlack text-sm p-2">
        Trabajo practico creado por FAMAF-UNC y realizado por Federico Borzani.
        <br />
        <a href="https://github.com/eserengo/practico-api" target="_blank" rel="noreferrer">
          Ver codigo fuente en <FaGithub className="inline w-4 h-4 mb-1"/>
        </a>
      </footer>
    </>
  )
}

export default Home;