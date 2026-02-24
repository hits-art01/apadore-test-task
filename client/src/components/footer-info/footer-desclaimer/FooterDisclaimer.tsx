import "./footer-disclaimer.scss";
import devlogo from "../../../assets/devlogo.svg";

const FooterDisclaimer = () => {
  return (
    <div className="footer-disclaimer">
      <div className="footer-disclaimer__info">
        <div className="developer-info">
          <div className="developer-title-wrapper">
            <p className="developer-subtitle">DEVELOPER PROJEKTU</p>
            <img src={devlogo} alt="logo" />
          </div>

          <p className="disclaimer-text">
            UVEŘEJNĚNÉ VIZUALIZACE A JINÁ VYOBRAZENÍ NA WEBOVÝCH STRÁNKÁCH A
            DALŠÍCH MATERIÁLECH JSOU POUZE ILUSTRAČNÍ. MOHou SE MĚNIT, JSOU
            NEZÁVAZNÉ A NEPŘEDSTAVUJÍ NABÍDKU ANI NÁVRH NA UZAVŘENÍ SMLOUVY.
          </p>

          <div className="bottom-line">
            <p className="copyright">
              © 2025 PARK LIVING, S.R.O. VŠECHNA PRÁVA VYHRÁZENA
            </p>
          </div>
        </div>
        <div className="links">
          <a href="#" className="link">
            GDPR
          </a>
          <span className="made-by">MADE BY APADORE</span>
        </div>
      </div>
    </div>
  );
};

export default FooterDisclaimer;
