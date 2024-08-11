import React, { useState, useEffect } from 'react'
import { Config, Urlimage } from '../../config/connection'
import numeral from 'numeral';
import Loading from '../../Layout/Loading';
import ViewRecomend from './ViewRecomend';
import { useTitle } from '../../config/select-option';
import axios from 'axios';
import PageHeader from '../../Layout/page-header';
export default function RecomendePage() {
  const api = Config.urlApi;
  const img = Urlimage.url;

  const itemTiles = useTitle();

  const [show, setShow] = useState(false);
  const itemsPerPage = 24;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemRecomende, setItemRecomende] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataFilter, setDataFilter] = useState([]);
  const fetchRecomende = async () => {
    try {
      const response = await fetch(api + 'recd/');
      const jsonData = await response.json();
      setItemRecomende(jsonData);
      setDataFilter(jsonData)
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false)
    }
  }

  const handleFilter = (event) => {
    setItemRecomende(dataFilter.filter(n => n.recomennde_name.toLowerCase().includes(event)))
  }

  const [idFilter, setIdFilter] = useState('')

  const handleFilterType = (event) => {
    setIdFilter(event)
    setItemRecomende(dataFilter.filter(n => n.title_id_fk.toLowerCase().includes(event)))
  }


  const [valuepat, setValuepat] = useState({
    type_id_fk: '',
    title_id_fk: idFilter,
    option_id_fk: ''
  })


  const [itemPattern, setItemPattern] = useState([]);
  const fetchPattern = async () => {
    try {
      const response = await axios.post(api + 'pattern/', valuepat);
      setItemPattern(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchPattern();
    fetchRecomende();
  }, [])



  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = itemRecomende.slice(indexOfFirstItem, indexOfLastItem);

  // ==================
  const chunkArray = (array, size) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  };

  const chunkedProducts = chunkArray(currentItems, 3);
  const chunkedPattern = chunkArray(itemPattern, 6);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(itemRecomende.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const [data, setData] = useState({})
  const ViewRecom = (data) => {
    setData(data)
    setShow(true)
  }
  return (
    <>
      <PageHeader text={'ລາຍກນສິນຄ້າແນະນຳທັງໝົດ'} />
      <div id="search-results" class="section-container">
        <div class="container">
          <div class="search-container">
            <div class="search-sidebar">
              <h4 class="title mb-0 fs-18px">ປະເພດສິນຄ້າແນະນຳ</h4>
              <ul class="search-category-list">
                {itemTiles.map((val, index) =>
                  <li className=''><a href="javascript:;" onClick={() => handleFilterType(val.tile_uuid)} className={`fs-16px ${idFilter === val.tile_uuid && 'text-red'}`}><i class="fa-solid fa-angle-right" /> {val.tile_name} </a></li>
                )}
                <li><a href="javascript:;" onClick={() => handleFilterType('')} className={`fs-16px ${idFilter === '' && 'text-red'}`}><i class="fa-solid fa-angle-right" /> -- ທັງໝົດ -- </a></li>
              </ul>
            </div>


            <div class="search-content">
              <div class="search-toolbar">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="position-relative  flex-fill pe-3">
                      <button type="button" class="btn btn-default btn-lg position-absolute start-0 height-50px bg-none border-0"><i class="fa fa-search fa-fw"></i></button>
                      <input type="text" class="form-control form-control-lg ps-5 fs-14px fw-bold  rounded-3 height-50px" onChange={(e) => handleFilter(e.target.value)} placeholder="ຄົ້ນຫາຊື່ສິນຄ້າ..." />
                    </div>
                  </div>
                  <div class="col-lg-6 text-end">
                    <ul class="sort-list">
                      <li class="text"><i class="fa fa-filter"></i> Sort by:</li>
                      <li class="active"><a href="#">Popular</a></li>
                      <li><a href="#">New Arrival</a></li>
                      <li><a href="#">Discount</a></li>
                      <li><a href="#">Price</a></li>
                    </ul>
                  </div>

                </div>

              </div>

              <div class="search-item-container">

                {loading ? (
                  <div className="text-center p-4">
                    <Loading
                      size="large"
                      text="ກຳລັງໂຫລດ..."
                      textColor="#f12424" // Set the image source here
                    />
                  </div>
                ) : (
                  chunkedProducts.map((group, groupIndex) => (
                    <div className="item-row" key={groupIndex}>
                      {group.map((item, itemIndex) => (
                        <div className="item item-thumbnail" key={itemIndex}>
                          <a href='javascript:;' onClick={() => ViewRecom(item)} className="item-image p-0 ">
                            <img src={`${img}pos/${item.recd_image}`} className='w-100 ' alt="" />
                            <div className="discount">{item.qty_baht + ' ' + item.option_name}</div>
                          </a>
                          <div className="item-info">
                            <h4 className="item-title">
                              <a href='javascript:;' ><strong className='fs-15px'> {item.recomennde_name} </strong>
                              </a>
                            </h4>
                            <p className="item-desc  text-cust">{item.recd_remark}</p>
                            <div className="item-price">{numeral(item.price_sale).format('0,00')} ₭</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )))}
              </div>


              <ul className="pagination justify-content-center mt-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <a href="javascript:;" className="page-link" onClick={() => setCurrentPage(currentPage - 1)}><i class="fa-solid fa-angle-left" /></a>
                </li>
                {pageNumbers.map(number => (
                  <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                    <a href="javascript:;" className="page-link" onClick={() => setCurrentPage(number)}>{number}</a>
                  </li>
                ))}
                <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
                  <a href="javascript:;" className="page-link" onClick={() => setCurrentPage(currentPage + 1)}><i class="fa-solid fa-angle-right" /></a>
                </li>
              </ul>

            </div>

          </div>

        </div>
        <ViewRecomend
          show={show}
          handleClose={() => setShow(false)}
          item={data}
        />



        <div id="promotions" className="section-container bg-component">
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
                {chunkedPattern.map((group, groupIndex) => (
                  <div key={groupIndex} className="carousel-item active">
                    <div className="row  gx-2">
                      {group.map((item, itemIndex) => (
                        <div key={itemIndex} className="col-lg-2 col-md-4 col-sm-6 mb-2">
                          <div className="item item-thumbnail">
                            <a href="javascript:;" className="item-image">
                              <img src={`${img}pattern/${item.pattern_img}`} alt={''} />
                              <div className="discount">{item.option_name}</div>
                            </a>
                            <div className="item-info">
                              <h4 className="item-title">
                                {item.pattern_name}
                              </h4>
                              <p className="item-desc">{item.tile_name}</p>
                              <div className="item-price">{numeral(item.pattern_pirce).format('0,00')} ₭</div>
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
    </>
  )
}
