import { useEffect, useState } from "react";
import { fetchService } from "../api/service";

interface Task {
  id: number;
  title: string;
  slug: string;
  specialty: string;
  estimated_time: string;
  is_it_home: boolean;
}

function ListTask() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchService.getTasks();
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
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Titulo do Serviço</th>
          <th>Tempo Estimado</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.title}</td>
            <td>{task.estimated_time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ListTask;
