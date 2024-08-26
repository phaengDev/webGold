import React,{useState,useEffect} from 'react'
import { Config,Urlimage } from '../../config/connection';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
export default function ProductSlider() {
    const api = Config.urlApi;
    const img=Urlimage.url;
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
    useEffect(() => {
        fetchTile()
    })
  return (
    <div className="container mb-2">
    {itemTiles.map((item, index) =>
    <>
      <h4 class="section-title clearfix mt-3">
            <span class="flex-1">
            {item.tile_name}
              <small>{item.title_detail}</small>
            </span>
            <div class="btn-group">
              <Link to={'/pos?p='+item.tile_uuid} className='fs-16px text-dark' ><i class="fa fa-angle-right fs-16px" /> ສິນຄ້າທັງໝົດ... </Link>
            </div>
          </h4>
          <div class="row gx-2 ">
          {item.product.slice(0, 6).map((val, key) =>
            <div class="col-lg-2 col-md-4 col-sm-6">
              <div class="item item-thumbnail">
                <Link to={'/detail-ps?V=' + val.product_uuid} class="item-image">
                  <img src={`${img}${val.file_image !== '' ? 'pos/' + val.file_image : 'title/' + item.title_image}`} alt />
                  <div class="discount">{val.qty_baht + '' + val.option_name}</div>
                </Link>
                <div class="item-info">
                  <h4 class="item-title">
                    <Link to={'/detail-ps?V=' + val.product_uuid}>{item.tile_name + ' ' + val.qty_baht + ' ' + val.option_name}</Link>
                  </h4>
                  <p class="item-desc">{val.porduct_detail}.</p>
                  <div class="item-price">{numeral(item.price_sale * val.grams).format('0,00.00')} ₭</div>
                </div>
              </div>
            </div>

          )}
          </div>
         
         </>
        
    )}
    </div>
  )
}
