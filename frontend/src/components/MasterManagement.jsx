import { useState, useEffect } from "react";

function MasterManagement() {
  const [masters, setMasters] = useState([]);
  const [newMaster, setNewMaster] = useState({ name: "", specialty: "" });
  const [message, setMessage] = useState("");

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
        fetchMasters();
        setNewMaster({ name: "", specialty: "" });
      } else {
        setMessage("Klaida pridedant meistrą");
      }
    } catch (error) {
      setMessage("Serverio klaida");
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
        fetchMasters();
      } else {
        setMessage("Klaida trinant meistrą");
      }
    } catch (error) {
      setMessage("Serverio klaida");
    }
  };

  return (
    <div className="admin-container">
      <h2>Meistrų valdymas</h2>
      {message && <p>{message}</p>}

      <form onSubmit={addMaster} className="form-container">
        <input
          type="text"
          name="name"
          placeholder="Vardas"
          value={newMaster.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="specialty"
          placeholder="Specialybė"
          value={newMaster.specialty}
          onChange={handleChange}
          required
        />
        <button type="submit">Pridėti meistrą</button>
      </form>

      <h3>Meistrų sąrašas</h3>
      <ul>
        {masters.length > 0 ? (
          masters.map((master) => (
            <li key={master._id}>
              {master.specialty} {master.name}
              <button onClick={() => deleteMaster(master._id)}>
                ❌ Ištrinti
              </button>
            </li>
          ))
        ) : (
          <p>Nėra meistrų</p>
        )}
      </ul>
    </div>
  );
}

export default MasterManagement;
