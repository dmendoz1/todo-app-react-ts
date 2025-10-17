import { useState } from "react";
type TaskInputProps = {
  onAddTask: (taskName: string) => void;
};

export default function AddTask(props: TaskInputProps) {
  const { onAddTask } = props;
  const [taskName, setTaskName] = useState<string>("");

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTaskName = taskName.trim();
    if (!trimmedTaskName) return;
    onAddTask(trimmedTaskName);
    setTaskName("");
  };
  return (
    <>
      <form onSubmit={handleAddTask}>
        <label htmlFor="task-input">New Task:</label>
        <input
          id="task-input"
          type="text"
          name="New Task"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button>Add Task</button>
      </form>
    </>
  );
}
