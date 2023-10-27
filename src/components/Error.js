import { FaExclamationTriangle, FaArrowLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
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
          <h3 className="text-bold text-2xl md:text-3xl text-red-600 text-center mt-4">
            { data.error }
          </h3>
          <button
            type={"button"}
            onClick={() => handleClick()}
            className="text-OffBlack border border-OffBlack rounded-md py-2 px-8 mt-4 opacity-80 shadow-md shadow-Gray75
            hover:opacity-100 hover:shadow-Gray25"
          >
            <FaArrowLeft className="inline me-2" />
            Volver
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
