import type { Task } from "@/api/models";
import api from "@/api/service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../Shared/NotFound";

function DetailsTask() {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);

  const taskId = parseInt(id || "");

  useEffect(() => {
    try {
      const fetchTask = async () => {
        const data = await api.findTask(taskId);
        setTask(data as Task);
      };
      fetchTask();
    } catch (error) {
      console.error("Error ao buscar Task: ", error);
    }
  }, [taskId]);

  if (task == null) return <NotFound />;

  return (
    <>
      <h2>Serviço</h2>
      <div>
        <h3>{task.title}</h3>
        <table>
          <tbody>
            <tr>
              <td>{task.estimated_time}</td>
              <td>{task.is_it_home}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DetailsTask;
