import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
const MenuPage = () => {
    const location = useLocation();
    const pathName = location.pathname;
    const [path, setPath] = useState(pathName);
    useEffect(() => {

    }, [pathName])
    return (
        <div class="checkout-header border-top rounded-bottom-0 rounded-4 border-4 border-gold">
            <div class="row">
                <div class="col-lg-3">
                    <div class={`step ${path === '/order' && 'active'}`}>
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
                    <div class={`step ${path === '/regiter' && 'active'}`}>
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
                    <div class={`step ${path === '/payment' && 'active'}`}>
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
                    <div class={`step ${path === '/invoice' && 'active'}`}>
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
    )
}

export default MenuPage