import { useEffect, useState } from "react";
import "./App.css";
import { fetchService } from "./api/service";

interface Task {
  id: number;
  title: string;
  slug: string;
  specialty: string;
  estimated_time: string;
  is_it_home: boolean;
}

function App() {
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
    <>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <dt>{task.id}</dt>
            <dt>{task.title}</dt>
            <dt>{task.estimated_time}</dt>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
