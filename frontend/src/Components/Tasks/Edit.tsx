import type { Task } from "@/api/models";
import api, { toTask } from "@/api/service";
import { useEffect, useState } from "react";
import NotFound from "../Shared/NotFound";
import { useParams } from "react-router-dom";
import slugify from "@/utils";

function EditTask() {
  const { id } = useParams<{ id: string }>();
  const [wasNotFound, setNotFound] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [task, setTask] = useState<Task | null>(null);
  const taskId = parseInt(id || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setTask((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
        ...(name === "title" && { slug: slugify(value) }),
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!task) return;

    try {
      const response = await api.updateTask(taskId, task!);

      console.info("Atualizar Task status: ", response.status);
      console.info("Task info: ", response.data);
      alert(`Serviço ${response.data.title} atualizado com sucesso!`);
    } catch (error) {
      console.error("Erro ao atualizar Task: ", error);
      alert(`Falha ao atualizar o Serviço: ${error}`);
    }
  };

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await api.findTask(taskId);
        if (data) {
          const taskData = toTask(data);
          setTask(taskData);
          setNotFound(false);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        setNotFound(true);
        console.error("Error ao buscar Task: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  if (isLoading) return <div>Loading...</div>;

  if (!isLoading && wasNotFound) return <NotFound />;

  if (!task) return <div>Dados de Serviço indisponíveis</div>;

  return (
    <>
      <title>Editar - Serviços</title>
      <div className="main-content">
        <h2>Editar Serviço</h2>
        <form method="POST" onSubmit={handleSubmit}>
          <fieldset className="form-group">
            <label>Titulo do Serviço</label>
            <div className="form-row">
              <input
                type="text"
                name="title"
                value={task.title || ""}
                placeholder="Digite um título"
                onChange={handleChange}
                required
              />
              <input type="text" name="slug" value={task.slug || ""} disabled />
            </div>
          </fieldset>
          <fieldset className="form-group">
            <label>Especialidade</label>
            <input
              type="text"
              name="specialty"
              value={task.specialty || ""}
              placeholder="Cirurgião"
              onChange={handleChange}
              required
            />
          </fieldset>
          <fieldset className="form-group">
            <div className="form-row">
              <label>Tempo de Execução</label>
              <input
                type="time"
                name="estimated_time"
                value={task.estimated_time || ""}
                onChange={handleChange}
                required
              />
              <div>
                <label>É a Domicílio</label>
                <input
                  type="checkbox"
                  name="is_it_home"
                  checked={task.is_it_home || false}
                  onChange={handleChange}
                />
              </div>
            </div>
          </fieldset>
          <div>
            <button type="reset">Cancelar</button>
            <button type="submit">Salvar</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditTask;
