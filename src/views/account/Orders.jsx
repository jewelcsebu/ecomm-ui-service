import React, { useEffect,useState } from "react";

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

var axios = require('axios');

const OrdersView  = () => {

 console.log(loadState().access_token)
 console.log(loadState())

const token = loadState().access_token;


 const [orders,setOrders] = useState([]);

const getOrdersByCustomerId = () =>{

  orderService.get('get/orders/customerId/1',{ headers: {"Authorization" : `Bearer ${token}`} })
  .then(res =>{
    console.log(res.data.data)
   setOrders(res.data.data)
  })

}


useEffect(()=>{

 getOrdersByCustomerId();

},[])

const orderList = orders.map(order => {
  return(
    <OrderList order = {order} key={order.id}/>
  )
})



    return (
      <div className="container mb-3">
        <h4 className="my-3">Orders</h4>
        <div className="row g-3">
              { orders.length>0 ? orderList : <NOORDER />}
        </div>
      </div>
    );
}


const NOORDER = () =>{
  return (
    <div className="alert alert-warning">
        <p>No Orders Found!</p>
    </div>
  )
}


export default OrdersView;
