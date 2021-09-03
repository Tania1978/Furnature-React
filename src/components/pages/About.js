import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="page-container">
      <div className="container aboutdiv">
        <div className="row">
          <div className="col-md-3 col-sm-6 col-xs-12">
            <div className="aboutus">
              <h6 className="aboutus-title">How it all started</h6>
              <p className="aboutus-text">
                We are a group of friends and furniture designers with expansive
                experience in creating beautiful home objects, a deep
                appreciation and love for our environment. When it comes to
                furniture, we believe in sustainability and minimizing waste. At
                the turn of our carreers we decided to use our talent in a
                constructive way and contribute to our amazing planet.
              </p>
              <p className="aboutus-text"></p>
              <p className="aboutus-text"></p>
            </div>
          </div>
          <div className="col-md-4 col-sm-6 col-xs-12">
            <div className="aboutus-banner">
              <img src="/images/about.jpg" alt="about" />
            </div>
          </div>
          <div className="col-md-4 col-sm-6 col-xs-12 aboutright">
            <div className="feature">
              <div className="feature-box">
                <div className="clearfix">
                  <div className="feature-content">
                    <h6>Our concept is simple</h6>
                    <p>
                      We buy old furniture that could be seen as beyond its
                      time, and yet we refine and redesign them from scratch.
                      Refurbishing is a word of the past, recreation is now.
                      Call it new look, new feel, however which way,
                      aesthetically, we break it down to bare parts and combine
                      them with contemporary materials and brand new designs,
                      including the best of artifactswhich will completely
                      revive your home! The materials include all fabrics, wood,
                      steel, glass, pvc and whatever we need to, because we
                      offer a bespoke creation. Old worn out furniture does not
                      limit us in terms of creating beautiful brand new ones,
                      while at the same time keeping environmental wastes to the
                      minimum!
                    </p>
                  </div>
                </div>
              </div>
              <div className="feature-box">
                <div className="clearfix">
                  <div className="feature-content">
                    <p>
                      Browse through our catalogue; we hope you appreciate our
                      work!
                    </p>
                    <br />
                    With compliments,
                    <br />
                    The furnature team
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
