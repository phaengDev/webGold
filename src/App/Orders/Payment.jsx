import React, { useEffect, useState } from 'react';
import moment from 'moment';
import MenuPage from './MenuPage';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import numeral from 'numeral';
import { Config } from '../../config/connection';
const Payment = () => {
    const api = Config.urlApi;
    const customId = localStorage.getItem('customId');
    const navigate = useNavigate();

    const hanldeSubmit = async (event) => {
        event.preventDefault();
        console.log(values);
        // return;
        const inputData = new FormData();
        for (const key in values) {
            inputData.append(key, values[key]);
        }
        if(checkFile===false){
        try {
            const response = await axios.post(api + 'paysale/payment', inputData);
            if (response.status === 200) {
                toast.success('ຢືນຢັນ', response.data.message);
                localStorage.setItem('idPayment', response.data.id);
                localStorage.removeItem('orderCart');
                navigate('/invoice');
            }
        } catch (error) {
            console.error('Error inserting data:', error);
            toast.error('ແຈ້ງເຕືອນ ການດຳເນິງານບໍ່ສຳເລັດ ');
        }
    }else{
        toast.warning('ແຈ້ງເຕືອນ ກະລຸນາເລືອກເອກະສານການໂອນ ');
    }
    };

    const [orderCart, setOrderCart] = useState([]);
   
    const [values, setValues] = useState({
        pay_sale_uuid: "",
        custom_id_fk: customId,
        cardholder_name: "",
        transfer_number: "",
        date_transfer: new Date(),
        balance_gold: 0,
        balance_discount: 0,
        file_transfer: "",
        pays_remark: "",
        status_pays: 1,
        confrim_user_id: "",
        confrim_barnce_id: "",
        detailPays:[]
    });
    const [totalOrder,setTotalOrder]=useState(0)
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('orderCart')) || [];
        setOrderCart(savedCart);
    }, []);
    
    useEffect(() => {
        const totalSum = orderCart.reduce((total, item) => {
            return total + (item.price_sale * item.qty_grams * item.qty_order);
        }, 0);
        setTotalOrder(totalSum)
        setValues((prevValues) => ({
            ...prevValues,
            balance_gold: totalSum,
            detailPays: orderCart
        }));
    }, [orderCart]);


    const handleChange = (name, value) => {
        setValues({
            ...values, [name]: value
        })
    }


    const [checkFile,setCheckFile]=useState(true)
    const [imageUrl, setImageUrl] = useState('');
    const handleSelectFile = (e) => {
        const file = e.target.files[0];
        setValues({
            ...values, file_transfer: file
        });
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
            setCheckFile(false)
          }
    }


    const handleClearImage = () => {
        setImageUrl('')
        setCheckFile(true)
        setValues({
            ...values, file_transfer: ''
        })
      };



    return (
        <>
            <div class="section-container " id="checkout-cart">
                <div class="container ">
                    <div class="checkout rounded-top-4">
                        <MenuPage />
                        <form onSubmit={hanldeSubmit}>
                            <div class="checkout">
                                <div class="checkout-body">
                                    <h4 class="checkout-title">ເລືອກວິທີການຊໍາລະເງິນ</h4>
                                    <div class="mb-2 row">
                                        <label class="col-md-4 col-form-label text-lg-end">ຊື່ຜູ້ຖືບັດ /Cardholder Name <span class="text-danger">*</span></label>
                                        <div class="col-md-6">
                                            <input type="text" class="form-control required" onChange={(e) => handleChange('cardholder_name', e.target.value)} placeholder='ຊື່ຜູ້ຖືບັດ /Cardholder Name' required />
                                        </div>
                                    </div>
                                    <div class="mb-2 row">
                                        <label class="col-md-4 col-form-label text-lg-end">ໝາຍເລກການໂອນ/Transfer number <span class="text-danger">*</span></label>
                                        <div class="col-md-6">
                                            <input type="text" class="form-control required" onChange={(e) => handleChange('transfer_number', e.target.value)} placeholder='XXX-XXXX-XXXX' required />
                                        </div>
                                    </div>

                                    <div class="mb-2 row">
                                        <label class="col-md-4 col-form-label text-lg-end">ວັນທິ ແລະ ເວລາໂອນ /Date and time <span class="text-danger">*</span></label>
                                        <div class="col-md-6">
                                            <input type="datetime-local" value={moment(values.date_transfer).format('YYYY-MM-DD hh:mm:ss')} onChange={(e) => handleChange('date_transfer', e.target.value)} class="form-control required  " />
                                        </div>
                                    </div>

                                    <div class="mb-2 row">
                                        <label class="col-md-4 col-form-label text-lg-end">ໝາຍເຫດ <span class="text-danger">*</span></label>
                                        <div class="col-md-6 d-flex align-items-center">
                                            <textarea rows={4} onChange={(e) => handleChange('pays_remark', e.target.value)} placeholder='ໝາຍເຫດ.....' class="form-control required " required />
                                        </div>
                                    </div>
                                    <div class="mb-2 row">
                                        <label class="col-md-4 col-form-label text-lg-end">ສະລິບການໂອນ <span class="text-danger">*</span></label>
                                        <div class="col-md-6 d-flex align-items-center">
                                            <label className='btn btn-primary'><i class="fa-solid fa-image"/> ສະລິບໂອນ...
                                            <input type="file"  accept="image/*" onChange={handleSelectFile} class="hide"  />
                                            </label>
                                            {imageUrl !=='' &&(
                                            <div className='w-150px pays ms-5'>
                                                <img src={imageUrl} alt="" className='w-150px' />
                                                <span className='top-right ms-1 text-red' onClick={handleClearImage} role='button'><i class="fa-solid fa-circle-xmark fs-4"/></span>
                                            </div>
                                            )}
                                            <hr />
                                        </div>
                                        {checkFile===true  &&(
                                            <div className='col-sm-8 text-end text-red'>! ກະລຸນາເລືອກລັກຖານການໂອນ</div>
                                        )}
                                    </div>
                                    <hr />
                                    <div className="table-responsive mt-4 ">
                                        <table className='table table-striped table-bordered align-middle '>
                                            <thead className='bg-viengkham'>
                                                <tr>
                                                    <th className='text-white text-center'>ລ/ດ</th>
                                                    <th className='text-white'>ລາຍການ</th>
                                                    <th className='text-white'>ບັນຈຸ</th>
                                                    <th className='text-white text-end'>ລາຄາ</th>
                                                    <th className='text-white text-center'>ຈຳນວນ</th>
                                                    <th className='text-white text-end'>ລວມເງິນ</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orderCart.map((item, index) => (
                                                    <tr>
                                                        <td className='text-center'>{index + 1}</td>
                                                        <td className='title'>{item.tile_name} {item.qty_baht + ' ' + item.option_name} </td>
                                                        <td className='text-center'>{item.qty_grams} Gram</td>
                                                        <td class="text-end">
                                                            {numeral(item.price_sale * item.qty_grams ).format('0,00')} ₭
                                                        </td>
                                                        <td className='text-center'>{item.qty_order} {item.unite_name}</td>
                                                        <td class="text-end bg-green-200">
                                                            {numeral(item.price_sale * item.qty_grams * item.qty_order).format('0,00')} ₭
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot>
                                                <tr className=''>
                                                    <td colSpan={5} className='text-end'> ລວມຍອດ</td>
                                                    <td className='text-end bg-green-300'>{numeral(totalOrder).format('0,00')} K</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>

                                <div class="checkout-footer d-flex">
                                    <Link to={'/regiter'} class="btn btn-white btn-theme me-auto border-3 border-gold rounded-pill"><i class="fa-solid fa-angles-left" /> ຍ້ອນກັບ</Link>
                                    <button type="submit" class="btn btn-dark btn-theme border-3 border-gold rounded-pill">ບັນທຶກການໂອນ</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Payment