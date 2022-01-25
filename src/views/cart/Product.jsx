
import React, { useState, useEffect, lazy } from "react";
import { loadState } from "../../localStorage";
import { Link } from "react-router-dom";
import { ReactComponent as IconHeartFill } from "bootstrap-icons/icons/heart-fill.svg";
import { ReactComponent as IconTrash } from "bootstrap-icons/icons/trash.svg";
import { ReactComponent as IconChevronRight } from "bootstrap-icons/icons/chevron-right.svg";
import { ReactComponent as IconChevronLeft } from "bootstrap-icons/icons/chevron-left.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { productService, cartService } from '../../axios'

var axios = require('axios');
const CouponApplyForm = lazy(() =>
  import("../../components/others/CouponApplyForm")
);

const Product = ({ data, handleRemove, handleIncreaseQuantity, handleDecrementQuantity }) => {


  const image = "http://localhost:8200/api/v1/product-service/uploads/view/"

  return (
    <tr>
      <td>
        <div className="row">
          <div className="col-3 d-none d-md-block">
            <img
              src={image + data.product.productImages[0]}
              width="80"
              alt="..."
            />
          </div>
          <div className="col">
            <Link
              to="/product/detail"
              className="text-decoration-none"
            >
              {data.product.productTitle}
            </Link>

          </div>
        </div>
      </td>
      <td>
        <div className="input-group input-group-sm mw-140">
          <button
            className="btn btn-primary text-white"
            type="button"
            onClick={() => data.product.quantity > 1 ? handleDecrementQuantity(data.id) : null}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>

          <p style={{ padding: "10px" }}>{data.product.quantity}</p>

          <button
            className="btn btn-primary text-white"
            type="button"
            onClick={() => handleIncreaseQuantity(data.id)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </td>


      <td>
        <var className="price"> {data.product.productFinalPrice} each</var>
        {data.product.discountPercentage > 0 && (
          <del className="d-block text-muted">
            {data.product.productOriginalPrice}
          </del>
        )}
      </td>

      <td>
        <var className="Sub-Total"> {data.product.productFinalPrice*data.product.quantity}</var>
      </td>


      <td className="text-right">
        {/* <button className="btn btn-sm btn-outline-secondary mr-2">
          <IconHeartFill className="i-va" />
        </button> */}
        <button className="btn btn-sm btn-outline-danger" onClick={() => handleRemove(data.id)}>
          <IconTrash className="i-va" />
        </button>
      </td>


    </tr>
  )
}

export default Product