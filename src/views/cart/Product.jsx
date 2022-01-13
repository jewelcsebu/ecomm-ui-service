
import React, { useState,useEffect, lazy } from "react";

import { Link } from "react-router-dom";
import { ReactComponent as IconHeartFill } from "bootstrap-icons/icons/heart-fill.svg";
import { ReactComponent as IconTrash } from "bootstrap-icons/icons/trash.svg";
import { ReactComponent as IconChevronRight } from "bootstrap-icons/icons/chevron-right.svg";
import { ReactComponent as IconChevronLeft } from "bootstrap-icons/icons/chevron-left.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import {productService,cartService} from '../../axios'

var axios = require('axios');
const CouponApplyForm = lazy(() =>
  import("../../components/others/CouponApplyForm")
);


const Product = ({data}) =>{

    //console.log(data)
    const [product,setProduct] = useState({});

    const image = "http://localhost:8200/api/v1/product-service/uploads/view/"
  
    const token = "3f90766b-5e4e-4f1b-ad62-d69e3dd20236";
  
    const getProductByProductId = () =>{
      
      productService.get(`get/product?productId=`+data.productId)
      .then(res => {
        console.log(res.data.data)
        setProduct(res.data.data)
      })
      .catch(err => console.log(err))
    }
  
    useEffect(()=>{
  
      getProductByProductId()
  
    },[])

    const removeItem = (id) =>{
      
      cartService.get('remove/cart-item/'+id, { headers: {"Authorization" : `Bearer ${token}`} })
      .then(res =>{
        alert("removed")
        window.location.reload();
      })
      .catch(err => console(err))
    }

    const increaseQuantity = (id) =>{
      cartService.get('cart/qty-increment/'+id,{ headers: {"Authorization" : `Bearer ${token}`} })
      .then(res => {
        console.log(res.data)
        data.qty = res.data.qty
        // window.location.reload();
      })
      .catch(err => console.log(err))
    }

    useEffect(()=>{

      


    },[data])

  
    return(
      <tr>
      <td>
        <div className="row">
          <div className="col-3 d-none d-md-block">
            <img
              src="{image+product.productImages[0]}"
              width="80"
              alt="..."
            />
          </div>
          <div className="col">
            <Link
              to="/product/detail"
              className="text-decoration-none"
            >
              {product.productTitle}
            </Link>
            
          </div>
        </div>
      </td>
      <td>
        <div className="input-group input-group-sm mw-140">
          <button
            className="btn btn-primary text-white"
            type="button"
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          {/* <input
            type="text"
            className="form-control"
            value={data.qty}
          /> */}
          <p style={{padding:"10px"}}>{data.qty}</p>
          <button
            className="btn btn-primary text-white"
            type="button"
            onClick={()=>increaseQuantity(data.id)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </td>
      <td>
        <var className="price"> {product.productFinalPrice} each</var>
        <del className="d-block text-muted">
          {product.productOriginalPrice} 
        </del>
      </td>
      <td className="text-right">
        <button className="btn btn-sm btn-outline-secondary mr-2">
          <IconHeartFill className="i-va" />
        </button>
        <button className="btn btn-sm btn-outline-danger" onClick={()=>removeItem(data.id)}>
          <IconTrash className="i-va" />
        </button>
      </td>
    </tr>
    )
  }

  export default Product