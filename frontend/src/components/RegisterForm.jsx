import { useState, useEffect } from "react";
import { useMaster } from "./MasterContext";
import "../styles/RegisterForm.css";

function RegisterForm() {
  const { selectedMaster } = useMaster();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    master: "",
    date: "",
    time: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [masters, setMasters] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/masters")
      .then((res) => res.json())
      .then((data) => setMasters(data))
      .catch((err) => console.error("Nepavyko gauti meistrų:", err));
  }, []);

  useEffect(() => {
    if (selectedMaster && masters.length > 0) {
      const foundMaster = masters.find((m) => {
        const fullName = `${m.specialty} ${m.name}`;
        return fullName.includes(selectedMaster);
      });

      if (foundMaster) {
        const fullMasterName = `${foundMaster.specialty} ${foundMaster.name}`;
        setFormData((prev) => ({
          ...prev,
          master: fullMasterName,
        }));
      }
    }
  }, [selectedMaster, masters]);

  const generateTimeOptions = () => {
    const times = [];
    for (let h = 8; h < 19; h++) {
      // Darbo laikas nuo 08:00 iki 19:00
      times.push(`${String(h).padStart(2, "0")}:00`);
      times.push(`${String(h).padStart(2, "0")}:30`);
    }
    return times;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    const phoneRegex = /^\+370\d{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      setMessage(
        "Įveskite teisingą lietuvišką telefono numerį (pvz., +37060000000)"
      );
      setMessageType("error");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Registracija sėkminga!");
        setMessageType("success");
        setFormData({ name: "", phone: "", master: "", date: "", time: "" });
      } else {
        setMessage("Klaida: " + (data.error || "Nepavyko užregistruoti"));
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Serverio klaida");
      setMessageType("error");
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  return (
    <div className="register-container">
      <h2>Registracija pas meistrą</h2>

      {message && (
        <div
          className={`message ${
            messageType === "success" ? "success-message" : "error-message"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="name">Jūsų vardas</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Įveskite savo vardą"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Telefono numeris</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder="+3706..."
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="master">Pasirinkite meistrą</label>
          <select
            id="master"
            name="master"
            value={formData.master}
            onChange={handleChange}
            required
          >
            <option value="">-- Pasirinkite --</option>
            {masters.map((master) => (
              <option
                key={master._id}
                value={`${master.specialty} ${master.name}`}
              >
                {master.specialty} {master.name}
              </option>
            ))}
          </select>
        </div>

        <div className="time-date-container">
          <div className="form-group">
            <label htmlFor="date">Pasirinkite datą</label>
            <input
              id="date"
              type="date"
              name="date"
              value={formData.date}
              min={getTomorrowDate()}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Pasirinkite laiką</label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            >
              <option value="">-- Pasirinkite --</option>
              {generateTimeOptions().map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="register-btn">
          Registruotis
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
