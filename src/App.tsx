import { useState } from "react";
import type { Task } from "./types";
import AddTask from "./AddTask";
function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Learn TypeScript", completed: false, priority: "p1" },
  ]);
  console.log("APP RENDERED");
  const onAddTask = (taskName: string) => {
    if (!taskName.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), title: taskName, isCompleted: false },
    ]);
  };

  return (
    <>
      <h1>Tasks</h1>
      <AddTask onAddTask={onAddTask} />
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
