import React, { useEffect,useState } from "react";

import { orderService } from "../../axios";
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

//   const  config= { 
//     'accept': 'application/json',
//     'Authorization': `Bearer 3f90766b-5e4e-4f1b-ad62-d69e3dd20236` ,
//     'content-type': "application/json" //  doesn't support json
//   }

   const token = "3f90766b-5e4e-4f1b-ad62-d69e3dd20236";


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
