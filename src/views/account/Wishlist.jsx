import React, {useContext, useEffect,useState, lazy } from "react";
import { cartService } from "../../axios";
import { loadState } from "../../localStorage";
import { globalC } from "../../Context";
import swal from 'sweetalert';

import { ReactComponent as IconHeartFill } from "bootstrap-icons/icons/heart-fill.svg";
import { ReactComponent as IconTrash } from "bootstrap-icons/icons/trash.svg";
import { ReactComponent as IconChevronRight } from "bootstrap-icons/icons/chevron-right.svg";
import { ReactComponent as IconChevronLeft } from "bootstrap-icons/icons/chevron-left.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
const CardProductList2 = lazy(() =>
  import("../../components/card/CardProductList2")
);

const WishlistView = () => {

  const { authLogin,token,authLoginDetail } = useContext(globalC);
  const username = authLogin.user_name;

  const [products,setProducts] = useState([]);
  const [isLoading,setIsLoading] = useState(true)



  const getWishListProducts = (username) =>{
     cartService.get(`get/wish-list-products/`+username,{ headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => { 

      setProducts(res.data)
      setIsLoading(false)
    
    })
    .catch(err => console.log(err))
  }

  const addTocart = (username,product) =>{

    console.log('wish list',username)
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
          text: "Already added to the Cart",
          icon: "warning",
          timer: 2000,
          button: false
        })
      }

    })
    .catch(err => console.log(err))
  }


  const removeItem = (id) =>{
    console.log(id)
    cartService.get('remove/wish-list-item/'+id, { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res =>{
      getWishListProducts(username)
      console.log(res.data)
    })
    .catch(err => console(err))
  }




  useEffect(()=>{
    getWishListProducts(username)

  },[])

  useEffect(()=>{

  },[products])


    return (
      <div className="container mb-3">
        <h4 className="my-3">Wishlists</h4>
        <div className="row g-3">
          {isLoading && <p className="text-center">Loading....</p>}
          {products.map((product, idx) => {
            return (
              <div key={idx} className="col-md-6">
                <CardProductList2 data={product} removeItemHandler={removeItem} addTocartHandler={addTocart} />
              </div>
            );
          })}
        </div>
      </div>
    );
  
}

export default WishlistView;
