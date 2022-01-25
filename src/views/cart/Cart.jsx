import React, {useContext, useState, useEffect, lazy } from "react";
import { Link } from "react-router-dom";
import { globalC } from "../../Context";
import { loadState } from "../../localStorage";
import { ReactComponent as IconHeartFill } from "bootstrap-icons/icons/heart-fill.svg";
import { ReactComponent as IconTrash } from "bootstrap-icons/icons/trash.svg";
import { ReactComponent as IconChevronRight } from "bootstrap-icons/icons/chevron-right.svg";
import { ReactComponent as IconChevronLeft } from "bootstrap-icons/icons/chevron-left.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { cartService, productService } from '../../axios'
import Product from "./Product";
const CouponApplyForm = lazy(() =>
  import("../../components/others/CouponApplyForm")
);

const CartView = () => {

  const { authLogin,token,authLoginDetail } = useContext(globalC);


  const [cart, setCart] = useState([]);
  const [total,setTotal] = useState(null)
  const [isLoading,setIsLoading] = useState(true)

  const username = authLogin.user_name;

  const getSummary = (cart) => {

    var total = 0;
    cart.map(item => {
      total += item.product.quantity * item.product.productFinalPrice
    })
    return total;
  }


  const getCartProducts = () => {
    console.log('cart username',username)
    cartService.get(`get/cart-products/`+username, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        console.log('cart',res.data)
        setCart(res.data)
        setTotal(getSummary(res.data))
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }
  const removeItem = (id) => {
    cartService.get('remove/cart-item/' + id, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        getCartProducts(username)
        console.log(res.data)
      })
      .catch(err => console(err))
  }

  const increaseQuantity = (id) => {
    cartService.get('cart/qty-increment/' + id, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        getCartProducts(username)
        console.log('incrse', res.data)
      })
      .catch(err => console.log(err))
  }

  const deCreaseQuantity = (id) => {
    cartService.get('cart/qty-decrement/' + id, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        getCartProducts(username)
        console.log('decrse', res.data)
      })
      .catch(err => console.log(err))
  }


  useEffect(() => {

    getCartProducts(username);

  }, []);

  useEffect(() => {

  }, [cart])
  const onSubmitApplyCouponCode = () => {
  }
  console.log(cart, 'cart page')

 

  return (
    <React.Fragment>
      <div className="bg-secondary border-top p-4 text-white mb-3">
        <h1 className="display-6">Shopping Cart</h1>
      </div>
      <div className="container mb-3">
        <div className="row">
          <div className="col-md-9">
            <div className="card">
              <div className="table-responsive">
                <table className="table table-borderless">
                  <thead className="text-muted">
                    <tr className="small text-uppercase">
                      <th scope="col">Product</th>
                      <th scope="col" width={120}>
                        Quantity
                      </th>
                      <th scope="col" width={150}>
                        Price
                      </th>
                      <th scope="col" width={150}>
                        Sub-Total
                      </th>
                      <th scope="col" className="text-right" width={130}></th>
                    </tr>
                  </thead>
                  <tbody>

                    {isLoading && <tr>
                                      <td>  
                                      <div className="row">
                                      <div className="col-12 d-none d-md-block">
                                        
                                        Loading....  
                                        
                                        </div>
                                        </div>
                                        </td>
                                  </tr>}


                    {
                      cart.map((item, index) => <Product data={item} key={index}
                        handleRemove={removeItem}
                        handleIncreaseQuantity={increaseQuantity}
                        handleDecrementQuantity={deCreaseQuantity} />)
                    }
                  </tbody>
                </table>
              </div>
              <div className="card-footer">
                <Link to="/checkout" className="btn btn-primary float-right">
                  Make Purchase <IconChevronRight className="i-va" />
                </Link>
                <Link to="/" className="btn btn-secondary">
                  <IconChevronLeft className="i-va" /> Continue shopping
                </Link>
              </div>
            </div>
            <div className="alert alert-success mt-3">
              <p className="m-0">
                <IconTruck className="i-va mr-2" /> Free Delivery within 1-2
                weeks
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card mb-3">
              <div className="card-body">
                <CouponApplyForm onSubmit={onSubmitApplyCouponCode} />
              </div>
            </div>




            <div className="card">
              <div className="card-body">
                <dl className="row border-bottom">
                  <dt className="col-6">Total price:</dt>
                  <dd className="col-6 text-right">



                    {(total) && 'TK ' + total}


                  </dd>

                  <dt className="col-6 text-success">Discount:</dt>
                  <dd className="col-6 text-success text-right">TK 0</dd>
                  <dt className="col-6 text-success">
                    Coupon:{" "}
                    <span className="small text-muted">EXAMPLECODE</span>{" "}
                  </dt>
                  <dd className="col-6 text-success text-right">Tk 0</dd>
                </dl>
                <dl className="row">
                  <dt className="col-6">Total:</dt>
                  <dd className="col-6 text-right  h5">
                    <strong>  {(total) && 'TK ' + total}</strong>
                  </dd>
                </dl>
                <hr />
                <p className="text-center">
                  <img
                    src="../../images/payment/payments.webp"
                    alt="..."
                    height={26}
                  />
                </p>
              </div>
            </div>




          </div>
        </div>
      </div>
      <div className="bg-light border-top p-4">
        <div className="container">
          <h6>Payment and refund policy</h6>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </React.Fragment>
  );

}



export default CartView;
