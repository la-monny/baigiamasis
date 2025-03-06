import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/admin");
      } else {
        setMessage("Klaida: " + (data.error || "Nepavyko prisijungti"));
      }
    } catch (error) {
      setMessage("Serverio klaida");
    }
  };

  return (
    <div className="login-container">
      <h2>Prisijungimas</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Vartotojo vardas"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Slaptažodis"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Prisijungti</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
