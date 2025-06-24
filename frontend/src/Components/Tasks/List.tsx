import { useEffect, useState } from "react";
import api from "@/api/service";
import type { Task } from "@/api/models";
import { Link } from "react-router-dom";
import {
  Check,
  CircleQuestionMark as Question,
  Pencil,
  Plus,
  Trash2,
  View,
  X,
} from "lucide-react";
import ROUTES from "@/routes";

function ListTask() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [refresh, setRefresh] = useState(false);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (searchQuery.length > 0) {
      try {
        const data = await api.searchTask(searchQuery);

        setTasks(data);
      } catch (error) {
        console.error("Error at searching data: ", error);
        alert("Erro ao buscar registros");
      }
    }
  };

  const handleDelete = async (task: Task) => {
    const text = "Você deseja mesmo remover esse Serviço da sua lista?";
    const message = `Serviço ${task.title} desativado com sucesso`;
    if (confirm(text)) {
      try {
        await api.deActiveTask(task.id, task).then(() => alert(message));
      } catch (error) {
        console.error("Error at deactiving data: ", error);
        alert("Erro ao desativar o registro.");
      } finally {
        // Atualiza a lista de registros para o usuário
        setRefresh(true);
      }
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await api.getActiveTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error at fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [refresh]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="list-view">
      <div className="list-table-controls">
        <div className="search-control">
          <span>Buscar</span>
          <input
            type="search"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Busque um Serviço por titulo"
          />
        </div>
        <div className="inactive-control">
          <span>Inativos</span>
          <input type="checkbox" />
        </div>
      </div>
      <table className="list-table-view">
        <thead>
          <tr>
            <th>ID</th>
            <th>Titulo do Serviço</th>
            <th>Tempo Estimado</th>
            <th>É a domicílio?</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>
                <b>{task.title}</b>
              </td>
              <td>
                {task.estimated_time.split(":").join("m").replace("m", "h")}
              </td>
              <td>{task.is_it_home ? <Check /> : <X />}</td>
              <td>
                <div>
                  {/* <Link to={`/task/${task.id}/`}> */}
                  <Link
                    to={ROUTES.TASKS.DETAILS.replace(":id", String(task.id))}
                  >
                    <button>
                      <View />
                    </button>
                  </Link>
                  <Link to={ROUTES.TASKS.EDIT.replace(":id", String(task.id))}>
                    <button /* onClick={() => handleEdit(task)} */>
                      <Pencil />
                    </button>
                  </Link>
                  <button onClick={() => handleDelete(task)}>
                    <Trash2 />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <Link to={ROUTES.TASKS.CREATE}>
                <Plus />
              </Link>
            </td>
            <td>
              <Link to={ROUTES.TASKS.CREATE}>Novo Serviço</Link>
            </td>
            <td>
              <Link to={ROUTES.TASKS.CREATE}>00h00m</Link>
            </td>
            <td>
              <Link to={ROUTES.TASKS.CREATE}>
                <Question />
              </Link>
            </td>
            <td>
              <Link to={ROUTES.TASKS.CREATE}>
                <button>Adicionar Serviço</button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ListTask;
