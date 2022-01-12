import React, { useEffect,useState } from "react";
import { orderService } from "../../axios";

import { Link } from "react-router-dom";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { ReactComponent as IconTruckFill } from "bootstrap-icons/icons/truck.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as IconCart3 } from "bootstrap-icons/icons/cart3.svg";
const SingleOrder = () =>{

    const [products,setProducts] = useState([])
    const [orderDetails,setOrderDetails] = useState({})

    const token = "3f90766b-5e4e-4f1b-ad62-d69e3dd20236";
    const image = "http://localhost:8200/api/v1/product-service/uploads/view/"


    const getproduct = (orderId) =>{

        orderService.get('get/order-details/Mt0T6JsQU6',{ headers: {"authorization" : `Bearer ${token}`} })
        .then(res => {
            console.log('products',res.data.products)
            console.log('order',res.data)
            setProducts(res.data.products)
            setOrderDetails(res.data)

        })
        .catch(err => console.log(err))
    }

    useEffect(()=>{

        getproduct("orderId");


    },[])


    //console.log('single',products)

    const productList = products.map((product,index) => <Product product={product} key={index}/>)


    return(

       
    <React.Fragment>
        <div className="bg-secondary border-top p-4 text-white mb-3">
          <h1 className="display-6">Oder Details </h1>
        </div>
        <div className="container mb-3">
          <div className="row">
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-header">
                   Products  {/*<IconEnvelope className="i-va" /> */}
                </div>
                <div className="card-body">
                 
                   {productList}
                  
                </div>
              </div>

        
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <IconCart3 className="i-va" /> Total Quanty: {" "}
                  <span className="badge bg-secondary float-right">{orderDetails.quantity}</span>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 className="my-0">Sub Total</h6>
                    </div>
                    <span className="text-muted">{orderDetails.subTotal}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 className="my-0">Shipping Charge</h6>
                    </div>
                    <span className="text-muted">{orderDetails.shippingCharge}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 className="my-0">Voucher</h6>
                    </div>
                    <span className="text-muted">{orderDetails.voucher ? orderDetails.voucher : ''}</span>
                  </li>
                  
                  <li className="list-group-item d-flex justify-content-between">
                    <span >Total (BDT)</span>
                    <strong>{orderDetails.totalAmount}</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
    </React.Fragment>
       
    )

}


const Product = ({product}) =>{
    return(
        <div className="row g-3" style={{borderBottom:'1px solid black'}}>
            <div className="col-md-3 text-center">
                        {/* <img src={image+product.productImages[0]} className="img-fluid" alt="..." /> */}
            </div>
            <div className="col-md-6">
                <div className="card-body">
                        <h6 className="card-subtitle mr-2 d-inline">
                            {product.productTitle}
                        </h6>
                        {/* {product.isNew && (
                            <span className="badge bg-success mr-2">New</span>
                        )}
                        {product.isHot && <span className="badge bg-danger mr-2">Hot</span>} */}

                        <div>
                           Qty: {product.quantity}
                        </div>
                        {product.description &&
                            product.description.includes("|") === false && (
                            <p className="small mt-2">{product.description}</p>
                            )}
                        {product.description && product.description.includes("|") && (
                            <ul className="mt-2">
                            {product.description.split("|").map((desc, idx) => (
                                <li key={idx}>{desc}</li>
                            ))}
                            </ul>
                        )}
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card-body">
                        <div className="mb-2">
                        <span className="font-weight-bold h5">${product.productFinalPrice}</span>
                        {product.productOriginalPrice > 0 && (
                            <del className="small text-muted ml-2">
                            ${product.productOriginalPrice}
                            </del>
                        )}
                        {(product.discountPercentage > 0 || product.productFinalPrice > 0) && (
                            <span className={`rounded p-1 bg-warning ml-2 small`}>
                            -
                            {product.discountPercentage > 0
                                ? product.discountPercentage + "%"
                                : "$" + product.productFinalPrice}
                            </span>
                        )}
                        </div>
                        {product.isFreeShipping && (
                        <p className="text-success small mb-2">
                            <IconTruckFill /> Free shipping
                        </p>
                        )}

                
                </div>
            </div>
        </div>

    )
}



export default SingleOrder


