// import {} from "./style.css"
import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
    const location = useLocation()
    return (
        <>
            {
                location.pathname !== '/' ? <div className="container-fluid bg-dark text-secondary mt-5 pt-5">
                    <div className="row px-xl-5 pt-5">
                        <div className="col-lg-6 col-md-12 mb-5 pr-3 pr-xl-5">
                            <h5 className="text-secondary text-uppercase mb-4">Get In Touch</h5>
                            <p className="mb-4">All code and programming materials on this website are protected by copyright law. Unauthorized use, reproduction, or modification of the code without permission is strictly prohibited. Violators will be subject to legal action. For permission to use the code, contact Devlopers. Respect intellectual property rights.</p>

                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="row">
                                <div className="col-md-6 mb-5">
                                    <h5 className="text-secondary text-uppercase mb-4">Contact Details</h5>
                                    <p className="mb-2"><i className="fa fa-envelope text-primary mr-3"></i>yuvrajsinh73598@gmail.com</p>
                                    <p className="mb-2"><i className="fa fa-envelope text-primary mr-3"></i>ecocoservices@gmail.com</p>
                                    <p className="mb-0"><i className="fa fa-phone-alt text-primary mr-3"></i>+91 9510533350</p>
                                    <p className="mt-3 d-flex">
                                        {/* <i className="fa text-primary mr-3"></i> */}
                                        <a className="btn btn-primary btn-square mr-2" target='_blank' href="https://www.linkedin.com/in/yuvrajsinh-jadav-2041a822b/">
                                            <i className="fab fa-linkedin-in"></i>
                                        </a>

                                        <a className="btn btn-primary btn-square" target='_blank' href="https://www.instagram.com/">
                                            <i className="fab fa-instagram"></i>
                                        </a>
                                    </p>
                                </div>
                                <div className="col-md-6 mb-5">
                                    <h5 className="text-secondary text-uppercase mb-4">Newsletter</h5>
                                    <p>Through our daily news service, we pledge to provide you with up-to-date information on current events, ensuring that you are well-informed on a regular basis.</p>
                                    <form action="">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Your Email Address" />
                                            <div className="input-group-append">
                                                <button className="btn btn-primary">SubScribe</button>
                                            </div>
                                        </div>
                                    </form>
                                    {/* <h6 className="text-secondary text-uppercase mt-4 mb-3">Follow Us</h6> */}
                                    {/* <div className="d-flex">

                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row border-top mx-xl-5 py-4" style={{ borderColor: "rgba(256, 256, 256, .1) !important" }}>
                        <div className="col-md-6 px-xl-0">
                            <p className="mb-md-0 text-center text-md-left text-secondary">
                                &copy; <Link className="text-primary" href="#">Yuvrajsinh</Link>. All Rights Reserved.<br />
                                <Link className="text-primary" href="https://htmlcodex.com">UI credits goes to respected owners</Link>
                            </p>
                        </div>
                        <div className="col-md-6 px-xl-0 text-center text-md-right">
                            <img className="img-fluid" src="img/payments.png" alt="" />
                        </div>
                    </div>
                </div> : null
            }

        </>
    )
}