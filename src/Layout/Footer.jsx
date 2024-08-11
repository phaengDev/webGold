import React from 'react'

export default function Footer() {
    return (
        <>
            <div id="footer" className="footer border-5 border-top border-gold">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-3">
                            <h4 className="footer-header">ABOUT US</h4>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec tristique dolor, ac efficitur velit. Nulla lobortis tempus convallis. Nulla aliquam lectus eu porta pulvinar. Mauris semper justo erat.
                            </p>
                            <p className="mb-lg-4 mb-0">
                                Vestibulum porttitor lorem et vestibulum pharetra. Phasellus sit amet mi congue, hendrerit mi ut, dignissim eros.
                            </p>
                        </div>


                        <div className="col-lg-3">
                            <h4 className="footer-header">RELATED LINKS</h4>
                            <ul className="fa-ul mb-lg-4 mb-0 p-0">
                                <li><i className="fa fa-fw fa-angle-right"></i> <a href="#">Shopping Help</a></li>
                                <li><i className="fa fa-fw fa-angle-right"></i> <a href="#">Terms of Use</a></li>
                                <li><i className="fa fa-fw fa-angle-right"></i> <a href="#">Contact Us</a></li>
                                <li><i className="fa fa-fw fa-angle-right"></i> <a href="#">Careers</a></li>
                                <li><i className="fa fa-fw fa-angle-right"></i> <a href="#">Payment Method</a></li>
                                <li><i className="fa fa-fw fa-angle-right"></i> <a href="#">Sales & Refund</a></li>
                                <li><i className="fa fa-fw fa-angle-right"></i> <a href="#">Sitemap</a></li>
                                <li><i className="fa fa-fw fa-angle-right"></i> <a href="#">Privacy & Policy</a></li>
                            </ul>
                        </div>


                        <div className="col-lg-3">
                            <h4 className="footer-header">LATEST PRODUCT</h4>
                            <ul className="list-unstyled list-product mb-lg-4 mb-0 p-0">
                                <li>
                                    <div className="image">
                                        <img src="../assets/img/product/product-iphone-6s.jpg" alt />
                                    </div>
                                    <div className="info">
                                        <h4 className="info-title">Iphone 6s</h4>
                                        <div className="price">$1200.00</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="image">
                                        <img src="../assets/img/product/product-galaxy-s6.jpg" alt />
                                    </div>
                                    <div className="info">
                                        <h4 className="info-title">Samsung Galaxy s7</h4>
                                        <div className="price">$850.00</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="image">
                                        <img src="../assets/img/product/product-ipad-pro.jpg" alt />
                                    </div>
                                    <div className="info">
                                        <h4 className="info-title">Ipad Pro</h4>
                                        <div className="price">$800.00</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="image">
                                        <img src="../assets/img/product/product-galaxy-note5.jpg" alt />
                                    </div>
                                    <div className="info">
                                        <h4 className="info-title">Samsung Galaxy Note 5</h4>
                                        <div className="price">$1200.00</div>
                                    </div>
                                </li>
                            </ul>
                        </div>


                        <div className="col-lg-3">
                            <h4 className="footer-header">OUR CONTACT</h4>
                            <address className="mb-lg-4 mb-0">
                                <strong>Twitter, Inc.</strong><br />
                                1355 Market Street, Suite 900<br />
                                San Francisco, CA 94103<br /><br />
                                <abbr title="Phone">Phone:</abbr> (123) 456-7890<br />
                                <abbr title="Fax">Fax:</abbr> (123) 456-7891<br />
                                <abbr title="Email">Email:</abbr> <a href="/cdn-cgi/l/email-protection#493a28252c3a0924303a212639672a2624"><span className="__cf_email__" data-cfemail="deadbfb2bbad9eb3a7adb6b1aef0bdb1b3">[email&#160;protected]</span></a><br />
                                <abbr title="Skype">Skype:</abbr> <a href="skype:myshop">myshop</a>
                            </address>
                        </div>

                    </div>

                </div>

            </div>
            <div id="footer-copyright" className="footer-copyright bg-viengkham">
                <div className="container">
                    <div className="payment-method">
                        <img src="./assets/img/logo/logo.png" alt />
                    </div>
                    <div className="copyright">
                        Copyright &copy; 2024 SeanTheme. All rights reserved.
                    </div>
                </div>
            </div>

        </>
    )
}
