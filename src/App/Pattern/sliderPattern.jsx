import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { Config, Urlimage } from '../../config/connection';
import ViewPattern from './ViewPattern';
import axios from 'axios';

function SliderPattern() {
    const api = Config.urlApi;
    const img = Urlimage.url;
    
    const [show, setShow] = useState(false);
    const [viewItem,setViewItem]=useState({})
    const handleView=(data)=>{
        setViewItem(data)
        setShow(true)
    }

    const [valuepat, setValuepat] = useState({
        type_id_fk: '',
        title_id_fk: '',
        option_id_fk: ''
    })
    const [itemPattern, setItemPattern] = useState([]);
    const fetchPattern = async () => {
        try {
            const response = await axios.post(`${api}pattern/`, valuepat);
            setItemPattern(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 6
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2
        }
    };
    useEffect(() => {
        fetchPattern();
    }, []);

    // ==================
    const WithStyles = ({ headline, description, image,data }) => (
        <div className="news  mb-lg-0 m-2" onClick={()=>handleView(data)} role='button' >
            <div className="news-media rounded-3 overflow-hidden border bg-white">
                <div className="post-image-cover" style={{ backgroundImage: `url(${image})` }}></div>
                <div className="news-content bg-white px-2 mb-0">
                    <div className='news-title mb-1'>{headline}</div>
                    <div className='mb-0'>{description}</div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Carousel
                additionalTransfrom={0}
                arrows
                autoPlay
                //   autoPlaySpeed={1000}
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
                responsive={responsive}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                slidesToSlide={2}
                swipeable
            >
                {itemPattern.slice(0, 20).map((val, index) => (
                    <WithStyles key={index}
                        description={val.pattern_name}
                        headline={val.tile_name}
                        image={`${img}pattern/${val.pattern_img}`}
                        data={val}
                    />
                ))}
            </Carousel>
            <ViewPattern
                show={show}
                handleClose={() => setShow(false)}
                data={viewItem}
                url={img}
            />
        </>

    )
}

export default SliderPattern