import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailCheck = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find((u) => u.email === email);

    if (!exists) {
      alert("No account found with this email!");
      return;
    }

    setStep(2);
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((u) => {
      if (u.email === email) {
        return { ...u, password: newPass };
      }
      return u;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setMessage("Password updated successfully! Redirecting...");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="login-page auth-section">
      <div className="auth-container">

        {step === 1 && (
          <form onSubmit={handleEmailCheck} className="auth-form active">
            <h2>Forgot Password</h2>
            <p>Enter your registered email</p>

            <div className="input-group">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button className="btn btn-primary btn-full">Next</button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handlePasswordReset} className="auth-form active">
            <h2>Reset Password</h2>
            <p>Enter your new password</p>

            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="New Password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                required
              />
            </div>

            <button className="btn btn-primary btn-full">
              Update Password
            </button>

            {message && <p style={{ marginTop: "15px", color: "green" }}>{message}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
