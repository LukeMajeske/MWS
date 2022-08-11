import React from "react";
import ReactDOM from "react-dom";
import website_img from "../assets/website.jpg";
import client_img from "../assets/client.jpg";
import QuoteForm from "./QuoteForm";
import { Header, Segment } from "semantic-ui-react";

//const website_img1 = website_img;
const images = [website_img, client_img];
const delay = 5000;

export default function SlideShow() {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current!);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {images.map((image, index) => (
          <div
            className="slide"
            key={index}
            style={{backgroundImage:`url(${image})`,
            backgroundSize:'cover',
            backgroundRepeat:'no-repeat',
            backgroundPosition:'50% 50%'
            }}
          ></div>
        ))}
      </div>
      <div className='quoteform-div'>
        <Segment className="welcome-flex">
          <div className="welcome-container">
            <Header as="h1"  content="Welcome to Majeske Web Services!"/>
            <Header as="h2" content="Manage your data with a personalized Web Interface"/>
          </div>
          <div className="quoteForm">
            <QuoteForm/>
          </div>
        </Segment>
      </div>

      <div className="slideshowDots">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}