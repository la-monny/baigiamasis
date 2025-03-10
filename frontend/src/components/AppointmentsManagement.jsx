import { useState, useEffect } from "react";
import "../styles/AppointmentsManagement.css";

function AppointmentsManagement() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [masters, setMasters] = useState([]);
  const [selectedMaster, setSelectedMaster] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [message, setMessage] = useState("");
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [editData, setEditData] = useState({});

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

  const startEditing = (appointment) => {
    setEditingAppointment(appointment._id);
    setEditData(appointment);
  };

  const cancelEditing = () => {
    setEditingAppointment(null);
    setEditData({});
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/appointments/${editingAppointment}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editData),
        }
      );

      if (res.ok) {
        setMessage("✅ Registracija atnaujinta");
        fetchAppointments();
        cancelEditing();
      } else {
        setMessage("Klaida atnaujinant registraciją");
      }
    } catch (error) {
      setMessage("Serverio klaida");
    }
  };
  // pridėta kad laikas kas pusvalandį
  const generateTimeOptions = () => {
    const times = [];
    for (let h = 8; h < 19; h++) {
      // Darbo laikas nuo 08:00 iki 19:00
      times.push(`${String(h).padStart(2, "0")}:00`);
      times.push(`${String(h).padStart(2, "0")}:30`);
    }
    return times;
  };

  return (
    <div className="appointments-section">
      <h2>Registracijų valdymas</h2>
      {message && <div className="appointments-message">{message}</div>}

      {/* Filtrai */}
      <div className="filter-container">
        <div className="select-container">
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
        </div>
        <button className="filter-button" onClick={filterAppointments}>
          Filtruoti
        </button>
      </div>

      <table className="appointment-table">
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
              <tr
                key={apt._id}
                className={editingAppointment === apt._id ? "editing" : ""}
              >
                {editingAppointment === apt._id ? (
                  <>
                    <td data-label="Vardas">
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td data-label="Telefonas">
                      <input
                        type="tel"
                        name="phone"
                        value={editData.phone}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td data-label="Meistras">
                      <input
                        type="text"
                        name="master"
                        value={editData.master}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td data-label="Data">
                      <input
                        type="date"
                        name="date"
                        value={editData.date}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td data-label="Laikas">
                      <select
                        name="time"
                        value={editData.time}
                        onChange={handleEditChange}
                      >
                        <option value="">-- Pasirinkite --</option>
                        {generateTimeOptions().map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <div className="button-container">
                        <button onClick={saveEdit}>💾 </button>
                        <button onClick={cancelEditing}>❌ </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td data-label="Vardas">{apt.name}</td>
                    <td data-label="Telefonas">{apt.phone}</td>
                    <td data-label="Meistras">{apt.master}</td>
                    <td data-label="Data">{apt.date}</td>
                    <td data-label="Laikas">{apt.time}</td>
                    <td>
                      <div className="button-container">
                        <button onClick={() => startEditing(apt)}>✏️</button>
                        <button onClick={() => deleteAppointment(apt._id)}>
                          ❌
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-appointments">
                Nėra registracijų
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentsManagement;
