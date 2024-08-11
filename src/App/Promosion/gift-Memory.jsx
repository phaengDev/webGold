import React, { useState, useEffect } from 'react'
import PageHeader from '../../Layout/page-header'
import { Link } from 'react-router-dom';
import { Config } from '../../config/connection';
import axios from 'axios';
import numeral from 'numeral';
import { Commet } from 'react-loading-indicators';
import SliderType from '../Products/SliderType';
function GiftMemory() {

    const api = Config.urlApi;
  
    const [isloading, setIsLoading] = useState(true);
    const [itemGift, setItemGift] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 50;
    const fetchGift = async () => {
      try {
        const response = await fetch(api + 'gift/');
        const jsonData = await response.json();
        setItemGift(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false)
      }
    }
  
  
  
    const [values, setValues] = useState({
      type_id_fk: '',
      title_id_fk: '',
      option_id_fk: ''
    })
    const [itemPattern, setItemPattern] = useState([]);
    const fetchPattern = async () => {
      try {
        const response = await axios.post(api + 'pattern/', values);
        const jsonData = response.data;
        setItemPattern(jsonData);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false)
      }
    }
  
    useEffect(() => {
      fetchPattern();
      fetchGift(currentPage);
    }, [currentPage])
  
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
    const totalPages = Math.ceil(itemGift.length / limit);
    const paginatedItems = itemGift.slice((currentPage - 1) * limit, currentPage * limit);
  
    // ==================
    const chunkArray = (array, size) => {
      const chunkedArray = [];
      for (let i = 0; i < array.length; i += size) {
        chunkedArray.push(array.slice(i, i + size));
      }
      return chunkedArray;
    };
    const chunkedProducts = chunkArray(itemPattern, 6);
  
  
  return (
    
    <>
      <PageHeader text={'ຂອງຂວັນ ຂອງຝາກທີ່ລະລຶກ ຂອງແຖມ'} />

      <div id="promotions" class="section-container bg-component  pt-20px" >
        <div class="container">
          <ul className="breadcrumb fs-18px">
            <li className="breadcrumb-item"><Link to={'/'}>ໜ້າຫຼັກ</Link></li>
            <li className="breadcrumb-item active">ລາຍການຂອງຂວັນ ຈາກຮ້ານຄຳ ນາງວຽງຄຳ</li>
          </ul>
          <div class="row gx-2 mb-0 mt-3">
            {isloading === true ? (
              <div className='col-sm-12 text-center'>
                <Commet color="#e91717" size="large" text="ກຳລັງໂຫລດ..." textColor="#f12424" />
              </div>
            ) : (
              <>
                {paginatedItems.map((val, index) =>
                  <div key={index} class="col-lg-2 col-md-4 col-sm-6 mb-2">
                    <div class="item item-thumbnail">
                      <Link to={'/d-gift?d=' + val.gift_id}><img className="d-block w-100" src="./assets/img/pos/m-1.jpg" alt /></Link>
                      <div class="item-info text-start">
                        <h4 class="item-title">
                          <Link to={'/d-gift?d=' + val.gift_id}>{val.gift_name}</Link>
                        </h4>
                        <p class="item-desc">{val.gift_text}</p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {itemGift.length > 50 && (
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
      </div>




      <div id="work" class="content" data-scrollview="true">
        <div class="container" data-animation="true" data-animation-type="animate__fadeInDown">

          <div id="promotions" className="section-container ">
            <div className="container">
              <div id="carousel-post" className="carousel slide" data-ride="carousel">
                <h4 className="section-title clearfix">
                  <span className="flex-1">
                    ລວດລາຍ ທີ່ເປັນເອກະລັກໃນຮ້ານຂອງພວດເຮົາ
                  </span>
                  <div className="btn-group">
                    <a href="#carousel-post" className="btn" role="button" data-bs-slide="prev"><i className="fa fa-angle-left fs-16px"></i></a>
                    <a href="#carousel-post" className="btn" role="button" data-bs-slide="next"><i className="fa fa-angle-right fs-16px"></i></a>
                  </div>
                </h4>
                <div className="carousel-inner2">
                  {chunkedProducts.map((group, groupIndex) => (
                    <div key={groupIndex} className={`carousel-item ${groupIndex === 0 ? 'active' : ''}`} >
                      <div className="row row-space-10 gx-2">
                        {group.map((item, itemIndex) => (
                          <div className="col-lg-2 col-md-4 col-sm-6 mb-2">
                            {/* <div className="item item-thumbnail">
                              <Link to={'/pat-detail?d=' + item.pattern_id} className="item-image p-0">
                                <img src="./assets/img/pos/m-4.jpg" className='w-100 ' alt />
                                <div className="discount">{item.option_name}</div>
                              </Link>
                              <div className="item-info text-start">
                                <h4 className="item-title">
                                  <Link to={'/pat-detail?d=' + item.pattern_id}>{item.pattern_name}</Link>
                                </h4>
                                <p className="item-desc">{item.tile_name}</p>
                                <div className="item-price">{numeral(item.pattern_pirce).format('0,00')} ₭</div>
                              </div>
                            </div> */}
                            <div className="item item-thumbnail work">
                              <div class="image">
                                <a href="#"><img className='d-block w-100' src="./assets/img/pos/m-1.jpg" alt="Work 1" /></a>
                              </div>
                              <div class="desc">
                                <span class="desc-title">Aliquam molestie</span>
                                <span class="desc-text">Lorem ipsum dolor sit amet</span>
                              </div>
                            </div>
                          </div>
                        ))}
                        

                      </div>
                    </div>
                  ))}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


<SliderType/>
      <div id="policy" class="section-container bg-component">
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-4 mb-4 mb-md-0">
              <div class="policy">
                <div class="policy-icon"><i class="fa fa-truck"></i></div>
                <div class="policy-info">
                  <h4>Free Delivery Over $100</h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
              </div>

            </div>


            <div class="col-lg-4 col-md-4 mb-4 mb-md-0">
              <div class="policy">
                <div class="policy-icon"><i class="fa fa-umbrella"></i></div>
                <div class="policy-info">
                  <h4>1 Year Warranty For Phones</h4>
                  <p>Cras laoreet urna id dui malesuada gravida. <br />Duis a lobortis dui.</p>
                </div>
              </div>

            </div>


            <div class="col-lg-4 col-md-4">
              <div class="policy">
                <div class="policy-icon"><i class="fa fa-user-md"></i></div>
                <div class="policy-info">
                  <h4>6 Month Warranty For Accessories</h4>
                  <p>Fusce ut euismod orci. Morbi auctor, sapien non eleifend iaculis.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default GiftMemory