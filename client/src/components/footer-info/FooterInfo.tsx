import React from "react";
import "./footer-info.scss";
import logo from "../../assets/logo.svg";
import FooterDisclaimer from "./footer-desclaimer/FooterDisclaimer";

const FooterInfo = () => {
  return (
    <>
      <div className="footer-info">
        <div className="footer-info__logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="footer-info__details">
          <div className="footer-info__kontakt">
            <h4>Kontakt</h4>
            <h5>E-MAIL</h5>
            <span>sales@daramis.com</span>
            <h5>TELEFON</h5>
            <span>+420 800 226 223</span>
          </div>
          <div className="footer-info__lokalita">
            <h4>Lokalita</h4>
            <h5>KLIENTSKÉ CENTRUM</h5>
            <span>
              Jankovcova 1595/14 <br /> 17000, Praha 7
            </span>
          </div>
        </div>
      </div>
      <FooterDisclaimer />
    </>
  );
};

export default FooterInfo;
