function CreateTask() {
  return (
    <>
      <h2>Adicionar Serviço</h2>
      <form method="POST">
        <fieldset>
          <label>Titulo do Serviço</label>
          <input type="text" placeholder="Digite um nome" />
          <label>Tipo</label>
          <input type="text" disabled />
        </fieldset>
        <fieldset>
          <label>Especialidade</label>
          <input type="text" />
        </fieldset>
        <fieldset>
          <label>Tempo de Execução</label>
          <div>
            (hh:mm)
            <input type="time" min="00:30" />
          </div>
        </fieldset>
        <fieldset>
          <label>É a Domicílio</label>
          <input type="checkbox" />
        </fieldset>
      </form>
    </>
  );
}

export default CreateTask;
