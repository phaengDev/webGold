import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TypeProduct from './TypeProduct';
import { Config } from '../../config/connection';
import numeral from 'numeral';
import { LineChart } from './chartPrice';
import axios from 'axios';
import SliderPattern from '../Pattern/sliderPattern';
import Recommended from './Recommended';
function HomePage() {
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
  useEffect(() => {
    fecthData()
    fetchOption();
  }, [])



  return (
    <>
      <div id="promotions" className="section-container bg-viengkham py-1 border-5 border-gold rounded-4 rounded-top-0 border-bottom ">
        <div className="container">
          <TypeProduct />
        </div>
      </div>
      <div id="trending-items" class="section-container pt-4">
        <div class="container section">
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
          <div class="text-center pt-2 pt-0">
            <Link to={'/price'} class="section-btn fs-16px"><i class="fa fa-arrow-right "></i> ລາຄາຄຳຍ້ອນຫລັງ</Link>
          </div>
        </div>
      </div>




      <div id="promotions" className="section-container bg-component">
        <div class="section">
          <div class="container">
            <div class="section-titles"><span className='fs-16px'>** ສິນຄ້າແນະນຳ **</span> </div>
            <Recommended />

            <div class="text-center pt-5 pt-lg-0">
              <Link to={'/recomend'} class="section-btn fs-18px"><i class="fa fa-arrow-right"></i> ເບີ່ງສິນຄ້າທັງໝົດ</Link>
            </div>
          </div>

        </div>
      </div>


      <div id="promotions" className="section-container bg-viengkham p-0">
        <div class="promotion promotion-lg " style={{ background: "url(./assets/img/vendor/1721383923210.jpeg) center 0px / cover no-repeat" }}>

          <div class="promotion-caption promotion-caption-inverse">
            <h4 class="promotion-title">iPhone 12</h4>
            <div class="promotion-price"><small>from</small> $1,299.00</div>
            <p class="promotion-desc">A big step for small.<br />A beloved design. Now with more to love.</p>
            <a href="#" class="promotion-btn">View More</a>
          </div>
        </div>

      </div>

      <div id="promotions" className="section-container">
        <div className="container">
          <h4 className="section-titles"><span>ພວກເຮົາມີ ລວດລາຍ ຫຼາຍແບບໃຫ້ທ່ານໄດ້ເລືອກ</span> </h4>
          <SliderPattern />
        </div>
      </div>

     
      
    </>
  )
}

export default HomePage