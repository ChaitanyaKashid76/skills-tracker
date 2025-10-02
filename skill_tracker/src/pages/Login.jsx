import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setAlert(null);

  if (!email || !password) {
    setAlert({ type: "danger", text: "Please enter email and password." });
    return;
  }

  try {
    setLoading(true);
    const res = await login({ email, password }); // res is already your backend map
    setLoading(false);

  if (res.message && res.message.toLowerCase().includes("login successful")) {
  localStorage.setItem("userId", res.id);
  localStorage.setItem("username", res.name);
  localStorage.setItem("email", res.email);   
  localStorage.setItem("isLoggedIn", "true");

  setAlert({ type: "success", text: "Login successful. Redirecting..." });
  setTimeout(() => {
    navigate("/Dashboard", { state: { name: res.name } });
  }, 700);
}
 else {
      setAlert({ type: "danger", text: res.message || "Invalid credentials" });
    }
  } catch (err) {
    setLoading(false);
    console.error(err);
    setAlert({
      type: "danger",
      text: err?.response?.data?.message || "Error logging in. Try again.",
    });
  }
};


  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title mb-3 text-center">Login</h3>

              {alert && (
                <div className={`alert alert-${alert.type}`} role="alert">
                  {alert.text}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                </div>

                <div className="d-grid gap-2">
                  <button
                    className="btn btn-primary btn-lg"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>
              </form>

              <hr />

              <p className="text-center">
                New here?{" "}
                <Link to="/signin" className="text-decoration-none">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
