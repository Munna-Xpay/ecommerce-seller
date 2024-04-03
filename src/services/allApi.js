import { BASE_URL } from './baseUrl'
import { commonApi } from './commonApi'

//seller login
export const sellerLogin = async (data) => {
    return await commonApi('post', `${BASE_URL}/api/seller/seller-login`, data, '')
}

//get seller by id
export const sellerById = async (id, reqHeader) => {
    return await commonApi('get', `${BASE_URL}/api/seller/get-one-seller/${id}`, '', reqHeader)
}

//get orders by seller
export const getOrdersBySeller = async (id, reqHeader, sortData) => {
    return await commonApi('get', `${BASE_URL}/api/auth/get-orders-by-seller/${id}?categoryFilter=${sortData.categoryFilter}&sort_option=${sortData.sort_option}`, '', reqHeader)
}

//update orders by seller
export const updateOrderBySeller = async (id, reqHeader, data) => {
    return await commonApi('put', `${BASE_URL}/api/admin/update-order-by-seller/${id}`, data, reqHeader)
}

//update seller
export const updateSeller = async (id, reqHeader, data) => {
    return await commonApi('put', `${BASE_URL}/api/admin/update-seller/${id}`, data, reqHeader)
}

//update seller company icon
export const updateSellerCompanyIcon = async (id, reqHeader, data) => {
    return await commonApi('put', `${BASE_URL}/api/admin/update-seller-company-icon/${id}`, data, reqHeader)
}

//update seller password
export const updateSellerPassword = async (id, reqHeader, data) => {
    return await commonApi('put', `${BASE_URL}/api/admin/update-password-seller/${id}`, data, reqHeader)
}

//get seller review stat
export const getSellerReviewStat = async (id, reqHeader) => {
    return await commonApi('get', `${BASE_URL}/api/admin/get-seller-review-stat/${id}`, '', reqHeader)
}

//product grid
export const getProductsGrid = async (sortData, id) => {
    const queryString = Object.keys(sortData).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(sortData[key])}`).join('&');
    return await commonApi('GET', `${BASE_URL}/api/seller/products-grid/${id}?${queryString}`);
}

//delete product
export const deleteProduct=async(id)=>{
    return await commonApi('DELETE',`${BASE_URL}/api/product/delete/${id}`,{},"")
}