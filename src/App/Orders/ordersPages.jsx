import React, { useEffect, useState } from 'react'
import FormCustomer from './formCustomer'
import Payment from './Payment';
import numeral from 'numeral';
import { Urlimage } from '../../config/connection';
function OrdersPages() {
    const img = Urlimage.url;
    const [nextPage, setNextPage] = useState(1)
    const handleNext = (index) => {
        setNextPage(index)
    }

    const [orderCart, setOrderCart] = useState([]);
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('orderCart')) || [];
        setOrderCart(savedCart);
    }, [])

    const removeCart = (product_id_fk) => {
        const updatedCart = orderCart.filter(item => item.product_id_fk !== product_id_fk);
        setOrderCart(updatedCart);
        localStorage.setItem('orderCart', JSON.stringify(updatedCart)); // Update localStorage
    };


    const handlePlus = (product_id_fk) => {
        setOrderCart(prevOrderCart => 
            prevOrderCart.map(item =>
                item.product_id_fk === product_id_fk
                    ? { ...item, qty_order: item.qty_order + 1 }
                    : item
            )
        );
    };
    
    // const handleMinus = (product_id_fk) => {
    //     setOrderCart(prevOrderCart => 
    //         prevOrderCart.map(item =>
    //             item.product_id_fk === product_id_fk
    //                 ? { ...item, qty_order: item.qty_order > 1 ? item.qty_order - 1 : 1 } // Prevent qty_order from going below 1
    //                 : item
    //         )
    //     );
    // };
    
    const handleMinus = (product_id_fk) => {
        setOrderCart(prevOrderCart => {
            return prevOrderCart.map(item => {
                if (item.product_id_fk === product_id_fk) {
                    if (item.qty_order > 1) {
                        return { ...item, qty_order: item.qty_order - 1 };
                    } else {
                        const updatedCart = prevOrderCart.filter(item => item.product_id_fk !== product_id_fk);
                        localStorage.setItem('orderCart', JSON.stringify(updatedCart));
                        return null; 
                    }
                }
                return item;
            }).filter(item => item !== null); // Filter out any null values (removed items)
        });
    };

    const totalSum = orderCart.reduce((total, item) => {
        return total + (item.price_sale * item.qty_grams * item.qty_order);
    }, 0);
    return (
        <>
            <div class="section-container " id="checkout-cart">
                <div class="container ">
                    <div class="checkout rounded-top-4">
                        <div class="checkout-header border-top rounded-bottom-0 rounded-4 border-4 border-gold">
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
                                        <table class="table table-cart text-nowrap">
                                            <thead>
                                                <tr>
                                                    <th>Product Name</th>
                                                    <th class="text-center">Price</th>
                                                    <th class="text-center">Quantity</th>
                                                    <th class="text-center">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orderCart.map((item, index) => (
                                                    <tr>
                                                        <td class="cart-product">
                                                            <div class="d-flex">
                                                                <div class="product-img h-150px w-100px d-flex align-items-center justify-content-center">
                                                                    <img src={item.file_image !== '' ? img + 'pos/' + item.file_image : img + 'title/' + item.title_image} class="mw-80 mh-80" alt />
                                                                </div>
                                                                <div class="product-info ms-3">
                                                                    <div class="title">{item.tile_name} {item.qty_baht + ' ' + item.option_name}</div>
                                                                    <div class="desc">ບັນຈຸ {item.qty_grams * item.qty_order} Garm</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td class="cart-price text-center">{numeral(item.price_sale * item.qty_grams).format('0,00')} ₭</td>
                                                        <td class="cart-qty text-center">
                                                            <div class="cart-qty-input">
                                                                <a href="javascript:;" onClick={()=>handleMinus(item.product_id_fk)} class="qty-control left bg-red text-white" data-click="decrease-qty" data-target="#qty"><i class="fa fa-minus"></i></a>
                                                                <input type="text" name="qty" value={item.qty_order} class="form-control" id="qty" />
                                                                <a href="javascript:;" onClick={()=>handlePlus(item.product_id_fk)} class="qty-control right bg-green text-white" data-click="increase-qty" data-target="#qty"><i class="fa fa-plus"></i></a>
                                                            </div>
                                                        </td>
                                                        <td class="cart-total text-center">
                                                            {numeral(item.price_sale * item.qty_grams * item.qty_order).format('0,00')} ₭
                                                        </td>
                                                    </tr>
                                                ))}
                                                <tr>
                                                    <td class="cart-summary" colspan="4">
                                                        <div class="summary-container">
                                                            <div class="summary-row">
                                                                <div class="field">ລວມຍອດ</div>
                                                                <div class="value">{numeral(totalSum).format('0,00')} ₭</div>
                                                            </div>
                                                            <div class="summary-row text-danger">
                                                                <div class="field">ສວນຫຼຸດ</div>
                                                                <div class="value">0.00</div>
                                                            </div>
                                                            <div class="summary-row total">
                                                                <div class="field">ຍອດລວມທັງໝົດ</div>
                                                                <div class="value">{numeral(totalSum).format('0,00')} ₭</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div class="checkout-footer d-flex">
                                    <a href="#" class="me-auto"></a>
                                    <button type="button" onClick={() => handleNext(2)} class="btn btn-dark btn-lg btn-theme border-3 border-gold rounded-pill w-250px">ດຳເນີນການຕໍ່ໄປ <i class="fa-solid fa-angles-right" /></button>
                                </div>
                            </>
                        ) : nextPage === 2 ? (<>
                            <FormCustomer handleNext={() => handleNext(1)} />
                        </>) : nextPage === 3 ? (
                            <Payment handleNext={() => handleNext(2)} />
                        ) : ''}
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