import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
function SliderType() {
   
    return (
        <>
            <div id="work" className="content" data-scrollview="true">

                <div className="container text-center" data-animation="true" data-animation-type="animate__fadeInDown">
                    <h2 className="content-title">Our Latest Work</h2>
                    <p className="content-desc">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum consectetur eros dolor,<br />
                        sed bibendum turpis luctus eget
                    </p>
                    {/* <ReactCardSlider slides={slides} /> */}



                    
                    <Carousel >
                        <Carousel.Item style={{ height: '100px' }}>
                            <div className="row row-space-10" style={{ height: '100%' }}>
                                <div className="col-lg-3 col-md-4">
                                    <div className="work">
                                        <div className="image">
                                            <a href="#"><img src="./assets/img/pos/m-1.jpg" alt="Work 1" /></a>
                                        </div>
                                        <div className="desc">
                                            <span className="desc-title">Aliquam molestie</span>
                                            <span className="desc-text">Lorem ipsum dolor sit amet</span>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-lg-3 col-md-4">
                                    <div className="work">
                                        <div className="image">
                                            <a href="#"><img src="./assets/img/pos/m-2.jpg" alt="Work 2" /></a>
                                        </div>
                                        <div className="desc">
                                            <span className="desc-title">Quisque at pulvinar lacus</span>
                                            <span className="desc-text">Lorem ipsum dolor sit amet</span>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-lg-3 col-md-4">
                                    <div className="work">
                                        <div className="image">
                                            <a href="#"><img src="./assets/img/pos/m-3.jpg" alt="Work 3" /></a>
                                        </div>
                                        <div className="desc">
                                            <span className="desc-title">Vestibulum et erat ornare</span>
                                            <span className="desc-text">Lorem ipsum dolor sit amet</span>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-lg-3 col-md-4">
                                    <div className="work">
                                        <div className="image">
                                            <a href="#"><img src="./assets/img/pos/m-4.jpg" alt="Work 4" /></a>
                                        </div>
                                        <div className="desc">
                                            <span className="desc-title">Sed vitae mollis magna</span>
                                            <span className="desc-text">Lorem ipsum dolor sit amet</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="row row-space-10">
                                <div className="col-lg-3 col-md-4">
                                    <div className="work">
                                        <div className="image">
                                            <a href="#"><img src="./assets/img/pos/m-1.jpg" alt="Work 1" /></a>
                                        </div>
                                        <div className="desc">
                                            <span className="desc-title">Aliquam molestie</span>
                                            <span className="desc-text">Lorem ipsum dolor sit amet</span>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-lg-3 col-md-4">
                                    <div className="work">
                                        <div className="image">
                                            <a href="#"><img src="./assets/img/pos/m-2.jpg" alt="Work 2" /></a>
                                        </div>
                                        <div className="desc">
                                            <span className="desc-title">Quisque at pulvinar lacus</span>
                                            <span className="desc-text">Lorem ipsum dolor sit amet</span>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-lg-3 col-md-4">
                                    <div className="work">
                                        <div className="image">
                                            <a href="#"><img src="./assets/img/pos/m-3.jpg" alt="Work 3" /></a>
                                        </div>
                                        <div className="desc">
                                            <span className="desc-title">Vestibulum et erat ornare</span>
                                            <span className="desc-text">Lorem ipsum dolor sit amet</span>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-lg-3 col-md-4">
                                    <div className="work">
                                        <div className="image">
                                            <a href="#"><img src="./assets/img/pos/m-4.jpg" alt="Work 4" /></a>
                                        </div>
                                        <div className="desc">
                                            <span className="desc-title">Sed vitae mollis magna</span>
                                            <span className="desc-text">Lorem ipsum dolor sit amet</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </Carousel.Item>
                    </Carousel>

                </div>



            </div>
        </>
    );
}

export default SliderType;
