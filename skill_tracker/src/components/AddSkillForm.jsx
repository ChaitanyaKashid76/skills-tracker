import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addSkill } from "../services/api";
import "./AddSkillForm.css";

function AddSkillForm() {
  const navigate = useNavigate();
  const [skillName, setSkillName] = useState("");
  const [level, setLevel] = useState("");
  const [progress, setProgress] = useState(0);
  const [goal, setGoal] = useState("");
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId"); // stored after login
    if (!userId) {
      setAlert({ type: "danger", text: "Please login first" });
      return;
    }

    try {
      const skillData = { skillName, level, progress, goal };
      await addSkill(userId, skillData);

      setAlert({ type: "success", text: "Skill added successfully!" });

      setTimeout(() => {
        navigate("/Dashboard");
      }, 1000);
    } catch (err) {
      console.error(err);
      setAlert({
        type: "danger",
        text: "Error adding skill. Try again.",
      });
    }
  };

  return (
    <div className="add-skill-form">
      <h2>Add New Skill</h2>

      {alert && (
        <div className={`alert ${alert.type === "success" ? "alert-success" : "alert-danger"}`}>
          {alert.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label>Skill Name</label>
        <input
          type="text"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
          placeholder="e.g. Java, React"
          required
        />

        <label>Level</label>
        <select value={level} onChange={(e) => setLevel(e.target.value)} required>
          <option value="">Select</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <label>Progress (%)</label>
        <input
          type="number"
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
          min="0"
          max="100"
          required
        />

        <label>Goal</label>
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g. Complete project, Learn advanced concepts"
        />

        <button type="submit">Add Skill</button>
      </form>
    </div>
  );
}

export default AddSkillForm;
