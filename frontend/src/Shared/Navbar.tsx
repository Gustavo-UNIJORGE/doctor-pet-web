import { Link } from "react-router-dom";
import ROUTES from "../routes";
import { CircleUser } from "lucide-react";

// const brand = "Doctor Pet App";
const brand = import.meta.env.VITE_BRAND_NAME;

function Navbar() {
  return (
    <nav id="navbar">
      <Link to={ROUTES.HOME}>
        <h1>{brand}</h1>
      </Link>
      <Link to={ROUTES.TASKS.LIST}>Serviços</Link>
      <Link to={ROUTES.TASKS.LIST}>Atendimentos</Link>
      <Link to={ROUTES.TASKS.LIST}>Médicos</Link>
      <Link to={ROUTES.AUTH.LOGIN}>
        <CircleUser />
      </Link>
    </nav>
  );
}

export default Navbar;
