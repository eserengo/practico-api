import { useState } from "react"
import { Link } from "react-router-dom"
import { FiHome, FiMenu, FiSun, FiTruck, FiXCircle } from "react-icons/fi";

const Menu = () => {
  const [isActive, setIsActive] = useState(false);
  const toggleIsActive = () => {
    setIsActive(!isActive);
  }

  return (
    <nav className="absolute top-0 right-0 p-2 z-10">
      {!isActive
        ? <FiMenu onClick={toggleIsActive} className="inline cursor-pointer" />
        : <ul className="flex flex-col items-end justify-center">
          <li onClick={toggleIsActive} className="pb-2">
            <FiXCircle className="inline cursor-pointer" />
          </li>
          <li onClick={toggleIsActive} className="text-Gray25 hover:text-OffBlack py-2">
            <Link to={"/practico-api"}>
              <FiHome className="inline me-5 w-4 h-4" />
              Inicio
            </Link>
          </li>
          <li onClick={toggleIsActive} className="text-Gray25 hover:text-OffBlack py-2">
            <Link to={"/practico-api/weather"}>
              <FiSun className="inline me-1 w-4 h-4" />
              Clima
            </Link>
          </li>
          <li onClick={toggleIsActive} className="text-Gray25 hover:text-OffBlack py-2">
            <Link to={"/practico-api/traffic"}>
              <FiTruck className="inline me-3 w-4 h-4" />
              Trafico
            </Link>
          </li>
        </ul>
      }
    </nav>
  )
}

export default Menu;