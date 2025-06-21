import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Shared/Navbar";

function PageLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default PageLayout;
