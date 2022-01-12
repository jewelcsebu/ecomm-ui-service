import axios from 'axios'

export const authService = axios.create({
        baseURL: 'http://localhost:9191/',
        
        // headers: { 
        //     'accept': 'application/json',
        //     'authorization':"Basic d2ViOnNlY3JldA==",
        //     'content-type': "application/x-www-form-urlencoded" //  doesn't support json
        //   },
        // auth: {
        //     username: "web", // This is the client_id
        //     password: "web" // This is the client_secret
        //   }, 
    });



export const productService =  axios.create({
    baseURL: 'http://localhost:8200/api/v1/product-service/'
});

export const cartService =  axios.create({
    baseURL: 'http://localhost:9800/api/v1/cart-service/'
});

export const categoryService = axios.create({
    baseURL: 'http://localhost:8100/api/v1/category-service/'
});

export const orderService = axios.create({
    baseURL: 'http://localhost:8300/api/v1/order-service/'
});

export const shippingService = axios.create({
    baseURL: 'http://localhost:8700/api/v1/shipping-service/'
});


