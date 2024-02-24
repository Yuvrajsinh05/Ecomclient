import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function Contact() {
    const isAuthenticated = useSelector(state => state.login.isAuthenticated);
    const navigate = useNavigate();
    const [GeoLocation , setGeoLocationUrl] = useState("")
    useEffect(() => {
        if (!isAuthenticated) {
          navigate('/')
        }
        getGeoLocation()
      }, [])
    



      const getGeoLocation = () => {
        // Get the user's current location using the Geolocation API
        navigator.geolocation.getCurrentPosition(
          function (position) {
            console.log("position", position);
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            const ApiKey = 'AIzaSyAvGqZ7RFssm42x3wLkq7ZkTm8zPmGOjj8'
            // Construct the embed URL with the user's current location
            var embedUrl = `https://www.google.com/maps/embed/v1/place?key=${ApiKey}&q=record+stores&center=22.315008,73.1807744`;
            // https://www.google.com/maps/embed/v1/place?key=AIzaSyAvGqZ7RFssm42x3wLkq7ZkTm8zPmGOjj8&q=record+stores&center=22.315008,73.1807744
            
            // Now you can use the embedUrl variable to embed the map with the user's current location
            console.log("embedUrl", embedUrl); // You can replace this with whatever logic you need to embed the map in your application
            setGeoLocationUrl(embedUrl);
          },
          function (error) {
            // Handle any errors that occur when trying to retrieve the user's location
            console.error("Error getting user location:", error);
          }
        );
    };
    
  return (
    <>
    
    <div className="container-fluid">
        <div className="row px-xl-5">
            <div className="col-12">
                <nav className="breadcrumb bg-light mb-30">
                    <Link className="breadcrumb-item text-dark" href="#">Home</Link>
                    <span className="breadcrumb-item active">Contact</span>
                </nav>
            </div>
        </div>
    </div>
 

    <div className="container-fluid">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Contact Us</span></h2>
        <div className="row px-xl-5">
            <div className="col-lg-7 mb-5">
                <div className="contact-form bg-light p-30">
                    <div id="success"></div>
                    <form name="sentMessage" id="contactForm" noValidate="novalidate">
                        <div className="control-group">
                            <input type="text" className="form-control" id="name" placeholder="Your Name"
                                required="required" data-validation-required-message="Please enter your name" />
                            <p className="help-block text-danger"></p>
                        </div>
                        <div className="control-group">
                            <input type="email" className="form-control" id="email" placeholder="Your Email"
                                required="required" data-validation-required-message="Please enter your email" />
                            <p className="help-block text-danger"></p>
                        </div>
                        <div className="control-group">
                            <input type="text" className="form-control" id="subject" placeholder="Subject"
                                required="required" data-validation-required-message="Please enter a subject" />
                            <p className="help-block text-danger"></p>
                        </div>
                        <div className="control-group">
                            <textarea className="form-control" rows="8" id="message" placeholder="Message"
                                required="required"
                                data-validation-required-message="Please enter your message"></textarea>
                            <p className="help-block text-danger"></p>
                        </div>
                        <div>
                            <button className="btn btn-primary py-2 px-4" type="submit" id="sendMessageButton">Send
                                Message</button>
                        </div>
                    </form>
                </div>
            </div>{
                console.log("GeoLocation",GeoLocation)
            }
            <div className="col-lg-5 mb-5">
                <div className="bg-light p-30 mb-30">
                    <iframe style={{width: "100%" ,  height: "250px"}}
                    src={GeoLocation}
                    allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                </div>
                <div className="bg-light p-30 mb-3">
                    <p className="mb-2"><i className="fa fa-map-marker-alt text-primary mr-3"></i>Sopanam 9</p>
                    <p className="mb-2"><i className="fa fa-envelope text-primary mr-3"></i>yuvrajsinh73598@gmail.com</p>
                    <p className="mb-2"><i className="fa fa-phone-alt text-primary mr-3"></i>+91 9510 53 3350</p>
                </div>
            </div>
        </div>
    </div>
 
    </>
  )
}

export default Contact
