import { Link } from "react-router-dom";
import { CircleUser } from "lucide-react";
import ROUTES from "@/routes";

const brand = import.meta.env.VITE_BRAND_NAME;

function Navbar() {
  return (
    <nav id="navbar">
      <Link to={ROUTES.HOME}>
        <h1>{brand}</h1>
      </Link>
      <Link to={ROUTES.TASKS.INDEX}>Serviços</Link>
      {/* <Link to={ROUTES.TASKS.LIST}>Atendimentos</Link> */}
      {/* <Link to={ROUTES.TASKS.LIST}>Médicos</Link> */}
      <Link to={ROUTES.AUTH.LOGIN}>
        <CircleUser />
      </Link>
    </nav>
  );
}

export default Navbar;
