import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentsManagement from "../components/AppointmentsManagement";
import MasterManagement from "../components/MasterManagement";
import "../styles/AdminPage.css";

function AdminPage() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setMessage("Sėkmingai atsijungėte");
    setMessageType("success");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="container">
      <div className="admin-container">
        <h1>Administratoriaus valdymas</h1>
        {message && (
          <div
            className={`message ${
              messageType === "success" ? "success" : "error"
            }`}
          >
            {message}
          </div>
        )}

        <AppointmentsManagement />

        <MasterManagement />

        <div className="logout-section">
          <button onClick={handleLogout} className="secondary">
            Atsijungti
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
