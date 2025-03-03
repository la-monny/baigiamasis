import { useState, useEffect } from "react";

function AdminPage() {
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");
  const [editingAppointment, setEditingAppointment] = useState(null); // redagavimas
  const [editData, setEditData] = useState({}); // redagavimo forma

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await fetch("http://localhost:5000/appointments");
      const data = await res.json();
      setAppointments(data);
    } catch (error) {
      setMessage("Nepavyko gauti duomenų");
    }
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

  return (
    <div>
      <h2>Administratoriaus valdymas</h2>
      {message && <p>{message}</p>}
      <table border="1">
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
          {appointments.length > 0 ? (
            appointments.map((apt) => (
              <tr key={apt._id}>
                {editingAppointment === apt._id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="tel"
                        name="phone"
                        value={editData.phone}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="master"
                        value={editData.master}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        name="date"
                        value={editData.date}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        name="time"
                        value={editData.time}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <button onClick={saveEdit}>💾 Išsaugoti</button>
                      <button onClick={cancelEditing}>❌ Atšaukti</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{apt.name}</td>
                    <td>{apt.phone}</td>
                    <td>{apt.master}</td>
                    <td>{apt.date}</td>
                    <td>{apt.time}</td>
                    <td>
                      <button onClick={() => startEditing(apt)}>
                        ✏️ Redaguoti
                      </button>
                      <button onClick={() => deleteAppointment(apt._id)}>
                        ❌ Atšaukti
                      </button>
                    </td>
                  </>
                )}
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

export default AdminPage;
