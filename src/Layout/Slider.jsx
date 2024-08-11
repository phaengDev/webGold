import React,{useState,useEffect} from 'react'
import { Config, Urlimage } from '../config/connection';
import Carousel from 'react-bootstrap/Carousel';
export default function Slider() {
    const api = Config.urlApi;
    const img = Urlimage.url;

    const [itemSlider,setItemSlider]=useState([]);
    const fetchSlider = async () => {
        try {
          const response = await fetch(api + 'slider/');
          const jsonData = await response.json();
          setItemSlider(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
useEffect(()=>{
    fetchSlider()
},[])
    return (
        <>


            <div id="slider" className="section-container p-0 bg-dark">
                <div id="main-carousel" className="carousel slide" data-ride="carousel">
                    {/* <div className="carousel-inner"> */}
                    <Carousel data-bs-theme="dark" className='carousel-inner'>

                        {itemSlider.map((item,key)=>
                            <Carousel.Item>
                        <div
                            className={`carousel-item active`}
                            data-paroller="true"
                            data-paroller-factor="-0.3"
                            data-paroller-factor-sm="0.01"
                            data-paroller-factor-xs="0.01"
                            style={{
                                background:
                                    `url(${img}slider/${item.slider_image}) center 0 / cover no-repeat`
                            }}
                        >
                             <Carousel.Caption className='d-sm-block d-none'>
                            <div className="carousel-caption carousel-caption-left text-white">
                                <div className="container">
                                    <h3 className="title mb-5px animate__fadeInLeftBig animate__animated">{item.slider_title}</h3>
                                    <p className="mb-15px animate__fadeInLeftBig animate__animated">{item.slider_detail}</p>
                                </div>
                            </div>
                            </Carousel.Caption>
                        </div>
                        </Carousel.Item>
                        )}
                        </Carousel>
                       
                </div>

            </div>


        </>
    )
}
