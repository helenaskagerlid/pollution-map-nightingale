import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import LineChart from "./pages/PollutionChart";
import { Contact } from "./pages/Contact";
import { PollutionMapTEST } from "./components/PollutionMapTEST";
// import { TestMap } from "./components/MapTest";
// import { PollutionMapTest } from "./components/PollutionMapTest";
// import { PollutionTEST } from "./pages/PollutionTEST";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/chart",
        element: <LineChart></LineChart>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      // {
      //   path: "/maptest",
      //   element: <TestMap></TestMap>,
      // },
      {
        path: "/pollutionMapTEST",
        element: <PollutionMapTEST></PollutionMapTEST>,
      },
    ],
  },
]);
