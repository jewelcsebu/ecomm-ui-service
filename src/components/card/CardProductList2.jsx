import React,{useContext} from "react";
import { Link } from "react-router-dom";
import { globalC } from "../../Context";
import { ReactComponent as IconHeartFill } from "bootstrap-icons/icons/heart-fill.svg";
import { ReactComponent as IconTrash } from "bootstrap-icons/icons/trash.svg";
import { ReactComponent as IconChevronRight } from "bootstrap-icons/icons/chevron-right.svg";
import { ReactComponent as IconChevronLeft } from "bootstrap-icons/icons/chevron-left.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { ReactComponent as IconTruckFill } from "bootstrap-icons/icons/truck.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";

const CardProductList2 = (props) => {

  const { authLogin,token,authLoginDetail } = useContext(globalC);


  const image = "http://localhost:8200/api/v1/product-service/uploads/view/"




  const product = props.data;
  console.log('wish list single',product)
  return (
    <div className="card">
      <div className="row g-0">
        <div className="col-md-3 text-center">
          <img src={image+product.product.productImages[0]} className="img-fluid" alt="..." />
        </div>
        <div className="col-md-9">
          <div className="card-body">
            <h6 className="card-subtitle mr-2 d-inline">
              <Link to={product.link} className="text-decoration-none">
                {product.product.productTitle}
              </Link>
            </h6>
            {product.isNew && (
              <span className="badge bg-success mr-2">New</span>
            )}
            {product.isHot && <span className="badge bg-danger mr-2">Hot</span>}
            {product.star > 0 && (
              <span className="badge bg-secondary">
                <IconStarFill className="text-warning i-va" /> {product.star}
              </span>
            )}
          </div>

          <div className="card-footer">
            <div className="mb-2">
              <span className="font-weight-bold h5 mr-2">${product.product.productFinalPrice}</span>
              {product.product.discountPercentage > 0 && (
                <del className="small text-muted mr-2">
                  ${product.product.productOriginalPrice}
                </del>
              )}
              {/* {(product.product.discountPercentage > 0 ||
                product.product.discountPrice > 0) && (
                <span className={`rounded p-1 bg-warning mr-2 small`}>
                  -
                  {product.product.discountPercentage > 0
                    ? product.product.discountPercentage + "%"
                    : "$" + product.product.discountPrice}
                </span>
              )}
              {product.isFreeShipping && (
                <span className="text-success small mb-2">
                  <IconTruckFill /> Free shipping
                </span>
              )} */}
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
              <button className="btn btn-sm btn-outline-danger" onClick={()=>props.removeItemHandler(props.data.id)} >
                <IconTrash className="i-va" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProductList2;
