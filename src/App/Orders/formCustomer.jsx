import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Config } from '../../config/connection';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import MenuPage from './MenuPage';

const FormCustomer = () => {
    const api = Config.urlApi;
    const customId = localStorage.getItem('customId');
    const navigate = useNavigate();
    const [values, setValues] = useState({
        customId: '',
        cus_fname: '',
        cus_lname: '',
        cus_dob: null,
        cus_address: '',
        cus_tel: '',
        email: '',
        card_number: '',
        file_doc: '',
        status_register: '3',
        cus_remark: ''
    });

    const handleChange = (name, value) => {
        setValues({
            ...values, [name]: value
        })
    }

    const [checkFile,setCheckFile]=useState(true)
    const [imageUrl, setImageUrl] = useState('');
    const handleSelectFile = (value) => {
        const file = value.target.files[0];
        setValues({
            ...values, file_doc: file
        })
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
            ...values, file_doc: ''
        })
      };





    const handleSumit = async (event) => {
        event.preventDefault();
        const inputData = new FormData();
        for (const key in values) {
            inputData.append(key, values[key]);
        }
        if(checkFile===false){
        try {
            const response = await axios.post(api + 'customer/register', inputData);
            if (response.status === 200) {
                toast.success('ຢືນຢັນ', response.data.message);
                localStorage.setItem('customId', response.data.customId);
                navigate('/payment');
            }
        } catch (error) {
            console.error('Error inserting data:', error);
            toast.error('ແຈ້ງເຕືອນ ການດຳເນິງານບໍ່ສຳເລັດ ');
        }
    }
    };

    const [itemcus, setItemCus] = useState({});
    const fetchCustomer = async () => {
        try {
            const response = await fetch(api + 'customer/' + customId);
            const jsonData = await response.json();
            setItemCus(jsonData);
            setValues({
                customId: jsonData.cus_uuid || '',
                cus_fname: jsonData.cus_fname || '',
                cus_lname: jsonData.cus_lname || '',
                cus_dob: jsonData.cus_dob || '',
                cus_address: jsonData.cus_address || '',
                cus_tel: jsonData.cus_tel || '',
                email: jsonData.email || '',
                card_number: jsonData.card_number || '',
                file_doc: jsonData.file_doc || '',
                status_register: '3', // Fixed status
                cus_remark: jsonData.cus_remark || ''
            });

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchCustomer();
        if (customId === '') {
            navigate('/order');
        }
    }, [])
    return (
        <>
            <div class="section-container " id="checkout-cart">
                <div class="container ">
                    <div class="checkout rounded-top-4">
                        <MenuPage />
                        <form onSubmit={handleSumit} class="form-horizontal">
                            <div class="checkout-body">
                                <div class="mb-2 row">
                                    <label class="col-form-label col-md-4 text-lg-end">
                                        ຊື່ລູກຄ້າ /First Name <span class="text-danger">*</span>
                                    </label>
                                    <div class="col-md-4 col-sm-8">
                                        <input type="text" class="form-control" value={values.cus_fname} onChange={(e) => handleChange('cus_fname', e.target.value)} placeholder='ຊື່ລູກຄ້າ /First Name' required />
                                    </div>
                                </div>
                                <div class="mb-2 row">
                                    <label class="col-form-label col-md-4 text-lg-end">
                                        ນາມສະກຸນ / Last Name <span class="text-danger">*</span>
                                    </label>
                                    <div class="col-md-4 col-sm-8">
                                        <input type="text" class="form-control" value={values.cus_lname} onChange={(e) => handleChange('cus_lname', e.target.value)} placeholder='ນາມສະກຸນ / Last Name' required />
                                    </div>
                                </div>
                                <div class="mb-2 row">
                                    <label class="col-form-label col-md-4 text-lg-end">
                                        ຊື່ທີ່ຢູ່ປະຈຸບັນ /Address Name <span class="text-danger">*</span>
                                    </label>
                                    <div class="col-md-8">
                                        <textarea class="form-control" value={values.cus_address} onChange={(e) => handleChange('cus_address', e.target.value)} placeholder='ຊື່ທີ່ຢູ່ປະຈຸບັນ /Address Name' required />
                                    </div>
                                </div>
                                <div class="mb-2 row">
                                    <label class="col-form-label col-md-4 text-lg-end">
                                        ໂທລະສັບຫຼັກ /Primary Phone <span class="text-danger">*</span>
                                    </label>
                                    <div class="col-md-4 col-sm-8">
                                        <input type="text" class="form-control" value={values.cus_tel} onChange={(e) => handleChange('cus_tel', e.target.value)} placeholder='020 99 999 999' required />
                                    </div>
                                </div>
                                <div class="mb-2 row">
                                    <label class="col-form-label col-md-4 text-lg-end">
                                        ອີເມວ /Email address
                                    </label>
                                    <div class="col-md-4 col-sm-8">
                                        <input type="email" class="form-control" value={values.email} onChange={(e) => handleChange('email', e.target.value)} placeholder='***@gmail.com' />
                                    </div>
                                </div>
                                <div class="mb-2 row">
                                    <label class="col-form-label col-md-4 text-lg-end">
                                        ເລກບັດປະຈຳຕົວ /ID card number <span class="text-danger">*</span>
                                    </label>
                                    <div class="col-md-4 col-sm-8">
                                        <input type="text" class="form-control mb-10px" value={values.card_number} onChange={(e) => handleChange('card_number', e.target.value)} placeholder='ເລກບັດປະຈຳຕົວ' required />
                                    </div>
                                </div>
                                <div class="mb-2 row">
                                    <label class="col-form-label col-md-4 text-lg-end">
                                        ອັບໂຫລດຮູບບັດ<span class="text-danger">*</span>
                                    </label>
                                    <div class="col-md-4 col-sm-8">
                                        {/* <input type="file" class="form-control" accept="image/*" name="file_doc" onChange={handleSelectFile} required={customId === '' ? true : false} /> */}
                                        <label role='button'>
                                            <input type="file" class="hide" accept="image/*" name="file_doc" onChange={handleSelectFile} required={customId === '' ? true : false} />
                                            <img src="./assets/img/logo/card-file.png" className={`h-50px border ${checkFile===true && 'border-red'}`} alt="" />
                                        </label>
                                        <span className='float-lg-end'>
                                            <img src={imageUrl===''?'/assets/img/logo/idcard.png':imageUrl} alt="" className='h-100px' />
                                            {imageUrl !=='' &&(
                                            <samp role='button' onClick={handleClearImage} className='align-top ms-1 text-red'><i class="fa-solid fa-circle-xmark fs-5"/></samp>
                                        )}
                                        </span>
                                        <p class="form-text mb-0 fs-12px text-muted f-w-600 mt-10px">ອັບໂຫລດຮູບບັດປະຈຳຕົວ ຫຼື ໜັງສືຜ່ານແດນ  /Upload a photo of your ID or passport</p>
                                    </div>
                                </div>
                                <div class="mb-2 row">
                                    <label class="col-form-label col-md-4 text-lg-end">
                                        ໝາຍເຫດ /Remark
                                    </label>
                                    <div class="col-md-8">
                                        <textarea class="form-control" value={values.cus_remark} onChange={(e) => handleChange('cus_remark', e.target.value)} placeholder='ໝາຍເຫດ /Remark' />
                                    </div>
                                </div>
                                <div class="mb-2 row">
                                    <label class="col-form-label col-md-4">
                                        &nbsp;
                                    </label>
                                    <div class="col-md-8">
                                        <div class="form-check">
                                            <input type="checkbox" class="form-check-input" value="1" />
                                            <label class="form-check-label" for="">
                                                ຢຶນຢັນການສັ່ງຊື້ /Confirm the order
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div class="mb-5px"><b>Purchase Policy</b></div>
                                <ul class="checkout-info-list">
                                    <li>ລາຍເຊັນອາດຈະຕ້ອງການສໍາລັບການສັ່ງຊື້</li>
                                    <li>ທ່ານສາມາດໂທນັດລວງໜ້າໃນການໄປຮັບສິນຄ້າທີ່ທ່ານໄດ້ມີການສັ່ງຊື້</li>
                                    <li>ການຄາດຄະເນການຈັດສົ່ງຂ້າງລຸ່ມນີ້ປະກອບມີການກະກຽມລາຍການແລະເວລາການຂົນສົ່ງ</li>
                                    <li>ພວກເຮົາອາດບໍ່ສະດວກໃນການຈັດສົ່ງໂດຍກົງໄປຫາທີ່ຢູ່ຂອງທ່ານ .</li>
                                </ul>
                            </div>
                            <div class="checkout-footer d-flex">
                                <Link to={'/order'} class="btn btn-white btn-theme me-auto border-3 border-gold rounded-pill"><i class="fa-solid fa-angles-left" /> ຍ້ອນກັບ</Link>
                                <button type="submit" class="btn btn-dark btn-theme ms-10px border-3 border-gold rounded-pill">{customId ===null ? 'ບັນທຶກຂໍ້ມູນ' : 'ແກ້ໄຂຂໍ້ມູນ'}  <i class="fa-solid fa-check"></i></button>
                                {customId !== null && (
                                    <Link to={'/payment'} class="btn btn-orange btn-theme ms-10px border-3 border-gold rounded-pill"><i class="fa-solid fa-angles-right" /></Link>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default FormCustomer;
