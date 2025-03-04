import AppointmentsManagement from "../components/AppointmentsManagement";
import MasterManagement from "../components/MasterManagement";
import "../styles/AdminPage.css";

function AdminPage() {
  return (
    <div className="admin-container">
      <h2>Administratoriaus valdymas</h2>
      <AppointmentsManagement />
      <MasterManagement />
    </div>
  );
}

export default AdminPage;
