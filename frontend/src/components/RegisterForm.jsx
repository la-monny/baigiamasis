import { useState } from "react";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    master: "",
    date: "",
    time: "",
  });

  const [message, setMessage] = useState("");
  const generateTimeOptions = () => {
    const times = [];
    for (let h = 8; h < 19; h++) {
      // Darbo laikas nuo 08:00 iki 20:00
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

    const phoneRegex = /^\+370\d{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      setMessage(
        "Įveskite teisingą lietuvišką telefono numerį (pvz., +37060000000)"
      );
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
        setFormData({ name: "", phone: "", master: "", date: "", time: "" });
      } else {
        setMessage("Klaida: " + (data.error || "Nepavyko užregistruoti"));
      }
    } catch (error) {
      setMessage("Serverio klaida");
    }
  };

  return (
    <div>
      <h2>Registracija pas meistrą</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Vardas"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Tel. nr. +370..."
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="master"
          placeholder="Meistro vardas"
          value={formData.master}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <select
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        >
          {generateTimeOptions().map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>

        <button type="submit">Registruotis</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default RegisterForm;
