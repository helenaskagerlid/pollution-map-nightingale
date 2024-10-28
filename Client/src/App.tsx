import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "leaflet/dist/leaflet.css";

const App = () => {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};

export default App;
