import { Link, useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";
import { useMaster } from "../components/MasterContext";

function LandingPage() {
  const { setSelectedMaster } = useMaster();
  const navigate = useNavigate();

  const handleMasterSelect = (master) => {
    setSelectedMaster(master);
    navigate("/register");
  };

  return (
    <div className="landing-container">
      <header>
        <h1>BeautySalon</h1>
        <p>Grožio paslaugos tavo mieste!</p>
        <Link to="/register" className="cta-button">
          Registruotis dabar
        </Link>
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
        <div className="master-list">
          <div className="master">
            <img
              src="https://media.skilldeer.com/550x450/a8a6e6f6d79b7060f3926bebea88e8c100751ed4.png"
              alt="Kirpėja Erika"
            />
            <h3>Kirpėja Erika</h3>
            <p>
              15 metų patirtis, modernūs ir klasikiniai kirpimai bei dažymai.
            </p>
            <button
              onClick={() => handleMasterSelect("Kirpėja Erika")}
              className="cta-button"
            >
              Registruotis
            </button>
          </div>
          <div className="master">
            <img
              src="https://katnails.com/wp-content/uploads/2022/11/315294910_466698632111730_7805813316137842941_n-1024x819.jpg"
              alt="Nagų meistrė Inga"
            />
            <h3>Manikiūristė Inga</h3>
            <p>Gelinis lakavimas, klasikinis manikiūras, nagų priauginimas.</p>
            <button
              onClick={() => handleMasterSelect("Manikiūristė Inga")}
              className="cta-button"
            >
              Registruotis
            </button>
          </div>
          <div className="master">
            <img
              src="https://www.amtamassage.org/globalassets/images/publications-and-research/consumer-views/massage-medical.jpg"
              alt="Masažistas Tomas"
            />
            <h3>Masažuotojas Tomas</h3>
            <p>
              Patirtis masažo srityje ir individuali prieiga prie kiekvieno
              kliento.
            </p>
            <button
              onClick={() => handleMasterSelect("Masažuotojas Tomas")}
              className="cta-button"
            >
              Registruotis
            </button>
          </div>
          <div className="master">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv19s4z5ozPnkGVAzVDFtPQIal1G4oSXVcAQ&s"
              alt="Kosmetologė Lina"
            />
            <h3>Kosmetologė Lina</h3>
            <p>
              Veido valymai bei įvairios pagal jūsų odą pritaikytos procedūros.
            </p>
            <button
              onClick={() => handleMasterSelect("Kosmetologė Lina")}
              className="cta-button"
            >
              Registruotis
            </button>
          </div>
        </div>
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
