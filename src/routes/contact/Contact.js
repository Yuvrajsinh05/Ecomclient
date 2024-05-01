import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../requests/adminreq";
import { postApiCall } from "../../requests/requests";

function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if(!formData.name || !formData.email || !formData.subject || !formData.message){
        alert("Fileds Missing!!")
        setSubmitting(false);
        return;
      }
      const response = await postApiCall(UserAuth.ContactEcom , formData);
      alert("Form submitted successfully.",response);
      navigate("/");
    } catch (error) {
      alert("An error occurred while submitting the form.");
    }
    setSubmitting(false);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-12">
            <nav className="breadcrumb bg-light mb-30">
              <Link className="breadcrumb-item text-dark" to="/">Home</Link>
              <span className="breadcrumb-item active">Contact</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Contact Us</span>
        </h2>
        <div className="row px-xl-5">
          <div className="col-lg-7 mb-5">
            <div className="contact-form bg-light p-30">
              <div id="success"></div>
              <form onSubmit={handleSubmit} noValidate>
                <div className="control-group">
                  <input type="text" className="form-control" id="name" name="name" placeholder="Your Name"
                    value={formData.name} onChange={handleChange} required />
                  <p className="help-block text-danger"></p>
                </div>
                <div className="control-group">
                  <input type="email" className="form-control" id="email" name="email" placeholder="Your Email"
                    value={formData.email} onChange={handleChange} required />
                  <p className="help-block text-danger"></p>
                </div>
                <div className="control-group">
                  <input type="text" className="form-control" id="subject" name="subject" placeholder="Subject"
                    value={formData.subject} onChange={handleChange} required />
                  <p className="help-block text-danger"></p>
                </div>
                <div className="control-group">
                  <textarea className="form-control" rows="8" id="message" name="message" placeholder="Message"
                    value={formData.message} onChange={handleChange} required></textarea>
                  <p className="help-block text-danger"></p>
                </div>
                <div>
                  <button className="btn btn-primary py-2 px-4" type="submit" disabled={submitting}>
                    {submitting ? "Submitting..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-5 mb-5">
            {/* Google Maps Embed */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
