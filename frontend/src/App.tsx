import "./App.css";
import TasksList from "./Tasks/Tasks";
import Navbar from "./Shared/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <TasksList />
      </main>
    </>
  );
}

export default Home;
