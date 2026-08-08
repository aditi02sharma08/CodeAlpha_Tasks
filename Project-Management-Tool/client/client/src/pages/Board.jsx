import { useEffect, useState } from "react";
import axios from "axios";

function Board() {
  const [taskTitle, setTaskTitle] = useState("");
const [tasks, setTasks] = useState([]);
const [comments, setComments] = useState([]);
const [userIds, setUserIds] = useState({});
const [commentsInput, setCommentsInput] = useState({});
useEffect(() => {
  fetchTasks();
  fetchComments();
}, []);
const fetchTasks = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/tasks");
    setTasks(res.data);
  } catch (error) {
    console.log(error);
    alert("Failed to fetch tasks");
  }
};
const fetchComments = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/comments");
    setComments(res.data);
  } catch (error) {
    console.log(error);
    alert("Failed to fetch comments");
  }
};
const createTask = async () => {
  

  try {
    const projectId = localStorage.getItem("projectId");

    await axios.post("http://localhost:5000/api/tasks", {
      title: taskTitle,
      description: "",
      project: projectId,
    });
    setTaskTitle("");
    fetchTasks();
  } catch (error) {
  console.log(error.response?.data);
  alert(error.response?.data?.message || error.message);
}
};
const assignTask = async (taskId) => {
  try {
    await axios.put(
      `http://localhost:5000/api/tasks/${taskId}/assign`,
      {
        userId: userIds[taskId],
      }
    );

    alert("Task assigned successfully");

    setUserId("");

    fetchTasks();
  } catch (error) {
    console.log(error.response?.data);
    alert(error.response?.data?.message || "Failed to assign task");
  }
};
const addComment = async (taskId) => {
  try {
    await axios.post("http://localhost:5000/api/comments", {
  message: commentsInput[taskId],
  task: taskId,
  user: userIds[taskId]
});

    alert("Comment added successfully");

setCommentsInput((prev) => ({
  ...prev,
  [taskId]: "",
}));

fetchComments();
  } catch (error) {
    console.log(error.response?.data);
    alert(error.response?.data?.message || "Failed to add comment");
  }
};
  return (
    <div>
      <h2>Project Board</h2>

      <input
  type="text"
  placeholder="Enter Task Title"
  value={taskTitle}
  onChange={(e) => setTaskTitle(e.target.value)}
/>

      <br /><br />

      <button onClick={createTask}>
  Add Task
</button>

      <br /><br />

      <h3>To Do</h3>

{tasks.filter(task => task.status === "To Do").length === 0 ? (
  <p>No tasks yet.</p>
) : (
  <ul>
    {tasks
      .filter(task => task.status === "To Do")
      .map(task => (
        <li key={task._id}>
  <strong>{task.title}</strong>

  <br /><br />

  <input
    type="text"
    placeholder="Enter User ID"
    value={userIds[task._id] || ""}
onChange={(e) =>
  setUserIds({
    ...userIds,
    [task._id]: e.target.value
  })
}
  />

  <button onClick={() => assignTask(task._id)}>
    Assign
  </button>
  <br /><br />

<input
  type="text"
  placeholder="Write a comment"
  value={commentsInput[task._id] || ""}
  onChange={(e) =>
    setCommentsInput({
      ...commentsInput,
      [task._id]: e.target.value,
    })
  }
/>

<br />

<button onClick={() => addComment(task._id)}>
  Add Comment
</button>

<br /><br />

<ul>
  {comments
    .filter((c) => c.task.toString() === task._id.toString())
    .map((c) => (
      <li key={c._id}>{c.message}</li>
    ))}
</ul>
</li>
      ))}
  </ul>
)}
     <h3>In Progress</h3>

{tasks.filter(task => task.status === "In Progress").length === 0 ? (
  <p>No tasks yet.</p>
) : (
  <ul>
    {tasks
      .filter(task => task.status === "In Progress")
      .map(task => (
        <li key={task._id}>
          {task.title}
        </li>
      ))}
  </ul>
)}
      <h3>Done</h3>

{tasks.filter(task => task.status === "Done").length === 0 ? (
  <p>No tasks yet.</p>
) : (
  <ul>
    {tasks
      .filter(task => task.status === "Done")
      .map(task => (
        <li key={task._id}>
          {task.title}
        </li>
      ))}
  </ul>
)}
    </div>
  );
}

export default Board;