import "@Assets/Task.css";
import ListTask from "./List";
import ROUTES from "../../routes";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

function IndexTask() {
  return (
    <>
      <title>Serviços</title>
      <h2>Seus Serviços</h2>
      <ul>
        <li>
          <Link to={ROUTES.TASKS.CREATE}>
            Adicionar Serviço
            <Plus />
          </Link>
        </li>
        <li>Buscar por Serviço</li>
      </ul>
      <ListTask />
    </>
  );
}

export default IndexTask;
