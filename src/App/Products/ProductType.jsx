import React, { useState, useEffect } from 'react'
import PageHeader from '../../Layout/page-header'
import { Config, Urlimage } from '../../config/connection';
import { Link, useLocation } from 'react-router-dom';
import Loading from '../../Layout/Loading';
import axios from 'axios';
import numeral from 'numeral';
import ViewPattern from '../Pattern/ViewPattern';
import SliderPromostion from '../Promosion/SliderPromostion';
function ProductType() {
    const api = Config.urlApi;
    const img = Urlimage.url;
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const tileId = searchParams.get('p');


    const [title, setTitle] = useState(tileId)
    const [itemTiles, setItemTiles] = useState([]);
    const fetchTile = async () => {

        try {
            const response = await fetch(api + 'tileps/');
            const jsonData = await response.json();
            setItemTiles(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const [values, setValues] = useState({
        tiles_id_fk: title,
        option_id_fk: '',
        tiles_idfk: '',
    });

    const handleShow = (id) => {
        setTitle(id)
        setValues({
            ...values, tiles_id_fk: id,
        })
        setValuepat({
            ...valuepat, title_id_fk: id,
        })
    }

    //=================

    const [loading, setLoading] = useState(true);
    const [itemProduct, setItemProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const [dataFilter, setDataFilter] = useState([]);
    const fetchProduct = async () => {
        try {
            const response = await axios.post(api + 'posd/', values);
            setItemProduct(response.data);
            setDataFilter(response.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false)
        }
    };

    const handleFilter = (event) => {
        setItemProduct(dataFilter.filter(n => n.option_name.toLowerCase().includes(event)))
    }


// ====================
const [show, setShow] = useState(false);
 const [viewItem,setViewItem]=useState({})
 const handleView=(data)=>{
    setViewItem(data)
    setShow(true)
}
// ======================

    const [itemPromotion, setItemPromotion] = useState([]);
    const fetchPormotion = async () => {
        try {
            const response = await fetch(api + 'promotion/');
            const jsonData = await response.json();
            setItemPromotion(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const [valuepat, setValuepat] = useState({
        type_id_fk: '',
        title_id_fk: tileId,
        option_id_fk: ''
    })


    const [itemPattern, setItemPattern] = useState([]);
    const fetchPattern = async () => {
        try {
            const response = await axios.post(api + 'pattern/', valuepat);
            setItemPattern(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchPattern();
        fetchProduct();
        fetchTile();
        fetchPormotion();
    }, [tileId, title, values, valuepat])

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = itemProduct.slice(indexOfFirstItem, indexOfLastItem);

    // ==================
    const chunkArray = (array, size) => {
        const chunkedArray = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArray.push(array.slice(i, i + size));
        }
        return chunkedArray;
    };

    const chunkedProducts = chunkArray(currentItems, 4);
    const chunkedPattern = chunkArray(itemPattern, 6);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(itemProduct.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }


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
            <PageHeader text={'ລາຍການພະລິດຕະພັນ'} />
            <div id="search-results" className="section-container">
                <div className="container">
                    <div className="search-container">
                        <div className="search-sidebar">
                            <h4 className="title mb-0">ສີນຄ້າຕາມໝວດໝູ່ </h4>
                            <ul className="search-category-list">
                                {itemTiles.map((item, index) =>
                                    <li className='text-bleu'><Link to={'/pos?p=' + item.tile_uuid} onClick={() => handleShow(item.tile_uuid)} className={item.tile_uuid===tileId && 'text-red'}><i className="fa-solid fa-angle-right" /> {item.tile_name} <span className="pull-right">({item.qty_stock})</span></Link></li>
                                )}
                            </ul>

                            <hr />
                            <h4 className="section-titles"><span>ລາຍການພະລິດຕະພັນ</span></h4>
                            <div className="row">
                                {itemProduct.map((val, key) =>
                                    <Link key={key} to={'/detail/id=' + val.product_uuid} className="col-4 col-sm-3 col-md-2 badge bg-yellow-100 text-dark border m-1">{val.qty_baht + ' ' + val.option_name}</Link>
                                )}
                            </div>
                            <hr />
                            <div className="section-container pt-1" data-animation="true" data-animation-type="animate__fadeInDown">
                                <h4 className="section-titles"><span>ໂປຣໂມຊັ່ນ</span></h4>
                                <SliderPromostion settings={sliderSettings} className='row-space-10'>
                                    {itemPromotion.slice(0, 10).map((item, index) => (
                                        <div key={index} className="work">
                                            <div className="image">
                                              <img src={`${img}promotion/${item.pro_image}`} alt={`Work  ${index}`} />
                                            </div>
                                            <div className="desc">
                                                <span className="desc-title">{item.promotion_title} </span>
                                                <span className="desc-text">{item.promotion_detail}</span>
                                            </div>
                                        </div>
                                    ))}
                                </SliderPromostion>
                            </div>

                        </div>

                        <div className="search-content">
                            <div className="search-toolbar">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="position-relative  flex-fill pe-3">
                                            <button type="button" className="btn btn-default btn-lg position-absolute start-0 height-50px bg-none border-0"><i className="fa fa-search fa-fw"></i></button>
                                            <input type="text" className="form-control form-control-lg ps-5 fs-14px fw-bold  rounded-3 height-50px" onChange={(e) => handleFilter(e.target.value)} placeholder="ຄົ້ນຫາ.../ ບາດ / ສະຫຼຶງ / ຫຸນ" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 text-end">
                                        <ul className="sort-list mt-2">
                                            <li className="text"><i className="fa fa-filter"></i> Sort by:</li>
                                            <li className="active"><a href="javascript:;">ເປັນທີ່ນິຍົມ</a></li>
                                            <li><a href="javascript:;">ມາ​ໃຫມ່</a></li>
                                            <li><a href="javascript:;">ສ່ວນຫຼຸດ</a></li>
                                            <li><a href="javascript:;">ລາຄາ</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>


                            <div className="search-item-container">
                                {loading ? (
                                    <div className="text-center p-4">
                                        <Loading
                                            size="large"
                                            text="ກຳລັງໂຫລດ..."
                                            textColor="#f12424" // Set the image source here
                                        />
                                    </div>
                                ) : (
                                    chunkedProducts.map((group, groupIndex) => (
                                        <div className="item-row" key={groupIndex}>
                                            {group.map((item, itemIndex) => (
                                                <div className="item item-thumbnail" key={itemIndex}>
                                                    <Link to={'/detail-ps?V=' + item.product_uuid} className="item-image">
                                                    <img src={`${img}${item.file_image !==''? 'pos/'+item.file_image :'title/'+item.title_image}`}  alt=""  />
                                                        <div className="discount">{item.qty_baht + ' ' + item.option_name}</div>
                                                    </Link>
                                                    <div className="item-info">
                                                        <h4 className="item-title">
                                                            <Link to={'/detail-ps?V=' + item.product_uuid} ><strong className='fs-15px'> {item.tile_name} {item.qty_baht + ' ' + item.option_name}</strong>
                                                                <br /> ({item.grams} g)</Link>
                                                        </h4>
                                                        <p className="item-desc">{item.porduct_detail} </p>
                                                        <div className="item-price">{numeral(item.price_sale * item.grams).format('0,00')} ₭</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )))}
                            </div>


                            <ul className="pagination justify-content-center mt-0">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <a href="javascript:;" className="page-link" onClick={() => setCurrentPage(currentPage - 1)}><i className="fa-solid fa-angle-left" /></a>
                                </li>
                                {pageNumbers.map(number => (
                                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                        <a href="javascript:;" className="page-link" onClick={() => setCurrentPage(number)}>{number}</a>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
                                    <a href="javascript:;" className="page-link" onClick={() => setCurrentPage(currentPage + 1)}><i className="fa-solid fa-angle-right" /></a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>


                <div id="promotions" className="section-container bg-component">
                    <div className="container">
                        <div id="carousel-post" className="carousel slide" data-ride="carousel">
                            <h4 className="section-title clearfix">
                                <span className="flex-1">
                                    ລວດລາຍ ທີ່ເປັນເອກະລັກໃນຮ້ານຂອງພວດເຮົາ
                                </span>
                                <div className="btn-group">
                                    <a href="#carousel-post" className="btn" role="button" data-bs-slide="prev"><i className="fa fa-angle-left fs-16px"></i></a>
                                    <a href="#carousel-post" className="btn" role="button" data-bs-slide="next"><i className="fa fa-angle-right fs-16px"></i></a>
                                </div>
                            </h4>
                            <div className="carousel-inner2">
                                {chunkedPattern.map((group, groupIndex) => (
                                    <div key={groupIndex} className="carousel-item active">
                                        <div className="row  gx-2">
                                            {group.map((item, itemIndex) => (
                                                <div key={itemIndex} className="col-lg-2 col-md-4 col-sm-6 mb-2">
                                                    <div className="item item-thumbnail">
                                                        <a href="javascript:;"  onClick={()=>handleView(item)} className="item-image">
                                                            <img src={`${img}pattern/${item.pattern_img}`} alt={''} />
                                                            <div className="discount">{item.option_name}</div>
                                                        </a>
                                                        <div className="item-info">
                                                            <h4 className="item-title">
                                                                {item.pattern_name}
                                                            </h4>
                                                            <p className="item-desc">{item.tile_name}</p>
                                                            <div className="item-price">{numeral(item.pattern_pirce).format('0,00')} ₭</div>
                                                        </div>
                                                    </div>

                                                </div>
                                            ))}


                                        </div>
                                    </div>

                                ))}

                                {/* <div className="carousel-item ">
                                    <div className="row  gx-2">
                                        <div className="col-lg-2 col-md-4 col-sm-6 mb-2">
                                            <div className="item item-thumbnail">
                                                <a href="product_detail.html" className="item-image">
                                                    <img src="../assets/img/product/product-iphone.png" alt />
                                                    <div className="discount">15% OFF</div>
                                                </a>
                                                <div className="item-info">
                                                    <h4 className="item-title">
                                                        <a href="product_detail.html">iPhone 6s Plus<br />16GB</a>
                                                    </h4>
                                                    <p className="item-desc">3D Touch. 12MP photos. 4K video.</p>
                                                    <div className="item-price">$649.00</div>
                                                    <div className="item-discount-price">$739.00</div>
                                                </div>
                                            </div>

                                        </div>


                                        <div className="col-lg-2 col-md-4 col-sm-6 mb-2">
                                            <div className="item item-thumbnail">
                                                <a href="product_detail.html" className="item-image">
                                                    <img src="../assets/img/product/product-ipad-pro.png" alt />
                                                    <div className="discount">32% OFF</div>
                                                </a>
                                                <div className="item-info">
                                                    <h4 className="item-title">
                                                        <a href="product.html">9.7-inch iPad Pro<br />32GB</a>
                                                    </h4>
                                                    <p className="item-desc">Super. Computer. Now in two sizes.</p>
                                                    <div className="item-price">$599.00</div>
                                                    <div className="item-discount-price">$799.00</div>
                                                </div>
                                            </div>

                                        </div>


                                        <div className="col-lg-2 col-md-4 col-sm-6 mb-2">
                                            <div className="item item-thumbnail">
                                                <a href="product_detail.html" className="item-image">
                                                    <img src="../assets/img/product/product-imac.png" alt />
                                                    <div className="discount">20% OFF</div>
                                                </a>
                                                <div className="item-info">
                                                    <h4 className="item-title">
                                                        <a href="product.html">21.5-inch iMac<br />with Retina Display</a>
                                                    </h4>
                                                    <p className="item-desc">Retina. Now in colossal and ginormous.</p>
                                                    <div className="item-price">$1,099.00</div>
                                                    <div className="item-discount-price">$1,299.00</div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-lg-2 col-md-4 col-sm-6 mb-2">
                                            <div className="item item-thumbnail">
                                                <a href="product_detail.html" className="item-image">
                                                    <img src="../assets/img/product/product-apple-watch.png" alt />
                                                    <div className="discount">13% OFF</div>
                                                </a>
                                                <div className="item-info">
                                                    <h4 className="item-title">
                                                        <a href="product.html">Apple Watch<br />Stainless steel cases</a>
                                                    </h4>
                                                    <p className="item-desc">You. At a glance.</p>
                                                    <div className="item-price">$599.00</div>
                                                    <div className="item-discount-price">$799.00</div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="col-lg-2 col-md-4 col-sm-6 mb-2">

                                            <div className="item item-thumbnail">
                                                <a href="product_detail.html" className="item-image">
                                                    <img src="../assets/img/product/product-apple-watch.png" alt />
                                                    <div className="discount">13% OFF</div>
                                                </a>
                                                <div className="item-info">
                                                    <h4 className="item-title">
                                                        <a href="product.html">Apple Watch<br />Stainless steel cases</a>
                                                    </h4>
                                                    <p className="item-desc">You. At a glance.</p>
                                                    <div className="item-price">$599.00</div>
                                                    <div className="item-discount-price">$799.00</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-md-4 col-sm-6 mb-2">
                                            <div className="item item-thumbnail">
                                                <a href="product_detail.html" className="item-image">
                                                    <img src="../assets/img/product/product-apple-watch.png" alt />
                                                    <div className="discount">13% OFF</div>
                                                </a>
                                                <div className="item-info">
                                                    <h4 className="item-title">
                                                        <a href="product.html">Apple Watch<br />Stainless steel cases</a>
                                                    </h4>
                                                    <p className="item-desc">You. At a glance.</p>
                                                    <div className="item-price">$599.00</div>
                                                    <div className="item-discount-price">$799.00</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ViewPattern
                show={show}
                handleClose={() => setShow(false)}
                data={viewItem}
                url={img}
            />

        </>
    )
}

export default ProductType