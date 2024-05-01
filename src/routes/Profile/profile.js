import React from "react";
import { useSelector } from "react-redux";
import styles from "./profile.module.css"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getApiCall } from "../../requests/requests";
import { UserAuth } from "../../requests/adminreq";
import { formatDate, formatTime, integerToWords } from "../../components/commonoperations";
import Pagination from "../../components/Pagination";
import { ChatMessageBox } from "./chatBox/chatBox";




export default function UserProfile() {
  const isAuthenticated = useSelector(state => state.login.isAuthenticated);
  const UserDetails = useSelector(state => state?.login?.user?.Userdata)
  const [userOrders, setUserOrders] = useState([])
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(userOrders?.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userOrders?.slice(indexOfFirstItem, indexOfLastItem);
  const onPageChange = pageNumber => setCurrentPage(pageNumber);




  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/")
    }
    handleGetOrders()
  }, [])


  async function handleGetOrders() {
    const GetOrders = await getApiCall(UserAuth.userOrders)
    setUserOrders(GetOrders?.data)
  }

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <h2>User Profile</h2>
          <div className={styles.user_details}>
            <div>
              <h3>User Details</h3>
              <p>
                <strong>Name : </strong>{UserDetails?.Name}
              </p>
              <p>
                <strong>Email : </strong>{UserDetails?.email}
              </p>
              <p>
                <strong>Phone : </strong>{UserDetails?.phone}
              </p>
            </div>
            <div className={styles.displayIcon}>
              <div className={styles.user_icon}>
                {UserDetails?.Image ?
                  <img
                    src={UserDetails?.Image}
                    alt=""
                  />
                  :
                  <span className={styles.innerFontSpelling}>{UserDetails?.Name[0]?.toUpperCase()}{UserDetails?.Name[UserDetails?.Name.length - 1]?.toUpperCase()}</span>
                }
              </div>
            </div>
          </div>
          <div className={styles.order_details}>
            <h3>Order Details</h3>
            {userOrders.length == 0 ?
              <>
                <h6>No Orders Found</h6>
              </>
              : <table className={styles.tableSizer}>
                <thead>
                  <tr>
                    <th><b>Order ID</b></th>
                    <th><b>Items</b> </th>
                    <th><b>Amount</b></th>
                    <th><b>OrderStatus</b> </th>
                    <th><b>Payment</b></th>
                    <th><b>CreatedAt</b></th>
                    <th><b>time</b></th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems?.map((order, index) => {
                    return (
                      <>
                        <tr key={index}>
                          <td >{order?.razorOrderId}</td>
                          <td >{integerToWords(order?.items?.length)}</td>
                          <td>{order?.total_price}</td>
                          <td>{order?.orderStatus}</td>
                          <td>{order?.paymentStatus}</td>
                          <td>{formatDate(order?.date)}</td>
                          <td>{formatTime(order?.date)}</td>
                        </tr>
                      </>
                    )
                  })}
                </tbody>
              </table>}

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
          </div>
        </div>
        <div className={styles.containerOne}>
          <UserProfileSection UserName={UserDetails?.Name} />
        </div>
            
      </div>
    </>
  )
}


const UserProfileSection = ({ UserName }) => {
  return (
    <>
      <ChatMessageBox UserName={UserName} />
    </>
  );
};



