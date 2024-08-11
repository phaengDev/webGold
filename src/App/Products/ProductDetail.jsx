import React, { useState, useEffect } from 'react'
import { Config, Urlimage } from '../../config/connection'
import { Link, useLocation } from 'react-router-dom';
import numeral from 'numeral';
function ProductDetail() {
    const api = Config.urlApi;
    const img = Urlimage.url;
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const psId = searchParams.get('V');
    const [data, setData] = useState({});
    const [dataList,setDataList]=useState([])

    const fetchDatail = async()=>{
        try {
            const response = await fetch(api + 'posd/single/'+psId);
            const jsonData = await response.json();
            setData(jsonData.dataps);
            setDataList(jsonData.list);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }
    useEffect(() => {
        fetchDatail()
    }, [psId])
    return (
        <>

            <div id="product" className="section-container pt-20px">
                <div className="container">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={'/'}>ໜ້າຫຼັກ</Link></li>
                        <li className="breadcrumb-item"><Link to={'/product'}>ລາຍການສິນຄ້າທັງໝົດ</Link></li>
                        <li className="breadcrumb-item"><Link to={`/pos?p=${data.tiles_id_fk}`}>{data.tile_name}</Link></li>
                        <li className="breadcrumb-item active">{data.tile_name} {data.qty_baht +' '+ data.option_name}</li>
                    </ul>
                    <div className="product">
                        <div className="product-detail">
                            <div className="product-image">
                                <div className="product-thumbnail">
                                    <ul className="product-thumbnail-list">
                                        <li className="active  border-red border border-2 rounded-3"><a href="#" data-click="show-main-image" data-url={img+'pos/'+data.file_image}><img src={img+'pos/'+data.file_image} alt='' /></a></li>
                                        {dataList.map((val,index)=>(
                                        <li><Link to={'/detail-ps?V='+val.product_uuid} data-click="show-main-image" data-url={img+'pos/'+val.file_image}><img src={img+'pos/'+val.file_image} alt='' /></Link></li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="product-main-image" data-id="main-image">
                                    <img src={`${img}${data.file_image !=='' ? 'pos/'+data.file_image:'title/'+data.title_image}`} alt />
                                </div>

                            </div>


                            <div className="product-info">

                                <div className="product-info-header">
                                    <h1 className="product-title">{data.tile_name} {data.qty_baht +' '+ data.option_name} </h1>
                                    <ul className="product-category">
                                        <li><a href="#">{data.qty_baht +' '+ data.option_name}</a></li>
                                        <li>/</li>
                                        <li><a href="#">{data.grams} g</a></li>
                                        <li>/</li>
                                    </ul>
                                </div>


                                <div className="product-warranty">
                                    <div className="pull-right">{data.porduct_detail}</div>
                                </div>

                                <ul className="product-info-list">
                                    <li><i className="fa fa-circle"></i> 5.5" Retina HD Display with 3D Touch</li>
                                    <li><i className="fa fa-circle"></i> Fingerprint-resistant oleophobic coating</li>
                                    <li><i className="fa fa-circle"></i> A9 chip with 64-bit</li>
                                    <li><i className="fa fa-circle"></i> Ultrafast 4G LTE Advanced wireless</li>
                                    <li><i className="fa fa-circle"></i> New 12-megapixel iSight camera</li>
                                    <li><i className="fa fa-circle"></i> 4k video recording</li>
                                    <li><i className="fa fa-circle"></i> iOS 9 with Touch ID and Apple Pay</li>
                                </ul>


                                <div className="product-social">
                                    <ul>
                                        <li><a href="javascript:;" className="facebook" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-title="Facebook" data-bs-placement="top"><i className="fab fa-facebook-f"></i></a></li>
                                        <li><a href="javascript:;" className="twitter" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-title="Twitter" data-bs-placement="top"><i className="fab fa-twitter"></i></a></li>
                                        <li><a href="javascript:;" className="google-plus" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-title="Google Plus" data-bs-placement="top"><i className="fab fa-google-plus-g"></i></a></li>
                                        <li><a href="javascript:;" className="whatsapp" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-title="Whatsapp" data-bs-placement="top"><i className="fab fa-whatsapp"></i></a></li>
                                        <li><a href="javascript:;" className="tumblr" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-title="Tumblr" data-bs-placement="top"><i className="fab fa-tumblr"></i></a></li>
                                    </ul>
                                </div>


                                <div className="product-purchase-container">
                                    {/* <div className="product-discount">
                                        <span className="discount">$869.00</span>
                                    </div> */}
                                    <div className="product-price">
                                        <div className="price">{numeral(data.price_sale*data.grams).format('0,00')} ₭</div>
                                    </div>
                                    <a href="checkout_cart.html" className="btn btn-dark btn-theme btn-lg w-200px">ADD TO CART</a>
                                </div>

                            </div>

                        </div>


                        <div className="product-tab">

                            <ul id="product-tab" className="nav nav-tabs">
                                <li className="nav-item"><a className="nav-link active" href="#product-desc" data-bs-toggle="tab">Product Description</a></li>
                                <li className="nav-item"><a className="nav-link" href="#product-info" data-bs-toggle="tab">Additional Information</a></li>
                                <li className="nav-item"><a className="nav-link" href="#product-reviews" data-bs-toggle="tab">Rating & Reviews (5)</a></li>
                            </ul>


                            <div id="product-tab-content" className="tab-content">

                                <div className="tab-pane fade active show" id="product-desc">

                                    <div className="product-desc">
                                        <div className="image">
                                            <img src="../assets/img/product/product-main.jpg" alt />
                                        </div>
                                        <div className="desc">
                                            <h4>iPhone 6s</h4>
                                            <p>
                                                The moment you use iPhone 6s, you know you’ve never felt anything like it. With a single press, 3D Touch lets you do more than ever before. Live Photos bring your memories to life in a powerfully vivid way. And that’s just the beginning. Take a deeper look at iPhone 6s, and you’ll find innovation on every level.
                                            </p>
                                        </div>
                                    </div>


                                    <div className="product-desc right">
                                        <div className="image">
                                            <img src="../assets/img/product/product-3dtouch.jpg" alt />
                                        </div>
                                        <div className="desc">
                                            <h4>3D Touch</h4>
                                            <p>
                                                The original iPhone introduced the world to Multi-Touch, forever changing the way people experience technology. With 3D Touch, you can do things that were never possible before. It senses how deeply you press the display, letting you do all kinds of essential things more quickly and simply. And it gives you real-time feedback in the form of subtle taps from the all-new Taptic Engine.
                                            </p>
                                        </div>
                                    </div>


                                    <div className="product-desc">
                                        <div className="image">
                                            <img src="../assets/img/product/product-cameras.jpg" alt />
                                        </div>
                                        <div className="desc">
                                            <h4>Cameras</h4>
                                            <p>
                                                The 12-megapixel iSight camera captures sharp, detailed photos. It takes brilliant 4K video, up to four times the resolution of 1080p HD video. iPhone 6s also takes selfies worthy of a self-portrait with the new 5-megapixel FaceTime HD camera. And it introduces Live Photos, a new way to relive your favorite memories. It captures the moments just before and after your picture and sets it in motion with just the press of a finger.
                                            </p>
                                        </div>
                                    </div>


                                    <div className="product-desc right">
                                        <div className="image">
                                            <img src="../assets/img/product/product-technology.jpg" alt />
                                        </div>
                                        <div className="desc">
                                            <h4>Technology</h4>
                                            <p>
                                                iPhone 6s is powered by the custom-designed 64-bit A9 chip. It delivers performance once found only in desktop computers. You’ll experience up to 70 percent faster CPU performance, and up to 90 percent faster GPU performance for all your favorite graphics-intensive games and apps.
                                            </p>
                                        </div>
                                    </div>


                                    <div className="product-desc">
                                        <div className="image">
                                            <img src="../assets/img/product/product-design.jpg" alt />
                                        </div>
                                        <div className="desc">
                                            <h4>Design</h4>
                                            <p>
                                                Innovation isn’t always obvious to the eye, but look a little closer at iPhone 6s and you’ll find it’s been fundamentally improved. The enclosure is made from a new alloy of 7000 Series aluminum — the same grade used in the aerospace industry. The cover glass is the strongest, most durable glass used in any smartphone. And a new rose gold finish joins space gray, silver, and gold.
                                            </p>
                                        </div>
                                    </div>

                                </div>


                                <div className="tab-pane fade" id="product-info">

                                    <div className="table-responsive">

                                        <table className="table table-product table-striped">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>iPhone 6s</th>
                                                    <th>iPhone 6s Plus</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="field">Capacity</td>
                                                    <td>
                                                        16GB<br />
                                                        64GB<br />
                                                        128GB
                                                    </td>
                                                    <td>
                                                        16GB<br />
                                                        64GB<br />
                                                        128GB
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="field">Weight and Dimensions</td>
                                                    <td>
                                                        5.44 inches (138.3 mm) x 2.64 inches (67.1 mm) x 0.28 inch (7.1 mm)<br />
                                                        Weight: 5.04 ounces (143 grams)
                                                    </td>
                                                    <td>
                                                        6.23 inches (158.2 mm) x 3.07 inches (77.9 mm) x 0.29 inch (7.3 mm)<br />
                                                        Weight: 6.77 ounces (192 grams)
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="field">Display</td>
                                                    <td>
                                                        Retina HD display with 3D Touch<br />
                                                        4.7-inch (diagonal) LED-backlit widescreen<br />
                                                        1334-by-750-pixel resolution at 326 ppi<br />
                                                        1400:1 contrast ratio (typical)<br />
                                                        <br />
                                                        <b>Both models:</b><br />
                                                        500 cd/m2 max brightness (typical)<br />
                                                        Full sRGB standard<br />
                                                        Dual-domain pixels for wide viewing angles<br />
                                                        Fingerprint-resistant oleophobic coating on front<br />
                                                        Support for display of multiple languages and characters simultaneously<br />
                                                        Display Zoom<br />
                                                        Reachability
                                                    </td>
                                                    <td>
                                                        Retina HD display with 3D Touch<br />
                                                        5.5-inch (diagonal) LED-backlit widescreen<br />
                                                        1920-by-1080-pixel resolution at 401 ppi<br />
                                                        1300:1 contrast ratio (typical)
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="field">Chip</td>
                                                    <td colspan="2">
                                                        A9 chip with 64-bit architecture Embedded M9 motion coprocessor
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="field">iSight Camera</td>
                                                    <td colspan="2">
                                                        New 12-megapixel iSight camera with 1.22µ pixels<br />
                                                        Live Photos<br />
                                                        Autofocus with Focus Pixels<br />
                                                        Optical image stabilization (iPhone 6s Plus only)<br />
                                                        True Tone flash<br />
                                                        Panorama (up to 63 megapixels)<br />
                                                        Auto HDR for photos<br />
                                                        Exposure control<br />
                                                        Burst mode<br />
                                                        Timer mode<br />
                                                        ƒ/2.2 aperture<br />
                                                        Five-element lens<br />
                                                        Hybrid IR filter<br />
                                                        Backside illumination sensor<br />
                                                        Sapphire crystal lens cover<br />
                                                        Auto image stabilization<br />
                                                        Improved local tone mapping<br />
                                                        Improved noise reduction<br />
                                                        Face detection<br />
                                                        Photo geotagging
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="field">Video Recording</td>
                                                    <td colspan="2">
                                                        4K video recording (3840 by 2160) at 30 fps<br />
                                                        1080p HD video recording at 30 fps or 60 fps<br />
                                                        720p HD video recording at 30 fps<br />
                                                        Optical image stabilization for video (iPhone 6s Plus only)<br />
                                                        True Tone flash<br />
                                                        Slo-mo video support for 1080p at 120 fps and 720p at 240 fps<br />
                                                        Time-lapse video with stabilization<br />
                                                        Cinematic video stabilization (1080p and 720p)<br />
                                                        Continuous autofocus video<br />
                                                        Improved noise reduction<br />
                                                        Take 8MP still photos while recording 4K video<br />
                                                        Playback zoom<br />
                                                        3x zoom<br />
                                                        Face detection<br />
                                                        Video geotagging
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>

                                </div>


                                <div className="tab-pane fade" id="product-reviews">

                                    <div className="row row-space-30">

                                        <div className="col-md-7 mb-4 mb-lg-0">

                                            <div className="review">
                                                <div className="review-info">
                                                    <div className="review-icon"><img src="../assets/img/user/user-1.jpg" alt /></div>
                                                    <div className="review-rate">
                                                        <ul className="review-star">
                                                            <li className="active"><i className="fa fa-star"></i></li>
                                                            <li className="active"><i className="fa fa-star"></i></li>
                                                            <li className="active"><i className="fa fa-star"></i></li>
                                                            <li className="active"><i className="fa fa-star"></i></li>
                                                            <li class><i className="far fa-star"></i></li>
                                                        </ul>
                                                        (4/5)
                                                    </div>
                                                    <div className="review-name">Terry</div>
                                                    <div className="review-date">24/05/2024 7:40am</div>
                                                </div>
                                                <div className="review-title">
                                                    What does “SIM-free” mean?
                                                </div>
                                                <div className="review-message">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in imperdiet augue. Integer non aliquam eros. Cras vehicula nec sapien pretium sagittis. Pellentesque feugiat lectus non malesuada aliquam. Etiam id tortor pretium, dictum leo at, malesuada tortor.
                                                </div>
                                            </div>


                                            <div className="review">
                                                <div className="review-info">
                                                    <div className="review-icon"><img src="../assets/img/user/user-2.jpg" alt /></div>
                                                    <div className="review-rate">
                                                        <ul className="review-star">
                                                            <li className="active"><i className="fa fa-star"></i></li>
                                                            <li className="active"><i className="fa fa-star"></i></li>
                                                            <li className="active"><i className="fa fa-star"></i></li>
                                                            <li class><i className="far fa-star"></i></li>
                                                            <li class><i className="far fa-star"></i></li>
                                                        </ul>
                                                        (3/5)
                                                    </div>
                                                    <div className="review-name">George</div>
                                                    <div className="review-date">24/05/2024 8:40am</div>
                                                </div>
                                                <div className="review-title">
                                                    When I buy iPhone from apple.com, is it tied to a carrier or does it come “unlocked”?
                                                </div>
                                                <div className="review-message">
                                                    In mauris leo, maximus at pellentesque vel, pharetra vel risus. Aenean in semper velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi volutpat mattis neque, at molestie tellus ultricies quis. Ut lobortis odio nec nunc ullamcorper, vitae faucibus augue semper. Sed luctus lobortis nulla ac volutpat. Mauris blandit scelerisque sem.
                                                </div>
                                            </div>


                                            <div className="review">
                                                <div className="review-info">
                                                    <div className="review-icon"><img src="../assets/img/user/user-3.jpg" alt /></div>
                                                    <div className="review-rate">
                                                        <ul className="review-star">
                                                            <li className="active"><i className="fa fa-star"></i></li>
                                                            <li className="active"><i className="fa fa-star"></i></li>
                                                            <li className="active"><i className="fa fa-star"></i></li>
                                                            <li className="active"><i className="fa fa-star"></i></li>
                                                            <li className="active"><i className="fa fa-star"></i></li>
                                                        </ul>
                                                        (5/5)
                                                    </div>
                                                    <div className="review-name">Steve</div>
                                                    <div className="review-date">23/05/2024 8:40am</div>
                                                </div>
                                                <div className="review-title">
                                                    Where is the iPhone Upgrade Program available?
                                                </div>
                                                <div className="review-message">
                                                    Duis ut nunc sem. Integer efficitur, justo sit amet feugiat hendrerit, arcu nisl elementum dui, in ultricies erat quam at mauris. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec nec ultrices tellus. Mauris elementum venenatis volutpat.
                                                </div>
                                            </div>


                                            <div className="review">
                                                <div className="review-info">
                                                    <div className="review-icon"><img src="../assets/img/user/user-4.jpg" alt /></div>
                                                    <div className="review-rate">
                                                        <ul className="review-star">
                                                            <li className="active"><i className="fa fa-star"></i></li>
                                                            <li className="active"><i className="fa fa-star"></i></li>
                                                            <li class><i className="far fa-star"></i></li>
                                                            <li class><i className="far fa-star"></i></li>
                                                            <li class><i className="far fa-star"></i></li>
                                                        </ul>
                                                        (2/5)
                                                    </div>
                                                    <div className="review-name">Alfred</div>
                                                    <div className="review-date">23/05/2024 10.02am</div>
                                                </div>
                                                <div className="review-title">
                                                    Can I keep my current service plan if I choose the iPhone Upgrade Program?
                                                </div>
                                                <div className="review-message">
                                                    Donec vel fermentum quam. Vivamus scelerisque enim eget tristique auctor. Vivamus tempus, turpis iaculis tempus egestas, leo augue hendrerit tellus, et efficitur neque massa at neque. Aenean efficitur eleifend orci at ornare.
                                                </div>
                                            </div>


                                            <div className="review">
                                                <div className="review-info">
                                                    <div className="review-icon"><img src="../assets/img/user/user-5.jpg" alt /></div>
                                                    <div className="review-rate">
                                                        <ul className="review-star">
                                                            <li className="active"><i className="fa fa-star"></i></li>
                                                            <li className="active"><i className="fa fa-star"></i></li>
                                                            <li className="active"><i className="fa fa-star"></i></li>
                                                            <li className="active"><i className="fa fa-star"></i></li>
                                                            <li className="active"><i className="fa fa-star"></i></li>
                                                        </ul>
                                                        (5/5)
                                                    </div>
                                                    <div className="review-name">Edward</div>
                                                    <div className="review-date">22/05/2024 9.30pm</div>
                                                </div>
                                                <div className="review-title">
                                                    I have an existing carrier contract or installment plan. Can I purchase with the iPhone Upgrade Program
                                                </div>
                                                <div className="review-message">
                                                    Aliquam consequat ut turpis non interdum. Integer blandit erat nec sapien sollicitudin, a fermentum dui venenatis. Nullam consequat at enim et aliquet. Cras mattis turpis quis eros volutpat tristique vel a ligula. Proin aliquet leo mi, et euismod metus placerat sit amet.
                                                </div>
                                            </div>

                                        </div>


                                        <div className="col-md-5">

                                            <div className="review-form">
                                                <form action="product_detail.html" name="review_form" method="POST">
                                                    <h2>Write a review</h2>
                                                    <div className="mb-3">
                                                        <label for="name" className="form-label">Name <span className="text-danger">*</span></label>
                                                        <input type="text" className="form-control" id="name" />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label for="email" className="form-label">Title <span className="text-danger">*</span></label>
                                                        <input type="text" className="form-control" id="email" />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label for="review" className="form-label">Review <span className="text-danger">*</span></label>
                                                        <textarea className="form-control" rows="8" id="review"></textarea>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label for="email" className="form-label">Rating <span className="text-danger">*</span></label>
                                                        <div className="rating rating-selection" data-rating="true" data-target="rating">
                                                            <i className="far fa-star" data-value="2"></i>
                                                            <i className="far fa-star" data-value="4"></i>
                                                            <i className="far fa-star" data-value="6"></i>
                                                            <i className="far fa-star" data-value="8"></i>
                                                            <i className="far fa-star" data-value="10"></i>
                                                            <span className="rating-comment">
                                                                <span className="rating-comment-tooltip">Click to rate</span>
                                                            </span>
                                                        </div>
                                                        <select name="rating" className="hide">
                                                            <option value="2">2</option>
                                                            <option value="4">4</option>
                                                            <option value="6">6</option>
                                                            <option value="8">8</option>
                                                            <option value="10">10</option>
                                                        </select>
                                                    </div>
                                                    <button type="submit" className="btn btn-dark btn-theme btn-lg">Submit Review</button>
                                                </form>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    <h4 className="mb-15px mt-30px">You Might Also Like</h4>
                    <div className="row gx-2">
                        <div className="col-lg-2 col-md-4">

                            <div className="item item-thumbnail">
                                <a href="product_detail.html" className="item-image">
                                    <img src="../assets/img/product/product-iphone.png" alt />
                                    <div className="discount">15% OFF</div>
                                </a>
                                <div className="item-info">
                                    <h4 className="item-title">
                                        <a href="product_detail.html">iPhone 6s Plus<br />16GB</a>
                                    </h4>
                                    <p className="item-desc">3D Touch. 12MP photos. 4K video.</p>
                                    <div className="item-price">$649.00</div>
                                    <div className="item-discount-price">$739.00</div>
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-2 col-md-4">

                            <div className="item item-thumbnail">
                                <a href="product_detail.html" className="item-image">
                                    <img src="../assets/img/product/product-samsung-note5.png" alt />
                                    <div className="discount">32% OFF</div>
                                </a>
                                <div className="item-info">
                                    <h4 className="item-title">
                                        <a href="product.html">Samsung Galaxy Note 5<br />Black</a>
                                    </h4>
                                    <p className="item-desc">Super. Computer. Now in two sizes.</p>
                                    <div className="item-price">$599.00</div>
                                    <div className="item-discount-price">$799.00</div>
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-2 col-md-4">

                            <div className="item item-thumbnail">
                                <a href="product_detail.html" className="item-image">
                                    <img src="../assets/img/product/product-iphone-se.png" alt />
                                    <div className="discount">20% OFF</div>
                                </a>
                                <div className="item-info">
                                    <h4 className="item-title">
                                        <a href="product.html">iPhone SE<br />32/64Gb</a>
                                    </h4>
                                    <p className="item-desc">A big step for small.</p>
                                    <div className="item-price">$499.00</div>
                                    <div className="item-discount-price">$599.00</div>
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-2 col-md-4">

                            <div className="item item-thumbnail">
                                <a href="product_detail.html" className="item-image">
                                    <img src="../assets/img/product/product-zenfone2.png" alt />
                                    <div className="discount">15% OFF</div>
                                </a>
                                <div className="item-info">
                                    <h4 className="item-title">
                                        <a href="product_detail.html">Assus ZenFone 2<br />‏(ZE550ML)</a>
                                    </h4>
                                    <p className="item-desc">See What Others Can’t See</p>
                                    <div className="item-price">$399.00</div>
                                    <div className="item-discount-price">$453.00</div>
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-2 col-md-4">

                            <div className="item item-thumbnail">
                                <a href="product_detail.html" className="item-image">
                                    <img src="../assets/img/product/product-xperia-z.png" alt />
                                    <div className="discount">32% OFF</div>
                                </a>
                                <div className="item-info">
                                    <h4 className="item-title">
                                        <a href="product.html">Sony Xperia Z<br />Black Color</a>
                                    </h4>
                                    <p className="item-desc">For unexpectedly beautiful moments</p>
                                    <div className="item-price">$599.00</div>
                                    <div className="item-discount-price">$799.00</div>
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-2 col-md-4">

                            <div className="item item-thumbnail">
                                <a href="product_detail.html" className="item-image">
                                    <img src="../assets/img/product/product-lumia-532.png" alt />
                                    <div className="discount">20% OFF</div>
                                </a>
                                <div className="item-info">
                                    <h4 className="item-title">
                                        <a href="product.html">Microsoft Lumia 531<br />Smartphone Orange</a>
                                    </h4>
                                    <p className="item-desc">1 Year Local Manufacturer Warranty</p>
                                    <div className="item-price">$99.00</div>
                                    <div className="item-discount-price">$199.00</div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}

export default ProductDetail