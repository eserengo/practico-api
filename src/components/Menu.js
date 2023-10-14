import { useState } from "react"
import { Link } from "react-router-dom"
import { FiMenu, FiXCircle } from "react-icons/fi";

/* Este componente muestra un pequeño menu en forma de hamburguesa que puede ser desplegado y contiene por ahora solamente
links a las distintas páginas.
La lógica se maneja mediante el hook de estado de React.
*/

const Menu = () => {
  const [isActive, setIsActive] = useState(false);
  const toggleIsActive = () => {
    setIsActive(!isActive);
  }

  return (
    <nav className="absolute top-0 right-0 p-2 z-10">
      {!isActive
        ? <FiMenu onClick={toggleIsActive} className="inline cursor-pointer text-OffBlack" />
        : <ul className="flex flex-col items-end justify-center">
          <li onClick={toggleIsActive}>
            <FiXCircle className="inline cursor-pointer text-OffBlack" />
          </li>
          <li onClick={toggleIsActive} className="text-Gray25 hover:text-OffBlack pt-1">
            <Link to={"/practico-api"}>Inicio</Link>
          </li>
          <li onClick={toggleIsActive} className="text-Gray25 hover:text-OffBlack pt-1">
            <Link to={"/practico-api/clima"}>Clima</Link>
          </li>
          <li onClick={toggleIsActive} className="text-Gray25 hover:text-OffBlack pt-1">
            <Link to={"/practico-api/trafico"}>Trafico</Link>
          </li>
        </ul>
      }
    </nav>
  )
}

export default Menu;