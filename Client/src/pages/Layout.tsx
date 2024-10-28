import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export const Layout = () => {
  return (
    <>
      <Header></Header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer></footer>
    </>
  );
};
