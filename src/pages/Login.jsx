import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false
  });

  const handleLoginChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // =====================
  //      LOGIN
  // =====================
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(
      (u) =>
        u.username === loginData.username &&
        u.password === loginData.password
    );

    if (!validUser) {
      toast.error("Invalid username or password!");
      return;
    }

    // Save logged-in user
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        username: validUser.username,
        email: validUser.email
      })
    );

    setSuccessMessage(`Welcome back, ${validUser.username}!`);
    setShowSuccess(true);

    setTimeout(() => navigate("/"), 1200);
  };

  // ======================
  //    REGISTER
  // ======================
  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (
      !registerData.username ||
      !registerData.email ||
      !registerData.password
    ) {
      toast.error("Please fill all required fields!");
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.some(
      (u) =>
        u.username === registerData.username ||
        u.email === registerData.email
    );

    if (exists) {
      toast.error("User already exists! Please LOGIN.");
      return;
    }

    // Save new user
    const newUser = {
      username: registerData.username,
      email: registerData.email,
      password: registerData.password
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        username: newUser.username,
        email: newUser.email
      })
    );

    setSuccessMessage(
      `Congratulations, ${newUser.username}! Your account has been created.`
    );
    setShowSuccess(true);

    setTimeout(() => navigate("/"), 1200);
  };

  // ======================
  // SUCCESS SCREEN
  // ======================
  if (showSuccess) {
    return (
      <div className="login-page auth-section">
        <div className="auth-container">
          <div className="success-message">
            <i className="fas fa-check-circle"></i>
            <p id="successText">{successMessage}</p>
          </div>
        </div>
      </div>
    );
  }

  // ======================
  // MAIN LOGIN UI
  // ======================
  return (
    <div className="login-page auth-section">
      <div className="auth-container">
        <div className="auth-tabs">
          <button
            className={`tab-btn ${
              activeTab === "login" ? "active" : ""
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>

          <button
            className={`tab-btn ${
              activeTab === "register" ? "active" : ""
            }`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        {/* LOGIN FORM */}
        {activeTab === "login" && (
          <form className="auth-form active" onSubmit={handleLoginSubmit}>
            <h2>Welcome Back</h2>
            <p>Login to your account</p>

            <div className="input-group">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={loginData.username}
                onChange={handleLoginChange}
                required
              />
            </div>

            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
            </div>

            <div className="form-options">
              <label>
                <input type="checkbox" /> Remember me
              </label>

              <a
                className="forgot-password"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/forgot")}
              >
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              Login
            </button>
          </form>
        )}

        {/* REGISTER FORM */}
        {activeTab === "register" && (
          <form
            className="auth-form active"
            onSubmit={handleRegisterSubmit}
          >
            <h2>Create Account</h2>
            <p>Join FitLife Gym today</p>

            <div className="input-group">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={registerData.username}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div className="input-group">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={registerData.email}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={registerData.password}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div className="form-options">
              <label>
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={registerData.agreeTerms}
                  onChange={handleRegisterChange}
                />{" "}
                I agree to terms & conditions
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              Create Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
