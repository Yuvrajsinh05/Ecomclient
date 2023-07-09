import React, { useEffect, useState } from 'react'
import { Header } from '../../components/header/header'
import { getApiCall ,postApiCall } from '../../requests/requests'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CustomerCart, Payment } from '../../requests/adminreq';


function Cart() {

    const [cartData, setCartData] = useState([])
    const [totalAmont, setTotalAmont] = useState(0)
    const [totalSingleAmount, setTotalSingleAmount] = useState(0)
    const [totalSingleAmountArray, setTotalAmountArray] = useState([])
    const [cartItems, setCartitems] = useState([])
    const navigate = useNavigate()


    useEffect(()=>{
        if(!window.localStorage.ecomtoken){
            navigate('/')
        }
   },[])

    async function getcustomercart() {
        const getcart = await getApiCall(`${CustomerCart.getCartById}?id=${localStorage.getItem('ecomuserId')}`)
        setCartData(getcart?.data)
        setCartitems(getcart?.data[0]?.items)
        let addmount = 0
        let totalamount = getcart?.data[0].items.map((it, key) => addmount += it?.price)
        setTotalAmont(addmount)

    }



    useEffect(() => {
        getcustomercart()
    }, [])


    async function handleCartrmv(dlt) {
        let Fltitems = cartData[0].items.filter((data, key) => data?.product_id != dlt.product_id)
        const data = {
            items: Fltitems
        }
        let updateItems = await postApiCall(`${CustomerCart.UpdateCartById}?id=${localStorage.getItem('ecomuserId')}`, data)
        getcustomercart()

    }


    async function paymentVerification(razorpay_payment_id,razorpay_order_id,razorpay_signature) {

        const data = {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature
        }
        let verify = await postApiCall(Payment.paymentVerify, data)
    }
    const handleCheckout = async (value) => {
        const data = { amount: value }
        const consekey = await postApiCall(Payment.doPay, data)
        const getKey = await getApiCall(Payment.getKey)
        var options = {
            key: getKey.key, // Enter the Key ID generated from the Dashboard
            amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Acme Corp",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: consekey?.data?.order?.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: function (response) {
               paymentVerification(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature)
            },
            prefill: {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000"
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

    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30">
                            <Link className="breadcrumb-item text-dark" href="#">Home</Link>
                            <Link className="breadcrumb-item text-dark" href="#">Shop</Link>
                            <span className="breadcrumb-item active">Shopping Cart</span>
                        </nav>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-lg-8 table-responsive mb-5">
                        <table className="table table-light table-borderless table-hover text-center mb-0">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Products</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody className="align-middle">

                                {cartItems.map((cart, index) => {
                                    return (
                                        <Cartcomponent cart={cart} key={index} handleCartrmv={handleCartrmv} />
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-4">
                        <form className="mb-30" action="">
                            <div className="input-group">
                                <input type="text" className="form-control border-0 p-4" placeholder="Coupon Code" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary">Apply Coupon</button>
                                </div>
                            </div>
                        </form>
                        <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Cart Summary</span></h5>
                        <div className="bg-light p-30 mb-5">
                            <div className="border-bottom pb-2">
                                <div className="d-flex justify-content-between mb-3">
                                    <h6>Subtotal</h6>
                                    <h6>₹{totalAmont}</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">Shipping</h6>
                                    <h6 className="font-weight-medium">₹0</h6>
                                </div>
                            </div>
                            <div className="pt-2">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5>Total</h5>
                                    <h5>₹{totalAmont}</h5>
                                </div>
                                <button className="btn btn-block btn-primary font-weight-bold my-3 py-3" onClick={() => handleCheckout(totalAmont)} >Proceed To Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

function Cartcomponent({ cart, handleCartrmv }) {

    const [counter, setCounter] = useState(cart?.quantity || 0)
    function handleraddcounter(e) {
        e.preventDefault();
        let count = parseInt(counter)
        count++
        setCounter(count)
    }

    function handlermvcounter(e) {
        e.preventDefault();
        if (counter > 0) {
            let count = parseInt(counter)
            count--
            setCounter(count)

        } else {
            alert("fuck you dumb!!!")
        }
    }


    return (
        <>
            <tr>
                <td className="align-middle"><img src="img/product-1.jpg" alt="" style={{ width: "50px" }} /> {cart?.product_id}</td>
                <td className="align-middle">{` ₹ ${(cart?.price)} `}</td>
                <td className="align-middle">
                    <div className="input-group quantity mx-auto" style={{ width: "100px" }}>
                        <div className="input-group-btn">
                            <button className="btn btn-sm btn-primary btn-minus" onClick={(e) => handlermvcounter(e)} >
                                <i className="fa fa-minus" ></i>
                            </button>
                        </div>
                        < p className="form-control form-control-sm bg-secondary border-0 text-center">{counter}</p> 
                        <div className="input-group-btn">
                            <button className="btn btn-sm btn-primary btn-plus">
                                <i className="fa fa-plus" onClick={(e) => handleraddcounter(e)}></i>
                            </button>
                        </div>
                    </div>
                </td>
                <td className="align-middle">{` ₹  ${(cart?.price * cart?.quantity)}`}</td>
                <td className="align-middle"><button className="btn btn-sm btn-danger" onClick={() => { handleCartrmv(cart) }}><i className="fa fa-times"></i></button></td>
            </tr>
        </>
    )
}
export default Cart
