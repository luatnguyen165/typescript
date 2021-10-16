
let cart=null;
module.exports = class Cart {

    static save(product) {
        if(cart){
            const exist = cart.product.findIndex(p=> p.id === product.id);
            if(exist.length>0){
                cart[exist].qt +=1
            cart[exist].tototalPrice+=cart.product[exist].price
            }else{
                cart={product:[],qt:1,tototalPrice:0};
            cart.product.push(product)
            cart.qt=1
            cart.tototalPrice+=product.price;
            }
            

        }else{
            cart={product:[],qt:1,tototalPrice:0};
            cart.product.push(product)
            cart.qt=1
            cart.tototalPrice+=product.price;
        }

    }
    static getCart(){
        return cart;
    }
}