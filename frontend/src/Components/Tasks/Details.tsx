import type { Task } from "@/api/models";
import api from "@/api/service";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NotFound from "../Shared/NotFound";
import { Check, Pencil, X } from "lucide-react";

function DetailsTask() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [task, setTask] = useState<Task | null>(null);

  const taskId = parseInt(id || "");

  useEffect(() => {
    try {
      const fetchTask = async () => {
        setIsLoading(true); 
        const data = await api.findTask(taskId);
        setTask(data as Task);
      };
      fetchTask();
    } catch (error) {
      console.error("Error ao buscar Task: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [taskId]);

  if (isLoading) return <div>Loading</div>;
  else {
    if (!isLoading && task != null) {
      return (
        <>
          <h2>Serviço</h2>
          <div>
            <h3>{task.title}</h3>
            <div>
              <label>Duração</label>
              <span>{task.estimated_time}</span>
            </div>
            <div>
              {task.is_it_home ? <Check /> : <X />}
              <label>É domicilio?</label>
            </div>
            <Link to={`/task/${taskId}/edit`}>
              <Pencil />
            </Link>
          </div>
        </>
      );
    } else return <NotFound />;
  }
}

export default DetailsTask;
