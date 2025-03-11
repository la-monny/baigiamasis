import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/LandingPage.css";
import { useMaster } from "../components/MasterContext";

function LandingPage() {
  const { setSelectedMaster } = useMaster();
  const navigate = useNavigate();
  const [masters, setMasters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMasters();
  }, []);

  const fetchMasters = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/masters");
      const data = await response.json();
      setMasters(data);
      setLoading(false);
    } catch (error) {
      console.error("Klaida gaunant meistrus:", error);
      setLoading(false);
    }
  };

  const handleMasterSelect = (master) => {
    setSelectedMaster(master);
    navigate("/register");
  };

  return (
    <div className="landing-container">
      <header>
        <h1>BeautySalon</h1>
        <p>Grožio paslaugos tavo mieste!</p>
        <button onClick={() => handleMasterSelect("")} className="cta-button">
          Registruotis dabar
        </button>
      </header>

      <section className="services">
        <h2 className="section-title">Mūsų paslaugos</h2>
        <div className="service-list">
          <div className="service">
            <img
              src="https://magiohair.com/wp-content/uploads/2024/02/DIY-or-Salon-Pros-and-Cons-of-Ladies-Haircut.jpg"
              alt="Kirpimas"
            />
            <h3>Kirpimas bei dažymas</h3>
            <p>Profesionalūs kirpėjai pasirūpins tavo šukuosena.</p>
          </div>
          <div className="service">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDAuiGGGSoeh1_EjxaofMbf0uoHjOFkRICyQ&s"
              alt="Manikiūras"
            />
            <h3>Manikiūras</h3>
            <p>Stilingi nagai kiekvienai progai.</p>
          </div>
          <div className="service">
            <img
              src="https://fujispacenter.vn/wp-content/uploads/2024/07/massage_body_co_tac_dung_gi_nhung_luu_y_khi_thuc_hien_5_354cc25b70.jpg.webp"
              alt="Masažas"
            />
            <h3>Masažas</h3>
            <p>Atpalaiduojantis masažas kūnui ir sielai.</p>
          </div>
          <div className="service">
            <img
              src="https://img.freepik.com/premium-photo/cosmetologist-doing-face-treatment-applying-face-mask_1303-28043.jpg"
              alt="Kosmetologija"
            />
            <h3>Kosmetologija</h3>
            <p>Švytinti oda jūsų gražiausias papuošalas.</p>
          </div>
        </div>
      </section>

      <section className="masters">
        <h2 className="section-title">Mūsų meistrai</h2>
        {loading ? (
          <p>Kraunama...</p>
        ) : (
          <div className="master-list">
            {masters.length > 0 ? (
              masters.map((master) => (
                <div key={master._id} className="master">
                  <img
                    src={master.photo || "https://via.placeholder.com/180"}
                    alt={master.name}
                  />
                  <h3>
                    {master.specialty} {master.name}
                  </h3>
                  <p>{master.description}</p>
                  <button
                    onClick={() =>
                      handleMasterSelect(master.specialty + " " + master.name)
                    }
                    className="cta-button"
                  >
                    Registruotis
                  </button>
                </div>
              ))
            ) : (
              <p>
                Nėra meistrų. Prisijunkite kaip administratorius, kad
                pridėtumėte.
              </p>
            )}
          </div>
        )}
      </section>

      <footer>
        <p>&copy; 2025 BeautySalon. Visos teisės saugomos.</p>
        <p>Adresas: Vilniaus g. 123, Vilnius</p>
        <p>Tel: +370 600 00000</p>
      </footer>
    </div>
  );
}

export default LandingPage;
