import { useEffect, useState } from "react";
import api from "@/api/service";
import type { Task } from "@/api/models";
import ROUTES from "@/routes";
import { Link } from "react-router-dom";
import { Pencil, Trash2, View, X } from "lucide-react";

function ListTask() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selected, setSelected] = useState<Task | null>(null);

  const handleEdit = (task: Task) => {
    setIsEditing(!isEditing);
    if (isEditing) setSelected(task);
    else setSelected(null);
  };

  const handleDelete = (task: Task) => {
    if (confirm("Você deseja mesmo remover esse Serviço da sua lista?"))
      alert("deleted");
    // desactive item
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await api.getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Erro fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

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
                  <Link to={ROUTES.TASKS.DETAIL}>
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
