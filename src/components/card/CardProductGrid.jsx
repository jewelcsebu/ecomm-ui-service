import React ,{ useState,useContext } from "react";
import {cartService} from '../../axios'
import { globalC } from "../../Context";
import { Link } from "react-router-dom";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";


const CardProductGrid = (props) => {

  const { authLogin,token,authLoginDetail } = useContext(globalC);


  const image = "http://localhost:8200/api/v1/product-service/uploads/view/"
  const product = props.data;
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
      {(product.discountPercentage > 0) && (
        <span
          className={`rounded position-absolute p-2 bg-warning  ml-2 small ${
            product.isNew ? "mt-5" : "mt-2"
          }`}
        >
          
            { "-"+product.discountPercentage + "%"}
           
          
        </span>
      )}
      <div className="card-body">
        <h6 className="card-subtitle mb-2">
          <Link to={'product/detail/'+product.productSlug} className="text-decoration-none">
            {product.productTitle}
          </Link>
        </h6>


        <div className="my-2">
          <span className="font-weight-bold h5">${product.productFinalPrice}</span>
          {product.discountPercentage > 0 && (
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
            onClick={()=>props.addTocartHandler(authLogin.user_name,product)}
          >
            <FontAwesomeIcon icon={faCartPlus} />
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            title="Add to wishlist"
            onClick={()=>props.addToWishListHandler(authLogin.user_name,product)}
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProductGrid;
