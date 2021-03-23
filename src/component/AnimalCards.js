import React, { useState, useEffect } from 'react'
import {
  CarouselProvider,
  Slider,
  Slide,
  DotGroup,
  ButtonBack,
  ButtonNext
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import useWindowSize from "../customHook/useWindowSize";

const AnimalCards = () => {
  const windowSize = useWindowSize();
  const [animalData, setanimalData] = useState([]);
  const [visibleSlides, setVisibleSlides] = useState(4);
  const [chevronVisble, setChevronVisible] = useState(true);

  const getData = () => {
    fetch('api/data.json'
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setanimalData(myJson)
      });
  }

  useEffect(() => {
    getData()
  }, []);

  useEffect(() => {
    if (windowSize && windowSize < 1024) {
      setVisibleSlides(1.3);
      setChevronVisible(false);
    }
    else {
      setVisibleSlides(4);
      setChevronVisible(true);
    }
  }, [windowSize]);

  return (<div className="container">
    {animalData && animalData.length &&
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={120}
        totalSlides={animalData.length}
        visibleSlides={visibleSlides}
      >
        <Slider>
          {animalData.map((animalData, index) => {
            return (
              <Slide index={index}>
                <div className="cardItems" key={animalData.id}>
                  <div><b>{animalData.name}</b> (<i>{animalData.scientificName}</i>)</div>
                  <div className="animalText">
                    	STATUS: <u>{animalData.endangeredStatus}</u>
                  </div>
                  <img className="animalImage" src={animalData.imageUrl} alt={animalData.name} height="auto" width="100%" />
                  <div className="linkButtons">
                    <a className="learn" href={`/learn/${animalData.id}`} target="_blank" rel="noopener noreferrer"> LEARN &gt;</a>
                    <a className="donate" href={`/donate/${animalData.id}`} target="_blank" rel="noopener noreferrer"> DONATE  &gt;</a>
                  </div>
                </div>
              </Slide>
            )
          }
          )}
        </Slider>
        {!chevronVisble &&
          <div className="dotGroupConatiner">
            <DotGroup
              showAsSelectedForCurrentSlideOnly={true}
            />
          </div>
        }
        {chevronVisble &&
          <div>
            <ButtonNext className="next">&gt;</ButtonNext>
            <ButtonBack className="back">&lt;</ButtonBack>
          </div>
        }

      </CarouselProvider>
    }

  </div>
  );
}

export default AnimalCards;