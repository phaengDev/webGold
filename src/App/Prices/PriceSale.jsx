import React, { useState, useEffect } from 'react'
import PageHeader from '../../Layout/page-header'
import axios from 'axios';
import { Config } from '../../config/connection';
import numeral from 'numeral';
import { LineChart } from '../Home/chartPrice';
import moment from 'moment';
function PriceSale() {
    const api = Config.urlApi;

    const [datasch, setDatasch] = useState({
        typeId: '',
    })
    const [itemData, setItemData] = useState([]);
    const fecthData = async () => {
        try {
            const response = await axios.post(api + 'price/', datasch);
            setItemData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [itemoPtion, setItemoPtion] = useState([]);
    const fetchOption = async () => {
        try {
            const response = await fetch(api + 'type/option');
            const jsonData = await response.json();
            setItemoPtion(jsonData);
        } catch (error) {
            setItemoPtion([])
        }

    }
    const [active, setActive] = useState(1);
    const handleType = (index) => {
        setActive(index)
    }

    const [itemPrice,setItemPrice]=useState([]);
    const fetchPrices= async()=>{
        try {
            const response = await fetch(api + 'price/uprice/'+active);
            const jsonData = await response.json();
            setItemPrice(jsonData);
            console.log(jsonData)
        } catch (error) {
            setItemPrice([])
        }
    }

    useEffect(() => {
        fecthData()
        fetchOption();
        fetchPrices();
    }, [active])
   
    return (
        <>
            <PageHeader text={'ລາຄາປະຈຳວັນ'} />
            <div id="promotions" className="section-container ">
                <div className="px-4">
                    <div className="row ">
                        <div className="col-lg-6 col-md-6 col-sm-6 mb-2">
                            <div className="panel panel-inverse rounded-start rounded-5 rounded-bottom">
                                <div className="panel-heading bg-viengkham text-center">
                                    <h4 className="panel-title fs-18px">ລາຄາຄຳປະຈຳວັນ</h4>
                                </div>
                                <div className="panel-body">
                                    <LineChart />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 mb-2">
                            {itemData.map((item, index) =>
                                <div className="panel panel-inverse rounded-start rounded-5 rounded-bottom" key={index}>
                                    <div className="panel-heading bg-viengkham text-center">
                                        <h4 className="panel-title fs-18px">ລາຄາ {item.typeName} ວັນນີ້</h4>
                                    </div>
                                    <div className="panel-body">
                                        <table className='table'>
                                            <tbody className='fs-18px'>
                                                {(item.type_id_fk === 2 ? itemoPtion.slice(0, 1) : itemoPtion).map((val, key) =>
                                                    <tr key={key}>
                                                        <td>ລາຄາ 1 {val.option_name}:</td>
                                                        <td><i className="fa-solid fa-arrow-up-short-wide fs-4 text-red " /> : <strong >{numeral(item.price_sale * val.grams).format('0,00')}</strong> ₭</td>
                                                        <td><i className="fa-solid fa-arrow-down-wide-short fs-4 text-green" /> : <strong >{numeral(item.price_buy * val.grams).format('0,00')}</strong>  ₭</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
            <div className='section-container bg-component'>
                <div className="container">
                    <h4 className="section-titles fs-16px"><span className={`me-3 ${active === 1 ? '' : 'bg-gold text-dark'}`} onClick={() => handleType(1)} role='button'>ອັບເດດລາຄາຊື້ຂາຍຄຳ ຮູບປະພັນ</span> <span className={`me-3 ${active === 2 ? '' : 'bg-gold text-dark'}`} onClick={() => handleType(2)} role='button'>ອັບເດດລາຄາຊື້ຂາຍຄຳແທ່ງ</span></h4>

                    <table className='table table-striped table-bordered align-middle text-nowrap'>
                        <thead className='bg-viengkham '>
                            <tr className=''>
                                <th className='text-white text-center' width="5%" rowSpan={2}>ລ/ດ</th>
                                <th className='text-white text-center' rowSpan={2}>ວັນທີ</th>
                                <th className='text-white text-center' colSpan={2}>ລາຄາຊື້ເຂົ້າ</th>
                                <th className='text-white text-center' colSpan={2}>ລາຄາຂາຍອອກ</th>
                                <th className='text-white text-center' width='5%' rowSpan={2}>#</th>
                            </tr>
                            <tr>
                                <th className='text-white text-end'>ຍອດ <i className="fa-solid fa-caret-up text-gold" /> <i className="fa-solid fa-caret-down text-green" /></th>
                                <th className='text-white text-end'>ລາຄາຊື້</th>
                                <th className='text-white text-end'>ຍອດ <i className="fa-solid fa-caret-up text-gold" /> <i className="fa-solid fa-caret-down text-green" /></th>
                                <th className='text-white text-end'>ລາຄາຂາຍ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemPrice.map((item,key)=>(
                            <tr>
                                <td className='text-center'>{key+1}</td>
                                <td className='text-center'>{moment(item.update_date).format('DD/MM/YYYY hh:mm')}</td>
                                <td className={`text-end ${item.buy > 0 ?'text-red': item.buy < 0 ?'text-green':''}`}>{item.buy > 0 ? '+':'' } {numeral(item.buy*item.grams).format('0,00.00')} </td>
                                <td className='text-end'>{numeral(item.price_buy_new*item.grams).format('0,00.00')} ₭</td>
                                <td className={`text-end ${item.sale > 0 ?'text-red': item.sale < 0 ?'text-green':''}`}>{item.sale > 0 ? '+':'' } {numeral(item.sale*item.grams).format('0,00.00')} {item.sale > 1 ?(<i className="fa-solid fa-caret-up text-red" />):item.sale < 0 ?(<i className="fa-solid fa-caret-down text-green" />) :''} </td>
                                <td className='text-end'>{numeral(item.price_sale_new*item.grams).format('0,00.00')} ₭</td>
                                <td className='text-center'>{item.price_img !=='' &&(<span role='button' className='text-red fs-18px'><i className="fa-solid fa-images"></i></span>)}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default PriceSale