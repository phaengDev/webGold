import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Config, Urlimage } from '../../config/connection';
import moment from 'moment';
import axios from 'axios';
import { toast } from 'react-toastify';
function RegisterJob() {
    const api = Config.urlApi;
    const img = Urlimage.url;
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const jobId = atob(searchParams.get('j'));

    const [item, setItem] = useState({
        apply_job_title: '',
        apply_job_text: '',
        start_date: '',
        end_date: '',
        job_image: ''
    })

    const showJob = async () => {
        try {
            const response = await fetch(api + `job/single/${jobId}`);
            const data = await response.json();
            setItem({
                apply_job_title: data.apply_job_title,
                apply_job_text: data.apply_job_text,
                start_date: data.start_date,
                end_date: data.end_date,
                job_image: data.job_image
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    const [itemJob, setItemJob] = useState([]);
    const fetchApplyJob = async () => {
        try {
            const response = await fetch(api + 'job/');
            const jsonData = await response.json();
            setItemJob(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const [itemTiles, setItemTiles] = useState([]);
    const fetchTile = async () => {
        try {
            const response = await fetch(api + 'tileps/');
            const jsonData = await response.json();
            setItemTiles(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [dataRegis, setDataRegis] = useState({
        apply_job_fk: jobId,
        staff_name: '',
        staff_phone: '',
        staff_email: '',
        staff_address: '',
        staff_doct: ''
    })
    const handleChange = (name, value) => {
        setDataRegis({
            ...dataRegis, [name]: value
        })
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setDataRegis({
            ...dataRegis,
            staff_doct: file
        });
    };

    const resetForm = () => {
        setDataRegis({
            apply_job_fk: jobId,
            staff_name: '',
            staff_phone: '',
            staff_email: '',
            staff_address: '',
            staff_doct: ''
        });
    }
    const handleRegister = async (evnet) => {
        evnet.preventDefault();
        const inputData = new FormData();
        for (const key in dataRegis) {
            inputData.append(key, dataRegis[key]);
        }
        try {
            const response = await axios.post(api + 'job/register', inputData);
            if (response.status === 200) {
                toast.success('ການລົງທະບຽນສະໝັກງານສຳເລັດ ກະລຸນາລໍການຕອບກັບຈາກ ຮ້ານຄຳ ນາງວຽງຄຳ');
                setDataRegis({
                    apply_job_fk: jobId,
                    staff_name: '',
                    staff_phone: '',
                    staff_email: '',
                    staff_address: '',
                    staff_doct: ''
                })
            }
        } catch (error) {
            toast.error('ການລົງທະບຽນສະໝັກງານ ໄດ້ລົມເຫລວກະລຸນາລອງໃໝ່');
            console.error('Error inserting data:', error);
        }
    };

    useEffect(() => {
        fetchApplyJob()
        showJob();
        fetchTile();
    }, [jobId])
    return (
        <>
            <div id="content" className="content bg-component">
                <div className="container">
                    <div className="row gx-lg-5">
                        <div className="col-lg-9">
                            <div className="post-detail section-container">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to={'/'} >ໜ້າຫຼັກ </Link></li>
                                    <li className="breadcrumb-item"><Link to={'/job'} >ລາຍການຮັບສະໝັກງານ</Link></li>
                                    <li className="breadcrumb-item active">ລົງທະບຽນສະໝັກງານ</li>
                                </ul>
                                <h4 className="post-title">{item.apply_job_title} </h4>
                                <div className="post-desc">
                                    <div dangerouslySetInnerHTML={{ __html: item.apply_job_text }}></div>
                                </div>
                                <div className="post-image">
                                    <img src={`${img}job/${item.job_image}`} className=" w-100" alt='' />
                                </div>
                            </div>


                            <div className="section-container">
                                <h4 className="section-titles"><span>ລົງທະບຽນຮັບສະໝັກງານ</span></h4>
                                <div className="alert alert-warning mb-4 mt-4 f-s-13">
                                    ການລົງທະບຽນສະໝັກງານ ກະລຸນາປ້ອນ ຊື່ ແລະ ນາມສະກຸນ ທີ່ຢູ່ເບີໂທລະສັບທີ່ຖຶກຕ້ອງ
                                    ແລ້ວທາງຮ້ານຄຳ ນາງວຽງຄຳ ຈະຕິດຕໍ່ກັບພາຍໃນ 1-5 ວັນ
                                </div>
                                <form className="form-horizontal" onSubmit={handleRegister}>
                                    <div className="mb-3 row">
                                        <label className="col-form-label col-md-2 text-md-end">ຊື່ແລະນາມສະກຸນ <span className="text-danger">*</span></label>
                                        <div className="col-md-10">
                                            <input type="text" value={dataRegis.staff_name} onChange={(e) => handleChange('staff_name', e.target.value)} className="form-control" required />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-form-label col-md-2 text-md-end">ເບີລະສັບ <span className="text-danger">*</span></label>
                                        <div className="col-md-10">
                                            <input type="tel" value={dataRegis.staff_phone} onChange={(e) => handleChange('staff_phone', e.target.value)} className="form-control" required />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-form-label col-md-2 text-md-end">Email </label>
                                        <div className="col-md-10">
                                            <input type="text" value={dataRegis.staff_email} onChange={(e) => handleChange('staff_email', e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-form-label col-md-2 text-md-end">ລາຍລະອຽດ <span className="text-danger">*</span></label>
                                        <div className="col-md-10">
                                            <textarea className="form-control" value={dataRegis.staff_address} onChange={(e) => handleChange('staff_address', e.target.value)} placeholder='ບ້ານ,ເມືອງ,ແຂວງ.......' rows="5" required></textarea>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-form-label col-md-2 text-md-end">ເອກະສານແນບ <span className="text-danger">*</span></label>
                                        <div className="col-md-10">
                                            <input type='file' onChange={handleFileChange} className="form-control" accept="image/*.doc,.docx,.pdf,.jpg, .jpeg, .png" />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-md-4 col-6 offset-md-2">
                                            <button type="button" onClick={resetForm} className="btn btn-danger btn-lg w-100">ເລີ່ມໃໝ່</button>
                                        </div>
                                        <div className="col-md-6 col-6 ">
                                            <button type="submit" className="btn btn-dark btn-lg w-100">ບັນທຶກການສະໝັກງານ</button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>


                        <div className="col-lg-3 ">
                            <div className="sticky-lg-top-gold">
                                <div className="section-container">
                                    <h4 className="section-titles"><span>ລາຍການຂ່າວສານປະຈຳວັນ</span></h4>
                                    <ul className="sidebar-recent-post">
                                        {itemJob.slice(0, 10).map((item, key) => (
                                            <li>
                                                <div className="info">
                                                    <h4 className="title"><Link to={'/j?j=' + btoa(item.apply_job_id)}>{item.apply_job_title}</Link></h4>
                                                    <div className="date">{moment(item.start_date).format('DD/m/YYYY')}</div>
                                                </div>
                                            </li>
                                        ))}

                                    </ul>
                                </div>

                                <div className="section-container pt-0">
                                    <h4 className="section-titles"><span>ປະເພດພະລິດຕະພັນ</span></h4>
                                    <ul className="sidebar-list">
                                        {itemTiles.map((row, index) => (
                                            <li key={index} className='fs-15px'><Link to={'/pos?p=' + row.tile_uuid}><i class="fa-solid fa-angle-right" /> {row.tile_name} ({row.qty_stock})</Link></li>
                                        ))}
                                    </ul>
                                </div>



                                <div className="section-container">
                                    <h4 className="section-titles"><span>Follow Us</span></h4>
                                    <ul className="sidebar-social-list">
                                        <li><a href="#"><i className="fab fa-facebook"></i></a></li>
                                        <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                        <li><a href="#"><i className="fab fa-google-plus"></i></a></li>
                                        <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}

export default RegisterJob