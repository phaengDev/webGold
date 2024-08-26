import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Config, Urlimage } from '../../config/connection';
import moment from 'moment';
export default function NewsDetail() {
    const api = Config.urlApi;
    const img = Urlimage.url;
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const eventId = atob(searchParams.get('v'));

    const [item, setItem] = useState({
        titleName:'',
        newText:'',
        newDate:'',
        dataList:[]
    })

    const showEvent = async () => {
        try {
            const response = await fetch(api + `news/view/${eventId}`);
            const data = await response.json();
            setItem({
                titleName: data.event.titleName,
                newText: data.event.newText,
                newDate: data.event.newDate,
                dataList: data.list || []
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    const [itemNew, setItemNew] = useState([]);
    const fetchNewEvent = async () => {
        try {
            const response = await fetch(api + 'news/');
            const jsonData = await response.json();
            setItemNew(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } 
    }
    useEffect(() => {
        fetchNewEvent()
        showEvent();
    }, [eventId])
    return (
        <>
            <div id="content" className="content bg-component">
                <div className="container">
                    <div className="row gx-lg-5">
                        <div className="col-lg-9">
                            <div className="post-detail section-container">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to={'/'} >ໜ້າຫຼັກ</Link></li>
                                    <li className="breadcrumb-item"><Link to={'/news'} >ລາຍການຂ່າວສານ</Link></li>
                                    <li className="breadcrumb-item active">ລາຍລະອຽດຂ່າວສານ</li>
                                </ul>
                                <h4 className="post-title">{item.titleName} </h4>
                                <div className="post-desc">
                                    <div dangerouslySetInnerHTML={{ __html: item.newText }}></div>
                                </div>
                                {item.dataList && item.dataList.map((row, index) => (
                                    <div key={index}>
                                        <div className="post-image">
                                            <div className="post-image-cover" style={{ backgroundImage: `url(${img}potstnew/${row.img_list})` }}></div>
                                        </div>
                                        <div className="post-desc">
                                            {row.newText}
                                        </div>
                                    </div>
                                ))}

                            </div>

                            <div className="section-container">
                                <h4 className="section-titles"><span>All Comments (3)</span></h4>
                                <ul className="comment-list">
                                    <li>
                                        <div className="comment-avatar">
                                            <i className="fa fa-user"></i>
                                        </div>
                                        <div className="comment-container">
                                            <div className="comment-author">
                                                Aquila Erik
                                                <span className="comment-date">
                                                    on <span className="underline">June 6, 2024</span> at <span className="underline">6:17 pm</span>
                                                </span>
                                            </div>
                                            <div className="comment-content">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida blandit risus at finibus.
                                                In suscipit ligula velit, vel commodo libero viverra nec. Aenean luctus eleifend enim quis luctus.
                                                Aliquam vulputate placerat ullamcorper.
                                            </div>
                                            <div className="comment-btn pull-left">
                                                <a href="#"><i className="fa fa-reply"></i> Reply</a>
                                            </div>
                                            <div className="comment-rating">
                                                Like or Dislike:
                                                <a href="#" className="ms-10px text-dark d-inline-block w-50px text-start"><i className="fa fa-thumbs-up text-muted"></i> 154</a>
                                                <a href="#" className="ms-10px text-dark d-inline-block w-50px text-start"><i className="fa fa-thumbs-down text-muted"></i> 112</a>
                                            </div>

                                            <ul className="comment-list">
                                                <li>
                                                    <div className="comment-avatar">
                                                        <i className="fa fa-user"></i>
                                                    </div>
                                                    <div className="comment-container">
                                                        <div className="comment-author">
                                                            Gevorg Silvester
                                                            <span className="comment-date">
                                                                on <span className="underline">June 6, 2024</span> at <span className="underline">8:17 pm</span>
                                                            </span>
                                                        </div>
                                                        <div className="comment-content">
                                                            Quisque aliquam arcu nec nibh eleifend, ac varius ante lacinia.
                                                            Nam nec varius enim, vel mollis dui. Duis malesuada lorem metus,
                                                            ut placerat turpis vulputate vitae.
                                                        </div>
                                                        <div className="comment-btn pull-left">
                                                            <a href="#"><i className="fa fa-reply"></i> Reply</a>
                                                        </div>
                                                        <div className="comment-rating">
                                                            Like or Dislike:
                                                            <a href="#" className="ms-10px text-dark d-inline-block w-50px text-start"><i className="fa fa-thumbs-up text-muted"></i> 5</a>
                                                            <a href="#" className="ms-10px text-dark d-inline-block w-50px text-start"><i className="fa fa-thumbs-down text-muted"></i> 0</a>
                                                        </div>
                                                    </div>

                                                </li>
                                            </ul>

                                        </div>

                                    </li>
                                    <li>

                                        <div className="comment-avatar">
                                            <img src="../assets/img/user/user-1.jpg" alt />
                                        </div>
                                        <div className="comment-container">
                                            <div className="comment-author">
                                                Isador Ennio
                                                <span className="comment-date">
                                                    on <span className="underline">June 6, 2024</span> at <span className="underline">11:23 pm</span>
                                                </span>
                                            </div>
                                            <div className="comment-content">
                                                Fusce urna massa, pellentesque eget interdum nec, lacinia nec velit.
                                            </div>
                                            <div className="comment-btn pull-left">
                                                <a href="#"><i className="fa fa-reply"></i> Reply</a>
                                            </div>
                                            <div className="comment-rating">
                                                Like or Dislike:
                                                <a href="#" className="ms-10px text-dark d-inline-block w-50px text-start"><i className="fa fa-thumbs-up text-muted"></i> 2</a>
                                                <a href="#" className="ms-10px text-dark d-inline-block w-50px text-start"><i className="fa fa-thumbs-down text-muted"></i> 0</a>
                                            </div>
                                        </div>

                                    </li>
                                </ul>

                            </div>


                            <div className="section-container">
                                <h4 className="section-titles"><span>Add a Comment</span></h4>
                                <div className="alert alert-warning mb-4 mt-4 f-s-13">
                                    Suspendisse vulputate pulvinar nisl, quis rutrum risus pretium ut. Nulla at risus facilisis, consectetur erat nec,
                                    posuere justo. Ut elementum, elit pellentesque eleifend semper, elit metus venenatis libero,
                                    non fermentum mi est eu neque. Ut vel metus eget tortor viverra varius et quis eros.
                                </div>
                                <form className="form-horizontal" action method="POST">
                                    <div className="mb-3 row">
                                        <label className="col-form-label col-md-2 text-md-right">Your Name <span className="text-danger">*</span></label>
                                        <div className="col-md-10">
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-form-label col-md-2 text-md-right">Your Email <span className="text-danger">*</span></label>
                                        <div className="col-md-10">
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-form-label col-md-2 text-md-right">Comment <span className="text-danger">*</span></label>
                                        <div className="col-md-10">
                                            <textarea className="form-control" rows="10"></textarea>
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-md-10 offset-md-2">
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="emailNotify" name="email_notify" />
                                                <label className="form-check-label" for="emailNotify">Notify me of follow-up comments by email.</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-md-10 offset-md-2">
                                            <button type="submit" className="btn btn-dark btn-lg w-300px">Submit Comment</button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>


                        <div className="col-lg-3">

                        <div className="section-container">
                                <h4 className="section-titles"><span>ລາຍການຂ່າວສານປະຈຳວັນ</span></h4>
                                <ul className="sidebar-recent-post">
                                    {itemNew.map((item,key)=>(
                                    <li>
                                        <div className="info">
                                            <h4 className="title"><a href="#">{item.titleName}</a></h4>
                                            <div className="date">{moment(item.newDate).format('DD/m/YYYY')}</div>
                                        </div>
                                    </li>
                                    ))}
                                   
                                </ul>
                            </div>

                            <div className="section-container">
                                <h4 className="section-titles"><span>Categories</span></h4>
                                <ul className="sidebar-list">
                                    <li><a href="#">Sports (20)</a></li>
                                    <li><a href="#">Outdoor Sports (45)</a></li>
                                    <li><a href="#">Indoor Sports (1,292)</a></li>
                                    <li><a href="#">Video Shooting (12)</a></li>
                                    <li><a href="#">Drone (229)</a></li>
                                    <li><a href="#">Uncategorized (1,482)</a></li>
                                </ul>
                            </div>




                            <div className="section-container">
                                <h4 className="section-titles"><span>Follow Us</span></h4>
                                <ul className="sidebar-social-list">
                                    <li><a href="#"><i className="fab fa-facebook"></i></a></li>
                                    <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                    <li><a href="#"><i className="fab fa-google-plus"></i></a></li>
                                    <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                                </ul>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}
