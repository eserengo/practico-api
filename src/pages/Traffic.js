import { FaBusAlt } from "react-icons/fa"
import Menu from "../components/Menu.js"

/* La página del tráfico. Todavía no desarrollada. */

const Traffic = () => {
  const Logo = () => (
    <span className="absolute top-0 left-0 p-2">
      <FaBusAlt className="inline w-4 h-4 me-1 mb-1" />
      Trafico
    </span>
  );

  return (
    <>
      <Logo />
      <Menu />
    </>
  )
}

export default Traffic;