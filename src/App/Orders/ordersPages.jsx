import React, { useEffect, useState } from 'react';
import numeral from 'numeral';
import { Urlimage } from '../../config/connection';
import MenuPage from './MenuPage';
import { Link } from 'react-router-dom';
function OrdersPages() {
    const img = Urlimage.url;

    const [orderCart, setOrderCart] = useState([]);
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('orderCart')) || [];
        setOrderCart(savedCart);
    }, [])

    // const removeCart = (product_id_fk) => {
    //     const updatedCart = orderCart.filter(item => item.product_id_fk !== product_id_fk);
    //     setOrderCart(updatedCart);
    //     localStorage.setItem('orderCart', JSON.stringify(updatedCart)); // Update localStorage
    // };


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
                        <MenuPage />
                        <div class="checkout-body">
                            <div class="table-responsive">
                                <table class="table table-cart text-nowrap">
                                    <thead>
                                        <tr>
                                            <th>ລາຍການສິນຄ້າ</th>
                                            <th class="text-center">ລະາຄາ</th>
                                            <th class="text-center">ຈຳນວນ</th>
                                            <th class="text-center">ລວມທັງໝົດ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderCart.map((item, index) => (
                                            <tr key={index}>
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
                                                        <a href="javascript:;" onClick={() => handleMinus(item.product_id_fk)} class="qty-control left bg-red text-white" data-click="decrease-qty" data-target="#qty"><i class="fa fa-minus"></i></a>
                                                        <input type="text" name="qty" value={item.qty_order} class="form-control" id="qty" />
                                                        <a href="javascript:;" onClick={() => handlePlus(item.product_id_fk)} class="qty-control right bg-green text-white" data-click="increase-qty" data-target="#qty"><i class="fa fa-plus"></i></a>
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
                                                        <div class="field">ລວມຍອດ </div>
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
                        {orderCart.length > 0 && (
                            <div class="checkout-footer d-flex">
                                <a href="#" class="me-auto"></a>
                                <Link to={'/regiter'} class="btn btn-dark btn-lg btn-theme border-3 border-gold rounded-pill w-250px">ດຳເນີນການຕໍ່ໄປ <i class="fa-solid fa-angles-right" /></Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrdersPages