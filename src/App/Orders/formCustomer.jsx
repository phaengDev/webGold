import React from 'react'

const FormCustomer = ({ handleNext }) => {
    return (
        <>
            <form class="form-horizontal">
                <div class="checkout-body">
                    <div class="mb-2 row">
                        <label class="col-form-label col-md-4 text-lg-end">
                           ຊື່ລູກຄ້າ /First Name <span class="text-danger">*</span> 
                        </label>
                        <div class="col-md-4">
                            <input type="text" class="form-control" name="first_name"  placeholde=' ຊື່ລູກຄ້າ /First Name' />
                        </div>
                    </div>
                    <div class="mb-2 row">
                        <label class="col-form-label col-md-4 text-lg-end">
                        ນາມສະກຸນ / Last Name <span class="text-danger">*</span>
                        </label>
                        <div class="col-md-4">
                            <input type="text" class="form-control" name="last_name"  placeholder='ນາມສະກຸນ / Last Name' />
                        </div>
                    </div>
                    <div class="mb-2 row">
                        <label class="col-form-label col-md-4 text-lg-end">
                            ຊື່ທີ່ຢູ່ປະຈຸບັນ /Address Name <span class="text-danger">&nbsp;</span>
                        </label>
                        <div class="col-md-8">
                            <textarea class="form-control" name="company_name"  placeholder='ຊື່ທີ່ຢູ່ປະຈຸບັນ /Address Name' />
                        </div>
                    </div>
                    <div class="mb-2 row">
                        <label class="col-form-label col-md-4 text-lg-end">
                            ອາຍຸ /Age <span class="text-danger">*</span>
                        </label>
                        <div class="col-md-4">
                            <input type="number" class="form-control" name="area_code"  placeholder='ອາຍຸ /Age' />
                        </div>
                    </div>
                    <div class="mb-2 row">
                        <label class="col-form-label col-md-4 text-lg-end">
                        ໂທລະສັບຫຼັກ /Primary Phone <span class="text-danger">*</span>
                        </label>
                        <div class="col-md-4">
                            <input type="text" class="form-control" name="primary_phone"  placeholder='020 99 999 999' />
                        </div>
                    </div>
                    <div class="mb-2 row">
                        <label class="col-form-label col-md-4 text-lg-end">
                        ອີເມວ /Email address <span class="text-danger">*</span>
                        </label>
                        <div class="col-md-4">
                            <input type="text" class="form-control" name="primary_phone"  placeholder='***@gmail.com' />
                        </div>
                    </div>
                    <div class="mb-2 row">
                        <label class="col-form-label col-md-4 text-lg-end">
                            ເລກບັດປະຈຳຕົວ /ID card number <span class="text-danger">*</span>
                        </label>
                        <div class="col-md-4">
                            <input type="text" class="form-control mb-10px" name="address_1"  placeholder='ເລກບັດປະຈຳຕົວ' />
                        </div>
                    </div>
                    <div class="mb-2 row">
                        <label class="col-form-label col-md-4 text-lg-end">
                            ອັບໂຫລດຮູບບັດ<span class="text-danger">*</span>
                        </label>
                        <div class="col-md-4">
                            <input type="file" class="form-control" name="zip_code"  placeholder />
                            <p class="form-text mb-0 fs-12px text-muted f-w-600 mt-10px">ອັບໂຫລດຮູບບັດປະຈຳຕົວ ຫຼື ໜັງສືຜ່ານແດນ  /Upload a photo of your ID or passport</p>
                        </div>
                    </div>
                    <div class="mb-2 row">
                        <label class="col-form-label col-md-4">
                            &nbsp;
                        </label>
                        <div class="col-md-4">
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="business_address" name="business_address" value="1" />
                                <label class="form-check-label" for="business_address">
                                ຢຶນຢັນການສັ່ງຊື້ /Confirm the order
                                    <a href="#" class="ms-5px text-muted" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" data-title="This helps us choose the best shipping method for you. Business shipments are normally delivered on weekdays by 5:00 p.m. local time. Residential shipments are normally delivered Monday - Saturday by 8:00 p.m. local time.">
                                        <i class="fa fa-question-circle"></i>
                                    </a>
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
                    <a href="javascript:;"
                        onClick={() => handleNext(1)} class="btn btn-white btn-theme me-auto border-3 border-gold rounded-pill"><i class="fa-solid fa-angles-left"/> ຍ້ອນກັບ</a>
                    <button type="submit" class="btn btn-dark btn-theme ms-10px border-3 border-gold rounded-pill">ບັນທຶກຂໍ້ມູນ <i class="fa-solid fa-angles-right"/></button>
                </div>

            </form >
        </>
    )
}
export default  FormCustomer;
