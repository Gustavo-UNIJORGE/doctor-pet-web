import "./App.css";
import TasksList from "./Tasks/Tasks";
import Navbar from "./Shared/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <TasksList />
      </main>
    </>
  );
}

export default App;
