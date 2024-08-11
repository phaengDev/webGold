import React from 'react'
import Slider from 'react-slick';  // Example library; you can use any slider library

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const SliderPromostion=({ settings, children })=> {
  return (
    <Slider {...settings}>
            {children}
        </Slider>
  )
}

export default SliderPromostion