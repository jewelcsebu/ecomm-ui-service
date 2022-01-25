import React, { lazy, useEffect,useState,useContext } from "react";

import swal from 'sweetalert';

import { data } from "../../data";
import { loadState } from "../../localStorage";
import { globalC } from "../../Context";
import {productService,cartService} from '../../axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faBars } from "@fortawesome/free-solid-svg-icons";
const Paging = lazy(() => import("../../components/Paging"));
const Breadcrumb = lazy(() => import("../../components/Breadcrumb"));
const FilterCategory = lazy(() => import("../../components/filter/Category"));
const FilterPrice = lazy(() => import("../../components/filter/Price"));
const FilterSize = lazy(() => import("../../components/filter/Size"));
const FilterStar = lazy(() => import("../../components/filter/Star"));
const FilterColor = lazy(() => import("../../components/filter/Color"));
const FilterTag = lazy(() => import("../../components/filter/Tag"));
const FilterClear = lazy(() => import("../../components/filter/Clear"));
const CardServices = lazy(() => import("../../components/card/CardServices"));
const CardProductGrid = lazy(() =>
  import("../../components/card/CardProductGrid")
);
const CardProductList = lazy(() =>
  import("../../components/card/CardProductList")
);


const ProductListView  = () => {

  const { authLogin,token,authLoginDetail } = useContext(globalC);


  const [view,setView] = useState("list")
  const [products,setProducts] = useState([])

  const username = authLogin?.user_name;

  console.log(username)


  // onPageChanged = (page) => {
  //   let products = this.getProducts();
  //   const { currentPage, totalPages, pageLimit } = page;
  //   const offset = (currentPage - 1) * pageLimit;
  //   const currentProducts = products.slice(offset, offset + pageLimit);
  //   this.setState({ currentPage, currentProducts, totalPages });
  // };

  const onChangeView = (view) => {
      setView("grid")
    
  };

  const getProducts = () =>{
        productService.get("get/products", {
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json'
            }
        }).then(res => { 
          console.log(res.data.data)
            setProducts(res.data.data)
        }).catch(error => {
          console.log(error)
        })
  }





  const addTocart = (username,product) =>{


    // if(username == null){
    //   swal({
    //     title: "yeaHOOO!",
    //     text: "Already to the Cart",
    //     icon: "warning",
    //     timer: 2000,
    //     button: false
    //   })
    //   return 0;
    // }

    const values ={
      "username":username,
      "product":product
    }
    
    cartService.post('add-to-cart',values,{ headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => {

      if(res.data.length === 0){
        swal({
          title: "Done!",
          text: "Added To The Cart",
          icon: "success",
          timer: 2000,
          button: false
        })
      }else{
        swal({
          title: "yeaHOOO!",
          text: "Already to the Cart",
          icon: "warning",
          timer: 2000,
          button: false
        })
      }

    })
    .catch(err => console.log(err))
  }


  const addToWishList = (username,product) =>{
    
    const values ={
      "username":username,
      "product":product
    }


  cartService.post('add-to-wish-list',values,{ headers: {"Authorization" : `Bearer ${token}`} })
  .then(res => {

    if(res.data.length === 0){
      swal({
        title: "Done!",
        text: "Added To The WishList",
        icon: "success",
        timer: 2000,
        button: false
      })
    }else{
      swal({
        title: "yeaHOOO!",
        text: "Already to the wishList",
        icon: "warning",
        timer: 2000,
        button: false
      })
    }

  })
  .catch(err => console.log(err))


  }

  useEffect(()=>{

    getProducts()
  },[])



  useEffect(()=>{

  },[products])


 

    return (
      <React.Fragment>
        <div
          className="p-5 bg-primary bs-cover"
          style={{
            backgroundImage: "url(../../images/banner/50-Banner.webp)",
          }}
        >
          <div className="container text-center">
            <span className="display-5 px-3 bg-white rounded shadow">
              Products
            </span>
          </div>
        </div>
        <Breadcrumb />
        <div className="container-fluid mb-3">
          <div className="row">
            <div className="col-md-1">
              {/* <FilterCategory />
              <FilterPrice />
              <FilterSize />
              <FilterStar />
              <FilterColor />
              <FilterClear />
              <FilterTag />
              <CardServices /> */}
            </div>
            <div className="col-md-10">
              <div className="row">
                <div className="col-md-8">
                  <span className="align-middle font-weight-bold">
                    {products?.length} results found{" "}
                    {/* <span className="text-warning">"items found"</span> */}
                  </span>
                </div>
                <div className="col-md-4">
                  <select
                    className="form-select mw-180 float-left"
                    aria-label="Default select"
                  >
                    <option value={1}>Most Popular</option>
                    <option value={2}>Latest items</option>
                    <option value={3}>Trending</option>
                    <option value={4}>Price low to high</option>
                    <option value={4}>Price high to low</option>
                  </select>
                  <div className="btn-group ml-3" role="group">
                    <button
                      aria-label="Grid"
                      type="button"
                      onClick={() => onChangeView("grid")}
                      className={`btn ${
                        view === "grid"
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                    >
                      <FontAwesomeIcon icon={faTh} />
                    </button>
                    <button
                      aria-label="List"
                      type="button"
                      onClick={() => onChangeView("list")}
                      className={`btn ${
                        view === "list"
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                    >
                      <FontAwesomeIcon icon={faBars} />
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row g-3"> 

                {view === "grid" &&
                  products.map((product, idx) => {
                    return (
                      <div key={idx} className="col-md-4">
                        <CardProductGrid data={product} addTocartHandler={addTocart} addToWishListHandler={addToWishList}/>
                      </div>
                    );
                  })}
                {view === "list" &&
                  products.map((product, idx) => {
                    return (
                      <div key={idx} className="col-md-12">
                        <CardProductList data={product} addTocartHandler={addTocart} addToWishListHandler={addToWishList} />
                      </div>
                    );
                  })}
              </div>
              <hr />
              {/* <Paging
                totalRecords={this.state.totalItems}
                pageLimit={9}
                pageNeighbours={3}
                onPageChanged={this.onPageChanged}
                sizing=""
                alignment="justify-content-center"
              /> */}
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </React.Fragment>
    );
  
}

export default ProductListView;
