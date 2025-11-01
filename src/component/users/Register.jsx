import { useState } from "react";
import "./style.css";
import { Link } from "react-router";

// Register Component
const Register = ({ onNavigate }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAccount = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      console.error("Please fill out all fields.");
      return;
    }
    console.log("Creating account with:", {
      firstName,
      lastName,
      email,
      password,
    });
    // Add your registration API call here
  };

  return (
    <div className="page-wrapper">
      <a onClick={() => onNavigate("login")} className="back-link">
        <span className="back-arrow">←</span> Back To Home
      </a>
      <h1 className="main-title">Register</h1>

      <div className="form-container">
        <form onSubmit={handleCreateAccount}>
          <div className="form-section">
            <h2 className="form-section-title">Your Personal Details</h2>
            <div className="input-grid grid-col-2">
              <div className="input-field">
                <label htmlFor="firstName">
                  First name <span className="required">*</span> :
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="lastName">
                  Last name <span className="required">*</span> :
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="input-field span-col-2">
                <label htmlFor="reg-email">
                  Email <span className="required">*</span> :
                </label>
                <input
                  type="email"
                  id="reg-email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="form-section-title">Your Password</h2>
            <div className="input-grid grid-col-1">
              <div className="input-field">
                <label htmlFor="reg-password">
                  Password <span className="required">*</span> :
                </label>
                <input
                  type="password"
                  id="reg-password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="flex justify-between items-center">
              <button type="submit" className="btn btn-primary">
                Create →
              </button>
              <Link
                to="/login"
                className="text-sm text-blue-600 hover:underline"
              >
                Already have an account?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
