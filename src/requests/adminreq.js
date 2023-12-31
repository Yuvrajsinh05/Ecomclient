
const baseUrl = 'http://localhost:8670'
// const baseUrl = 'https://node-ecom-j08j.onrender.com'



export const UserAuth = {
    login: `${baseUrl}/admin/login` , 
    register: `${baseUrl}/admin/register`, 
    isVerifiedRegister: `${baseUrl}/admin/isVerifiedRegister`,
}

export const Categories = {
    getAllcategories : `${baseUrl}/admin/Categories`
}

export const HomeCorousel = {
    getHomecorousel : `${baseUrl}/admin/homecorousel`
}

export const ProductCalls = {
    getallmobiles : `${baseUrl}/admin/mobiles`,
    getallComputers : `${baseUrl}/admin/computer&Accessories`,
    getallFashion : `${baseUrl}/admin/fashion`,
}

export const CustomerCart = {
    getCartById :`${baseUrl}/admin/getcarts`, //admin/getcarts?id=641c677662885f4087a59307'
    UpdateCartById :`${baseUrl}/admin/updateItems`, //admin/UpdateCartById?id=641c677662885f4087a59307'
    createcart:`${baseUrl}/admin/createcart`
}

export const ProdcutsWrtCate ={
    getProductsById : `${baseUrl}/admin`,
    getProductDetailById :`${baseUrl}/admin/productDetails`
}

export const Payment = {
    paymentVerify :`${baseUrl}/admin/paymentVerification`,
    doPay :`${baseUrl}/admin/doPay`,
    getKey :`${baseUrl}/admin/getKey`,

}



export const dashboardClothing = {
    MensCloth : `${baseUrl}/admin/Fashion/Men's%20Clothing`,
    WomensCloth : `${baseUrl}/admin/Fashion/Women's%20Clothing`,
    Kids :`${baseUrl}/admin/Fashion/Children's%20Clothing`
}