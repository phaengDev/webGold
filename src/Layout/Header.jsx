import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Config, Urlimage } from '../config/connection';
import numeral from 'numeral';
export default function Header() {
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
    }

    const [orderCart, setOrderCart] = useState([]);
    // const savedCart = JSON.parse(localStorage.getItem('orderCart')) || [];

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('orderCart')) || [];
        setOrderCart(savedCart);
        fetchTile();
    }, [orderCart])



    const [flag, setFlag] = useState(1)
    const chengeLanguage = (index) => {
        setFlag(index)
    }

    const removeCart = (product_id_fk) => {
        const updatedCart = orderCart.filter(item => item.product_id_fk !== product_id_fk);
        setOrderCart(updatedCart);
        localStorage.setItem('orderCart', JSON.stringify(updatedCart)); // Update localStorage
    };
    return (
        <>
            <div id="top-nav" className="top-nav ">
                <div className="container">
                    <div className="collapse navbar-collapse">

                        <ul className="nav navbar-nav ">
                            <li><a href="#"><i class="fa-solid fa-phone" /> : 020 95 555 609</a></li>
                            <li><a href="#"><i class="fa-solid fa-phone" /> : 020 94 424 363</a></li>
                            <li><a href="https://www.facebook.com/profile.php?id=100064645995670"><i class="fa-brands fa-facebook-f fs-5" /></a></li>
                            <li><a href="#"><i class="fa-brands fa-square-whatsapp fs-5" /></a></li>
                            <li><a href="#"><i className="fab fa-instagram fs-5" /></a></li>
                            <li><a href="#"><i class="fa-solid fa-envelope fs-5" /></a></li>
                            <li><a href="https://www.tiktok.com/@vkgold888"><i class="fa-brands fa-tiktok fs-5" /></a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-end">
                            <li><a href="#">Customer Care</a></li>
                            <li><a href="#">Order Tracker</a></li>
                            <li className="dropdown dropdown-hover">
                                <a href="javascript:;" data-bs-toggle="dropdown">
                                    {flag === 1 ? (
                                        <><img src="./assets/img/flag/flag-la.svg" className="flag-img" alt /> Laos </>
                                    ) : (
                                        <><img src="../assets/img/flag/flag-english.svg" className="flag-img" alt /> English</>
                                    )}
                                    <b className="caret"></b></a>
                                <ul className="dropdown-menu">
                                    <li><a href="javascript:;" onClick={() => chengeLanguage(1)} className="dropdown-item"><img src="./assets/img/flag/flag-la.svg" className="flag-img" alt /> Laos</a></li>
                                    <li><a href="javascript:;" onClick={() => chengeLanguage(2)} className="dropdown-item"><img src="../assets/img/flag/flag-english.svg" className="flag-img" alt /> English</a></li>
                                </ul>
                            </li>
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
                                    <img src="assets/img/logo/logo.png" alt="" />
                                </span>
                                <span className="brand-text text-white">
                                    <span>ຮ້ານ ນາງວຽງຄຳ</span>
                                    <small className='text-white'>ຕັ້ງຢູ່ຕະຫລາດເຊົ້າມໍຊັ້ນ2</small>
                                </span>
                            </Link>
                        </div>


                        <div className="header-nav">
                            <div className="collapse navbar-collapse" id="navbar-collapse">
                                <ul className="nav justify-content-center fs-15px">
                                    <li className="active"><Link to={'/'}>ໜ້າຫຼັກ</Link></li>
                                    <li className="dropdown dropdown-full-width ">
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
                                                            <li key={index} ><Link to={'/pos?p=' + item.tile_uuid} className='fs-15px'><i className="fa fa-fw fa-angle-right text-muted" />{item.tile_name}</Link></li>
                                                        )}
                                                        <hr />
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
                                                                        <li><Link to={'/detail-ps?V=' + val.product_uuid} ><i className="fa fa-fw fa-angle-right text-muted"></i> {item.tile_name}: {val.qty_baht + ' ' + val.option_name}</Link></li>
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <h4 className="title">Shop By Brand</h4>
                                                    <ul className="dropdown-brand-list mb-0">
                                                        {itemTiles.map((item, index) =>
                                                            <li key={index}><Link to={'/pos?p=' + item.tile_uuid}><img src={`${img}title/${item.title_image}`} alt /></Link></li>
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                    </li>
                                    <li><Link to={'/promotion'}>ໂປຣໂມຊັນ</Link></li>
                                    <li><Link to={'/gift'}>ຂອງຂວັນ</Link></li>
                                    <li><Link to={'/news'}>ຂໍ້ມູນຂ່າວສານ</Link></li>
                                    <li className="dropdown">
                                        <a href="#" data-bs-toggle="dropdown">
                                            ບໍລິການອື່ນ
                                            <b className="caret"></b>
                                            <span className="arrow top"></span>
                                        </a>
                                        <div className="dropdown-menu">
                                            <Link className="dropdown-item" to={'/pattern'} ><i class="fa-solid fa-arrow-right" /> ລວດລາຍ ຮ້ານຄຳ ນາງວຽງຄຳ</Link>
                                            <Link className="dropdown-item" to={'/job'}><i class="fa-solid fa-arrow-right" />  ສະໝັກວຽກ</Link>
                                            <Link className="dropdown-item" to={'/checkbuy'}><i class="fa-solid fa-arrow-right" />  ກວດສອບການສັ່ງຊື້</Link>
                                            <Link className="dropdown-item" to={'/policy'}><i class="fa-solid fa-arrow-right" />  ນະໂຍບາຍຮ້ານຂອງພວກເຮົາ</Link>
                                            <Link className="dropdown-item" to={'/about'}><i class="fa-solid fa-arrow-right" />  ກ່ຽວກັບພວກເຮົາ</Link>
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
                                        <span className="total">{orderCart.length}</span>
                                        <span className="arrow top"></span>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-cart p-0">
                                        <div className="cart-header">
                                            <h4 className="cart-title">Shopping Bag (1) </h4>
                                        </div>
                                        <div className="cart-body">
                                            <ul className="cart-item">
                                                {orderCart.length > 0 ? (
                                                    orderCart.map((item, key) => (
                                                        <li key={key}>
                                                            <div className="cart-item-image">
                                                                <img src={item.file_image !==''? img+'pos/'+item.file_image:img+'title/'+item.title_image} alt="" />
                                                            </div>
                                                            <div className="cart-item-info">
                                                                <h4>{item.tile_name} {item.qty_baht + ' ' + item.option_name}</h4>
                                                                    <div className='text-dark'>ຈຳນວນ: {item.qty_order} {item.unite_name}</div>
                                                                <p className="price">{numeral(item.price_sale * item.qty_grams * item.qty_order).format('0,00')} ₭</p>
                                                            </div>
                                                            <div className="cart-item-close">
                                                                <a href="javascript:;" onClick={()=>removeCart(item.product_id_fk)} data-bs-toggle="tooltip" data-bs-title="Remove">&times;</a>
                                                            </div>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li>No items in the cart</li>
                                                )}
                                            </ul>
                                        </div>
                                        <div className="cart-footer">
                                            <div className="row gx-2">
                                                <div className="col-6">
                                                    <Link to={'/order'} className="btn btn-default btn-theme d-block">View Cart</Link>
                                                </div>
                                                <div className="col-6">
                                                    <Link to={'/order'} className="btn btn-dark btn-theme d-block">Checkout</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <Link to={'/account'} >
                                        <img src="./assets/img/logo/logo.png" className="user-img" alt />
                                        <span className="d-none d-xl-inline">Login / ລົງທະບຽນ</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
