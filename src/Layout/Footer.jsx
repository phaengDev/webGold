import React, { useState, useEffect } from 'react'
import { Config, Urlimage } from '../config/connection';
import { useTitle } from '../config/select-option';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
export default function Footer() {
    const api = Config.urlApi;
    const image = Urlimage.url;
    const itemTiles = useTitle();

    const [itemRecomende, setItemRecomende] = useState([]);
    const fetchRecomende = async () => {
        try {
            const response = await fetch(api + 'recd/');
            const jsonData = await response.json();
            setItemRecomende(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchRecomende();
    }, [])
    return (
        <>
            <div id="footer" className="footer border-5 border-top border-gold">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <h4 className="footer-header mb-1"><img src="./assets/img/logo/logo.png" className='w-100px' alt /></h4>
                            <p className='fs-16px mt-1'>
                                <div>-  ຮ້ານຄຳ ນາງວຽງຄຳ</div>
                            </p>
                            <p className="mb-lg-4 mb-0">
                                <div>ສິນຄ້າຄຸນນະພາບມາດຕະຖານຄຳ 99.99%</div>
                                <div>ຮັບປະກັນລາຄາຄືນຕາມລາຄາຄຳ</div>
                                <div>ສິນຄ້າທຸກອັນມາພ້ອມປ້າຍລາຄາ ແລະ ໃບຮັບປະກັນ.</div>
                                <div>ບໍລິການສ້ອມແປງຟຣີຕະຫຼອດຊີວິດ</div>
                            </p>
                        </div>

                        <div className="col-lg-3">
                            <h4 className="footer-header">ໝວດສິນຄ້າ</h4>
                            <ul className="list-unstyled mb-lg-4 mb-0 p-0 fs-15px">
                                {itemTiles.map((item, index) => (
                                    <li className='text-type'><i className="fa fa-fw fa-angle-right"></i> <Link to={'/pos?p=' + item.tile_uuid}>{item.tile_name}</Link></li>
                                ))}
                            </ul>
                        </div>


                        <div className="col-lg-3">
                            <h4 className="footer-header">ຜະລິດຕະພັນຫຼ້າສຸດ</h4>
                            <ul className="list-unstyled list-product mb-lg-4 mb-0 p-0">
                                {itemRecomende
                                    .sort((a, b) => b.recomended_id - a.recomended_id) // Replace 'someProperty' with the property you want to sort by
                                    .slice(0, 4)
                                    .map((item, index) => (
                                        <li key={index}>
                                            <div className="image">
                                                <img src={`${image}pos/${item.recd_image}`} className='w-100' alt="" />
                                            </div>
                                            <div className="info">
                                                <h4 className="info-title">{item.recomennde_name}  ( {item.qty_baht + ' ' + item.option_name})</h4>
                                                <div className="price">{numeral(item.price_sale * item.qty_baht).format('0,00')}</div>
                                            </div>
                                        </li>
                                    ))}


                            </ul>
                        </div>


                        <div className="col-lg-3">
                            <h4 className="footer-header">ຕິດຕໍ່ຂອງພວກເຮົາ</h4>
                            <address className="mb-lg-4 mb-0">
                                <strong>ຮ້ານຄຳ ນາງວຽງຄຳ</strong><br />
                                <div>- ຕັ້ງຢູ່ຕະຫລາດເຊົ້າມໍຊັ້ນ2</div>
                                <div className='fs-14px'>- ບ້ານ ຫັດສະດີ ,ເມືອງ ຈັນທະບູລີ</div>
                                <div className='fs-14px'>- ແຂວງ ນະຄອນຫຼວງວຽງຈັນ</div>

                                <div></div>
                                <abbr title="Phone" className='text-orange'><i class="fa-solid fa-phone fs-14px" /> : </abbr> <a href="tel:+8562095555609">(+856) 20 95 555 609</a> <br />
                                <abbr title="Phone" className='text-orange'><i class="fa-solid fa-phone fs-14px" /> : </abbr> <a href="tel:+8562094424363">(+856) 020 94 424 363</a> <br />
                                <abbr title="whatsapp" className='text-orange'> <i class="fa-brands fa-whatsapp  fs-14px" /> : </abbr> <a href="https://wa.me/8562095555609" target="_blank" rel="noopener noreferrer"> 20 95 555 609</a><br />
                                <abbr title="Email" className='text-orange'><i class="fa-solid fa-envelope fs-14px" /> : </abbr>
                                 <a href=""> Email</a><br />
                                <abbr title="Facebook" className='text-orange'><i class="fa-brands fa-facebook-f fs-14px" /> : </abbr>
                                <a href="https://www.facebook.com/profile.php?id=100064645995670" target='_blank'> Facebook</a><br />

                                <abbr title="tiktok" className='text-orange'><i class="fa-brands fa-tiktok fs-14px"/> : </abbr>
                                <a href="https://www.tiktok.com/@vkgold888" target='_blank'> Tiktok</a><br />

                                <abbr title="Map" className='text-orange'> <i class="fa-solid fa-map-location-dot fs-14px"/> : </abbr>
                                <a href="https://maps.app.goo.gl/Ec2sMx2JNsQEUKoL7" target='_blank'> Map (GPS)</a>
                            </address>

                        </div>

                    </div>
                </div>
            </div>
            
            <script async src="https://static.addtoany.com/menu/page.js"></script>
            <div id="footer-copyright" className="footer-copyright bg-viengkham">
                <div className="container">
                    <div className="payment-method">
                        <img src="./assets/img/logo/logo.png" alt />
                    </div>
                    <div className="copyright">
                        ສະຫງວນລິຂະສິດ © {numeral(new Date().getFullYear()).format('YYYY')} ສະຫງວນລິຂະສິດທັງໝົດ.
                    </div>
                </div>
            </div>

        </>
    )
}
