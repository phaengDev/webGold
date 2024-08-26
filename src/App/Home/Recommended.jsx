import React, { useState, useEffect } from 'react'
import { Config, Urlimage } from '../../config/connection'
import numeral from 'numeral';
import ViewRecomend from '../Promosion/ViewRecomend';
function Recommended() {
    const api = Config.urlApi;
    const img = Urlimage.url;
    const [show, setShow] = useState(false);
    const [itemRecomende, setItemRecomende] = useState([]);
    const fetchRecomende = async () => {
        try {
            const response = await fetch(api + 'recd/');
            const jsonData = await response.json();
            setItemRecomende(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        fetchRecomende();
    }, [])
    const [data, setData] = useState({})
    const ViewRecom = (data) => {
        setData(data)
        setShow(true)
    }
    return (
        <div className="row gx-2 mb-5">
            {itemRecomende.slice(0, 12).map((item, index) => (
                <div className="col-lg-3 col-md-4 col-sm-6 col-6 mb-2">
                    <div className="item item-thumbnail ">
                        <a href="javascript:;" onClick={() => ViewRecom(item)} className="item-image w-100 p-0">
                            <img src={`${img}pos/${item.recd_image}`} className="d-block w-100" alt="" />
                            <div className="discount">{item.tile_name}</div>
                        </a>
                        <div className="item-info ">
                            <h4 className="item-title">
                                <a href="javascript:;"><strong className='fs-18px'> {item.recomennde_name}</strong><br />
                                    ( {item.qty_baht + ' ' + item.option_name})
                                </a>
                            </h4>
                            <p className="item-desc text-cust">{item.recd_remark}</p>
                            <div className="item-price ">{numeral(item.price_sale*item.qty_baht).format('0,00')} ₭</div>
                        </div>
                    </div>
                </div>
            ))}
            <ViewRecomend
                show={show}
                handleClose={() => setShow(false)}
                item={data}
            />
        </div>
    )
}

export default Recommended