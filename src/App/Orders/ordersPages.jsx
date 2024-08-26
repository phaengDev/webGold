import React, { useState } from 'react'
import FormCustomer from './formCustomer'
import Payment from './Payment'
function OrdersPages() {
    const [nextPage, setNextPage] = useState(3)
    const handleNext = (index) => {
        setNextPage(index)
    }
    return (
        <>
            <div class="section-container" id="checkout-cart">
                <div class="container">
                    <div class="checkout">
                        <div class="checkout-header">
                            <div class="row">
                                <div class="col-lg-3">
                                    <div class={`step ${nextPage === 1 && 'active'}`}>
                                        <a href="javascript:;">
                                            <div class="number">1</div>
                                            <div class="info">
                                                <div class="title">ລາຍການອໍເດີສິນຄ້າ</div>
                                                <div class="desc">Lorem ipsum dolor sit amet.</div>
                                            </div>
                                        </a>
                                    </div>
                                </div>

                                <div class="col-lg-3">
                                    <div class={`step ${nextPage === 2 && 'active'}`}>
                                        <a href='javascript:;'>
                                            <div class="number">2</div>
                                            <div class="info">
                                                <div class="title">ຂໍ້ມູນລູກຄ້າ</div>
                                                <div class="desc">Vivamus eleifend euismod.</div>
                                            </div>
                                        </a>
                                    </div>
                                </div>

                                <div class="col-lg-3">
                                    <div class={`step ${nextPage === 3 && 'active'}`}>
                                        <a href='javascript:;'>
                                            <div class="number">3</div>
                                            <div class="info">
                                                <div class="title">ການຈ່າຍເງິນ</div>
                                                <div class="desc">Aenean ut pretium ipsum. </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>

                                <div class="col-lg-3">
                                    <div class="step">
                                        <a href="javascript:;">
                                            <div class="number">4</div>
                                            <div class="info">
                                                <div class="title">ສໍາເລັດການຊໍາລະ</div>
                                                <div class="desc">Curabitur interdum libero.</div>
                                            </div>
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {nextPage === 1 ? (
                            <>
                                <div class="checkout-body">
                                    <div class="table-responsive">
                                        <table class="table table-cart">
                                            <thead>
                                                <tr>
                                                    <th>Product Name</th>
                                                    <th class="text-center">Price</th>
                                                    <th class="text-center">Quantity</th>
                                                    <th class="text-center">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td class="cart-product">
                                                        <div class="d-flex">
                                                            <div class="product-img h-150px w-100px d-flex align-items-center justify-content-center">
                                                                <img src="./assets/img/pos/3.jpg" class="mw-100 mh-100" alt />
                                                            </div>
                                                            <div class="product-info ms-3">
                                                                <div class="title">iPhone 12 Pro Max 128GB (Blue)</div>
                                                                <div class="desc">Delivers Tue 26/04/2024 - Free</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="cart-price text-center">$999.00</td>
                                                    <td class="cart-qty text-center">
                                                        <div class="cart-qty-input">
                                                            <a href="javascript:;" class="qty-control left bg-red text-white" data-click="decrease-qty" data-target="#qty"><i class="fa fa-minus"></i></a>
                                                            <input type="text" name="qty" value="1" class="form-control" id="qty" />
                                                            <a href="javascript:;" class="qty-control right bg-green text-white" data-click="increase-qty" data-target="#qty"><i class="fa fa-plus"></i></a>
                                                        </div>
                                                        <div class="qty-desc">1 to max order</div>
                                                    </td>
                                                    <td class="cart-total text-center">
                                                        $999.00
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cart-summary" colspan="4">
                                                        <div class="summary-container">
                                                            <div class="summary-row">
                                                                <div class="field">ລວມອໍເດີທັງໝົດ</div>
                                                                <div class="value">$999.00</div>
                                                            </div>
                                                            <div class="summary-row text-danger">
                                                                <div class="field">ການຂົນສົ່ງຟຣີ</div>
                                                                <div class="value">$0.00</div>
                                                            </div>
                                                            <div class="summary-row total">
                                                                <div class="field">ທັງໝົດ</div>
                                                                <div class="value">$999.00</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div class="checkout-footer d-flex">
                                    <a href="#" class="btn btn-white btn-lg me-auto btn-theme w-250px">CONTINUE SHOPPING</a>
                                    <button type="button" onClick={() => handleNext(2)} class="btn btn-dark btn-lg btn-theme w-250px">ດຳເນີນການຕໍ່ໄປ <i class="fa-solid fa-angles-right" /></button>
                                </div>
                            </>
                        ) :nextPage === 2 ?(<>
                            <FormCustomer handleNext={() => handleNext(1)} />
                        </>):nextPage === 3?(
                            <Payment handleNext={() => handleNext(2)}/>
                        ):''}
                    </div>

                </div>

            </div>


            <div id="policy" class="section-container bg-component">

                <div class="container">

                    <div class="row">

                        <div class="col-lg-4 col-md-4 mb-4 mb-md-0">

                            <div class="policy">
                                <div class="policy-icon"><i class="fa fa-truck"></i></div>
                                <div class="policy-info">
                                    <h4>Free Delivery Over $100</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </div>
                            </div>

                        </div>


                        <div class="col-lg-4 col-md-4 mb-4 mb-md-0">

                            <div class="policy">
                                <div class="policy-icon"><i class="fa fa-umbrella"></i></div>
                                <div class="policy-info">
                                    <h4>1 Year Warranty For Phones</h4>
                                    <p>Cras laoreet urna id dui malesuada gravida. <br />Duis a lobortis dui.</p>
                                </div>
                            </div>
                        </div>


                        <div class="col-lg-4 col-md-4">
                            <div class="policy">
                                <div class="policy-icon"><i class="fa fa-user-md"></i></div>
                                <div class="policy-info">
                                    <h4>6 Month Warranty For Accessories</h4>
                                    <p>Fusce ut euismod orci. Morbi auctor, sapien non eleifend iaculis.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrdersPages