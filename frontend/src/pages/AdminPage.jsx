import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentsManagement from "../components/AppointmentsManagement";
import MasterManagement from "../components/MasterManagement";
import "../styles/AdminPage.css";

function AdminPage() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="admin-container">
      <h2>Administratoriaus valdymas</h2>
      {message && <p>{message}</p>}
      <AppointmentsManagement />
      <MasterManagement />
      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        Atsijungti
      </button>
    </div>
  );
}

export default AdminPage;
