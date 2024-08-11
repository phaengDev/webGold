import React, { useState, useEffect } from 'react'
import PageHeader from '../../Layout/page-header'
import { Config, Urlimage } from '../../config/connection';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Commet } from 'react-loading-indicators';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import numeral from 'numeral';
function PorductsPage() {
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

    //=================

    const [loading, setLoading] = useState(true);
    const [itemProduct, setItemProduct] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const itemsPerPage = 20;
    const fetchProduct = async () => {
        try {
            const response = await axios.get(api + 'posd/group');
            setItemProduct(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false)
        }
    };


    useEffect(() => {
        fetchProduct();
        fetchTile();
    }, [tileId, title])

    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = itemProduct.slice(indexOfFirstItem, indexOfLastItem);

    // ==================
    const chunkArray = (array, size) => {
        const chunkedArray = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArray.push(array.slice(i, i + size));
        }
        return chunkedArray;
    };

    const chunkedProducts = chunkArray(itemProduct, 4);

    // const pageNumbers = [];
    // for (let i = 1; i <= Math.ceil(itemProduct.length / itemsPerPage); i++) {
    //     pageNumbers.push(i);
    // }
    return (
        <>
            <PageHeader text={'ລາຍການພະລິດຕະພັນ'} />
            <div id="promotions" class="section-container bg-component">

                <div class="container">

                    <h4 class="section-title clearfix">
                        <span class="flex-1">
                            ໂປຣໂມຊັນພິເສດ / Exclusive promotions
                        </span>
                        <a href="#" class="btn">ເບີ່ງທັງໝົດ</a>
                    </h4>


                    <div class="row gx-2">
                        <div class="col-lg-6">
                            <div class="promotion promotion-lg bg-red">
                                <div class="promotion-image text-end promotion-image-overflow-bottom">
                                    <img src="./assets/img/pos/4.webp" alt />
                                </div>
                                <div class="promotion-caption promotion-caption-inverse">
                                    <h4 class="promotion-title">iPhone 12</h4>
                                    <div class="promotion-price"><small>from</small> $1,299.00</div>
                                    <p class="promotion-desc">A big step for small.<br />A beloved design. Now with more to love.</p>
                                    <a href="#" class="promotion-btn">View More</a>
                                </div>
                            </div>
                        </div>


                        <div class="col-lg-3 col-md-6">
                            <div class="promotion bg-blue">
                                <div class="promotion-image promotion-image-overflow-bottom promotion-image-overflow-top">
                                    <img src="./assets/img/pos/5.png" alt />
                                </div>
                                <div class="promotion-caption promotion-caption-inverse text-end">
                                    <h4 class="promotion-title">Apple Watch</h4>
                                    <div class="promotion-price"><small>from</small> $299.00</div>
                                    <p class="promotion-desc">You. At a glance.</p>
                                    <a href="#" class="promotion-btn">View More</a>
                                </div>
                            </div>


                            <div class="promotion bg-gray-200">
                                <div class="promotion-image text-center promotion-image-overflow-bottom">
                                    <img src="../assets/img/product/product-mac-mini.png" alt />
                                </div>
                                <div class="promotion-caption text-center">
                                    <h4 class="promotion-title">Mac Mini</h4>
                                    <div class="promotion-price"><small>from</small> $199.00</div>
                                    <p class="promotion-desc">It’s mini in a massive way.</p>
                                    <a href="#" class="promotion-btn">View More</a>
                                </div>
                            </div>

                        </div>


                        <div class="col-lg-3 col-md-6">
                            <div class="promotion bg-gray-200">
                                <div class="promotion-image promotion-image-overflow-right promotion-image-overflow-bottom text-end">
                                    <img src="../assets/img/product/product-mac-accessories.png" alt />
                                </div>
                                <div class="promotion-caption text-center">
                                    <h4 class="promotion-title">Apple Accessories</h4>
                                    <div class="promotion-price"><small>from</small> $99.00</div>
                                    <p class="promotion-desc">Redesigned. Rechargeable. Remarkable.</p>
                                    <a href="#" class="promotion-btn">View More</a>
                                </div>
                            </div>


                            <div class="promotion bg-dark">
                                <div class="promotion-image text-end">
                                    <img src="./assets/img/pos/5.png" alt />
                                </div>
                                <div class="promotion-caption promotion-caption-inverse">
                                    <h4 class="promotion-title">Mac Pro</h4>
                                    <div class="promotion-price"><small>from</small> $1,299.00</div>
                                    <p class="promotion-desc">Built for creativity on an epic scale.</p>
                                    <a href="#" class="promotion-btn">View More</a>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>



            {loading ? (
                <div className="text-center">
                    <Commet color="#e91717" size="large" text="ກຳລັງໂຫລດ..." textColor="#f12424" />
                </div>
            ) : (
                itemProduct.map((item, key) =>
                    <div id="mobile-list" class={`section-container ${key === 0 ? '' : 'pt-1'}`}>

                        <div class="container ">
                            <h4 class="section-title clearfix">
                                <span class="flex-1">
                                    {item.tile_name}
                                    <small>{item.title_detail}</small>
                                </span>
                                <Link to={'/pos?p=' + item.tile_uuid} class="btn">ສະແດງທັງໝົດ  <i class="fa-solid fa-angle-right" /></Link>
                            </h4>
                            <div class="category-container">
                                <div class="category-sidebar">
                                    <ul class="category-list">
                                        <li class="list-header">Top Categories</li>
                                        {item.product.slice(0, 10).map((val, index) => (
                                            <li key={index}><Link to={'/detail-ps?V='+val.product_uuid}><i class="fa-solid fa-angle-right"></i> {item.tile_name + ' ' + val.qty_baht + '' + val.option_name}</Link></li>
                                        ))}

                                    </ul>
                                </div>


                                <div class="category-detail">
                                    <Link to={'/pos?p=' + item.tile_uuid} class="category-item full">
                                        <div class="item">
                                            <div class="item-cover">
                                                <img src={`${img}title/${item.title_image}`} alt />
                                            </div>
                                            <div class="item-info bottom">
                                          
                                                <h4 class="item-title">{item.tile_name}</h4>
                                                <p class="item-desc">{item.title_detail}</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <div class="category-item list">
                                        {item.product.slice(0, 6).reduce((acc, val, index) => {
                                            if (index % 3 === 0) acc.push([]);
                                            acc[acc.length - 1].push(val);
                                            return acc;
                                        }, []).map((group, groupIndex) => (

                                            <div class="item-row" key={groupIndex}>
                                                {group.map((product, productIndex) => (
                                                    <div class="item item-thumbnail" key={productIndex}>
                                                        <Link to={'/detail-ps?V='+product.product_uuid} class="item-image">
                                                            <img src={`${img}${product.file_image !=='' ? 'pos/'+product.file_image:'title/'+item.title_image}`} alt />
                                                            <div class="discount">{product.qty_baht + '' + product.option_name}</div>
                                                        </Link>
                                                        <div class="item-info">
                                                            <h4 class="item-title">
                                                                <Link to={'/detail-ps?V='+product.product_uuid} className='fs-16px'>{item.tile_name + ' ' + product.qty_baht + ' ' + product.option_name}<br />({product.grams} g)</Link>
                                                            </h4>
                                                            <p class="item-desc">{product.porduct_detail}</p>
                                                            <div class="item-price">{numeral(item.price_sale).format('0,00')} ₭</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}


            <div id="trending-items" class="section-container bg-component">
                <div class="container ">

                    <h4 class="section-title clearfix">
                        <span class="flex-1">
                            Trending Items
                            <small>Shop and get your favourite items at amazing prices!</small>
                        </span>
                        <div class="btn-group">
                            <a href="#" class="btn"><i class="fa fa-angle-left fs-16px"></i></a>
                            <a href="#" class="btn"><i class="fa fa-angle-right fs-16px"></i></a>
                        </div>
                    </h4>


                    <div class="row gx-2">

                        <div class="col-lg-2 col-md-4 col-sm-6">

                            <div class="item item-thumbnail">
                                <a href="product_detail.html" class="item-image">
                                    <img src="../assets/img/product/product-iphone.png" alt />
                                    <div class="discount">15% OFF</div>
                                </a>
                                <div class="item-info">
                                    <h4 class="item-title">
                                        <a href="product_detail.html">iPhone 6s Plus<br />16GB</a>
                                    </h4>
                                    <p class="item-desc">3D Touch. 12MP photos. 4K video.</p>
                                    <div class="item-price">$649.00</div>
                                    <div class="item-discount-price">$739.00</div>
                                </div>
                            </div>

                        </div>


                        <div class="col-lg-2 col-md-4 col-sm-6">

                            <div class="item item-thumbnail">
                                <a href="product_detail.html" class="item-image">
                                    <img src="../assets/img/product/product-ipad-pro.png" alt />
                                    <div class="discount">32% OFF</div>
                                </a>
                                <div class="item-info">
                                    <h4 class="item-title">
                                        <a href="product.html">9.7-inch iPad Pro<br />32GB</a>
                                    </h4>
                                    <p class="item-desc">Super. Computer. Now in two sizes.</p>
                                    <div class="item-price">$599.00</div>
                                    <div class="item-discount-price">$799.00</div>
                                </div>
                            </div>

                        </div>


                        <div class="col-lg-2 col-md-4 col-sm-6">

                            <div class="item item-thumbnail">
                                <a href="product_detail.html" class="item-image">
                                    <img src="../assets/img/product/product-imac.png" alt />
                                    <div class="discount">20% OFF</div>
                                </a>
                                <div class="item-info">
                                    <h4 class="item-title">
                                        <a href="product.html">21.5-inch iMac<br />with Retina Display</a>
                                    </h4>
                                    <p class="item-desc">Retina. Now in colossal and ginormous.</p>
                                    <div class="item-price">$1,099.00</div>
                                    <div class="item-discount-price">$1,299.00</div>
                                </div>
                            </div>

                        </div>


                        <div class="col-lg-2 col-md-4 col-sm-6">

                            <div class="item item-thumbnail">
                                <a href="product_detail.html" class="item-image">
                                    <img src="../assets/img/product/product-apple-watch.png" alt />
                                    <div class="discount">13% OFF</div>
                                </a>
                                <div class="item-info">
                                    <h4 class="item-title">
                                        <a href="product.html">Apple Watch<br />Stainless steel cases</a>
                                    </h4>
                                    <p class="item-desc">You. At a glance.</p>
                                    <div class="item-price">$599.00</div>
                                    <div class="item-discount-price">$799.00</div>
                                </div>
                            </div>

                        </div>


                        <div class="col-lg-2 col-md-4 col-sm-6">

                            <div class="item item-thumbnail">
                                <a href="product_detail.html" class="item-image">
                                    <img src="../assets/img/product/product-macbook-pro.png" alt />
                                    <div class="discount">30% OFF</div>
                                </a>
                                <div class="item-info">
                                    <h4 class="item-title">
                                        <a href="product.html">MacBook Pro<br />with Retina Display</a>
                                    </h4>
                                    <p class="item-desc">Stunning Retina Display</p>
                                    <div class="item-price">$1299.00</div>
                                    <div class="item-discount-price">$1499.00</div>
                                </div>
                            </div>

                        </div>


                        <div class="col-lg-2 col-md-4 col-sm-6">

                            <div class="item item-thumbnail">
                                <a href="product_detail.html" class="item-image">
                                    <img src="../assets/img/product/product-apple-tv.png" alt />
                                    <div class="discount">40% OFF</div>
                                </a>
                                <div class="item-info">
                                    <h4 class="item-title">
                                        <a href="product.html">Apple Tv<br />32GB</a>
                                    </h4>
                                    <p class="item-desc">The future of television is here.</p>
                                    <div class="item-price">$149.00</div>
                                    <div class="item-discount-price">$249.00</div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default PorductsPage