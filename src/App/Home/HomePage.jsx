import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TypeProduct from './TypeProduct';
import { Config } from '../../config/connection';
import numeral from 'numeral';
import { LineChart } from './chartPrice';
import axios from 'axios';
import SliderPattern from '../Pattern/sliderPattern';
import Recommended from './Recommended';
import ProductSlider from '../Products/ProductSlider';
function HomePage() {
  const api = Config.urlApi;
  // const [ip, setIp] = useState('');
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
  const navigate = useNavigate();
  const handlePattern = () => {
    navigate('/pattern');
  }

  useEffect(() => {
    fecthData()
    fetchOption();
    // fetch('https://api.ipify.org?format=json')
    // .then(response => response.json())
    // .then(data => setIp(data.ip))
    // .catch(error => console.error('Error fetching IP:', error));
  }, [])

  return (
    <>
      <div id="promotions" className="section-container bg-viengkham py-1 border-5 border-gold rounded-4 rounded-top-0 border-bottom ">
        <div className="container">
          <TypeProduct />
        </div>
      </div>
      <div id="trending-items" className="section-container pt-4">
        <div className="px-4 section">
          <div className="row ">
            <div className="col-lg-6 col-md-6 col-sm-6 mb-2">
              <div className="panel panel-inverse rounded-start  rounded-5 rounded-bottom">
                <div className="panel-heading bg-viengkham text-center border-5 border-gold border-bottom py-2">
                  <h4 className="panel-title fs-18px wrapper">
                  <div class="bg">ລາຄາຄຳປະຈຳວັນ </div>
                  <div class="fg">ລາຄາຄຳປະຈຳວັນ </div>
                    </h4>
                </div>
                <div className="panel-body">
                  <LineChart />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 mb-2">
              {itemData.map((item, index) =>
                <div className="panel panel-inverse rounded-start rounded-5  rounded-bottom" key={index}>
                  <div className="panel-heading bg-viengkham text-center border-5 border-gold border-bottom py-2">
                    <h4 className="panel-title wrapper fs-18px">
                    <div class="bg"> ລາຄາ {item.typeName} ວັນນີ້ </div>
                    <div class="fg"> ລາຄາ {item.typeName} ວັນນີ້ </div>
                      </h4>
                  </div>
                 
                  <div className="panel-body">
                    <table className='table'>
                      <tbody className='fs-18px'>
                        {(item.type_id_fk === 2 ? itemoPtion.slice(0, 1) : itemoPtion).map((val, key) =>
                          <tr key={key}>
                            <td className='text-end'>ລາຄາ 1 {val.option_name}:</td>
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
          <div className="text-center pt-0">
            <Link to={'/price'} className="section-btn fs-16px"><i className="fa fa-arrow-right "></i> ລາຄາຄຳຍ້ອນຫລັງ</Link>
          </div>
        </div>
      </div>

      <div id="promotions" className="section-container bg-component">
        <div className="section">
          <div className="container">
            <div className="section-titles"><span className='fs-16px'>** ສິນຄ້າແນະນຳ **</span> </div>
            <Recommended />

            <div className="text-center pt-0 pt-lg-0">
              <Link to={'/recomend'} className="section-btn fs-18px"><i className="fa fa-arrow-right"></i> ເບີ່ງສິນຄ້າທັງໝົດ...</Link>
            </div>
          </div>

        </div>
      </div>


      <div id="promotions" className="section-container bg-orange-100 p-0 ">
        <div className="container mb-2 mt-3">
          <div className="section-titles"><span className='fs-16px'>** -- ລາຍການຜະລິດຕະພັນ -- **</span> </div>
          <ProductSlider />
        </div>
      </div>

      <div id="promotions" className="section-container bg-viengkham p-0">
        <div className="promotion promotion-lg " style={{ background: "url(./assets/img/slider/shop-default/5.jpg) center 0px / cover no-repeat" }}>

          <div className="promotion-caption promotion-caption-inverse">
            <h4 className="promotion-title">ໜ້າຮ້ານຄຳ ນາງວຽງຄຳ</h4>
            <p className="promotion-desc">ອອກແບບພະລິດ ແລະຈຳໜາຍຄຳ ຮູບປະພັນ,ຄຳແທ່ງ ຫຼາຍຮູບແບບ </p>
          </div>
        </div>
      </div>

      <div id="promotions" className="section-container bg-viengkham">
        <div className="container">
          <h4 className="section-titles"><span role='button' onClick={() => handlePattern()} className='bg-white text-dark'>ພວກເຮົາມີ ລວດລາຍ ຫຼາຍແບບໃຫ້ທ່ານໄດ້ເລືອກ</span> </h4>
          <SliderPattern />
        </div>
      </div>
      <div class="ratio ratio-16x9 h-300px">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d884m!2d102.6143941!3d17.9652263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3124687d93c167f9%3A0x5577837f17076440!2sตลาดเช้า!5e0!3m2!1sth!2sth!4vUNIQUE_ID"
          class="h-300px"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>



    </>
  )
}

export default HomePage