import React, { useEffect,useState, lazy } from "react";
import { cartService } from "../../axios";
import { loadState } from "../../localStorage";

import { ReactComponent as IconHeartFill } from "bootstrap-icons/icons/heart-fill.svg";
import { ReactComponent as IconTrash } from "bootstrap-icons/icons/trash.svg";
import { ReactComponent as IconChevronRight } from "bootstrap-icons/icons/chevron-right.svg";
import { ReactComponent as IconChevronLeft } from "bootstrap-icons/icons/chevron-left.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
const CardProductList2 = lazy(() =>
  import("../../components/card/CardProductList2")
);

const WishlistView = () => {


  const [products,setProducts] = useState([]);

  const token = loadState().access_token;

  const customerId = 3;

  const getWishListProducts = (customerId) =>{
     cartService.get(`get/wish-list-products/`+customerId,{ headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => { 
    if(res.data.length>0) {
      console.log('wish ;list',res.data)
      setProducts(res.data)
    }
    })
    .catch(err => console.log(err))
  }


  const removeItem = (id) =>{
    console.log(id)
    cartService.get('remove/wish-list-item/'+id, { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res =>{
      getWishListProducts(customerId)
      console.log(res.data)
    })
    .catch(err => console(err))
  }




  useEffect(()=>{
    getWishListProducts(customerId)

  },[])

  useEffect(()=>{

  },[products])


    return (
      <div className="container mb-3">
        <h4 className="my-3">Wishlists</h4>
        <div className="row g-3">
          {products.map((product, idx) => {
            return (
              <div key={idx} className="col-md-6">
                <CardProductList2 data={product} removeItemHandler={removeItem} />
              </div>
            );
          })}
        </div>
      </div>
    );
  
}

export default WishlistView;
