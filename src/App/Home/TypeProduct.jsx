import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { Config, Urlimage } from '../../config/connection';
import { Link } from 'react-router-dom';
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 8
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3
  }
};

const WithStyles = ({ headline, image,link }) => (
  <div className="post-image text-center px-3">
    <Link to={'/pos?p='+link}>
    <div className="post-image-cover" style={{ backgroundImage: `url(${image})` }}></div>
    </Link>
    <h6 className='text-white mt-1'>{headline}</h6>
  </div>
);

const TypeProduct = () => {
  const api = Config.urlApi;
  const img = Urlimage.url;

  const [itemTiles, setItemTiles] = useState([]);

  const fetchTile = async () => {
    try {
      const response = await fetch(api + 'posd/group');
      const jsonData = await response.json();
      setItemTiles(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchTile();
  }, []); // Empty dependency array to run the effect only once

  return (
    <Carousel
      responsive={responsive}
      additionalTransfrom={0}
      arrows
      autoPlay
      autoPlaySpeed={3000} // Adjusted autoPlaySpeed
      centerMode={false}
      className=""
      containerClass="container-with-dots"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      {itemTiles.map((item, index) => (
        <WithStyles
          key={index}
          headline={item.tile_name} // Adjust these keys based on your API response structure
          image={`${img}title/${item.title_image}`}
          link={item.tile_uuid}
        />
      ))}
    </Carousel>
  );
};

export default TypeProduct;
