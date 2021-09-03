import React, { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Home.css";

const Home = () => {
  const photoNums = [1, 2, 3, 4, 5, 6, 7];

  useEffect(() => {
    console.log("rendered");
  }, []);

  return (
    <div className="carousel">
      <Carousel fade>
        {photoNums.map((num, index) => {
          return (
            <Carousel.Item key={index}>
              <img
                className="d-block  w-100"
                src={`/images/Carousel/banner${num}.jpg`}
                alt="First slide"
              />
            </Carousel.Item>
          );
        })}
        ;
      </Carousel>
    </div>
  );
};

export default Home;
