import React, { useState, useEffect } from 'react'
import PageHeader from '../../Layout/page-header'
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Config } from '../../config/connection';
import moment from 'moment';
import numeral from 'numeral';
import ViewInvoicePayment from './View-invoice-payment';
function CheckOrderbuy() {
    const api = Config.urlApi;
    const [show, setShow] = useState(false);
    const [stsName, setStsName] = useState('ເລກທີບິນ');
    const [inputck, setInputck] = useState({
        statsus: 1,
        dataSearch: ''
    });

    const checkStatus = (lable, value) => {
        setInputck({
            ...inputck, statsus: value
        })
        setStsName(lable)
    }
    const handleChange = (value) => {
        setInputck({
            ...inputck, dataSearch: value
        })
    }

    const [messageName, setMessageName] = useState('')
    const handleSaerch = async () => {
        // console.log(inputck)
        try {
            const response = await axios.post(api + 'paysale/checkorder', inputck);
            if (response.status === 200) {
                toast.success('ຢືນຢັນ', response.data.message);
                localStorage.setItem('customId', response.data.cus_uuid);
                futechOrderBuy();
                setMessageName('');
                setShow(false)
            }
        } catch (error) {
            console.error('Error inserting data:', error);
            toast.error('ແຈ້ງເຕືອນ ການດຳເນິງານບໍ່ສຳເລັດ ');
            setMessageName('ຂໍ້ອະໄພ ບໍ່ພົບຂໍ້ມູນທີ່ທ່ານຊອກຫາ ກະລຸນາກວດຄືນແລ້ວລອງໃໝ່ອິກຄັ້ງ!')
        }
    }
    const customId = localStorage.getItem('customId');
    const BillNo = localStorage.getItem('BillNo')
    const [itemOrder, setItemOrder] = useState([]);
    const futechOrderBuy = async () => {
        try {
            const response = await fetch(api + 'paysale/fetchOrder/' + customId);
            if (!response.ok) {
                throw new Error('Network response was not ok');
                
            }
            const jsonData = await response.json();
            setItemOrder(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const [open, setOpen] = useState(false);
    const [itemData, setItemData] = useState({})
    const handleView = (data) => {
        setItemData(data)
        setOpen(true);
    }

    useEffect(() => {
        futechOrderBuy()
    }, [customId, BillNo])

    return (
        <>
            <PageHeader text={'ກວດສອບການສັ່ງຊື້'} />
            <div id="faq" class="section-container pt-2">
                <div class="container">
                    <ul class="breadcrumb mb-10px fs-14px">
                        <li class="breadcrumb-item"><a href="#">ໜ້າຫຼັກ</a></li>
                        <li class="breadcrumb-item">ກວດສອບການສັ່ງຊື້ </li>
                        <li class="breadcrumb-item">
                            <span className='fs-18px hover' onClick={() => setShow(true)} role='button'> <i className="fas fa-search"></i> </span>
                        </li>
                    </ul>
                    <div id="trending-items" className="section-container bg-white">
                        {itemOrder.length <= 0 ? (
                            <div className='text-center'>
                                <img src="./assets/img/vendor/milestone-2.png" alt="" />
                            </div>
                        ) : (<>
                            <h3 className='text-center p-1'>ປະຫວັດການສັ່ງຊື້ສິນຄ້າ</h3>
                            <div class="table-responsive">
                                <table className='table table-striped table-bordered align-middle table-hover text-nowrap'>
                                    <thead className='bg-viengkham'>
                                        <tr>
                                            <th className='text-white text-center'>ລ/ດ</th>
                                            <th className='text-white text-center'>ວັນທີສັ່ງຊື້</th>
                                            <th className='text-white text-center'>ເລກທີບິນ</th>
                                            <th className='text-white text-end'>ລວມຍອດ</th>
                                            <th className='text-white'>ຊື່ຜູ້ຖືບັດ</th>
                                            <th className='text-white'>ເລກທີ່ການໂອນ</th>
                                            <th className='text-white text-center'>ເອກະສານໂອນ</th>
                                            <th className='text-white'>ເບີ່ງລາຍລະອຽດ</th>
                                            <th className='text-white text-center'>ສະຖານະ</th>
                                            <th className='text-white text-center'>#</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {itemOrder.map((item, index) => (
                                            <tr className='text-red'>
                                                <td className='text-center'>{index + 1}</td>
                                                <td className='text-center'>{moment(item.paysale_date).format('DD/MM/YYYY')}</td>
                                                <td className='text-center'>{item.pay_sale_code}</td>
                                                <td className='text-end'>{numeral(item.balance_gold).format('0,00')}</td>
                                                <td>{item.cardholder_name}</td>
                                                <td>{item.transfer_number}</td>
                                                <td className='text-center'><a href="javascript:;" className='link-page'><i class="fa-solid fa-image" /> ໄຟລ໌...</a></td>
                                                <td>{item.pays_remark}</td>
                                                <td className={`text-center ${item.status_pays === 1 ? 'text-danger' : item.status_pays === 2 ? 'text-orange' : 'text-green'}`}>{item.status_pays === 1 ? 'ຍັງບໍ່ໄດ້ຮັບການກວດສອບ' : item.status_pays === 2 ? 'ໄດ້ຮັບການກວດສອບແລ້ວ' : 'ສິນຄ້າຈັດສົ່ງສຳເລັດ'}</td>
                                                <td className='text-center'><a href="javascript:;" onClick={() => handleView(item)} className='fs-5'><i class="fa-solid fa-eye"></i></a></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>)}
                    </div>
                </div>
            </div>
            <ViewInvoicePayment
                open={open}
                handleClose={() => setOpen(false)}
                data={itemData}
            />

            <Modal show={show} onHide={() => setShow(false)} size="lg"
                aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header className='py-1 bg-viengkham text-white' closeButton>
                    <Modal.Title> ກວດສອບການສັ່ງຊື້</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <DropdownButton variant="outline-secondary" title={stsName}>
                            <Dropdown.Item onClick={() => checkStatus('ເລກທີບິນ', 1)} >ເລກທີບິນ</Dropdown.Item>
                            <Dropdown.Item onClick={() => checkStatus('ເບິໂທລະສັບ', 2)}><i class="fa-solid fa-phone"/> ເບິໂທລະສັບ</Dropdown.Item>
                        </DropdownButton>
                        <Form.Control placeholder="ພີມເລກທີບບິນ" onChange={(e) => handleChange(e.target.value)} aria-label="ພີມເລກທີບບິນ" />
                        <Button onClick={handleSaerch} variant="outline-danger"> <i className="fas fa-search"></i> </Button>
                    </InputGroup>
                    <p className='text-center text-red'>{messageName}</p>
                    <p className='text-center'>----------- ພີມເລກທີບບິນ ທີ່ມີການສັ່ງຊື້ -----------</p>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CheckOrderbuy