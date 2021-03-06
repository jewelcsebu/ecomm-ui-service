import React ,{ useState,useContext } from "react";
import {cartService} from '../../axios'
import { globalC } from "../../Context";
import qs from 'qs';

import { Link } from "react-router-dom";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { ReactComponent as IconTruckFill } from "bootstrap-icons/icons/truck.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";


const CardProductList = (props) => {


  const { authLogin,token,authLoginDetail } = useContext(globalC);

  
  const image = "http://localhost:8200/api/v1/product-service/uploads/view/"
  const product = props.data;
  return (
    <div className="card">
      <div className="row g-0">
        <div className="col-md-3 text-center">
          <img src={image+product.productImages[0]} className="img-fluid" alt="..." />
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h6 className="card-subtitle mr-2 d-inline">
            <Link to={'product/detail/'+product.productSlug}  className="text-decoration-none">
                {product.productTitle}
              </Link>
            </h6>
            {product.isNew && (
              <span className="badge bg-success mr-2">New</span>
            )}
            {product.isHot && <span className="badge bg-danger mr-2">Hot</span>}

            <div>
              {product.star > 0 &&
                Array.from({ length: 5 }, (_, key) => {
                  if (key <= product.star)
                    return (
                      <IconStarFill className="text-warning mr-1" key={key} />
                    );
                  else
                    return (
                      <IconStarFill className="text-secondary mr-1" key={key} />
                    );
                })}
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
            {product.discountPercentage > 0 && (
              <del className="small text-muted ml-2">
                ${product.productOriginalPrice}
              </del>
            )}
            {(product.discountPercentage > 0) && (
              <span className={`rounded p-1 bg-warning ml-2 small`}>
                
                { "-"+product.discountPercentage + "%"}
              </span>
            )}
          </div>
          {product.isFreeShipping && (
            <p className="text-success small mb-2">
              <IconTruckFill /> Free shipping
            </p>
          )}

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
      </div>
    </div>
  );
};

export default CardProductList;
