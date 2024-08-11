import React, { useState, useEffect } from 'react'
import PageHeader from '../../Layout/page-header'
import { Config, Urlimage } from '../../config/connection';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Commet } from 'react-loading-indicators';
import numeral from 'numeral';
import ViewPattern from './ViewPattern';
export default function PatternPages() {
    const api = Config.urlApi;
    const img = Urlimage.url;

    const [valuepat, setValuepat] = useState({
        type_id_fk: '',
        title_id_fk: '',
        option_id_fk: ''
    })


    const [isloading, setIsLoading] = useState(true);
    const [itemPattern, setItemPattern] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 20;

    const fetchPattern = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${api}pattern/`, valuepat);
            setItemPattern(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPattern();
    }, [valuepat]); // Fetch pattern when valuepat changes

    useEffect(() => {
        // Reset the item pattern whenever the page changes
        setCurrentPage(1);
    }, [itemPattern]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(itemPattern.length / limit);
    const paginatedItems = itemPattern.slice((currentPage - 1) * limit, currentPage * limit);

    // ==================
    const [show, setShow] = useState(false);
    const [viewItem,setViewItem]=useState({})
    const handleView=(data)=>{
        setViewItem(data)
        console.log(viewItem)
        setShow(true)
    }
    return (
        <>
            <PageHeader text={'ລວດລາຍ ພະລິດຕະພັນ ຮ້ານຄຳ ນາງວຽງຄຳ'} />

            <div id="promotions" class="section-container bg-component  pt-20px" >
                <div class="container">
                    <ul className="breadcrumb fs-16px">
                        <li className="breadcrumb-item"><Link to={'/'}>ໜ້າຫຼັກ</Link></li>
                        <li className="breadcrumb-item active">ລາຍການລວດລາຍ</li>
                    </ul>
                    <div class="row gx-2 mb-0 mt-3 row-space-10">
                        {isloading === true ? (
                            <div className='col-sm-12 text-center'>
                                <Commet color="#e91717" size="large" text="ກຳລັງໂຫລດ..." textColor="#f12424" />
                            </div>
                        ) : (
                            <>
                                {paginatedItems.map((val, index) =>
                                    <div key={index} class="col-lg-3 col-md-4 col-sm-6 mb-2">
                                        <div class="item news item-thumbnail overflow-hidden shadow-lg mb-5 mb-lg-0">
                                            <div className="news-media mb-0" onClick={()=>handleView(val)} role='button'>
                                                <div className="news-media-img h-25"
                                                    style={{ backgroundImage: `url(${img}pattern/${val.pattern_img})` }}
                                                />
                                            </div>
                                            {/* <img className="d-block w-100" src={`${img}pattern/${val.pattern_img}`} alt={''} /> */}
                                            <div className="item-info text-start">
                                                <h4 className="item-title">
                                                    {val.pattern_name}
                                                </h4>
                                                <p className="item-desc">{val.tile_name}</p>
                                                <div className="item-price">{numeral(val.pattern_pirce).format('0,00')} ₭</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {itemPattern.length > limit && (
                            <div className="col-lg-12 mb-2">
                                <div className="pagination-container">
                                    <ul className="pagination justify-content-center">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                                Prev
                                            </button>
                                        </li>
                                        {[...Array(totalPages)].map((_, index) => (
                                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                                <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                                    {index + 1}
                                                </button>
                                            </li>
                                        ))}
                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                                                Next
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}

                    </div>
                </div>


                <ViewPattern
                show={show}
                handleClose={()=>setShow(false)}
                data={viewItem}
                url={img}
                />
            </div>

        </>
    )
}
