import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap';
import numeral from 'numeral';
const ViewPattern = ({ show, handleClose, data, url }) => {

    return (
        <Modal size="lg rounded-3" show={show} onHide={handleClose}>
            <Modal.Header className='py-1 rounded-3 rounded-bottom-0' closeButton>
                <Modal.Title >ລວດລາຍລະອຽດ</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-0 rounded-3 text-white'>
                <div className="row">
                    <div className="col-sm-6  text-center">
                        <div className="image">
                            <img src={`${url}pattern/${data.pattern_img}`}
                                className='w-100'
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="bg-viengkham h-100">
                            <h4 className='px-3 py-2 '>ລາຍ: {data.pattern_name}</h4>
                            <hr className='mt-1' />
                            <table className='w-100'>
                                <tr>
                                    <td width={'20%'} className='text-end'>ລາຄາ:</td>
                                    <td className='px-3 fs-18px'>{numeral(data.pattern_pirce).format('0,00')} ₭</td>
                                </tr>
                                <tr>
                                    <td width={'20%'} className='text-end'>ປະເພດ:</td>
                                    <td className='px-3'>{data.tile_name}</td>
                                </tr>
                                <tr>
                                    <td width={'20%'} className='text-end'>ຫົວໜ່ວຍ:</td>
                                    <td className='px-3'>{data.option_name}</td>
                                </tr>
                                <tr>
                                    <td width={'20%'} className='text-end'>ໝາຍເຫດ:</td>
                                    <td className='px-3'>{data.pattern_remart}</td>
                                </tr>
                            </table>

                            <div className="section-container">
                                <h4 className="section-titles"><span>ຂໍ້ມູນຕິດຕໍ່</span></h4>
                                <ul className="sidebar-social-list text-white">
                                    <li><a href="https://www.facebook.com/profile.php?id=100064645995670" target="_blank" className='text-white'><i className="fab fa-facebook"></i></a></li>
                                    <li><a href="https://wa.me/02052160011?text=ສະບາຍດີ ຂ້ອຍສົນໃຈຄຳ ຂ້ອຍມາຈາກ ເວັບໄຊທ໌ເດີ ຂໍລາຍລະອຽດແດ່" target="_blank" className='text-white' rel="noopener noreferrer"><i class="fa-brands fa-whatsapp"></i></a></li>
                                    <li><a href="#" className='text-white'><i class="fa-solid fa-envelope"/></a></li>
                                    <li><a href="#" className='text-white'><i className="fab fa-instagram"></i></a></li>
                                </ul>
                                <p className='p-3'>ຜູ້ທີ່ສົນໃຈສາມາດສອບຖາມລາຍລະອຽດໄດ້ຕະຫຼອດ 14 ຊົ່ວໂມງ
                                    <br />
                                    Those interested can ask for details 14 hours a day
                                </p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </Modal.Body>

        </Modal>
    )
}

export default ViewPattern