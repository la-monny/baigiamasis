import { useState, useEffect } from "react";
import "../styles/MasterManagement.css";

function MasterManagement() {
  const [masters, setMasters] = useState([]);
  const [newMaster, setNewMaster] = useState({
    name: "",
    specialty: "",
    description: "",
    photo: "",
  });
  const [photoPreview, setPhotoPreview] = useState(null);
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

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log(file.size);
      // failo dydis max 1MB
      if (file.size > 1024 * 1024) {
        setMessage("Nuotrauka per didelė! Maksimalus dydis 1MB");
        setMessageType("error");
        return;
      }

      const allowedTypes = ["image/jpeg", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        setMessage("Netinkamas failo formatas! Leidžiami tik .jpg ir .jpeg");
        setMessageType("error");
        return;
      }

      // konvertavimas į Base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64String = reader.result;
        setNewMaster({ ...newMaster, photo: base64String });
        setPhotoPreview(base64String);
      };
    }
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
        setNewMaster({ name: "", specialty: "", description: "", photo: "" });
        setPhotoPreview(null);
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
        <div className="form-group">
          <label htmlFor="description">Aprašymas</label>
          <textarea
            id="description"
            name="description"
            placeholder="Įveskite meistro aprašymą"
            value={newMaster.description}
            onChange={handleChange}
            rows={3}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="photo">Nuotrauka (max 1MB)</label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handlePhotoChange}
            className="file-input"
            required
          />
          {photoPreview && (
            <div className="photo-preview">
              <img src={photoPreview} alt="Peržiūra" />
            </div>
          )}
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
