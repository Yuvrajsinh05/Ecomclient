import React, { useEffect, useState } from 'react'
import { getApiCall, postApiCall } from '../../requests/requests'
import { CustomerCart, Payment } from '../../requests/adminreq'
import { useSelector } from 'react-redux'






function Billingaddrs() {
    const CustomerId = useSelector(state => { return state?.login?.user?.Userdata?._id});
    const [cartProducts, setCartProducts] = useState()
    const [subtotal, setSubTotal] = useState()
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
        fName: "",
        lName: "",
        Email: "",
        PhoneNo: "",
        AdrsLine1: "",
        AdrsLine2: "",
        Country: "",
        City: "",
        State: "",
        Pin: ""
    })

    useEffect(() => {
        getCustomerCart()
    }, [])

    async function paymentVerification(razorpay_payment_id, razorpay_order_id, razorpay_signature) {

        const data = {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature
        }
        let verify = await postApiCall(Payment.paymentVerify, data)
    }

    const handleCheckout = async (value) => {
        if(!Array.isArray(cartProducts) || cartProducts.length==0){return alert("Your Cart Is Empty")}
        let valid = validateForm(form);
        if(!valid) return;
        let OrderAmount = {
            amount: subtotal
        }

        let OrderProducts = {
            cartProducts: [...cartProducts]
        }
        const data = {
            ...OrderAmount,
            ...form,
            ...OrderProducts
        }
        const consekey = await postApiCall(Payment.doPay, data)
        const getKey = await getApiCall(Payment.getKey)
        var options = {
            key: getKey.key, // Enter the Key ID generated from the Dashboard
            amount: subtotal * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Acme Corp",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: consekey?.data?.order?.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: async function (response) {
                let res = await response
                console.log("res",res)
                paymentVerification(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature)
            },
            // callback_url: Payment.paymentVerify ,
            prefill: {
                "name": form.fName + " " + form.lName,
                "email": form.Email,
                "contact": form.PhoneNo
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#3399cc"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
    }

    async function getCustomerCart() {
        let fetchCarts = await getApiCall(`${CustomerCart.getCartById}?id=${CustomerId}`)
        let subtotal = 0;
        fetchCarts.data?.items?.map((prod) => {
            subtotal = subtotal + (prod.quantity * prod.price)
        })
        setSubTotal(subtotal.toFixed(2))
        setCartProducts(fetchCarts?.data?.items)
    }

    function handleChage(e) {
        setForm({
            ...form,
            [e.target.id]: e.target.value,
        })
    }



    const validateForm = (obj) => {
        const newErrors = {};
        // Check if required fields are empty
        Object.keys(obj).forEach(key => {
            if (!obj[key]) {
                newErrors[key] = `${key} is required`
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    return (
        <>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-lg-8">
                        <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Billing / SHIPPING  Address</span></h5>
                        <div className="bg-light p-30 mb-5">
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <label for={'fName'}>First Name</label>
                                    <input className="form-control" style={errors?.fName ? { border: '1px solid red' } : {}} id='fName' type="text" onChange={handleChage} placeholder="John" />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label for={'lName'}>Last Name</label>
                                    <input className="form-control" style={errors?.lName ? { border: '1px solid red' } : {}} id='lName' type="text" onChange={handleChage} placeholder="Doe" />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label for={'Email'}>E-mail</label>
                                    <input className="form-control" style={errors?.Email ? { border: '1px solid red' } : {}} id='Email' type="text" onChange={handleChage} placeholder="example@email.com" />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label for={'PhoneNo'}>Mobile No</label>
                                    <input className="form-control" style={errors?.PhoneNo ? { border: '1px solid red' } : {}} id='PhoneNo' type="text" onChange={handleChage} placeholder="+123 456 789" />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label for={'AdrsLine1'}>Address Line 1</label>
                                    <input className="form-control" style={errors?.AdrsLine1 ? { border: '1px solid red' } : {}} id='AdrsLine1' type="text" onChange={handleChage} placeholder="123 Street" />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label for={'AdrsLine2'}>Address Line 2</label>
                                    <input className="form-control" style={errors?.AdrsLine2 ? { border: '1px solid red' } : {}} id='AdrsLine2' type="text" onChange={handleChage} placeholder="123 Street" />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label for={'Country'}>Country</label>
                                    <select id='Country' style={errors?.Country ? { border: '1px solid red' } : {}} onChange={handleChage} className="custom-select">
                                        <option value={"United States"}>United States</option>
                                        <option value={"Afghanistan"}>Afghanistan</option>
                                        <option value={"Albania"}>Albania</option>
                                        <option value={"Algeria"}>Algeria</option>
                                    </select>
                                </div>
                                <div className="col-md-6 form-group">
                                    <label for={'City'}>City</label>
                                    <input className="form-control" id='City' style={errors?.City ? { border: '1px solid red' } : {}} type="text" onChange={handleChage} placeholder="New York" />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label for={'State'}>State</label>
                                    <input className="form-control" type="text" style={errors?.State ? { border: '1px solid red' } : {}} id='State' onChange={handleChage} placeholder="New York" />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label for={'Pin'}>Pin Code</label>
                                    <input className="form-control" type="text" style={errors?.Pin ? { border: '1px solid red' } : {}} id='Pin' onChange={handleChage} placeholder="123" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Order Total</span></h5>
                        <div className="bg-light p-30 mb-5">
                            <div className="border-bottom">
                                <h6 className="mb-3">Products</h6>
                                {cartProducts?.map((prod, index) => {
                                    return (
                                        <div key={index} className="d-flex justify-content-between">
                                            <p>{prod.name}<span style={{ color: 'black' }}><b>  x <b>{prod.quantity}</b> </b></span></p>
                                            <p>{(prod.quantity * prod.price).toFixed(2)}</p>
                                        </div>

                                    )
                                })}
                            </div>
                            <div className="border-bottom pt-3 pb-2">
                                <div className="d-flex justify-content-between mb-3">
                                    <h6>Subtotal</h6>
                                    <h6>{subtotal}</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">Shipping</h6>
                                    <h6 className="font-weight-medium">0</h6>
                                </div>
                            </div>
                            <div className="pt-2">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5>Total</h5>
                                    <h5>{subtotal}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="mb-5">
                            <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Payment</span></h5>
                            <div className="bg-light p-30">
                                {/* <div className="form-group">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" name="payment" id="paypal" />
                                        <label className="custom-control-label" for="paypal">Paypal</label>
                                    </div>
                                </div> */}
                                {/* <div className="form-group">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" name="payment" id="directcheck" />
                                        <label className="custom-control-label" for="directcheck">Direct Check</label>
                                    </div>
                                </div>
                                <div className="form-group mb-4">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" name="payment" id="banktransfer" />
                                        <label className="custom-control-label" for="banktransfer">Bank Transfer</label>
                                    </div>
                                </div> */}
                                <button onClick={() => handleCheckout()} className="btn btn-block btn-primary font-weight-bold py-3">Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Billingaddrs
