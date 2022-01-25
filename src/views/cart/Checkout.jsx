import React, { useState, useEffect, useContext } from "react";
import { globalC } from "../../Context";

import { cartService } from "../../axios";
import { ReactComponent as IconEnvelope } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import { ReactComponent as IconReceipt } from "bootstrap-icons/icons/receipt.svg";
import { ReactComponent as IconCreditCard2Front } from "bootstrap-icons/icons/credit-card-2-front.svg";
import { ReactComponent as IconCart3 } from "bootstrap-icons/icons/cart3.svg";
import { shippingService } from "../../axios";
import values from "redux-form/lib/values";

var axios = require('axios');

const CheckoutView = () => {

  const { authLogin, token, authLoginDetail } = useContext(globalC);
  const [isLoadin, setIsLoading] = useState(true)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setaddress2] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [mobile, setmobile] = useState("");



  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(null)
  const [isCOD, setIsCOD] = useState(true)


  const username = authLogin.user_name;

  const [regions, setRegions] = useState([])
  const [cities, setCities] = useState([])
  const [areas, setAreas] = useState([])


  const getSummary = (cart) => {

    var total = 0;
    cart.map(item => {
      total += item.product.quantity * item.product.productFinalPrice
    })
    return total;
  }


  const getCartProducts = () => {
    cartService.get(`get/cart-products/` + username, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        console.log('checkout', res.data)
        setCart(res.data)
        setTotal(getSummary(res.data))
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }



  async function fetchRegion() {
    shippingService.get(`get/regions`).then(res => {
      setRegions(res.data)
    }).catch(error => {
      console.log(error)
    })
  }

  async function fetchCities(event) {
    shippingService.get(`get/cities?regionId=${event.target.value}`).then(res => {
      setCities(res.data)
    }).catch(error => {
      console.log(error)
    })
  }


  async function fetchAreas(event) {
    shippingService.get(`get/areas?cityId=${event.target.value}`).then(res => {
      setAreas(res.data)

    }).catch(error => {
      console.log(error)
    })
  }

  const setPay = (value) => {

    setIsCOD(value)

  }

  const emailHandler = (event) => {

    setEmail(event.target.value)

  }

  const nameHandler = (event) => {
    setName(event.target.value)
  }

  const mobileHandler = (event) => {

    setmobile(event.target.value)

  }

  const addressHandler = (event) => {
    setAddress(event.target.value)
  }

  const address2Handler = (event) => {
    setaddress2(event.target.value)
  }

  const regionHandler = (event) => {
    setRegion(event.target.value)
  }

  const cityHandler = (event) => {
    setCity(event.target.value)
  }

  const areaHandler = (event) => {
    setArea(event.target.value)
  }



  console.log(region)


  const placeOrder = () => {


    var p = [];
    
    cart.map(item => {
      p.push(item.product)
    })

    var data = JSON.stringify({
      "shippingAddress": {
        "fullName": name,
        "phoneNumber": mobile,
        "region": "Barisal",
        "city": "Barisal",
        "area": "Rupatoli",
        "address": "Rupatoli,housing-23"
      },
      "shippingCharge": 80,
      "priority": "HIGH",
      "products": p
    });
    var config = {
      method: 'post',
      url: 'http://localhost:8300/api/v1/order-service/create-order',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error.response);
      });
  }


  useEffect(() => {
    fetchRegion();
    getCartProducts();
  }, []);




  return (
    <React.Fragment>
      <div className="bg-secondary border-top p-4 text-white mb-3">
        <h1 className="display-6" style={{ textAlign: 'center' }}>Checkout</h1>
      </div>
      <div className="container mb-3">
        <div className="row">
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-header">
                <IconEnvelope className="i-va" /> Contact Info
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      aria-label="Email Address"
                      value={email}
                      name="email"
                      onChange={emailHandler}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Mobile no"
                      aria-label="Mobile no"
                      value={mobile}
                      onChange={mobileHandler}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-header">
                <IconTruck className="i-va" /> Shipping Infomation
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      required
                      value={name}
                      onChange={nameHandler}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Addresss"
                      required
                      value={address}
                      onChange={addressHandler}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Address 2 (Optional)"
                      value={address2}
                      onChange={address2Handler}
                    />
                  </div>
                  <div className="col-md-4">

                    {regions.length === 0
                      ? ""
                      : <select onChange={(event) => fetchCities(event)} className="form-select" required name="region" >
                        <option value>-- Region --</option>
                        {regions.map((item, index) => {

                          return (
                            <>

                              <option key={index} value={item.id}>{item.region}</option>
                            </>
                          )
                        })}
                      </select>
                    }
                  </div>
                  <div className="col-md-4">


                    <select onChange={(event) => fetchAreas(event)} className="form-select" required name="city">
                      <option value>-- City --</option>
                      {cities.map((item, index) => {
                        return (
                          <>

                            <option key={index} value={item.id} >{item.city}</option>
                          </>
                        )
                      })}
                    </select>


                  </div>
                  <div className="col-md-4" >
                    <select className="form-select" required name="area">
                      <option value>-- Area --</option>
                      {areas.map((item, index) => {
                        return (
                          <>

                            <option key={index} value={item.id} >{item.area}</option>
                          </>
                        )
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="card mb-3">
                <div className="card-header">
                  <IconReceipt className="i-va" /> Billing Infomation
                  <div className="form-check form-check-inline ml-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Same as Shipping Infomation
                    </label>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Addresss"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address 2 (Optional)"
                      />
                    </div>
                    <div className="col-md-4">
                      <select className="form-select" required>
                        <option value>-- Country --</option>
                        <option>United States</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <select className="form-select" required>
                        <option value>-- State --</option>
                        <option>California</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Zip"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div> */}

            <div className="card mb-3 border-info">


              <div className="card-header bg-info">
                <IconCreditCard2Front className="i-va" /> Payment Method
              </div>


              <div className="card-body">
                <div className="row g-3 mb-3 border-bottom">


                  {/* <div className="col-md-6">
                      <div className="form-check">
                        <input
                          id="credit"
                          name="paymentMethod"
                          type="radio"
                          className="form-check-input"
                          checked={isCOD}
                          required 
                        />
                        <label className="form-check-label" htmlFor="credit">
                          Credit card
                          <img
                            src="../../images/payment/cards.webp"
                            alt="..."
                            className="ml-3"
                            height={26}
                          />
                        </label>
                      </div>
                    </div> */}



                  <div className="col-md-12">
                    <div className="form-check">
                      <input
                        id="paypal"
                        name="paymentMethod"
                        type="radio"
                        className="form-check-input"
                        required
                        onChange={() => setPay(true)}
                      />



                      <label className="form-check-label" htmlFor="paypal">
                        Cash On Delivery
                        {/* <img
                            // src="../../images/payment/paypal_64.webp"
                            alt="..."
                            className="ml-3"
                            height={26}
                          /> */}
                      </label>
                    </div>
                  </div>
                </div>
                {/* 


{isCOD && 

                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name on card"
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Card number"
                      />
                    </div>
                    <div className="col-md-4">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Expiration month"
                      />
                    </div>
                    <div className="col-md-4">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Expiration year"
                      />
                    </div>
                    <div className="col-md-4">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="CVV"
                      />
                    </div>
                  </div>

} */}

              </div>
              <div className="card-footer border-info">
                <button type="button" className="btn btn-block btn-info" onClick={() => placeOrder()}>
                  Pay Now  BDT <strong>{total}</strong>
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <IconCart3 className="i-va" /> Cart{" "}
                <span className="badge bg-secondary float-right">3</span>
              </div>
              <ul className="list-group list-group-flush">

                {isLoadin && <li className="text-center">
                  
                  
                      <div>
                        <h6 className="my-0">Loading...</h6>
                      </div>
                  
                  
                  
                  </li>}
                {cart.map((item, index) => {

                  return (
                    <li className="list-group-item d-flex justify-content-between lh-sm" key={index}>
                      <div>
                        <h6 className="my-0">{item.product.productTitle}</h6>
                      </div>
                      <span className="text-muted badge badge-light"> {item.product.productFinalPrice} * {item.product.quantity} = {item.product.productFinalPrice * item.product.quantity} </span>
                    </li>
                  )
                })}



                <li className="list-group-item d-flex justify-content-between bg-light">
                  <div className="text-success">
                    <h6 className="my-0">Promo code</h6>
                    <small>EXAMPLECODE</small>
                  </div>
                  <span className="text-success">−0</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (BDT)</span>
                  <strong>{total}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}


export default CheckoutView;
