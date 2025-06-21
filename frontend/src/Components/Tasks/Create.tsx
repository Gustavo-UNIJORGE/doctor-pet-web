import { useEffect, useState } from "react";
import api from "@/api/service";
import { type Task } from "@/api/models";

function CreateTask() {
  const [form, setForm] = useState<Task>({
    title: "",
    slug: "",
    specialty: "",
    estimated_time: "00:30:00",
    is_it_home: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.createTask(form);

      setForm({
        title: "",
        slug: "",
        specialty: "",
        estimated_time: "00:30:00",
        is_it_home: false,
      });

      console.info("Criar Task status: ", response.status);
      console.info("Task info: ", response.data);
      alert(`Serviço ${response.data.title} criado com sucesso!`);
    } catch (error) {
      console.error("Erro ao salvar Task: ", error);
      alert(`Falha ao criar o Serviço: ${error}`);
    }
  };

  function slugify(title: string) {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // remove acentos
      .replace(/[^\w\s-]/g, "") // elimina caracteres especiais
      .replace(/\s+/g, "-") // substitui espaços por hífen "-"
      .replace(/-+/g, "-"); // substitui múltiplos hífen por um único
  }

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      slug: slugify(form.title),
    }));
  }, [form.title]);

  return (
    <>
      <div className="main-content">
        <h2>Adicionar Serviço</h2>
        <form method="POST" onSubmit={handleSubmit}>
          <fieldset className="form-group">
            <label>Titulo do Serviço</label>
            <div className="form-row">
              <input
                type="text"
                name="title"
                value={form.title}
                placeholder="Digite um título"
                onChange={handleChange}
                required
              />
              <input type="text" name="slug" value={form.slug} disabled />
            </div>
          </fieldset>
          <fieldset className="form-group">
            <label>Especialidade</label>
            <input
              type="text"
              name="specialty"
              value={form.specialty}
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
                value={form.estimated_time}
                onChange={handleChange}
                required
              />
              <div>
                <label>É a Domicílio</label>
                <input
                  type="checkbox"
                  name="is_it_home"
                  checked={form.is_it_home}
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

export default CreateTask;
