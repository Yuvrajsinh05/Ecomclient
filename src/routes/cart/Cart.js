import React, { useEffect, useState } from 'react'
import { Header } from '../../components/header/header'
import { getApiCall ,postApiCall } from '../../requests/requests'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CustomerCart, Payment } from '../../requests/adminreq';
import { useSelector } from 'react-redux';


function Cart() {
    const isAuthenticated = useSelector(state => state.login.isAuthenticated);
    const CustomerId = useSelector(state => { return state?.login?.user?.Userdata?._id});
    const [cartData, setCartData] = useState([])
    const [totalAmont, setTotalAmont] = useState(0)
    const [totalSingleAmount, setTotalSingleAmount] = useState(0)
    const [totalSingleAmountArray, setTotalAmountArray] = useState([])
    const [cartItems, setCartitems] = useState([])
    const navigate = useNavigate()


    useEffect(()=>{
        if(!isAuthenticated){
            navigate('/')
        }
   },[])

   useEffect(() => {
    getcustomercart()
}, [])


    async function getcustomercart() {
        const getcart = await getApiCall(`${CustomerCart.getCartById}?id=${CustomerId}`)
        setCartData(getcart?.data)
        setCartitems(getcart?.data[0]?.items)
        let addmount = 0
        let totalamount = getcart?.data[0]?.items?.map((it, key) => addmount += it?.price * it?.quantity)
        setTotalAmont(addmount?.toFixed(2))

    }

    async function handleCartrmv(dlt) {
        let Fltitems = cartData[0].items.filter((data, key) => data?.product_id != dlt.product_id)
        const data = {
            items: Fltitems
        }
        let updateItems = await postApiCall(`${CustomerCart.UpdateCartById}?id=${CustomerId}`, data)
        getcustomercart()
    }



    return (
        <>
            {/* <Header /> */}
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

                                {cartItems?.map((cart, index) => {
                                    return (
                                        <Cartcomponent cart={cart} key={index} getcustomercart={getcustomercart} CustomerId={CustomerId} handleCartrmv={handleCartrmv} />
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
                                <button className="btn btn-block btn-primary font-weight-bold my-3 py-3" onClick={() => navigate('/checkout', {state:{"Amount":totalAmont}})} >Proceed To Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

function Cartcomponent({ cart, handleCartrmv ,getcustomercart ,CustomerId}) {


    
    const [counter, setCounter] = useState(cart?.quantity || 0)
    function handleraddcounter(e) {
        e.preventDefault();
        let count = parseInt(counter)
        count++
        setCounter(count)
        // updatequantity()
    }

    function handlermvcounter(e) {
        e.preventDefault();
        if (counter > 0) {
            let count = parseInt(counter)
            count--
            setCounter(count)
            // updatequantity()
        } else {
            alert("fuck you dumb!!!")
        }
    }

    useEffect(()=>{
        updatequantity()
    },[counter])


    console.log("cartr",cart)
    async function updatequantity(){
        let body = {
            "product_id" : cart.product_id,
            "quantity" : counter,
            "CustomerId" :CustomerId
        }

        const updateQuantity = await postApiCall(CustomerCart.updatequantity ,body)
        console.log("updateQuantity",updateQuantity)
        getcustomercart()
    }

    
    return (
        <>
            <tr>
                <td className="align-middle"><img src="img/product-1.jpg" alt="" style={{ width: "50px" }} /> {cart?.product_name || "N/A"}</td>
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
                <td className="align-middle">{` ₹  ${(cart?.price * cart?.quantity).toFixed(2)}`}</td>
                <td className="align-middle"><button className="btn btn-sm btn-danger" onClick={() => { handleCartrmv(cart) }}><i className="fa fa-times"></i></button></td>
            </tr>
        </>
    )
}
export default Cart
