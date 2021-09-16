import React from "react";
import "../../stylesheets/checkoutStylesheet/checkoutHeader.scss";

function Footer() {
  return (
    <div className="checkoutHeader checkoutHeader--forFooter">
      <main className="checkoutHeader__center">
        <p className="checkoutHeader__para">
          The UI was inspired by{" "}
          <span>
            <a
              className="footer__link"
              href="https://www.patreon.com/"
              target="_blank"
              rel="noreferrer noopener nofollow"
            >
              patreon
            </a>
          </span>
        </p>
        <p className="checkoutHeader__para footer__para">
          For images:{" "}
          <span>
            <a
              className="footer__link"
              href="https://source.unsplash.com/500x500/?moon,full"
              target="_blank"
              rel="noreferrer noopener nofollow"
            >
              unsplash
            </a>
          </span>
        </p>
      </main>
    </div>
  );
}

export default Footer;
