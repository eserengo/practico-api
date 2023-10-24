import { useState } from "react"
import { NavLink } from "react-router-dom"
import { FiMenu, FiXCircle } from "react-icons/fi"

/* Este componente muestra un pequeño menu en forma de hamburguesa que puede ser desplegado y contiene por ahora solamente
links a las distintas páginas.
La lógica se maneja mediante el hook de estado de React.
*/

const Menu = () => {
  const [isActive, setIsActive] = useState(false);
  const toggleIsActive = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className="absolute top-0 right-0 p-2 z-10">
      {
        !isActive      
          ? <FiMenu
              onClick={toggleIsActive}
              className="inline cursor-pointer text-OffBlack sm:hidden"
            />
          : <ul className="flex flex-col items-end justify-center sm:hidden">
              <li onClick={toggleIsActive}>
                <FiXCircle className="inline cursor-pointer text-OffBlack" />
              </li>
              <li className="pt-1">
                <NavLink
                  to={"/practico-api"}
                  end
                  onClick={toggleIsActive}
                  className={({ isActive }) =>
                    isActive
                      ? "text-OffBlack border-b-2 border-OffBlack"
                      : "text-Gray75 hover:text-Gray25"
                  }
                >
                  Inicio
                </NavLink>
              </li>
              <li className="pt-1">
                <NavLink
                  to={"/practico-api/clima"}
                  end
                  onClick={toggleIsActive}
                  className={({ isActive }) =>
                    isActive
                      ? "text-OffBlack border-b-2 border-OffBlack"
                      : "text-Gray75 hover:text-Gray25"
                  }
                >
                  Clima
                </NavLink>
              </li>
              <li className="pt-1">
                <NavLink
                  to={"/practico-api/trafico"}
                  end
                  onClick={toggleIsActive}
                  className={({ isActive }) =>
                    isActive
                      ? "text-OffBlack border-b-2 border-OffBlack"
                      : "text-Gray75 hover:text-Gray25"
                  }
                >
                  Trafico
                </NavLink>
              </li>
            </ul>
      }
      <ul className="flex flex-row items-center justify-end max-sm:hidden">
        <li className="p-1 pt-0">
          <NavLink
            to={"/practico-api"}
            end
            className={({ isActive }) =>
              isActive
                ? "text-OffBlack border-b-2 border-OffBlack"
                : "text-Gray75 hover:text-Gray25"
            }
          >
            Inicio
          </NavLink>
        </li>
        <li className="p-1 pt-0">
          <NavLink
            to={"/practico-api/clima"}
            end
            className={({ isActive }) =>
              isActive
                ? "text-OffBlack border-b-2 border-OffBlack"
                : "text-Gray75 hover:text-Gray25"
            }
          >
            Clima
          </NavLink>
        </li>
        <li className="p-1 pt-0">
          <NavLink
            to={"/practico-api/trafico"}
            end
            className={({ isActive }) =>
              isActive
                ? "text-OffBlack border-b-2 border-OffBlack"
                : "text-Gray75 hover:text-Gray25"
            }
          >
            Trafico
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
