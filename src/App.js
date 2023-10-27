import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Weather from "./pages/Weather"
import Traffic from "./pages/Traffic"
import Error from "./components/Error"
import "./App.css"

/* Este componente es el ancestro de todos los otros. Solo maneja las rutas de las distintas páginas y el 
estilo global. Utilizo tailwind css para lograr que la aplicación sea full responsive.*/

function App() {

  const router = createBrowserRouter([
    {
      path: "/practico-api",
      element: <Home />,
    },
    {
      path: "/practico-api/clima",
      element: <Weather />,
    },
    {
      path: "/practico-api/trafico",
      element: <Traffic />,
    },
    {
      path: "/practico-api/*",
      element: <Error data={{ error: "Pagina no encontrada" }} />,
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
