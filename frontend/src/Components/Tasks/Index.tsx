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
      <div>
        <Link to={ROUTES.TASKS.CREATE}>
          Adicionar Serviço
          <Plus />
        </Link>
      </div>
      
      <ListTask />
    </>
  );
}

export default IndexTask;
