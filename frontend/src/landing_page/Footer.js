import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={{ backgroundColor: "rgb(250, 250, 250)" }}>
      <div className="container border-top mt-5">
        <div className="row mt-5">
          <div className="col">
            <img src="media/images/logo.svg" style={{ width: "50%" }} alt="Logo" />
            <p>
              &copy; 2010 - 2024, Not Zerodha Broking Ltd. All rights reserved.
            </p>
          </div>

          <div className="col">
            <p>Company</p>

            <Link to="/about">About</Link> <br />
            <Link to="/product">Products</Link> <br />
            <Link to="/pricing">Pricing</Link> <br />
            <a href="#">Referral programme</a> <br /> {/* External */}
            <a href="#">Careers</a> <br />
            <a href="#">Zerodha.tech</a> <br />
            <a href="#">Press & media</a> <br />
            <a href="#">Zerodha cares (CSR)</a> <br />
          </div>

          <div className="col">
            <p>Support</p>

            <Link to="/support">Contact</Link> <br />
            <Link to="/support">Support portal</Link> <br />
            <a href="#">Z-Connect blog</a> <br />
            <a href="#">List of charges</a> <br />
            <a href="#">Downloads & resources</a> <br />
          </div>

          <div className="col">
            <p>Account</p>

            <Link to="/signup">Open an account</Link> <br />
            <a href="#">Fund transfer</a> <br />
            <a href="#">60 day challenge</a> <br />
          </div>
        </div>

        <div className="mt-5 text-muted" style={{ fontSize: "14px" }}>
          <p>
            Zerodha Broking Ltd.: Member of NSE​ &​ BSE – SEBI Registration no.:
            INZ000031633 CDSL: Depository services through Zerodha Securities
            Pvt. Ltd. – SEBI Registration no.: IN-DP-100-2015 Commodity Trading
            through Zerodha Commodities Pvt. Ltd. MCX: 46025 – SEBI Registration
            no.: INZ000038238 Registered Address: Zerodha Broking Ltd.,
            #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School,
            J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India.
          </p>

          <p>
            Procedure to file a complaint on SEBI SCORES: Register on SCORES
            portal...
          </p>

          <p>
            Investments in securities market are subject to market risks; read
            all the related documents carefully before investing.
          </p>

          <p>
            "Prevent unauthorised transactions in your account...
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
