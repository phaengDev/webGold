import React, { useState, useEffect } from 'react'
import { Config, Urlimage } from '../../config/connection'
import { Link, useLocation } from 'react-router-dom';
import SliderPattern from '../Pattern/sliderPattern';
import { toast } from 'react-toastify';
import numeral from 'numeral';
function ProductDetail() {
    const api = Config.urlApi;
    const img = Urlimage.url;
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const psId = searchParams.get('V');
    const [data, setData] = useState({});
    const [dataList, setDataList] = useState([])
    const fetchDatail = async () => {
        try {
            const response = await fetch(api + 'posd/single/' + psId);
            const jsonData = await response.json();
            setData(jsonData.dataps);
            setDataList(jsonData.list);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const [orderCart, setOrderCart] = useState(() => {
        const savedCart = localStorage.getItem('orderCart');
        return savedCart ? JSON.parse(savedCart) : [];
    });


    const handleAddOrder = (vals) => {
        setOrderCart(prevOrderCart => {
            const existingProduct = prevOrderCart.find(item => item.product_id_fk === vals.product_uuid);
            if (existingProduct) {
                const updatedCart = prevOrderCart.map(item =>
                    item.product_id_fk === vals.product_uuid
                        ? { ...item, qty_order: item.qty_order + 1 }
                        : item
                );
               toast.success('ການເພີ່ມໃສ່ກະຕ່າສຳເລັດ');
               localStorage.setItem('orderCart', JSON.stringify(updatedCart));
                return updatedCart;
            } else {
                const updatedCart = [...prevOrderCart, {
                    product_id_fk: vals.product_uuid,
                    code_id:vals.code_id,
                    qty_order: 1,
                    qty_baht:vals.qty_baht,
                    qty_grams:vals.grams,
                    option_id_fk:vals.option_id_fk,
                    option_name:vals.option_name,
                    price_sale:vals.price_sale,
                    tile_name:vals.tile_name,
                    tiles_id_fk:vals.tiles_id_fk,
                    title_image:vals.title_image,
                    file_image:vals.file_image,
                    typeName:vals.typeName,
                    unite_name:vals.unite_name
                     }];
               toast.success('ການເພີ່ມໃສ່ກະຕ່າສຳເລັດ');
               localStorage.setItem('orderCart', JSON.stringify(updatedCart));
                return updatedCart;
            }
        });
    };


    useEffect(() => {
        fetchDatail();
        
    }, [psId,orderCart])
    return (
        <>

            <div id="product" className="section-container pt-20px">
                <div className="container">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={'/'}>ໜ້າຫຼັກ</Link></li>
                        <li className="breadcrumb-item"><Link to={'/product'}>ລາຍການສິນຄ້າທັງໝົດ</Link></li>
                        <li className="breadcrumb-item"><Link to={`/pos?p=${data.tiles_id_fk}`}>{data.tile_name}</Link></li>
                        <li className="breadcrumb-item active">{data.tile_name} {data.qty_baht + ' ' + data.option_name}</li>
                    </ul>
                    <div className="product">
                        <div className="product-detail">
                            <div className="product-image">
                                <div className="product-thumbnail">
                                    <ul className="product-thumbnail-list">
                                        <li className="active  border-red border border-2 rounded-3"><a href="#" data-click="show-main-image" data-url={img + 'pos/' + data.file_image}><img src={img + 'pos/' + data.file_image} alt='' /></a></li>
                                        {dataList.map((val, index) => (
                                            <li><Link to={'/detail-ps?V=' + val.product_uuid} data-click="show-main-image" data-url={img + 'pos/' + val.file_image}><img src={img + 'pos/' + val.file_image} alt='' /></Link></li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="product-main-image" data-id="main-image">
                                    <img src={`${img}${data.file_image !== '' ? 'pos/' + data.file_image : 'title/' + data.title_image}`} alt />
                                </div>
                            </div>


                            <div className="product-info">
                                <div className="product-info-header">
                                    <h1 className="product-title">{data.tile_name} {data.qty_baht + ' ' + data.option_name} </h1>
                                    <ul className="product-category">
                                        <li><a href="#">{data.qty_baht + ' ' + data.option_name}</a></li>
                                        <li>/</li>
                                        <li><a href="#">{data.grams} Gram</a></li>
                                    </ul>
                                </div>

                                <div className="product-warranty">
                                    <div className="pull-right">{data.porduct_detail}</div>
                                </div>
                                <div className="product-info-list">
                                    <div className="pull-right">{data.title_detail}</div>
                                </div>
                                <div className="product-social">
                                    <ul>
                                        <li><a href="https://www.facebook.com/profile.php?id=100064645995670" className="facebook" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-title="Facebook" data-bs-placement="top"><i className="fab fa-facebook-f"></i></a></li>
                                        <li><a href="javascript:;" className="google-plus" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-title="Email" data-bs-placement="top"><i class="fa-solid fa-envelope"/></a></li>
                                        <li><a href="https://wa.me/8562095555609" target="_blank" className="whatsapp" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-title="Whatsapp" data-bs-placement="top"><i className="fab fa-whatsapp"></i></a></li>
                                        <li><a href="tel:+8562095555609" className="tumblr" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-title="call" data-bs-placement="top"><i class="fa-solid fa-phone"/></a> </li>
                                        <li><a href="https://www.tiktok.com/@vkgold888" className="bg-dark" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-title="Tiktok" data-bs-placement="top"><i class="fa-brands fa-tiktok"/></a></li>
                                    </ul>
                                </div>

                                <div className="product-purchase-container">
                                    <div className="product-price">
                                        <div className="price">{numeral(data.price_sale * data.grams).format('0,00')} ₭</div>
                                    </div>
                                    <a href="javascript:;" onClick={() => handleAddOrder(data)} className="btn btn-dark btn-theme border-3 border-gold rounded-pill btn-lg w-200px">ເພີ່ມໃສ່ກະຕ່າ</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h4 className="mb-15px mt-30px">ໝວດ {data.tile_name} </h4>
                    <div className="row gx-2">
                        {dataList.map((val, index) => (
                            <div className="col-lg-2 col-md-4 mb-2 col-6">
                                <div className="item item-thumbnail">
                                    <Link to={'/detail-ps?V=' + val.product_uuid} className="item-image">
                                        <img src={`${img}${val.file_image !== '' ? 'pos/' + val.file_image : 'title/' + val.title_image}`} alt='' />
                                        <div className="discount">{val.qty_baht + ' ' + val.option_name}</div>
                                    </Link>
                                    <div className="item-info">
                                        <h4 className="item-title">
                                            <Link to={'/detail-ps?V=' + val.product_uuid}>{val.tile_name} {val.qty_baht + ' ' + val.option_name}</Link>
                                        </h4>
                                        <p className="item-desc">{val.porduct_detail}</p>
                                        <div className="item-price">{numeral(val.price_sale * val.grams).format('0,00')} kip</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="py-4 bg-viengkham">
                <div className="container">
                    <div className="fs-20px text-center text-white">ການບໍລິການ ລວດລາຍ</div>
                    <SliderPattern />
                </div>
            </div>

        </>
    )
}

export default ProductDetail