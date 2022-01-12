import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationTriangle,
  faHistory,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const OrderList = ({order}) =>{

    return(

        <div className="col-md-6">
        <div className="card">
          <div className="row g-0">
            <div className="col-md-12">
              <div className="card-header">
                <div className="small">
                  <span className="border bg-secondary rounded-left px-2 text-white">
                    Order ID
                  </span>
                  <span className="border bg-white rounded-right px-2 mr-2">
                    {order.id}
                  </span>
                  <span className="border bg-secondary rounded-left px-2 text-white">
                    Date
                  </span>
                  <span className="border bg-white rounded-right px-2 mr-2">
                    {order.createdAt}
                  </span>
                  <span className="border bg-white rounded-right px-2 mr-2">Status:</span>
                    <span className="text-success border bg-white rounded-right px-2 mr-2 ">
                        <FontAwesomeIcon icon={faCheckCircle} className="mr-1" />
                        {order.status}
                    </span>
                    <span className="border bg-white rounded-right mr-2"> 
                    
                    <Link to="/account/order/details"  className="text-center m-1">Details</Link>
                    
                    </span>
                   
                    
                </div>
              </div>

              {/* 
              
              PROCESSING
              COMPLETED
              COD
              PAID
              CANCELED
              
          
              
              */}
            
            </div>
     
           
          </div>
        </div>
      </div>
    )


}

export default OrderList