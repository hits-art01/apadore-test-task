import { type FC } from "react";
import "./footer-contacts.scss";

const FooterContacts: FC = () => {
  return (
    <div className="footer-contacts">
      <p>Nemáte rádi formuláře? Ozvěte se nám přímo.</p>
      <span>sales@daramis.com</span>
      <span>+420 800 226 223</span>
    </div>
  );
};

export default FooterContacts;
