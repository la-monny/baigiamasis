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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

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
          placeholder="Telefonas"
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
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
        <button type="submit">Registruotis</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default RegisterForm;
