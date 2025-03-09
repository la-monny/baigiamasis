import { useState, useEffect } from "react";
import "../styles/MasterManagement.css";

function MasterManagement() {
  const [masters, setMasters] = useState([]);
  const [newMaster, setNewMaster] = useState({ name: "", specialty: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  useEffect(() => {
    fetchMasters();
  }, []);

  const fetchMasters = async () => {
    try {
      const res = await fetch("http://localhost:5000/masters");
      const data = await res.json();
      setMasters(data);
    } catch (error) {
      setMessage("Nepavyko gauti meistrų");
      setMessageType("error");
    }
  };

  const handleChange = (e) => {
    setNewMaster({ ...newMaster, [e.target.name]: e.target.value });
  };

  const addMaster = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/masters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMaster),
      });

      if (res.ok) {
        setMessage("✅ Meistras pridėtas");
        setMessageType("success");
        fetchMasters();
        setNewMaster({ name: "", specialty: "" });
      } else {
        setMessage("Klaida pridedant meistrą");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Serverio klaida");
      setMessageType("error");
    }
  };

  const deleteMaster = async (id) => {
    if (!window.confirm("Ar tikrai norite ištrinti šį meistrą?")) return;

    try {
      const res = await fetch(`http://localhost:5000/masters/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMessage("✅ Meistras ištrintas");
        setMessageType("success");
        fetchMasters();
      } else {
        setMessage("Klaida trinant meistrą");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Serverio klaida");
      setMessageType("error");
    }
  };

  return (
    <div className="admin-section">
      <h2>Meistrų valdymas</h2>

      <form onSubmit={addMaster} className="master-form">
        <div className="form-group">
          <label htmlFor="name">Vardas</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Įveskite vardą"
            value={newMaster.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="specialty">Specialybė</label>
          <input
            type="text"
            id="specialty"
            name="specialty"
            placeholder="Įveskite specialybę"
            value={newMaster.specialty}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Pridėti meistrą</button>
      </form>

      {message && (
        <div
          className={`message ${
            messageType === "success" ? "success" : "error"
          }`}
        >
          {message}
        </div>
      )}

      <h3>Meistrų sąrašas</h3>
      {masters.length > 0 ? (
        <ul className="master-grid">
          {masters.map((master) => (
            <li key={master._id} className="master-card">
              <span className="master-info">
                {master.specialty} {master.name}
              </span>
              <button
                onClick={() => deleteMaster(master._id)}
                className="action-btn delete-btn"
              >
                ❌ Ištrinti
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-masters">Nėra meistrų</p>
      )}
    </div>
  );
}

export default MasterManagement;
