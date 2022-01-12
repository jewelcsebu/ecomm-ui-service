
import React, { useState,useEffect, lazy } from "react";

import { Link } from "react-router-dom";
import { ReactComponent as IconHeartFill } from "bootstrap-icons/icons/heart-fill.svg";
import { ReactComponent as IconTrash } from "bootstrap-icons/icons/trash.svg";
import { ReactComponent as IconChevronRight } from "bootstrap-icons/icons/chevron-right.svg";
import { ReactComponent as IconChevronLeft } from "bootstrap-icons/icons/chevron-left.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import {productService} from '../../axios'

var axios = require('axios');
const CouponApplyForm = lazy(() =>
  import("../../components/others/CouponApplyForm")
);


const Product = ({data}) =>{

    //console.log(data)
    const [product,setProduct] = useState({});

    const image = "http://localhost:8200/api/v1/product-service/uploads/view/"
  
    const token = "3f90766b-5e4e-4f1b-ad62-d69e3dd20236";
  
    // const getProductByProductId = () =>{
      
    //   productService.get(`get/product?productId=`+data.productId)
    //   .then(res => {
    //     console.log('fetch cart item',res.data.data.productImages)
    //     console.log('fetch cart item',res.data.data)
    //     setProduct(res.data.data)
    //   })
    //   .catch(err => console.log(err))
    // }
  
    // useEffect(()=>{
  
    //   getProductByProductId()
  
    // },[])



var config = {
  method: 'get',
  url: 'http://localhost:8200/api/v1/product-service/get/product?productId=3',
  headers: { }
};

axios(config)
.then(function (response) {
  setProduct(JSON.stringify(response.data))
  console.log(response.data)
})
.catch(function (error) {
  console.log(error);
});
  
console.log('useSate',product)
  
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
          <input
            type="text"
            className="form-control"
            defaultValue="1"
          />
          <button
            className="btn btn-primary text-white"
            type="button"
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
        <button className="btn btn-sm btn-outline-danger">
          <IconTrash className="i-va" />
        </button>
      </td>
    </tr>
    )
  }

  export default Product