import React from 'react'
import { Modal,Button } from 'react-bootstrap';
import { Urlimage } from '../../config/connection';
import numeral from 'numeral';
const ViewRecomend=({show,handleClose,item})=> {
    const img=Urlimage.url;
  return (
    <Modal show={show} size='lg' onHide={handleClose} className='modal-pos'>
        <Modal.Body className='modal-body p-0'>
        <a href="javascript:;" onClick={handleClose} class="btn-close position-absolute top-0 end-0 m-4"></a>
              <div class="modal-pos-product">
                <div class="modal-pos-product-img">
                  <div class="img" style={{ backgroundImage: `url(${img}pos/${item.recd_image})` }}></div>
                </div>
                <div class="modal-pos-product-info">
                  <div class="fs-4 fw-bold">{item.recomennde_name}
                    <h5>( {item.qty_baht+' '+ item.option_name})</h5>
                  </div>
                  <div class="fs-6 text-body text-opacity-50 mb-2">
                  {item.recd_remark}
                  </div>
                  <div class="fs-3 fw-bolder mb-3">{numeral(item.price_sale).format('0,00')} ₭</div>
                  <div class="option-row">
                    <div class="d-flex mb-3">
                      <a href="#" class="btn btn-default d-flex align-items-center"><i class="fa fa-minus"></i></a>
                      <input type="text" class="form-control w-30px fw-bold fs-5 px-0 mx-2 text-center border-0" name="qty" value="1" />
                      <a href="#" class="btn btn-default d-flex align-items-center"><i class="fa fa-plus"></i></a>
                    </div>
                  </div>
                <hr />
                  <div class="row gx-3">
                    <div class="col-4">
                      <a href="#" class="btn btn-default fs-14px rounded-3 fw-bold mb-0 d-block py-3" data-bs-dismiss="modal">Cancel</a>
                    </div>
                    <div class="col-8">
                      <a href="#" class="btn btn-red fs-14px rounded-3 fw-bold d-flex justify-content-center align-items-center py-3 m-0">Add to cart <i class="fa fa-plus ms-3"></i></a>
                    </div>
                  </div>
                </div>
              </div>
        </Modal.Body>
      </Modal>
  )
}

export default ViewRecomend