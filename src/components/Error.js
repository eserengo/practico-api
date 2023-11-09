import { FaExclamationTriangle } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { RxChevronLeft } from "react-icons/rx"
import Menu from "./Menu"
import tristeza from "../assets/tristeza-mensaje-de-error.png"
import PropTypes from "prop-types"

/* El componente de error que se muestra cuando la ruta es incorrecta, cuando la solicitud a la API falla o cuando
los parámetros de búsqueda no coinciden. */

const Error = ({ data }) => {
  const navigate = useNavigate();

  const Logo = () => (
    <span className="absolute top-0 left-0 text-OffBlack p-2">
      <FaExclamationTriangle className="inline w-4 h-4 me-1 mb-1" />
      Error
    </span>
  );

  const handleClick = () => {
    navigate(-1);
  }

  return (
    <>
      <Logo />
      <Menu />

      <article className="flex flex-col sm:flex-row items-center justify-center sm:justify-evenly p-2 max-sm:mt-32 
      sm:mt-12 sm:h-[85vh]">
        <section className="flex flex-col items-center justify-around bg-OffWhite sm:w-1/2 p-2">
          <h2 className="text-bold text-3xl md:text-4xl text-OffBlack text-center">
            Disculpa, ha ocurrido un error.
          </h2>
          <h3 className="text-bold text-2xl md:text-3xl text-red-600 text-center my-4">
            { data.error }
          </h3>
          <button
            type={"button"}
            onClick={() => handleClick()}
            className="flex flex-row items-center opacity-60 text-Gray25 hover:opacity-100 hover:text-OffBlack"
          >
            <span className="me-2 border-2 border-OffBlack rounded shadow-md shadow-Gray25">
              <RxChevronLeft className="w-10 h-8" />
            </span>
            <span className="text-2xl font-bold">
              Volver
            </span>
          </button>
        </section> 
        <figure className="bg-OffWhite sm:w-1/2">
          <img src={ tristeza } alt="tristeza mensaje de error" />
        </figure>
      </article>
    </>
  );
};

Error.propTypes = {
  data: PropTypes.object,
};

export default Error;
