import moment from 'moment'
import React,{useEffect,useState} from 'react'

const Payment = ({ handleNext }) => {
    
    return (
        <>
            <div class="checkout">
                <div class="checkout-body">
                    <h4 class="checkout-title">ເລືອກວິທີການຊໍາລະເງິນ</h4>
                    <div class="mb-2 row">
                        <label class="col-md-4 col-form-label text-lg-end">ຊື່ຜູ້ຖືບັດ /Cardholder Name <span class="text-danger">*</span></label>
                        <div class="col-md-4">
                            <input type="text" class="form-control required" name="cardholder" placeholder='' required />
                        </div>
                    </div>
                    <div class="mb-2 row">
                        <label class="col-md-4 col-form-label text-lg-end">ໝາຍເລກການໂອນ/Transfer number <span class="text-danger">*</span></label>
                        <div class="col-md-4">
                            <input type="text" class="form-control required" name="cardnumber" placeholder='XXX-XXXX' required />
                        </div>
                    </div>

                    <div class="mb-2 row">
                        <label class="col-md-4 col-form-label text-lg-end">ວັນທິ ແລະ ເວລາໂອນ /Date and time <span class="text-danger">*</span></label>
                        <div class="col-md-4">
                            <input type="datetime-local" defaultValue={moment(new Date()).format('YYYY-MM-DD hh:mm')} class="form-control required  " />
                        </div>
                    </div>
                    <div class="mb-2 row">
                        <label class="col-md-4 col-form-label text-lg-end">ສະລິບການໂອນ <span class="text-danger">*</span></label>
                        <div class="col-md-4 d-flex align-items-center">
                            <input type="file" name="number" placeholder='' class="form-control required " required />

                        </div>
                    </div>
                    <div class="mb-2 row">
                        <label class="col-md-4 col-form-label text-lg-end">ໝາຍເຫດ <span class="text-danger">*</span></label>
                        <div class="col-md-4 d-flex align-items-center">
                            <textarea rows={4} name="number" placeholder='ໝາຍເຫດ.....' class="form-control required " required/>

                        </div>
                    </div>
                </div>


                <div class="checkout-footer d-flex">
                    <button type='button' onClick={() => handleNext(3)} class="btn btn-white btn-theme me-auto">BACK</button>
                    <button type="submit" class="btn btn-dark btn-theme">PROCEED</button>
                </div>

            </div>

        </>
    )
}

export default Payment