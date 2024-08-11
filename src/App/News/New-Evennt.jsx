import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Config, Urlimage } from '../../config/connection'
import Loading from '../../Layout/Loading';
import moment from 'moment/moment';
import SliderPromostion from '../Promosion/SliderPromostion';
function NewEvennt() {
    const api = Config.urlApi;
    const img = Urlimage.url;
    const [itemNew, setItemNew] = useState([]);
    const [isloading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const fetchNewEvent = async () => {
        try {
            const response = await fetch(api + 'news/');
            const jsonData = await response.json();
            setItemNew(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false)
        }
    }

    const [itemTiles, setItemTiles] = useState([]);
    const fetchTile = async () => {
        try {
            const response = await fetch(api + 'tileps/');
            const jsonData = await response.json();
            setItemTiles(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [itemPromotion, setItemPromotion] = useState([]);
    const limit = 50;
    const fetchPormotion = async () => {
        try {
            const response = await fetch(api + 'promotion/');
            const jsonData = await response.json();
            setItemPromotion(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        fetchTile();
        fetchNewEvent();
        fetchPormotion();
    })

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };
    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(itemNew.length / itemsPerPage)));
    };
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const displayedItems = itemNew.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,          // Enable autoplay
        autoplaySpeed: 3000,
    };


    return (
        <>
            <div id="page-title" class="page-title has-bg">
                <div class="bg-cover" data-paroller="true" data-paroller-factor="0.5" data-paroller-factor-xs="0.2" style={{ background: "url(./assets/img/slider/home-1/slide-1.jpg) center 0px / cover no-repeat" }}></div>
                <div class="container">
                    <h1>Official Color Admin Blog</h1>
                    <p>Blog Concept Front End Page</p>
                </div>
            </div>

            <div id="content" className="content bg-component">
                <div className="container">
                    <div className="row gx-lg-4">
                        <div className="col-lg-9">

                            {isloading === true ? (
                                <div className="text-center">
                                    <Loading
                                        size="large"
                                        text="ກຳລັງໂຫລດ..."
                                        textColor="#f12424" // Set the image source here
                                    />
                                </div>
                            ) : (

                                <ul className="post-list ">
                                    {displayedItems.map((item, index) => (
                                        <li key={index}>
                                            <div className="post-left-info">
                                                <div className="post-date">
                                                    <span className="day">{moment(item.newDate).format('DD')}</span>
                                                    <span className="month">{moment(item.newDate).format('MM/YYYY')}</span>
                                                </div>
                                                <div className="post-likes">
                                                    <i className="fa fa-heart text-theme"></i>
                                                    <span className="number">520</span>
                                                </div>
                                            </div>

                                            <div className="post-content">
                                                {item.img_list.length > 1 ? (
                                                    <div className="post-image post-image-with-carousel">
                                                        <div id={`carousel-post-${index}`} className="carousel slide" data-ride="carousel">
                                                            <div className="carousel-indicators">
                                                                {item.img_list.map((_, i) => (
                                                                    <button
                                                                        key={i}
                                                                        type="button"
                                                                        data-bs-target={`#carousel-post-${index}`}
                                                                        data-bs-slide-to={i}
                                                                        className={i === 0 ? 'active' : ''}
                                                                    ></button>
                                                                ))}
                                                            </div>
                                                            <div className="carousel-inner">
                                                                {item.img_list.map((val, key) => (
                                                                    <div key={key} className={`carousel-item ${key === 0 ? 'active' : ''}`}>
                                                                        <Link to={'/detail?v=' + btoa(item.event_id)}>
                                                                            <img className="d-block w-100" src={`${img}potstnew/${val.img_list}`} alt="carousel item" />
                                                                        </Link>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <a className="carousel-control-prev" href={`#carousel-post-${index}`} role="button" data-bs-slide="prev">
                                                                <span className="fa fa-chevron-left" aria-hidden="true"></span>
                                                            </a>
                                                            <a className="carousel-control-next" href={`#carousel-post-${index}`} role="button" data-bs-slide="next">
                                                                <span className="fa fa-chevron-right" aria-hidden="true"></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                ) : item.img_list.length === 1 && (
                                                    item.img_list.map((val, key) => 
                                                    <div className="post-image">
                                                        <Link to={'/detail?v=' + btoa(item.event_id)}>
                                                            <div
                                                                className="post-image-cover"
                                                                style={{ backgroundImage: `url(${img}potstnew/${val.img_list}`}}
                                                            ></div>
                                                        </Link>
                                                    </div>
                                                ))}

                                                <div className="post-info">
                                                    <h4 className="post-title">
                                                        <Link to={'/detail?v=' + btoa(item.event_id)}>{item.titleName}</Link>
                                                    </h4>
                                                    <div className="post-by">
                                                        Posted By <a href="#">admin</a> <span className="divider">|</span> <a href="#">Sports</a>, <a href="#">Mountain</a>, <a href="#">Bike</a> <span className="divider">|</span> 2 Comments
                                                    </div>
                                                    <div className="post-desc">
                                                        <div className="text-new" dangerouslySetInnerHTML={{ __html: item.newText }}></div>
                                                    </div>
                                                </div>

                                                <div className="read-btn-container">
                                                    <Link to={'/detail?v=' + btoa(item.event_id)}>ອ່ານເພີ່ມເຕີມ <i className="fa fa-angle-double-right"></i></Link>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {/* <div className="section-container pt-0"> */}
                            <div className="pagination-container">
                                <ul className="pagination justify-content-center">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <a className="page-link" href="javascript:;" onClick={handlePrevPage}>Prev</a>
                                    </li>
                                    {[...Array(Math.ceil(itemNew.length / itemsPerPage)).keys()].map(pageNumber => (
                                        <li key={pageNumber + 1} className={`page-item ${currentPage === pageNumber + 1 ? 'active' : ''}`}>
                                            <a className="page-link" href="javascript:;" onClick={() => handlePageClick(pageNumber + 1)}>{pageNumber + 1}</a>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === Math.ceil(itemNew.length / itemsPerPage) ? 'disabled' : ''}`}>
                                        <a className="page-link" href="javascript:;" onClick={handleNextPage}>Next</a>
                                    </li>
                                </ul>
                            </div>
                            {/* </div> */}

                        </div>


                        <div className="col-lg-3">
                            <div className="section-container pt-0">
                                <div className="input-group sidebar-search">
                                    <input type="text" className="form-control" placeholder="Search Our Stories..." />
                                    <button className="btn btn-dark" type="button"><i className="fa fa-search"></i></button>
                                </div>
                            </div>


                            <div className="section-container pt-0">
                                <h4 className="section-titles"><span>ຂາວສານ ຮ້ານຄຳ ນາງວຽງຄຳ</span></h4>
                                <ul className="sidebar-recent-post">
                                    {itemNew.map((item, index) => (
                                        <li key={index}>
                                            <div className="info">
                                                <h4 className="title"><Link to={'/detail?v=' + btoa(item.event_id)}>{item.titleName}</Link></h4>
                                                <div className="date">{moment(item.newDate).format('DD/MM/YYYY')}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>


                            <div className="section-container pt-0">
                                <h4 className="section-titles"><span>ປະເພດພະລິດຕະພັນ</span></h4>
                                <ul className="sidebar-list">
                                    {itemTiles.map((row, index) => (
                                        <li key={index} className='fs-15px'><Link to={'/pos?p=' + row.tile_uuid}><i class="fa-solid fa-angle-right" /> {row.tile_name} ({row.qty_stock})</Link></li>
                                    ))}
                                </ul>
                            </div>


                            <div className="section-container">
                                <h4 className="section-titles"><span>Follow Us</span></h4>
                                <ul className="sidebar-social-list">
                                    <li><a href="https://www.facebook.com/profile.php?id=100064645995670" target="_blank"><i className="fab fa-facebook"></i></a></li>
                                    <li><a href="https://wa.me/02052160011?text=ສະບາຍດີ ຂ້ອຍສົນໃຈຄຳ ຂ້ອຍມາຈາກ ເວັບໄຊທ໌ເດີ ຂໍລາຍລະອຽດແດ່" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-whatsapp"></i></a></li>
                                    <li><a href="#"><i className="fab fa-google-plus"></i></a></li>
                                    <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                                </ul>
                            </div>
                            <div className="section-container" data-animation="true" data-animation-type="animate__fadeInDown">
                            <h4 className="section-titles"><span>ໂປຣໂມຊັ່ນ</span></h4>
                                <SliderPromostion settings={sliderSettings} className='row-space-10'>
                                {itemPromotion.slice(0, 10).map((item, index) => (
                                        <div key={index} class="work">
                                            <div class="image">
                                                <Link to={'/p-detail?d=' + item.promotion_id}><img src={`${img}promotion/${item.pro_image}`} alt={`Work  ${index}`} /></Link>
                                            </div>
                                            <div class="desc">
                                                <span class="desc-title">{item.promotion_title} </span>
                                                <span class="desc-text">{item.promotion_detail}</span>
                                            </div>
                                        </div>
                                   ) )}
                                </SliderPromostion>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewEvennt