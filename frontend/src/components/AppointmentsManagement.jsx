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
    try {
      const res = await fetch("http://localhost:5000/appointments");
      const data = await res.json();
      setAppointments(data);
      setFilteredAppointments(data);
    } catch (error) {
      setMessage("Nepavyko gauti registracijų");
    }
  };

  const fetchMasters = async () => {
    try {
      const res = await fetch("http://localhost:5000/masters");
      const data = await res.json();
      setMasters(data);
    } catch (error) {
      setMessage("Nepavyko gauti meistrų");
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
    if (!window.confirm("Ar tikrai norite atšaukti šią registraciją?")) return;

    try {
      const res = await fetch(`http://localhost:5000/appointments/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMessage("✅ Registracija atšaukta");
        fetchAppointments();
      } else {
        setMessage("Klaida trinant registraciją");
      }
    } catch (error) {
      setMessage("Serverio klaida");
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
