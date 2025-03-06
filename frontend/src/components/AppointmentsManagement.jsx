import { useState, useEffect } from "react";
import "../styles/AppointmentsManagement.css";

function AppointmentsManagement() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [masters, setMasters] = useState([]);
  const [selectedMaster, setSelectedMaster] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAppointments();
    fetchMasters();
  }, []);

  const fetchAppointments = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("JWT klaida: Tokenas nerastas!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/appointments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP klaida: ${res.status}`);
      }

      const data = await res.json();
      setAppointments(data);
      setFilteredAppointments(data);
    } catch (error) {
      console.error("Nepavyko gauti registracijų:", error);
      setAppointments([]);
      setFilteredAppointments([]);
    }
  };

  const fetchMasters = async () => {
    try {
      const res = await fetch("http://localhost:5000/masters");
      const data = await res.json();

      if (Array.isArray(data)) {
        setMasters(data);
      } else {
        console.error("Klaida: `masters` API grąžino ne masyvą!", data);
        setMasters([]);
      }
    } catch (error) {
      console.error("Nepavyko gauti meistrų:", error);
      setMasters([]);
    }
  };

  const filterAppointments = () => {
    let filtered = appointments;
    if (selectedMaster) {
      filtered = filtered.filter((apt) => apt.master === selectedMaster);
    }
    if (selectedDate) {
      filtered = filtered.filter((apt) => apt.date === selectedDate);
    }
    setFilteredAppointments(filtered);
  };

  const deleteAppointment = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("JWT klaida: Tokenas nerastas!");
      return;
    }

    if (!window.confirm("Ar tikrai norite atšaukti šią registraciją?")) return;

    try {
      const res = await fetch(`http://localhost:5000/appointments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setMessage("✅ Registracija atšaukta");
        fetchAppointments();
      } else {
        throw new Error(`HTTP klaida: ${res.status}`);
      }
    } catch (error) {
      console.error("Nepavyko atšaukti registracijos:", error);
    }
  };

  return (
    <div className="admin-container">
      <h2>Registracijų valdymas</h2>
      {message && <p>{message}</p>}

      {/* Filtrai */}
      <div>
        <select
          onChange={(e) => setSelectedMaster(e.target.value)}
          value={selectedMaster}
        >
          <option value="">Pasirinkite meistrą</option>
          {masters.map((master) => (
            <option
              key={master._id}
              value={`${master.specialty} ${master.name}`}
            >
              {master.specialty} {master.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          onChange={(e) => setSelectedDate(e.target.value)}
          value={selectedDate}
        />
        <button onClick={filterAppointments}>Filtruoti</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Vardas</th>
            <th>Telefonas</th>
            <th>Meistras</th>
            <th>Data</th>
            <th>Laikas</th>
            <th>Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((apt) => (
              <tr key={apt._id}>
                <td>{apt.name}</td>
                <td>{apt.phone}</td>
                <td>{apt.master}</td>
                <td>{apt.date}</td>
                <td>{apt.time}</td>
                <td>
                  <button onClick={() => deleteAppointment(apt._id)}>
                    ❌ Atšaukti
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Nėra registracijų</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentsManagement;
