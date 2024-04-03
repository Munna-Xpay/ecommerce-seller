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

//product grid
export const getProductsGrid = async (reqHeader,sortData) => {
    return await commonApi('GET', `${BASE_URL}/api/seller/products-grid?categoryFilter=${sortData.categoryFilter}&sort_option=${sortData.sort_option}`,'',reqHeader);
}

//delete product
export const deleteProduct=async(id)=>{
    return await commonApi('DELETE',`${BASE_URL}/api/product/delete/${id}`,{},"")
}

//product edit
export const productEdit=async(body,id,reqHeader)=>{
    return await commonApi('PUT',`${BASE_URL}/api/seller/product-update/${id}`,body,reqHeader)
}

//product image edit
export const productImageUpdate=async(body,reqHeader,id)=>{
    return await commonApi('PUT',`${BASE_URL}/api/seller/product-image-update/${id}`,body,reqHeader)
}

//product management
export const getProductsInProductsManagement = async (filter, searchData,reqHeader) => {
    return await commonApi('GET', `${BASE_URL}/api/seller/products-management?categoryFilter=${filter.categoryFilter}&stockFilter=${filter.stockFilter}&productTypeFilter=${filter.productTypeFilter}&additionalOption=${filter.additionalOption}&searchData=${searchData}`,'',reqHeader);
}

//product by category price
export const getProductPriceByCategory=async(reqHeader)=>{
    return await commonApi('GET',`${BASE_URL}/api/seller/price-by-category-seller`,'',reqHeader)
}

//product by category
export const getProductsByCategory=async(reqHeader)=>{
    return await commonApi('GET',`${BASE_URL}/api/seller/product-by-category`,'',reqHeader)
}

//seller product price by category
export const getSellerProductsByCategory=async(reqHeader)=>{
    return await commonApi('GET',`${BASE_URL}/api/seller/seller-category`,'',reqHeader)
}