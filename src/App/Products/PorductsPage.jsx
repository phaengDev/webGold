import React, { useState, useEffect } from 'react'
import PageHeader from '../../Layout/page-header'
import { Config, Urlimage } from '../../config/connection';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../Layout/Loading';
import axios from 'axios';
import numeral from 'numeral';
import SliderPattern from '../Pattern/sliderPattern';
// import TypeProduct from '../Home/TypeProduct';
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

    // const chunkedProducts = chunkArray(itemProduct, 4);

    // const pageNumbers = [];
    // for (let i = 1; i <= Math.ceil(itemProduct.length / itemsPerPage); i++) {
    //     pageNumbers.push(i);
    // }
    return (
        <>
            <PageHeader text={'ລາຍການພະລິດຕະພັນທັງໝົດ'} />

            {loading ? (
                <div className="text-center">
                    <Loading
                        size="large"
                        text="ກຳລັງໂຫລດ..."
                        textColor="#f12424" // Set the image source here
                    />
                </div>
            ) : (
                itemProduct.map((item, key) =>
                    <div id="mobile-list" class={`section-container ${key === 0 ? '' : 'pt-1'}`}>

                        <div className="container ">
                            <h4 className="section-title clearfix">
                                <span className="flex-1">
                                    {item.tile_name}
                                    <small>{item.title_detail}</small>
                                </span>
                                <Link to={'/pos?p=' + item.tile_uuid} className="btn">ສະແດງທັງໝົດ  <i className="fa-solid fa-angle-right" /></Link>
                            </h4>
                            <div className="category-container">
                                <div className="category-sidebar">
                                    <ul className="category-list">
                                        <li className="list-header">Top Categories</li>
                                        {item.product.slice(0, 10).map((val, index) => (
                                            <li key={index}><Link to={'/detail-ps?V=' + val.product_uuid}><i className="fa-solid fa-angle-right"></i> {item.tile_name + ' ' + val.qty_baht + '' + val.option_name}</Link></li>
                                        ))}

                                    </ul>
                                </div>


                                <div className="category-detail">
                                    <Link to={'/pos?p=' + item.tile_uuid} className="category-item full">
                                        <div className="item">
                                            <div className="item-cover">
                                                <img src={`${img}title/${item.title_image}`} alt />
                                            </div>
                                            <div className="item-info bottom">

                                                <h4 className="item-title">{item.tile_name}</h4>
                                                <p className="item-desc">{item.title_detail}</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <div className="category-item list">
                                        {item.product.slice(0, 6).reduce((acc, val, index) => {
                                            if (index % 3 === 0) acc.push([]);
                                            acc[acc.length - 1].push(val);
                                            return acc;
                                        }, []).map((group, groupIndex) => (

                                            <div className="item-row" key={groupIndex}>
                                                {group.map((product, productIndex) => (
                                                    <div className="item item-thumbnail" key={productIndex}>
                                                        <Link to={'/detail-ps?V=' + product.product_uuid} className="item-image">
                                                            <img src={`${img}${product.file_image !== '' ? 'pos/' + product.file_image : 'title/' + item.title_image}`} alt="" />
                                                            <div className="discount">{product.qty_baht + '' + product.option_name}</div>
                                                        </Link>
                                                        <div className="item-info">
                                                            <h4 className="item-title">
                                                                <Link to={'/detail-ps?V=' + product.product_uuid} className='fs-16px'>{item.tile_name + ' ' + product.qty_baht + ' ' + product.option_name}<br />({product.grams} g)</Link>
                                                            </h4>
                                                            <p className="item-desc">{product.porduct_detail}</p>
                                                            <div className="item-price">{numeral(item.price_sale * product.grams).format('0,00')} ₭</div>
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


            <div id="trending-items" className="section-container bg-viengkham">
                <div className="container ">
                    <h4 className="section-title clearfix">
                        <span className="flex-1 text-white">
                          ລວດລາຍ ແລະ ການບໍລິການ ທາງຮ້ານຄຳ ນາງວຽງຄຳ
                        </span>
                    </h4>
                <SliderPattern />
                </div>
            </div>
        </>
    )
}

export default PorductsPage