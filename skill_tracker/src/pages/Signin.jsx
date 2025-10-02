import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../services/api";

export default function Signin() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);

    if (!name || !email || !password) {
      setAlert({ type: "danger", text: "Please fill all fields." });
      return;
    }

    try {
      setLoading(true);
      const user = { name, email, password };
      const res = await signup(user);
      // backend returns saved user object
      setLoading(false);
      setAlert({ type: "success", text: "Signup successful. Redirecting to login..." });

      // small delay so user sees message, then redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 900);

    } catch (err) {
      setLoading(false);
      console.error(err);
      setAlert({
        type: "danger",
        text: err?.response?.data || "Error while signing up. Try again.",
      });
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title mb-3 text-center">Create account</h3>

              {alert && (
                <div className={`alert alert-${alert.type}`} role="alert">
                  {alert.text}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>

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
                    placeholder="Minimum 4 characters"
                  />
                </div>

                <div className="d-grid gap-2">
                  <button
                    className="btn btn-primary btn-lg"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Creating account..." : "Sign up"}
                  </button>
                </div>
              </form>

              <hr />

              <p className="text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-decoration-none">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
