import { Outlet } from "react-router-dom";
import "@Assets/App.css";
import "@Assets/index.css";
import Navbar from "@Shared/Navbar";

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
