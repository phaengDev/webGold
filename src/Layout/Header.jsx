import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Config,Urlimage } from '../config/connection'
export default function Header() {
    const api = Config.urlApi;
    const img=Urlimage.url;
    const [itemTiles, setItemTiles] = useState([]);
    const fetchTile = async () => {
        try {
            const response = await fetch(api + 'posd/group');
            const jsonData = await response.json();
            setItemTiles(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        fetchTile()
    })

  
    return (
        <>
            <div id="top-nav" className="top-nav ">
                <div className="container">
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li className="dropdown dropdown-hover">
                                <a href="#" data-bs-toggle="dropdown"><img src="../assets/img/flag/flag-english.png" className="flag-img" alt /> English <b className="caret"></b></a>
                                <ul className="dropdown-menu">
                                    <li><a href="#" className="dropdown-item"><img src="../assets/img/flag/flag-english.png" className="flag-img" alt /> English</a></li>
                                    <li><a href="#" className="dropdown-item"><img src="../assets/img/flag/flag-german.png" className="flag-img" alt /> German</a></li>
                                    <li><a href="#" className="dropdown-item"><img src="../assets/img/flag/flag-spanish.png" className="flag-img" alt /> Spanish</a></li>
                                    <li><a href="#" className="dropdown-item"><img src="../assets/img/flag/flag-french.png" className="flag-img" alt /> French</a></li>
                                    <li><a href="#" className="dropdown-item"><img src="../assets/img/flag/flag-chinese.png" className="flag-img" alt /> Chinese</a></li>
                                </ul>
                            </li>
                            <li><a href="#">Customer Care</a></li>
                            <li><a href="#">Order Tracker</a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-end">
                            <li><a href="#">Career</a></li>
                            <li><a href="#">Our Forum</a></li>
                            <li><a href="#">Newsletter</a></li>
                            <li><a href="#"><i className="fab fa-facebook-f f-s-14"></i></a></li>
                            <li><a href="#"><i className="fab fa-twitter f-s-14"></i></a></li>
                            <li><a href="#"><i className="fab fa-instagram f-s-14"></i></a></li>
                            <li><a href="#"><i className="fab fa-dribbble f-s-14"></i></a></li>
                            <li><a href="#"><i className="fab fa-google f-s-14"></i></a></li>
                        </ul>
                    </div>
                </div>

            </div>

            <div id="header" className="header" data-fixed-top="true">
                <div className="container">
                    <div className="header-container">
                        <button type="button" className="navbar-toggle collapsed" data-bs-toggle="collapse" data-bs-target="#navbar-collapse">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <div className="header-logo">
                            <Link to={'/'}>
                                <span className="me-1">
                                    <img src="assets/img/logo/logo.png"  alt="" />
                                </span>
                                <span className="brand-text text-white">
                                    <span>ຮ້ານຄຳ</span>ນາງວຽງຄຳ
                                    <small className='text-white'>ຕັ້ງຢູ່ຕະຫລາດເຊົ້າມໍຊັ້ນ2</small>
                                </span>
                            </Link>
                        </div>


                        <div className="header-nav">
                            <div className="collapse navbar-collapse" id="navbar-collapse">
                                <ul className="nav justify-content-center fs-15px">
                                    <li className="active"><Link to={'/'}>ໜ້າຫຼັກ</Link></li>
                                    <li className="dropdown dropdown-full-width dropdown-hover">
                                        <a href="#" data-bs-toggle="dropdown">
                                            ພະລິດຕະພັນ
                                            <b className="caret"></b>
                                            <span className="arrow top"></span>
                                        </a>

                                        <div className="dropdown-menu p-0 ">
                                            <div className="dropdown-menu-container">
                                                <div className="dropdown-menu-sidebar">
                                                    <h4 className="title">ພະລິດຕະພັນຕາມໝວດໝູ່</h4>
                                                    <ul className="dropdown-menu-list ">
                                                        {itemTiles.map((item, index) =>
                                                            <li key={index} ><Link to={'/pos?p='+item.tile_uuid} className='fs-15px'><i className="fa fa-fw fa-angle-right text-muted" />{item.tile_name}</Link></li>
                                                        )}
                                                            <hr/>
                                                        <li className='fs-18px text-red'>
                                                            <Link to={'/product'} className='fs-16px text-red'><i class="fa-solid fa-angles-right fs-4"></i> ພະລິດຕະພັນທັງໝົດ</Link>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className={`dropdown-menu-content w-100 `}>
                                                    <h4 className="title">ລາຍການພະລິດຕະພັນ</h4>
                                                    <div className="row">
                                                        {itemTiles.map((item, index) =>
                                                            <div className="col-lg-3">
                                                                <ul className="dropdown-menu-list">
                                                                    <h5 className='text-red'> {item.tile_name}</h5>
                                                                    {item.product.map((val, key) =>
                                                                        <li><Link to={'/detail-ps?V='+val.product_uuid} ><i className="fa fa-fw fa-angle-right text-muted"></i> {item.tile_name}: {val.qty_baht + ' ' + val.option_name}</Link></li>
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <h4 className="title">Shop By Brand</h4>
                                                    <ul className="dropdown-brand-list mb-0">
                                                        {itemTiles.map((item, index) =>
                                                            <li key={index}><Link to={'/pos?p='+item.tile_uuid}><img src={`${img}title/${item.title_image}`} alt /></Link></li>
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                    </li>
                                    <li><Link to={'/promotion'}>ໂປຣໂມຊັນ</Link></li>
                                    <li><Link to={'/gift'}>ຂອງຂວັນ</Link></li>
                                    <li><Link to={'/news'}>ຂໍ້ມູນຂ່າວສານ</Link></li>
                                    <li className="dropdown dropdown-hover">
                                        <a href="#" data-bs-toggle="dropdown">
                                            ບໍລິການອື່ນ
                                            <b className="caret"></b>
                                            <span className="arrow top"></span>
                                        </a>
                                        <div className="dropdown-menu">
                                            <Link className="dropdown-item" to={'/pattern'} >ລວດລາຍ ຮ້ານຄຳ ນາງວຽງຄຳ</Link>
                                            <Link className="dropdown-item" to={'/gift'}>ສະໝັກວຽກ</Link>
                                            <a className="dropdown-item" href="index_inverse_header.html">Home (Inverse Header)</a>
                                            <a className="dropdown-item" href="search_results.html">Search Results</a>
                                            <a className="dropdown-item" href="product.html">Product Page</a>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>


                        <div className="header-nav">
                            <ul className="nav justify-content-end">
                                <li className="dropdown dropdown-hover">
                                    <a href="#" className="header-cart" data-bs-toggle="dropdown">
                                        <i className="fa fa-shopping-bag"></i>
                                        <span className="total">2</span>
                                        <span className="arrow top"></span>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-cart p-0">
                                        <div className="cart-header">
                                            <h4 className="cart-title">Shopping Bag (1) </h4>
                                        </div>
                                        <div className="cart-body">
                                            <ul className="cart-item">
                                                <li>
                                                    <div className="cart-item-image"><img src="../assets/img/product/product-ipad.jpg" alt /></div>
                                                    <div className="cart-item-info">
                                                        <h4>iPad Pro Wi-Fi 128GB - Silver</h4>
                                                        <p className="price">$699.00</p>
                                                    </div>
                                                    <div className="cart-item-close">
                                                        <a href="#" data-bs-toggle="tooltip" data-bs-title="Remove">&times;</a>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="cart-item-image"><img src="../assets/img/product/product-imac.jpg" alt /></div>
                                                    <div className="cart-item-info">
                                                        <h4>21.5-inch iMac</h4>
                                                        <p className="price">$1299.00</p>
                                                    </div>
                                                    <div className="cart-item-close">
                                                        <a href="#" data-bs-toggle="tooltip" data-bs-title="Remove">&times;</a>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="cart-item-image"><img src="../assets/img/product/product-iphone.png" alt /></div>
                                                    <div className="cart-item-info">
                                                        <h4>iPhone 6s 16GB - Silver</h4>
                                                        <p className="price">$649.00</p>
                                                    </div>
                                                    <div className="cart-item-close">
                                                        <a href="#" data-bs-toggle="tooltip" data-bs-title="Remove">&times;</a>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="cart-footer">
                                            <div className="row gx-2">
                                                <div className="col-6">
                                                    <a href="checkout_cart.html" className="btn btn-default btn-theme d-block">View Cart</a>
                                                </div>
                                                <div className="col-6">
                                                    <a href="checkout_cart.html" className="btn btn-dark btn-theme d-block">Checkout</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="my_account.html">
                                        <img src="../assets/img/user/user-1.jpg" className="user-img" alt />
                                        <span className="d-none d-xl-inline">Login / Register</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
