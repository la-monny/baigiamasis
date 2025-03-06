import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">BeautySalon</div>
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setMenuOpen(false)}
        >
          Apie mus
        </NavLink>
        <NavLink
          to="/register"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setMenuOpen(false)}
        >
          Registracija
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setMenuOpen(false)}
        >
          Administravimas
        </NavLink>
      </div>
      <div className="burger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
    </nav>
  );
}

export default Navbar;
