
// Export const baseUrl = 'http://localhost:8670'
export const baseUrl ="https://ecombackend-303e.onrender.com"

export const UserAuth = {
  login: `${baseUrl}/admin/login` , 
  register: `${baseUrl}/admin/register`, 
  isVerifiedRegister: `${baseUrl}/admin/isVerifiedRegister`,
  isGoogleLogin: `${baseUrl}/admin/isGoogleLogin`,
  isGithubLogin: `${baseUrl}/admin/isGithubLogin`,
  userDetials : `${baseUrl}/admin/userDetails`,
  userOrders : `${baseUrl}/admin/orders`,
  ContactEcom : `${baseUrl}/admin/contact`,
  DeleteUser : `${baseUrl}/admin/deleteUser`,
  clientKey : `${baseUrl}/admin/getclientkey`,
  oauthclientkey : `${baseUrl}/admin/oauthclientkey`,
    
}

export const Categories = {
  getAllcategories : `${baseUrl}/admin/Categories`,
  getcategory : `${baseUrl}/admin/category`
}

export const HomeCorousel = {
  getHomecorousel : `${baseUrl}/admin/homecorousel`
}

export const ProductCalls = {
  getallProducts : `${baseUrl}/admin/allProducts`,
  getallmobiles : `${baseUrl}/admin/mobiles`,
  getallComputers : `${baseUrl}/admin/computer&Accessories`,
  getallFashion : `${baseUrl}/admin/fashion`,
  getMultplieProducesWithIds : `${baseUrl}/admin/fetchProductsWithIds`,
  filterProducts : `${baseUrl}/admin/filterProducts`,
  filterDetials : `${baseUrl}/admin/getFilterDetails`
}

export const CustomerCart = {
  getCartById :`${baseUrl}/admin/getcarts`, //Admin/getcarts?id=641c677662885f4087a59307'
  UpdateCartById :`${baseUrl}/admin/updateItems`, //Admin/UpdateCartById?id=641c677662885f4087a59307'
  createcart:`${baseUrl}/admin/createcart`,
  updatequantity:`${baseUrl}/admin/updatequantity`,
  savedProducts:`${baseUrl}/admin/savedProducts`,
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
  MensCloth : `${baseUrl}admin/Fashion/Men's%20Clothing`,
  WomensCloth : `${baseUrl}/admin/Fashion/Women's%20Clothing`,
  Kids :`${baseUrl}/admin/Fashion/Children's%20Clothing`
}



export const AdvanceApis = {
  SendMSGToDiscord:`${baseUrl}/admin/sendMessage`
}