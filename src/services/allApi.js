import { BASE_URL } from './baseUrl'
import { commonApi } from './commonApi'

//seller login
export const sellerLogin = async (data) => {
    return await commonApi('post', `${BASE_URL}/api/seller/seller-login`, data, '')
}

//product grid
export const getProductsGrid = async (headers, id) => {
    return await commonApi('GET', `${BASE_URL}/api/seller/products-grid/${id}`, "", headers)
}