import React from "react";
import './Contact.css';

const Contact = () => {
  return (
    <div className="page-container">
      <section id="contact">
        <div className="container">
          <h3 className="text-center contactTitle">Contact Us</h3>
          <p className="text-center w-75 m-auto">
            We can hear your request and make something custom for you!
          </p>
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-3 my-5">
              <div className="card border-0">
                <div className="card-body text-center">
                  <i
                    className="fa fa-phone fa-5x mb-3 contacticon"
                    aria-hidden="true"
                  ></i>
                  <h6 className=" mb-5 contacticon">Give us a Call</h6>
                  <p>+30 67546834883,+30 2108964532</p>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 my-5">
              <div className="card border-0">
                <div className="card-body text-center">
                  <i
                    className="fa fa-map-marker fa-5x mb-3 contacticon"
                    aria-hidden="true"
                  ></i>
                  <h6 className=" mb-5 contacticon">Our Factory</h6>
                  <address>
                    77 Anwgeiwn St., Metaxourgeio, 12765, Athens, Greece
                  </address>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 my-5">
              <div className="card border-0">
                <div className="card-body text-center">
                  <i
                    className="fa fa-map-marker fa-5x mb-3 contacticon"
                    aria-hidden="true"
                  ></i>
                  <h6 className=" mb-5 contacticon">Our Showroom</h6>
                  <address>
                    36 Osyssews St., Voula, 16574, Attiki, Greece
                  </address>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 my-5">
              <div className="card border-0">
                <div className="card-body text-center">
                  <i
                    className="fa fa-globe fa-5x mb-3 contacticon"
                    aria-hidden="true"
                  ></i>
                  <h6 className="text-uppercase mb-5 contacticon">Our email</h6>
                  <p>info@furnature.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
