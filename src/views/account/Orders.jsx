import React, { useEffect, useState,useContext } from "react";
import { globalC } from "../../Context";

import { orderService } from "../../axios";
import { loadState } from "../../localStorage";
import { Link } from "react-router-dom";

import OrderList from "./OrderList";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationTriangle,
  faHistory,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";


const OrdersView = () => {

  const { authLogin,token,authLoginDetail } = useContext(globalC);
  const [isLoading,setIsLoading] = useState(true)


  // console.log('mhdsajhsadhsa1',token)
  // console.log('mhdsajhsadhsa11',authLogin)
  // console.log('mhdsajhsadhsa222',authLoginDetail)


  const [orders, setOrders] = useState([]);

 

  const getOrdersByCustomerId = () => {

    orderService.get('get/orders/customerId/'+authLogin?.user_name, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        console.log(res.data.data)
        setOrders(res.data.data)
        setIsLoading(false)
      })

  }


  useEffect(() => {

    getOrdersByCustomerId();

  }, [])

  const orderList = orders.map(order => {
    return (
      <OrderList order={order} key={order.id} />
    )
  })



  return (
    <div className="container mb-3">
      <h4 className="my-3 text-center">Orders</h4>
      <div className="row g-3">
        {isLoading && <p className="text-center">Loading.....</p>}
        {orders.length > 0 ? orderList : <NOORDER />}
      </div>
    </div>
  );
}


const NOORDER = () => {
  return (
    <div className="alert alert-warning">
      <p>No Orders Found!</p>
    </div>
  )
}


export default OrdersView;
