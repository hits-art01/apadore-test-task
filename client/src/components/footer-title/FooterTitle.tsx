import { type FC } from "react";
import "./footer-title.scss";

const FooterTitle: FC = () => {
  return (
    <div className="footer-title">
      <h1 className="footer-title__main">Nepropásněte</h1>
      <section className="footer-title__sub">
        <div className="footer-title__dotaz">
          <p>
            Máte otázky nebo si chcete domluvit osobní setkání? Obraťte se na
            nás a my vám rádi odpovíme na vše, co vás zajímá.
          </p>
        </div>
        <div className="footer-title__submain">
          <h2 className="footer-title__side">
            život <span className="footer-title__side-break">na Letné</span>
          </h2>
        </div>
      </section>
    </div>
  );
};

export default FooterTitle;
