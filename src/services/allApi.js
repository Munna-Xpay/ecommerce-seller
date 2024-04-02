import { BASE_URL } from "./baseUrl"
import { commonApi } from "./commonApi"

export const sellerLogin = async (data) => {
    return await commonApi('post', `${BASE_URL}/api/seller/seller-login`, data, '')
}