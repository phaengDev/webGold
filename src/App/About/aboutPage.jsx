import React from 'react'

export default function AboutPage() {
    return (
        <>
            <div id="page-title" className="page-title has-bg pb-1">
                <div
                    className="bg-cover"
                    data-paroller="true"
                    data-paroller-factor="0.5"
                    data-paroller-factor-xs="0.2"
                    style={{
                        background: 'url(./assets/img/vendor/shop-bg.jpg) center 0px / cover no-repeat'
                    }}
                ></div>
                <div className="container">
                    <h1>ຂໍ້ມູນຕິດຕໍ່ພວກເຮົາ</h1>
                    <p>ຮ້ານຄຳ ນາງວຽງຄຳ </p>
                </div>
            </div>

            <div id="content" class="content bg-white pt-0">
                <div class="container">
                    <div class="row gx-lg-5">
                        <div class="col-lg-9">
                            <div class="section-container">
                                <div class="ratio ratio-16x9">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d884m!2d102.6143941!3d17.9652263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3124687d93c167f9%3A0x5577837f17076440!2sตลาดเช้า!5e0!3m2!1sth!2sth!4vUNIQUE_ID"
                                        allowfullscreen
                                        loading="lazy"
                                        referrerpolicy="no-referrer-when-downgrade"></iframe>
                                </div>
                            </div>

                            <div class="section-container pt-1">
                                <h4 class="section-title m-b-20"><span>ຕິດຕໍ່ພວກເຮົາ</span></h4>
                                <p class="m-b-30">
                                    If you have a project you would like to discuss, get in touch with us.
                                    Morbi interdum mollis sapien. Sed ac risus. Phasellus lacinia, magna a ullamcorper laoreet,
                                    lectus arcu pulvinar risus, vitae facilisis libero dolor a purus.
                                </p>

                                <div class="row gx-lg-5">
                                    <div class="col-md-12">
                                        <form class="form-horizontal">
                                            <div class="mb-3 row">
                                                <label class="col-form-label col-md-3 text-md-end">ຊື່ ແລະ ນາມສະກຸນ <span class="text-danger">*</span></label>
                                                <div class="col-md-9">
                                                    <input type="text" class="form-control" required />
                                                </div>
                                            </div>
                                            <div class="mb-3 row">
                                                <label class="col-form-label col-md-3 text-md-end">ອີເມວ </label>
                                                <div class="col-md-9">
                                                    <input type="email" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="mb-3 row">
                                                <label class="col-form-label col-md-3 text-md-end">ເບີໂທຕິດຕໍ່ <span class="text-danger">*</span></label>
                                                <div class="col-md-9">
                                                    <input type="tel" class="form-control" required />
                                                </div>
                                            </div>
                                            <div class="mb-3 row">
                                                <label class="col-form-label col-md-3 text-md-end">ຫົວຂໍ້ເລື່ອງ </label>
                                                <div class="col-md-9">
                                                    <input type="text" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="mb-3 row">
                                                <label class="col-form-label col-md-3 text-md-end">ຂໍ້ຄວາມ </label>
                                                <div class="col-md-9">
                                                    <textarea class="form-control" rows="5"></textarea>
                                                </div>
                                            </div>
                                            <div class="mb-3 row">
                                                <label class="col-form-label col-md-3 text-md-end"></label>
                                                <div class="col-md-9 texleftt-">
                                                    <button type="submit" class="btn btn-dark btn-lg w-100">ສົ່ງ </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3">

                            <div class="section-container">
                                <h4 class="section-title"><span>ຂໍ້ມູນການຕິດຕໍ່</span></h4>
                                <ul class="sidebar-list fs-15px">
                                    <li><a href="tel:+8562095555609"><i class="fa-solid fa-phone" /> : 20 95 555 609 ,94424369</a></li>
                                    <li><a href="#"><i class="fa-solid fa-envelope" /> : Email</a></li>
                                    <li><a href="https://www.facebook.com/profile.php?id=100064645995670" target="_blank"><i class="fa-brands fa-facebook-f" /> : ຮ້ານຄຳນາງວຽງຄຳ </a></li>
                                    <li><a href="https://wa.me/8562095555609" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-whatsapp" /> : 020 95 555 609</a></li>
                                    <li><a href="https://www.tiktok.com/@vkgold888" target="_blank"><i class="fa-brands fa-tiktok" /> : vkgold888</a></li>
                                    <li><a href="#"><i class="fa-brands fa-instagram" /> : Instagram</a></li>
                                </ul>
                            </div>
                            <div class="section-container">
                                <h4 class="section-title"><span>ທີ່ຢູ່ຮ້ານຄຳ ນາງວຽງຄຳ</span></h4>
                                <ul class="sidebar-recent-post">
                                    <li>
                                        <div class="info">
                                            <h4 class="title">ທີ່ຢູ່ຮ້ານ</h4>
                                            <div class="date">ຕັ້ງຢູ່ຕະຫລາດເຊົ້າມໍຊັ້ນ2</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="info">
                                            <h4 class="title">ຖະໜົນ</h4>
                                            <div class="date">ຕັ້ງຢູ່ໃຈກາງລະວາງ ຖະໜົນລ້ານຊ້າງ ກັບ ຖະໜົນໜອງບອນ </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="info">
                                            <h4 class="title">ບ້ານ</h4>
                                            <div class="date">ບ້ານ ຫັດສະດີ </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="info">
                                            <h4 class="title">ເມືອງ </h4>
                                            <div class="date">ເມືອງ ຈັນທະບູລີ</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="info">
                                            <h4 class="title">ແຂວງ</h4>
                                            <div class="date"> ນະຄອນຫຼວງວຽງຈັນ</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
                <div id="promotions" className="section-container bg-viengkham p-0">
                    <div className="promotion promotion-lg "
                        style={{ background: "url(./assets/img/vendor/shop-bg.jpg) center 0px / cover no-repeat" }}
                    >

                        <div className="promotion-caption promotion-caption-inverse">
                            <h4 className="promotion-title">ໜ້າຮ້ານຄຳ ນາງວຽງຄຳ</h4>
                            <p className="promotion-desc">ອອກແບບພະລິດ ແລະຈຳໜາຍຄຳ ຮູບປະພັນ,ຄຳແທ່ງ ຫຼາຍຮູບແບບ </p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
