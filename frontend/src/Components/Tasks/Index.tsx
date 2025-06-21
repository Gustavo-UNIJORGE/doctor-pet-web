import "@Assets/Task.css";
import ListTask from "./List";
import ROUTES from "../../routes";
import { Link } from "react-router-dom";

function IndexTask() {
  return (
    <>
      <h2>Serviços</h2>
      <ul>
        <li>
          <Link to={ROUTES.TASKS.CREATE}>Adicionar Serviço</Link>
        </li>
        <li>
          <Link to={ROUTES.TASKS.EDIT}>Editar Serviço</Link>
        </li>
        <li>
          <Link to={ROUTES.TASKS.DELETE}>Desativar Serviço</Link>
        </li>
        <li>Buscar por Serviço</li>
      </ul>
      <ListTask />
    </>
  );
}

export default IndexTask;
