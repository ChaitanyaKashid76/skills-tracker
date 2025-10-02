import React, { useEffect, useState } from "react";
import Chart from "../components/Chart";
import "./CSS/Dashboard.css";
import { useNavigate } from "react-router-dom";
import { getSkills, deleteSkill, updateSkill } from "../services/api";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function Dashboard() {
  const [user, setUser] = useState({ name: "" });
  const [skills, setSkills] = useState([]);
  const [editSkill, setEditSkill] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");

    if (name) setUser({ name });

    if (userId) {
      fetchSkills(userId);
    }
  }, []);

  const fetchSkills = async (userId) => {
    try {
      const data = await getSkills(userId);
      setSkills(data);
    } catch (err) {
      console.error("Error fetching skills:", err);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const updatedData = { ...editSkill };
      await updateSkill(id, updatedData);

      // Refresh skills list
      const userId = localStorage.getItem("userId");
      if (userId) fetchSkills(userId);

      setEditSkill(null);
    } catch (err) {
      console.error("Error updating skill:", err);
    }
  };

  const handleDeleteSkill = async (skillId) => {
    try {
      await deleteSkill(skillId);
      setSkills(skills.filter((s) => s.id !== skillId));
    } catch (err) {
      console.error("Error deleting skill:", err);
    }
  };

  // Colors for pie slices
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f"];

  return (
    <>
      <div className="profile-card">
        <h2>Welcome, {user.name} 👋</h2>
        <div className="profile-card">
          <h3>Profile</h3>
          <p><strong>Name:</strong> {user.name}</p>
        </div>
      </div>

      <div className="skills-section">
        <h3>Skills</h3>
        <button
          className="add-skill-btn"
          onClick={() => navigate("/add-skill")}
        >
          + Add Skill
        </button>

        {/* ✅ Overall progress chart (Bar) */}
        <div className="overall-chart">
          <h4>Overall Progress</h4>
          <Chart skills={skills} />
        </div>

        {/* ✅ Individual Pie Charts for each skill */}
        <div className="skills-pie-container">
          {skills.map((skill, index) => (
            <div key={skill.id} className="skill-pie">
              <h4>{skill.skillName} ({skill.progress}%)</h4>
              <ResponsiveContainer width={220} height={220}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Progress", value: skill.progress },
                      { name: "Remaining", value: 100 - skill.progress }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    dataKey="value"
                  >
                    <Cell fill={COLORS[index % COLORS.length]} />
                    <Cell fill="#e0e0e0" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>

        {/* Skills List with update/delete */}
        <ul className="skills-list">
          {skills.length > 0 ? (
            skills.map((skill) => (
              <li key={skill.id} className="skill-item">
                {editSkill && editSkill.id === skill.id ? (
                  // Editing form
                  <div className="edit-skill-section">
                    <label>Skill Name:</label>
                    <input
                      type="text"
                      value={editSkill.skillName || ""}
                      onChange={(e) =>
                        setEditSkill({ ...editSkill, skillName: e.target.value })
                      }
                    />

                    <label>Level:</label>
                    <select
                      value={editSkill.proficiency || ""}
                      onChange={(e) =>
                        setEditSkill({ ...editSkill, proficiency: e.target.value })
                      }
                      required
                    >
                      <option value="">Select</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>

                   <label>Progress (%):</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editSkill.progress || 0}
                      onChange={(e) => {
                        let value = parseInt(e.target.value, 10) || 0;
                        if (value < 0) value = 0;
                        if (value > 100) value = 100;
                        setEditSkill({ ...editSkill, progress: value });
                      }}
                    />

                    <label>Goal:</label>
                    <input
                      type="text"
                      value={editSkill.goal || ""}
                      onChange={(e) =>
                        setEditSkill({ ...editSkill, goal: e.target.value })
                      }
                    />

                    <button
                      className="save-btn"
                      onClick={() => handleUpdate(skill.id)}
                    >
                      Save
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setEditSkill(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  // Display skill info
                  <div>
                    <strong>{skill.skillName}</strong>
                    <p>Level: {skill.proficiency}</p>
                    <p>Progress: {skill.progress}%</p>
                    <p>Goal: {skill.goal}</p>
                    <button
                      className="update-btn"
                      onClick={() => setEditSkill(skill)}
                    >
                      Update
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteSkill(skill.id)}
                    >
                      ❌ Delete
                    </button>
                  </div>
                )}
              </li>
            ))
          ) : (
            <p>No skills added yet.</p>
          )}
        </ul>
      </div>
    </>
  );
}

export default Dashboard;
