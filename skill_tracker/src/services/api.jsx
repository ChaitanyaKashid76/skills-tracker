import axios from "axios";

const AUTH_BASE = "http://localhost:8080/api/auth";
const SKILL_BASE = "http://localhost:8080/api/skills";

// 📝 Signup
export const signup = async (userData) => {
  const res = await axios.post(`${AUTH_BASE}/signup`, userData);
  return res.data;
};

// 🔑 Login
export const login = async (credentials) => {
  const res = await axios.post(`${AUTH_BASE}/login`, credentials);
  return res.data;
};

// ➕ Add Skill
export const addSkill = async (userId, skillData) => {
  const res = await axios.post(`${SKILL_BASE}/add/${userId}`, skillData);
  return res.data;
};

// 📋 Get Skills by User
export const getSkills = async (userId) => {
  const res = await axios.get(`${SKILL_BASE}/${userId}`); // ✅ fixed endpoint
  return res.data;
};

// Update skill

export const updateSkill = async (id, skillData) => {
  const res = await axios.put(`${SKILL_BASE}/update/${id}`, skillData);
  return res.data;
};
// ❌ Delete Skill
export const deleteSkill = async (skillId) => {
  const res = await axios.delete(`${SKILL_BASE}/delete/${skillId}`);
  return res.data;
};

