import React, { Suspense, lazy,useContext } from "react";
import { BrowserRouter,Redirect, Route, Switch,useLocation } from "react-router-dom";
import { globalC } from "./Context";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import TopMenu from "./components/TopMenu";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.min.css";

const Admin = lazy(() => import("./views/admin/Admin"));


const HomeView = lazy(() => import("./views/Home"));
const SignInView = lazy(() => import("./views/account/SignIn"));
const SignUpView = lazy(() => import("./views/account/SignUp"));
const ForgotPasswordView = lazy(() => import("./views/account/ForgotPassword"));
const OrdersView = lazy(() => import("./views/account/Orders"));
const SingleOrder = lazy(()=>import("./views/account/SingleOrder"))
const WishlistView = lazy(() => import("./views/account/Wishlist"));
const NotificationView = lazy(() => import("./views/account/Notification"));
const MyProfileView = lazy(() => import("./views/account/MyProfile"));
const ProductListView = lazy(() => import("./views/product/List"));
const ProductDetailView = lazy(() => import("./views/product/Detail"));
const StarZoneView = lazy(() => import("./views/product/StarZone"));
const CartView = lazy(() => import("./views/cart/Cart"));
const CheckoutView = lazy(() => import("./views/cart/Checkout"));
const DocumentationView = lazy(() => import("./views/Documentation"));
const NotFoundView = lazy(() => import("./views/pages/404"));
const InternalServerErrorView = lazy(() => import("./views/pages/500"));
const ContactUsView = lazy(() => import("./views/pages/ContactUs"));
const SupportView = lazy(() => import("./views/pages/Support"));
const BlogView = lazy(() => import("./views/blog/Blog"));
const BlogDetailView = lazy(() => import("./views/blog/Detail"));



const PrivateRoute = (props) => {
  const location = useLocation();
  const { authLogin } = useContext(globalC);

  console.log("authLogin:", authLogin);

  return authLogin ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: "/account/signin",
        state: { from: location }
      }}
    />
  );
};


function App() {


  return (
    <BrowserRouter>
      <React.Fragment>
        <Header />
        <TopMenu />
        <Suspense
          fallback={
            <div className="text-white text-center mt-3">Loading...</div>
          }
        >


          <Switch>
            <Route exact path="/" component={HomeView} />
            <Route exact path="/account/signin" component={SignInView} />
            <Route exact path="/account/signup" component={SignUpView} />
            <Route
              exact
              path="/account/forgotpassword"
              component={ForgotPasswordView}
            />

            <PrivateRoute exact path="/account/profile" component={MyProfileView} />
            <PrivateRoute exact path="/account/orders" component={OrdersView} />
            <PrivateRoute exact path="/account/order/details/:orderId" component={SingleOrder} />
            <PrivateRoute exact path="/account/wishlist" component={WishlistView} />
            <Route
              exact
              path="/account/notification"
              component={NotificationView}
            />


            <Route exact path="/view/products" component={ProductListView} />
            <Route path="/view/product/detail/:slug" component={ProductDetailView} />


            <Route exact path="/star/zone" component={StarZoneView} />
            <PrivateRoute exact path="/cart" component={CartView} />
            <PrivateRoute exact path="/checkout" component={CheckoutView} />
            <Route exact path="/documentation" component={DocumentationView} />
            <Route exact path="/contact-us" component={ContactUsView} />
            <Route exact path="/support" component={SupportView} />
            <Route exact path="/blog" component={BlogView} />
            <Route exact path="/blog/detail" component={BlogDetailView} />
            <Route exact path="/500" component={InternalServerErrorView} />



            <Route component={NotFoundView} />
          </Switch>
        </Suspense>
        <Footer />
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
