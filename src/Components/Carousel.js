import { Carousel } from "react-bootstrap";

export default function CarouselCar({ images }) {
  return (
    <Carousel fade>
      {images.map((image, index) => {
        return (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100 img-carusel"
              src={image}
              alt="car-img"
            />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}
