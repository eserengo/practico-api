import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Weather from "./pages/Weather"
import Traffic from "./pages/Traffic"
import Error from "./components/Error"
import "./App.css"

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
      path: "*",
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
