import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Weather from "./pages/Weather"
import Traffic from "./pages/Traffic"
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "weather",
      element: <Weather />,
    },
    {
      path: "traffic",
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
