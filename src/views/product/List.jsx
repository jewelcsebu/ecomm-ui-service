import React, { lazy, useEffect,useState } from "react";
import { data } from "../../data";
import { loadState } from "../../localStorage";
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


  const token = loadState().access_token;
  const [view,setView] = useState("list")
  const [products,setProducts] = useState([])


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





  const addTocart = (id,product) =>{

    console.log(id)
    const values ={
      "userId":3,
      "product":product
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


  const addToWishList = (id,product) =>{
    
    const values ={
      "userId":3,
      "product":product
    }


  cartService.post('add-to-wish-list',values,{ headers: {"Authorization" : `Bearer ${token}`} })
  .then(res => {

    if(res.data.length === 0){
      alert("Addedd")
    }else{
      alert("Already Addedd")
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
              T-Shirts
            </span>
          </div>
        </div>
        <Breadcrumb />
        <div className="container-fluid mb-3">
          <div className="row">
            <div className="col-md-3">
              <FilterCategory />
              <FilterPrice />
              <FilterSize />
              <FilterStar />
              <FilterColor />
              <FilterClear />
              <FilterTag />
              <CardServices />
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-8">
                  <span className="align-middle font-weight-bold">
                    {/* {this.state.totalItems} results for{" "} */}
                    <span className="text-warning">"t-shirts"</span>
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
          </div>
        </div>
      </React.Fragment>
    );
  
}

export default ProductListView;
