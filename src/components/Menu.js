import { useState } from "react"
import { Link } from "react-router-dom"
import { FiMenu, FiXCircle } from "react-icons/fi";

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
            <Link to={"/practico-api/weather"}>Clima</Link>
          </li>
          <li onClick={toggleIsActive} className="text-Gray25 hover:text-OffBlack pt-1">
            <Link to={"/practico-api/traffic"}>Trafico</Link>
          </li>
        </ul>
      }
    </nav>
  )
}

export default Menu;