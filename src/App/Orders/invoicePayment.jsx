import React, { useEffect, useState } from 'react'
import MenuPage from './MenuPage';
import { Config } from '../../config/connection';
import moment from 'moment';
import QRCode from "react-qr-code";
import Barcode from 'react-barcode';
import numeral from 'numeral';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
export default function InvoicePayment() {
    const api = Config.urlApi;
    const idInvoice = localStorage.getItem('idPayment');
    const [data, setData] = useState({});
    const fetchPayment = async () => {
        const idInvoice = localStorage.getItem('idPayment'); // Fetch the ID from localStorage
        try {
            const response = await fetch(api + 'paysale/invoice/' + idInvoice);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            console.log(jsonData);
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchPayment();
    }, [])


    const downloadIMG = (fileName) => {
        const modalBody = document.querySelector('.checkout-body'); // select the modal body content

        html2canvas(modalBody).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = fileName + '.png'; // specify image file name
            link.click();
        });
    };

    const downloadPDF = (fileName) => {
        const modalBody = document.querySelector('.checkout-body');

        html2canvas(modalBody).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(fileName + '.pdf'); // specify PDF file name
        });
    };
    return (
        <div class="section-container " id="checkout-cart">
            <div class="container ">
                <div class="checkout rounded-top-4">
                    <MenuPage />
                    <div class="checkout-body position-relative">

                        <div className="card-background " />
                        <div className="row">
                            <div className="col-1">
                                <div id="logo">
                                    <img src="./assets/img/logo/logo.png" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div class="clearfix">
                                    <div>ຮ້ານຄຳ ນາງວຽງຄຳ</div>
                                    <div>ເບີໂທລະສັບ (020) 95 555 609</div>
                                    <div>ທີ່ຕັ້ງ ຕະຫລາດເຊົ້າມໍຊັ້ນ2, ບ້ານ ຫັດສະດີ ,ເມືອງ ຈັນທະບູລີ</div>
                                    <div>- ແຂວງ ນະຄອນຫຼວງວຽງຈັນ</div>
                                </div>
                            </div>

                            <div className="col-5 text-end">
                                <div id="project fs-15px">
                                    <div>No: {data.pay_sale_code}</div>
                                    <div>Date: {moment(data.paysale_date).format('DD/MM/YYYY')}</div>
                                    <div>Time: {moment(data.paysale_date).format('hh:mm:ss')}</div>
                                    <div className={`fs-16px ${data.status_pays === 1 ? 'text-red' : data.status_pays === 2 ? 'text-orange' : 'text-green'}`} > {data.status_pays === 1 ? 'ຍັງບໍ່ໄດ້ຮັບການກວດສອບ' : data.status_pays === 2 ? 'ໄດ້ຮັບການກວດສອບແລ້ວ' : 'ການມອບຮັບສິນຄ້າສຳເລັດ'} </div>
                                </div>
                            </div>


                        </div>
                        <h3 className='text-center p-3'>ບິນມອບຮັບເງິນສົດ</h3>
                        <table className='w-100 text-nowrap mt-3 mb-2 fs-14px'>
                            <tr>
                                <td width={'5%'}>ຊື່ລຸກຄ້າ:</td>
                                <td className='border-bottom'>{data.cus_fname} {data.cus_lname}</td>
                                <td width={'5%'}>ເບິໂທລະສັບ:</td>
                                <td className='border-bottom'>{data.cus_tel}</td>
                                <td width={'5%'}>ທີ່ຢູ່ປະຈຸບັນ:</td>
                                <td className='border-bottom'>{data.cus_address}</td>
                            </tr>
                        </table>
                        <table className='table table-striped table-bordered align-middle '>
                            <thead className='bg-viengkham'>
                                <tr>
                                    <th className='text-white text-center'>ລ/ດ</th>
                                    <th className='text-white'>ລາຍການສິນຄ້າ</th>
                                    <th className='text-white text-center'>ນຳໜັກ</th>
                                    <th className='text-white text-center'>ຈຳນວນ</th>
                                    <th className='text-white text-center'>ບັນຈຸ (gram)</th>
                                    <th className='text-white text-end'>ລວມລາຄາ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(data?.dataList) && data.dataList.length > 0 ? (
                                    <>
                                        {data.dataList.map((item, index) => (
                                            <tr key={index}>
                                                <td className="text-center">{index + 1}</td>
                                                <td>{item.tile_name}</td>
                                                <td className="text-center">{item.qty_grams + ' ' + item.option_name}</td>
                                                <td className="text-center"> {item.qty_order} {item.unite_name}  </td>
                                                <td className="text-center">{item.qty_grams * item.qty_order} g</td>
                                                <td className="text-end">
                                                    {numeral(item.price_sale * item.qty_order * item.qty_grams).format('0,00')}
                                                </td>
                                            </tr>
                                        ))}

                                        {data.dataList.length < 4 &&
                                            Array.from({ length: 4 - data.dataList.length }).map((_, index) => (
                                                <tr key={`empty-${index}`}>
                                                    <td className="text-center">{data.dataList.length + index + 1}</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            ))}
                                    </>
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">
                                            No data available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className="row">
                            <div className="col-6 text-center">
                                <QRCode
                                    size={256}
                                    style={{ height: "auto", maxWidth: "30%", width: "30%" }}
                                    value={idInvoice}
                                    viewBox={`0 0 256 256`} />

                                <p className='w-80px mt-3 text-center'>
                                    <Barcode value={idInvoice}
                                        displayValue={false}
                                        height={50}
                                        width={1}
                                        margin={0.1} />
                                </p>

                            </div>
                            <div className="col-6">
                                <table className='w-100 text-nowrap mb-2'>
                                    <tr>
                                        <td className='text-end'>ລວມຍອດທັງໝົດ:</td>
                                        <td className='text-end'>{numeral(data.balance_gold).format('0,00')} ₭</td>
                                    </tr>
                                    <tr>
                                        <td className='text-end'>ສ່ວນຫຼຸດ:</td>
                                        <td className='text-end'>{numeral(data.balance_discount).format('0,00')} ₭</td>
                                    </tr>
                                    <tr>
                                        <td className='text-end'>ລວມເງິນ:</td>
                                        <td className='text-end'>{numeral(data.balance_gold - data.balance_discount).format('0,00')} ₭</td>
                                    </tr>
                                    <tr>
                                        <td className='text-end text-blue'>ຊື່ບັນຊີ:</td>
                                        <td className=''>{data.cardholder_name}</td>
                                    </tr>
                                    <tr>
                                        <td className='text-end text-blue'>ເລກທີ່ການໂອນ:</td>
                                        <td className=''>{data.transfer_number}</td>
                                    </tr>
                                    <tr>
                                        <td className='text-end text-blue'>ວັນທີໂອນ:</td>
                                        <td className=''>{data.transfer_number}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2} className=''>ໝາຍເຫດ:  {data.pays_remark}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                        <h5><b>ໝາຍເຫດ:</b></h5>
                        <ul className='px-3 ms-2'>
                            <li> ລູກຄ້າຈະຕ້ອງດາວໂຫຼດໃບບິນເພື່ອເປັນຫຼັກຖານໃນການຮັບສິນຄ້າ ຖ້າບໍ່ມີໃບບິນຫຼື ລັກຖານການສັ່ງຊື້ຈະບໍ່ສາມາດໄປຮັບສິນຄ້າໄດ້</li>
                            <li>ລູກຄ້າສາມາດຖືບິນນີ້ເຂົ້າມາຮັບສິນຄ້າຈາກທາງຮ້ານຄຳ ນາງວຽງຄຳ ເທົ່ານັ້ນ </li>
                            <li>ຫ້າມບໍ່ໃຫ້ມີການລອກລຽນແບບເພື່ອມຮັບສິນຄ້າ ຖ້າພົບເຫັນຈະມີການດຳເນີນຕາມກົດໝາຍ </li>
                            <li>ຂໍຂອບໃຈອຸດໜູນ ແລະ ໃຫ້ຄວາມໄວ້ວ່າງໃຈໃນຮ້ານຄຳ ນາງວຽງຄຳ ຂອງພວເຮົາ </li>
                        </ul>
                        <h5 className='text-center text-red'>ຂໍຂອບໃຈ ທີ່ໃຫ້ຄວາມໄວ້ວ່າງໃຈໃນຮ້ານຄຳ ນາງວຽງຄຳ </h5>

                    </div>

                    <div className="text-center p-3">
                        <button onClick={() => downloadIMG(data.pay_sale_code)} className='btn btn-sm btn-primary me-2' ><i class="fa-solid fa-download" /> ຮູບ</button>
                        <button onClick={() => downloadPDF(data.pay_sale_code)} className='btn btn-sm btn-danger' ><i class="fa-solid fa-download" /> PDF</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
