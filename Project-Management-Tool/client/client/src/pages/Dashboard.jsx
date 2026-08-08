import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/projects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch projects");
    }
  };
const createProject = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:5000/api/projects",
      {
        name: projectName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setProjectName("");
    localStorage.setItem("projectId", res.data.project._id);
    fetchProjects();
  } catch (error) {
    console.log(error);
    alert("Failed to create project");
  }
};
const addMember = async () => {
  try {
    const token = localStorage.getItem("token");

    await axios.put(
  `http://localhost:5000/api/projects/${projects[0]._id}/add-member`,
  {
    email: memberEmail,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    alert("Member added successfully");
    setMemberEmail("");
  } catch (error) {
    console.log(error);
    alert("Failed to add member");
  }
};
  return (
    <div>
      <h2>Project Dashboard</h2>

      <input
  type="text"
  placeholder="Enter Project Name"
  value={projectName}
  onChange={(e) => setProjectName(e.target.value)}
/>

<br /><br />

<button onClick={createProject}>
  Create Project
</button>
<h3>Group Members</h3>

<input
  type="email"
  placeholder="Enter Member Email"
  value={memberEmail}
  onChange={(e) => setMemberEmail(e.target.value)}
/>

<br /><br />

<button onClick={addMember}>
  Add Member
</button>

<br /><br />
      <h3>Your Projects</h3>

      {projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project._id}>{project.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;