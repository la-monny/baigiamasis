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
        <h2 className="section-title">Mūsų paslaugos</h2>
        <div className="service-list">
          <div className="service">
            <img
              src="https://magiohair.com/wp-content/uploads/2024/02/DIY-or-Salon-Pros-and-Cons-of-Ladies-Haircut.jpg"
              alt="Kirpimas"
            />
            <h3>Kirpimas bei dažymas</h3>
            <p>Profesionalūs kirpėjai pasirūpins tavo šukuosena.</p>
            <Link to="/register" className="cta-button">
              Registruotis
            </Link>
          </div>
          <div className="service">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDAuiGGGSoeh1_EjxaofMbf0uoHjOFkRICyQ&s"
              alt="Manikiūras"
            />
            <h3>Manikiūras</h3>
            <p>Stilingi nagai kiekvienai progai.</p>
            <Link to="/register" className="cta-button">
              Registruotis
            </Link>
          </div>
          <div className="service">
            <img
              src="https://fujispacenter.vn/wp-content/uploads/2024/07/massage_body_co_tac_dung_gi_nhung_luu_y_khi_thuc_hien_5_354cc25b70.jpg.webp"
              alt="Masažas"
            />
            <h3>Masažas</h3>
            <p>Atpalaiduojantis masažas kūnui ir sielai.</p>
            <Link to="/register" className="cta-button">
              Registruotis
            </Link>
          </div>
          <div className="service">
            <img
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEhUQEBAPFRAVFRAQFQ8QDxUQDw8PFRUWFhURFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQGisdHx0tLSstLSstLS0rLS0tLS0tLS0tLS0tLS0rKy0tLSstLS0tLS0tLSstLS0tLS0tLS0tN//AABEIALcBEwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAABAAIDBAUGB//EADwQAAIBAgQEAwUFBgYDAAAAAAABAgMRBBIhMQVBUWEicYEGEzKRsUJSocHRFCNicoLwByRDU2OSFTPh/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAJBEAAwEAAgIBBAMBAAAAAAAAAAECEQMSITFBBBNRYRQiMnH/2gAMAwEAAhEDEQA/AO/Q5AQ5FGQUOAggARCEBQRCCIBBAIACIAgAIgCEMIBAAAMaxzA0AYW8BhL+N+i/MvzFg5JwXlYVUpBmDamxVovxP0JZz0K+EerAC3EMkKA6YARjHoySw2UQAbKVjl8Xh3CrNW0bzr+rV/jc6loy+NUtIzXJ2fkzPlnZNeGsr/plZRZR+Y1uG4D7c1ryi+XdmES6Z03alaM4bgLeOa8XJfd7+ZppBsKR1zKlHFVOnrBJ22GJBA2USIQM4gAy0OQEORJIQgQQGEIAiGII6lTcnaKuwVKco6NNPugAaEAhAEQBAMNxXAIAEIQhN4NLRD6cB9OAZuxhd6dMcfX2S0a+Ty5/qWJ1Fa6ehlVqpXjjJQ21X3WVF54ZN8e+UaNeoh2AktTKqY+D52fRkfCsUvfKN/iUufqbKkYtNHRjhQHWKJI2gD3EFgAMY3RV4tFKjNvkr/IuQZFioKcJRezVrA1qGnj0yeF8PvapNabxj+bNhIfCOiGTkkEypWBVOnrBJjBXDYeiGsY0S5RZBiIsgibKIAMZDkNQUSIcECChDCEAQARYp4ya0dpLpJXK4hAW06Mt7wfziCeBlvG0l1i9fkVR0JtapteQDBJNaNWfR7klKg3rsixDHX0qRjJbXa1RccIteF27CbKS/JVpYeKeqb7vYmlFNcinlqRbVrx7MZi8fGEfE7OzWumtn+jZGmvTPRLkinqgzw6fw7nNcP4772TtGainpKStdbXtyvv6nSYSbaEspYOk4elSrmWq5chRrZkS1nZtFKStLTZ/U52sN1WjaiKleVizXqGbPNUeWO3N8kWkS3hnY6tfYm9kqf8AmE7a2k79F/bH4vglbenCc12i9S97K4CrTqSlVpTh4Ulmi0nrrZ+hSl9kZ1acs66GhJcrOQ+DOo5iRzQzOh+RBVNABGpIKj8iWKXQjqzsn5MaAErvbYEaSHU53QnEADlQdCJwY1piAm0GuaInca4DAk98glfIIAwzEOQ1DkIlDkECCIYRCEIAiEAACIAgGQY5Ty3huum9iPDcYlHSafmXDM4qpJprWLVrJXafUztfJtx38GpHjUe9iapOjiIOnUgpQaaakn803s+6OJ/b8r0qxtzi8qt6PVD1xt28M1b+H/4ZLkw6Hxb6N6lw/BU5xjSqNt33qX8S+zd+G+j0unoa9NJaJ6vZS8Mmutnuu5xnDoe9q5mtdLu1m15nSwwbjDSXh3dOolUpP+l7ea1Lh78GXLOe3o7ESbk/MOIjSppPEVoU77RbWeT6JdSHMo5ZU/eQk7uzkpwau7ON7v6GfGSp1JVcilUlvOV5Ta+6nyXZaHJy/V8fHXVo6OL6e7nUa1KvgV8TqP8Aiq0qkYfNxSsa+CqUZRvRlTcf+Nxy/gUrabFHEcLpyedJxqf7tNunU/7R38nodE8ufBlXCn8nRtAZj4LiFSm1DENSjtGullflUS0T/iWnZc9g6JpUvBzXDl4yOdFPsynOTi8r0f1XUvMq8SwvvYNKWWa1hP7s+V+q5NdCiBQqMnjIwuD8Q97mhJZK9N5KlN/Zkua6xe6ZbrVpRtyjeMW+eaTSS/FfMaaa0H4NNSGyRUVV9A+88/S36DEWnTtqgqRU/bHe2vqk/wAxyxOtmugii3cDRFGY4BDZDXIe0MYAMbENcwjAy0OQxDkSIchwxDrgAQgCIBCEABhuIFwXAB1wS8rguDMIaeGLxHGRTbnFxtu20kl6ozI4z3r/AHNKUl/uTeWml8lf0Oj4r7POpaooRlLnB6eT10YcL7P1Jr941BfdSvK30Od8dbiO2eaOutmfwGi3Pdtx1lKPhgv4UaPtHXaouMYylKTSyQkoSkt2sz2Wm5sUsJCnFQgkor5t9X1ZhcV8VaNNPSKzS85PRP0X4mjXSDFV93k/RzsPaCU6kaWJhLDZrRi080VbaNzrsFwrVSlUU0tU8tm+l7PUyfaDg9OrT13Vnpun1TNbgkmqUbu9ktepyVE0/wCy07FVSv6s1JRI5FetxSlHSckvMnp1IzWaEoyXWLTRr79GXleyOsk1qhcKxVn7mT5Xg3vlW8PTl28htYz6+6kn4otST7rl5PVeTFN9Xo6jtOHTNjHIjpV1OKnHaST8u3mNlI7NOHCpPAwVZ4laTdP3UlZWmk7xfXNy7+iKFatJpJJt+Gbstb5lIu46p4JWdu/QgpVW6d009ltezIf4NJ9aGcK8rZFJLT4lyNL3Hn/1aMtYmUJLwrXeXi/U1YYttb/kNV7FU+lgyTS6FLE4xQnFPZ7tcmtdS1iK91bV9r/mVsVhM0c2mazut00/zCm2ghJMfQxad2n+hcjU5nKOM437J7ttuXJW5eRo4DiKcd+q80tLiVjqPwbWcZO5UhiUyVVGuehaojqMchBnTu7iHpJQQ5DEOQEjwoahyEAQgFcBiFcDY1sAC2Bsa2MchAPcjU4fg/tyWvJdCLh2Cvac/RfmarKSE2JDZsNxrGSU8bXyqy+J7du7OD4p7MYh1niMNWnCpLWSzZ4SfeMvorI7Gs802+9l5ImjHkrebOS7bo7+LjUz+zluFcP4hmtXnRlB6NpShOPfmn5aG5iqsaVPJHkh2Mxihot3pcq0KLm9dUZN6bpfLOexXDZYm6eZX53s7A4f7O4rDPNh6rXNxk9JLvyZcx/Go4TEOniFlpOzhXs8neM+j7mr/wCXjNKUJRlB7Sg1JP1Q+uB230RQ4w3L3VaOSrbT7s/IhxFa+zFxOMK8cr0mtYT5xfIzqcpfa35ro+ZnZcnS+zmIvTlD7k2t+UvF9W/kX6stDE9mH4qy7UZfPOvyNqotDt4nsI8/lWWw0oxtdq7d9N15FKrO0lFOK1bcbJZlZ2V0tNbfiQYjEzhtt0exk8Q41hY1IUqsvd1Jpyi5O1N2aVnLZPXnYdfoUZ6Z1FCcm/hppfxXevoWaso5W6cablyjKUqcW+7yu3yMPDV2rb+fJ/qalPEJ6Na9iVZdcf4Em3rKNOLvtCbn63cV8rDMXiLRduSJJyWiXczeIVY2dnv+XP6iqtKiUmZdXGNxlb4knovWxXwcLRWj0Vl3e7/T0JVRzTvHtf8AHQmrVlHRXlLnlV0hT5C3jxEtObS132sX8PXvaPPYoYSlmeaacYR1vLS7MzEcalnlGgoxgrpVHrUl3T5LyG318smV28HTvGQj4Xut7degjloYzQRn91mn2UbyHojQ9HWcQ9MIxDhAOBcFwNgMTYGwNjJSABSkXuG4LN45bcl17kXDsHneZ/D9TdjG2g0hNhQ1vUVxqGSPbIq08sXLomx0mVOKztC3VpfmKni0qVrSKWHehj8a4lUpOcrPJpltu9NURcQ4pWpSaVJ+7Si/epZ997paq35k2G4rQrKMaiT5qStlb5eRw4etMPNwy+GcThio+8UneDyyjJZZwktbSXLdHW8HV45upjV+AqU3OnJQzWUkop3S219WdBhaShFRWySQpWMVtNDOK8LpV4uFSKaatqrnFU/8PVRnnoVqsI84Rl4X2aZ3splepiC3RnKMBcPlBK7u1zIKlPmbOJrXMyszJo1TLns18Vb+Wj9ahrTZzvsfi/eVMUk9Ie4h6/vG/qjoZnXxLIRwcz22Z2Mjc8t9v55sdTo8lShfzlOV/wAEvmer11/fY8chUeN4jVrRu6ebLF8skfDF+qV/Udfgmfyet8HyypwVklFRS02SWhPiU0tJW7x3/Uq8Kp5YpFjENl4mZqmvRXlVt9t+Wt35u393KlVJ6ym3/CtbLotCaVPqNjh7kdUafcoqTpynom4r7sW183zJsJgZR2t8tTVwmCNKnh10LUmbo5biPCq9WOX3s1zSVlF9mktV2Oaqxq0Ze7rJX+zUirRl+j7HqnuUZfGuFQqwcWteT6MVcSoc8rlnA+8fURclwiSdvFppyEY/Yo6P5MnUoeiNMcmdJyj7huMuG4gHXA2C4GwGCTJsFhHUf8K3fXsR4ag5yyr1fRHQ0aSirJaDSJbHUoJKy2Q4QGxiGNhiNHPYYDTM41L4P6n9DUsZvGl8D/mX0M+X/LNOH/aOdxNepTqZ0rwaV47+qM/H0cNPx081Gq9XZfu5PneP6HQys1Zop1cJB8l8jj7YevHJhk8P9pPdSjQxLSbajCrfwT5KN+T8zr4V9jKw+GorR04P+aKf1JqtXoS2RWN+C3WxNinVxRUq1GVZzFo+paq4koV8SNk2yhxbG0KEU69RRzXST1lLrZLVgBqf4c0/Biqn38RZO2rUacPzbOtZhewkY/sVOcItRqSqVUn8WWU5ZW+9rF7jWP8AdRtBZqr0jHl/NLsjtjxKPN5X/ZnO+3fFZQp/s1F/v614K29Ok9J1H06Lu+xX9lPZ6FGEUlrpd82y5w3g+abq1fFUk7ylL6Lol0OloYdLkNLXpm68YKlSsgVIFpQG+6ZeEJlJUSzRw5YjSJ4RBINGQp2JUgpBsMBEVUkYxjBlGVJdF8kInlHXYQxYYqY5Miix6ZBZJcNxiDcQBuGnBydluMvfYs4bFumv/Wm+bzWf0IfJK9s0XFbXhGzhMMoKy9X1ZOZVHjtN6TjOL62zL8DQoYiE1eEk/J7ehorl+mZ1FT7RJIDDMTKJI4jmCCCuoAFFPitDPTeqTj4k3tdcvUuWMrjGJ/01/V59DPkaUvTXiTdLDFpYtbPR9yR1F2MriiktYmd+2y53X4o85s9SVqOglWXUY6y6mD+1SfMPvpvmidL6mrVrorurfYiowv8AE/kXaMEvhXq9y0Q/BBWrxpK7+J8rXt3ZLTwdKpHNONOsnqs0VUV+WUrY/CxqXg6qinpJqX73LzjG2qv1LfB8HQoRUcLRjBffa8T72692bTxtnPXOp/Z0EJwoU4U1l8MYxUI9l05Io06TqTc5bv8ADshUMLd3e71vzb6mvhsPY6kjgqhtDDWLUaY+ESSxZJDlHKBIkFIAGKI9RCkGwACwrDgMYDGMZIxjDAG2EIQCOZix6ZCmPTJLJExrnd2+YyrUsr/3cbhU93z1MOa8WI34Y16zUw0ETzpor0WWYSOdHSyrPCkf7O080W01zW5pxI6kkPELWPw/E9MtXR/eXwvz6GhCakrxaa6p3Rz9Wd3ZIrxThK2qvzTsbTzNe/JlX06fleDqUtAowo4qa+3L53+oHj6vKT+S/Qv78mf8evybGMr5I357JdzCcL7/AD7kynKWs221oSQhcx5L7s34o6IoV8MrbGNisBrodROkVqtC5i503msOWWBfcmjgTd/ZkiOqkuRHU07aUKWGSMD229o1haapUn/mat1H/jjs6j/Lv5G/i8SoRlOTtGKcm3ySV2ePurLF4mVepfxtZYv7NPTLH++dy4XyZ2/g9E9kMA/dxb3au77tvd36nY4PClb2ZwtqUV0SNyFOx3QvB5tvyGhRLcYjaSJUjQzEkINxAAkGwGg2AApBAhwDANY5jWMQ1jGSMYxgMuIQgEcmmOTIVIjxFayst3+C6mVNJazSZdPEOc80uy/F9S5SdilhoPZJt9Ers0MPwrESt4cses3b8Nzifa3qR3rrCzSxCoTxqD4cHnFaSi36/oQYjD1IfFF26rVfMb46XtCVzXpj5YggnO+7I7iJLSDGVncsTipruVrEkGPSsG6rRk1NadwSae5HhKniyr59g0Ovgv5LIMSRvQZflzKIHIjqMkehVndiYIiqzKVeZPUKmKM2ao4//EHFuOGcY/6k6dL+lvxfgmZnsvwCVWpGVrQgoX6t2WiN32m4VKvGEIrxe9py125p/U7jgPD406SiltbXr3N+GOxzc99XhZ4Xh8qsW7asfSjZsFtWdmYcLH0yVEcR6YCCkBhAwAKCmNSCAD0ICYrjATAJsAAIawgABlgjrCEBw+cv4H2fqTfvKrUU9VFPNK3JdEERDlV4ZrNOfKOlwuGhTWWCS7835snQhFpYQ3oUwhEAFHE8Lpz1j4ZdVs/NGTicJKm7St2aejEIw5onNOjh5K3CKwUERyHahs1cgpwlF3VrBEJlIsPES7DoYq3L15iEGsMRYpYhMMpXEItMzaKs4ladMQiWUiCvQ0utGrNPo0bvCK6nBPmtGukkIRr9M32aMPqkuqZoQ3GPcQjuZwMeh4hCEJMQhDAMRCECALAmIQxAbBcQgAFxXEIAFcQhAM//2Q=="
              alt="Kosmetologija"
            />
            <h3>Kosmetologija</h3>
            <p>Švytinti oda jūsų gražiausias papuošalas.</p>
            <Link to="/register" className="cta-button">
              Registruotis
            </Link>
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
          </div>
          <div className="master">
            <img
              src="https://katnails.com/wp-content/uploads/2022/11/315294910_466698632111730_7805813316137842941_n-1024x819.jpg"
              alt="Nagų meistrė Inga"
            />
            <h3>Nagų meistrė Inga</h3>
            <p>Gelinis lakavimas, klasikinis manikiūras, nagų priauginimas.</p>
          </div>
          <div className="master">
            <img
              src="https://www.amtamassage.org/globalassets/images/publications-and-research/consumer-views/massage-medical.jpg"
              alt="Masažistas Tomas"
            />
            <h3>Masažistas Tomas</h3>
            <p>
              Patirtis masažo srityje ir individuali prieiga prie kiekvieno
              kliento.
            </p>
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
