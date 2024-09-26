import React from 'react';
import { Modal } from 'react-bootstrap';
import moment from 'moment';
import QRCode from "react-qr-code";
import numeral from 'numeral';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
const ViewInvoicePayment = ({ open, handleClose, data }) => {



  const downloadIMG = (fileName) => {
    const modalBody = document.querySelector('.modal-body'); // select the modal body content
    html2canvas(modalBody).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = fileName + '.png'; // specify image file name
      link.click();
    });
  };

  const downloadPDF = (fileName) => {
    const modalBody = document.querySelector('.modal-body');
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
    <>
      <Modal show={open} onHide={handleClose} size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered >
        <Modal.Header className='py-1' >
          <Modal.Title className='w-100 '>
            ລາຍລະອຽດການສັ່ງຊື້
            <div className='float-end'>
              <button onClick={() => downloadIMG(data.pay_sale_code)} className='btn btn-sm btn-primary me-2' ><i class="fa-solid fa-download" /> ຮູບ</button>
              <button onClick={() => downloadPDF(data.pay_sale_code)} className='btn btn-sm btn-danger' ><i class="fa-solid fa-download" /> PDF</button>
              <button onClick={handleClose} className='btn btn-sm btn-orange ms-2' ><i class="fa-solid fa-circle-xmark" /></button>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='row modal-body position-relative'>
          <div className="card-background " />
          <div className="col-2">
            <img src="./assets/img/logo/logo.png" width={'80%'} alt="" />
          </div>
          <div className="col-6 fs-14px">
            <div className='text-dark'>ຊື່ຮ້ານຄ້າ: ຮ້ານຄຳ ນາງວຽງຄຳ</div>
            <div className='text-dark'>ເບີໂທລະສັບ: 020 95 555 609</div>
            <div className='text-dark'>ທີ່ຢູ່ຮ້ານ: ຕະຫລາດເຊົ້າມໍຊັ້ນ2, ບ້ານ ຫັດສະດີ ,ເມືອງ ຈັນທະບູລີ</div>
            <div>ແຂວງ ນະຄອນຫຼວງວຽງຈັນ</div>
          </div>
          <div className="col-4 text-end">
            <div>No: {data.pay_sale_code}</div>
            <div>Date: {moment(data.paysale_date).format('DD/MM/YYYY')}</div>
            <div>Time: {moment(data.paysale_date).format('hh:mm:ss')}</div>
            <div className={`fs-16px ${data.status_pays === 1 ? 'text-red' : data.status_pays === 2 ? 'text-orange' : 'itext-green'}`} > {data.status_pays === 1 ? 'ຍັງບໍ່ໄດ້ຮັບການກວດສອບ' : data.status_pays === 2 ? 'ໄດ້ຮັບການກວດສອບແລ້ວ' : 'ການມອບຮັບສິນຄ້າສຳເລັດ'} </div>
          </div>
          <h3 className='text-center p-3'>ບິນມອບຮັບເງິນສົດ</h3>
          <table className='w-100 text-nowrap mt-3 fs-14px'>
            <tr>
              <td width={'5%'}>ຊື່ລຸກຄ້າ:</td>
              <td className='border-bottom'>{data.cus_fname} {data.cus_lname}</td>
              <td width={'5%'}>ເບິໂທລະສັບ:</td>
              <td className='border-bottom'>{data.cus_tel}</td>
              <td width={'5%'}>ທີ່ຢູ່ປະຈຸບັນ:</td>
              <td className='border-bottom'>{data.cus_address}</td>
            </tr>
          </table>

          <div class="table-responsive mt-3">
            <table className='table table-sm table-bordered align-middle text-nowrap'>
              <thead className='bg-viengkham'>
                <tr>
                  <th className='text-white text-center'>ລ/ດ</th>
                  <th className='text-white'>ລາຍການສິນຄ້າ</th>
                  <th className='text-white text-center'>ນຳໜັກ</th>
                  <th className='text-white text-center'>ຈຳນວນ</th>
                  <th className='text-white text-center'>ບັນຈຸ</th>
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
                        <td className="text-center">{item.qty_grams*item.qty_order} g</td>
                        <td className="text-end">
                          {numeral(item.price_sale * item.qty_order*item.qty_grams).format('0,00')}
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
          </div>

          <div className="col-6 text-center">
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "35%", width: "35%" }}
              value={data.pay_sale_uuid}
              viewBox={`0 0 256 256`} />
          </div>
          <div className="col-6">
            <table className='w-100 text-nowrap'>
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
            </table>
          </div>
          {data.status_pays === 3 && (
            <div className="px-4 p-3">
              <div className=" fs-16px text-green"> <i class="fa-solid fa-check"></i> ທ່ານໄດ້ມີການຮັບສິນຄ້າຈາກຮ້ານຄຳ ນາງວຽງຄຳ ແລ້ວ ເມືອວັນທີ: {moment(data.date_receiving).format('DD/MM/YYYY hh:mm:ss')}</div>
            </div>
          )}
          <h5>ໝາຍເຫດ.</h5>
          <ul className='px-3 ms-2'>
            <li> ລູກຄ້າຈະຕ້ອງດາວໂຫຼດໃບບິນເພື່ອເປັນຫຼັກຖານໃນການຮັບສິນຄ້າ ຖ້າບໍ່ມີໃບບິນຫຼື ລັກຖານການສັ່ງຊື້ຈະບໍ່ສາມາດໄປຮັບສິນຄ້າໄດ້</li>
            <li>ລູກຄ້າສາມາດຖືບິນນີ້ເຂົ້າມາຮັບສິນຄ້າຈາກທາງຮ້ານຄຳ ນາງວຽງຄຳ ເທົ່ານັ້ນ </li>
            <li>ຫ້າມບໍ່ໃຫ້ມີການລອກລຽນແບບເພື່ອມຮັບສິນຄ້າ ຖ້າພົບເຫັນຈະມີການດຳເນີນຕາມກົດໝາຍ </li>
            <li>ຂໍຂອບໃຈອຸດໜູນ ແລະ ໃຫ້ຄວາມໄວ້ວ່າງໃຈໃນຮ້ານຄຳ ນາງວຽງຄຳ ຂອງພວເຮົາ </li>
          </ul>
          <h5 className='text-center text-red'>ຂໍຂອບໃຈ ທີ່ໃຫ້ຄວາມໄວ້ວ່າງໃຈໃນຮ້ານຄຳ ນາງວຽງຄຳ </h5>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ViewInvoicePayment;
