import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    // Periodiškai tikrinti, ar vartotojas prisijungęs
    const interval = setInterval(checkLoginStatus, 5000);

    return () => clearInterval(interval);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">BeautySalon</div>
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={closeMenu}
        >
          Pradžia
        </NavLink>
        <NavLink
          to="/register"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={closeMenu}
        >
          Registracija
        </NavLink>
        {isLoggedIn ? (
          <NavLink
            to="/admin"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            Administravimas
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            Prisijungimas
          </NavLink>
        )}
      </div>
      <div className="burger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
    </nav>
  );
}

export default Navbar;
