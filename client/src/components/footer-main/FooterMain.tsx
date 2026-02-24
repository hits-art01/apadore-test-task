import React, { type FC } from "react";
import "./footer-main.scss";
import FooterForm from "./footer-form/FooterForm";
import FooterContacts from "./footer-contacts/FooterContacts";

const FooterMain: FC = () => {
  return (
    <div className="footer-main">
      <FooterForm />
      <FooterContacts />
    </div>
  );
};

export default FooterMain;
