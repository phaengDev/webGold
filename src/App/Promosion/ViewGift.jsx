import React from 'react'
import Modal from 'react-bootstrap/Modal';
import numeral from 'numeral';
const ViewGift = ({ item, show, handleClose, imgUrl }) => {
    return (
        <Modal size='lg' show={show} onHide={handleClose} className='modal-pos'>

            <Modal.Body className='modal-body p-0'>
                <a href="javascript:;" onClick={handleClose} className="btn-close position-absolute top-0 end-0 m-4"></a>
                <div className="modal-pos-product p-0">
                    <div className="modal-pos-product-img p-0">
                        <div className="img w-100">
                            <img src={`${imgUrl}gift/${item.gift_img}`} className='w-100' alt="" />
                        </div>
                    </div>

                    <div className="modal-pos-product-info ">
                        <div className="fs-4 fw-bold">{item.gift_name}
                        </div>
                        <div className="fs-6 text-body text-opacity-50 mb-2">
                            {item.gift_text}
                        </div>
                        <div className="fs-3 fw-bolder mb-3">{numeral(item.gift_price).format('0,00')} ₭</div>
                        <div className="section-container">
                    <h4 className="section-titles"><span>ຂໍ້ມູນຕິດຕໍ່ ຮ້ານຄຳ ນາງວຽງຄຳ</span></h4>
                    <ul className="sidebar-social-list text-dark">
                                    <li><a href="https://www.facebook.com/profile.php?id=100064645995670" target="_blank" className=''><i className="fab fa-facebook"></i></a></li>
                                    <li><a href="https://wa.me/02095555609" target="_blank" className='' rel="noopener noreferrer"><i className="fa-brands fa-whatsapp"></i></a></li>
                                    <li><a href="#" className=''><i className="fa-solid fa-envelope"/></a></li>
                                    <li><a href="#" className=''><i class="fa-brands fa-tiktok"></i></a></li>
                                </ul>
                    </div>
                    </div>
                   
                </div>
            </Modal.Body>

        </Modal>
    )
}

export default ViewGift