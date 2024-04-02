import {BASE_URL} from './baseUrl'
import {commonApi} from './commonApi'

//product grid
export const getProductsGrid=async(headers,id)=>{
    return await commonApi('GET',`${BASE_URL}/api/seller/products-grid/${id}`,"",headers)
}