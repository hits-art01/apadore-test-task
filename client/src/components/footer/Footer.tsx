import { type FC } from "react";
import "./footer.scss";
import FooterTitle from "../footer-title/FooterTitle";
import FooterMain from "../footer-main/FooterMain";
import FooterInfo from "../footer-info/FooterInfo";

const Footer: FC = () => {
  return (
    <footer>
      <FooterTitle />
      <FooterMain />
      <FooterInfo />
    </footer>
  );
};

export default Footer;
