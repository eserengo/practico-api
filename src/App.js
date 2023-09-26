import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Weather from "./pages/Weather"
import Traffic from "./pages/Traffic"
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/practico-api",
      element: <Home />,
    },
    {
      path: "/practico-api/weather",
      element: <Weather />,
    },
    {
      path: "/practico-api/traffic",
      element: <Traffic />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
