import { Link } from "react-router-dom";
import "../styles/LandingPage.css";

function LandingPage() {
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
        <h2>Mūsų paslaugos</h2>
        <div className="service-list">
          <div className="service">
            <img src="/images/haircut.jpg" alt="Kirpimas" />
            <h3>Kirpimas</h3>
            <p>Profesionalūs kirpėjai pasirūpins tavo šukuosena.</p>
          </div>
          <div className="service">
            <img src="/images/nails.jpg" alt="Manikiūras" />
            <h3>Manikiūras</h3>
            <p>Stilingi nagai kiekvienai progai.</p>
          </div>
        </div>
      </section>

      <section className="masters">
        <h2>Mūsų meistrai</h2>
        <div className="master-list">
          <div className="master">
            <img src="/images/master1.jpg" alt="Kirpėja Inga" />
            <h3>Kirpėja Erika</h3>
            <p>15 metų patirtis, modernūs ir klasikiniai kirpimai.</p>
          </div>
          <div className="master">
            <img src="/images/master2.jpg" alt="Nagų meistrė Erika" />
            <h3>Nagų meistrė Inga</h3>
            <p>Gelinis lakavimas, klasikinis manikiūras, nagų priauginimas.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
