import { useEffect, useState } from "react";
import api from "@/api/service";
import type { Task } from "@/api/models";
import { Link, Navigate } from "react-router-dom";
import { Pencil, Trash2, View, X } from "lucide-react";
// import ROUTES from "@/routes";

function ListTask() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selected, setSelected] = useState<Task | null>(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (task: Task) => {
    setIsEditing(!isEditing);
    if (isEditing) setSelected(task);
    else setSelected(null);
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
    <table className="list-table-view">
      <thead>
        <tr>
          <th>ID</th>
          <th>Titulo do Serviço</th>
          <th>Tempo Estimado</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>
              <input
                type="text"
                value={task.title}
                placeholder="Titulo do Serviço"
                disabled={selected !== task}
              />
            </td>
            <td>
              <input
                type="time"
                value={task.estimated_time}
                disabled={selected !== task}
              />
            </td>
            <td>
              <div>
                <button>
                  <Link to={`/task/${task.id}/`}>
                    <View />
                  </Link>
                </button>
                {/* Edit Button */}
                <button onClick={() => handleEdit(task)}>
                  {selected === task ? <X /> : <Pencil />}
                </button>
                {/* Delete Button */}
                <button onClick={() => handleDelete(task)}>
                  <Trash2 />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ListTask;
