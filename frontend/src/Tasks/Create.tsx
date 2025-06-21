function CreateTask() {
  return (
    <>
      <h2>Adicionar Serviço</h2>
      <form method="POST">
        <fieldset>
          <label>Titulo do Serviço</label>
          <input type="text" placeholder="Digite um nome" />
        </fieldset>
        <fieldset>
          <label>Tipo do Serviço</label>
          <input type="text" disabled />
        </fieldset>
        
      </form>
    </>
  );
}

export default CreateTask;
