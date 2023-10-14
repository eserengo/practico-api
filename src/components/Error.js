import { FaExclamationTriangle } from "react-icons/fa"
import Menu from "./Menu"
import tristeza from "../assets/tristeza-mensaje-de-error.png"
import PropTypes from "prop-types"

/* El componente de error que se muestra cuando la ruta es incorrecta o cuando la solicitud a la API falla. */

const Error = ({ data }) => {
  const Logo = () => (
    <span className="absolute top-0 left-0 text-OffBlack p-2">
      <FaExclamationTriangle className="inline w-4 h-4 me-1 mb-1" />
      Error
    </span>
  );

  return (
    <>
      <Logo />
      <Menu />

      <main className="flex flex-col sm:flex-row items-center justify-center sm:justify-evenly p-2 mt-32">
        <section className="bg-OffWhite sm:w-1/2">
          <h2 className="text-bold text-3xl md:text-4xl text-center text-OffBlack">
            Disculpa, ha ocurrido un error inesperado.
          </h2>
          <h3 className="text-bold text-2xl md:text-3xl text-center text-OffBlack mt-2">
            {data.error}
          </h3>
        </section>
        <figure className="bg-OffWhite sm:w-1/2">
          <img src={tristeza} alt="tristeza mensaje de error" />
        </figure>
      </main>
    </>
  );
};

Error.propTypes = {
  data: PropTypes.object,
};

export default Error;
