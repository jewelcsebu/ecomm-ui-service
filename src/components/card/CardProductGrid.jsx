import React ,{ useState } from "react";
import {cartService} from '../../axios'
import { Link } from "react-router-dom";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";


const CardProductGrid = (props) => {

  
  const image = "http://localhost:8200/api/v1/product-service/uploads/view/"


  const token = "3f90766b-5e4e-4f1b-ad62-d69e3dd20236";

  const addTocart = (id) =>{

    console.log(id)
    const values ={
      "customerId":3,
      "productId":id
  }
    
    cartService.post('add-to-cart',values,{ headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => {

      if(res.data.length === 0){
        alert("Addedd")
      }else{
        alert("Already Addedd")
      }

    })
    .catch(err => console.log(err))
  }


  const product = props.data;


  console.log('category url',product)
  return (
    <div className="card">
      <img src={image+product.productImages[0]} className="card-img-top" alt="..." />
      {product.isNew && (
        <span className="badge bg-success position-absolute mt-2 ml-2">
          New
        </span>
      )}
      {product.isHot && (
        <span className="badge bg-danger position-absolute r-0 mt-2 mr-2">
          Hot
        </span>
      )}
      {(product.discountPercentage > 0 || product.productFinalPrice > 0) && (
        <span
          className={`rounded position-absolute p-2 bg-warning  ml-2 small ${
            product.isNew ? "mt-5" : "mt-2"
          }`}
        >
          -
          {product.discountPercentage > 0
            ? product.discountPercentage + "%"
            : "$" + product.productFinalPrice}
        </span>
      )}
      <div className="card-body">
        <h6 className="card-subtitle mb-2">
          <Link to={product.productSlug} className="text-decoration-none">
            {product.productTitle}
          </Link>
        </h6>
        <div className="my-2">
          <span className="font-weight-bold h5">${product.productFinalPrice}</span>
          {product.productOriginalPrice > 0 && (
            <del className="small text-muted ml-2">${product.productOriginalPrice}</del>
          )}
          <span className="ml-2">
            {Array.from({ length: product.star }, (_, key) => (
              <IconStarFill className="text-warning mr-1" key={key} />
            ))}
          </span>
        </div>
        <div className="btn-group btn-block" role="group">
          <button
            type="button"
            className="btn btn-sm btn-primary"
            title="Add to cart"
            onClick={()=>addTocart(product.id)}
          >
            <FontAwesomeIcon icon={faCartPlus} />
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            title="Add to wishlist"
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProductGrid;
