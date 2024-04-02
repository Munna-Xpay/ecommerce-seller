import {BASE_URL} from './baseUrl'
import {commonApi} from './commonApi'

//product grid
export const getProductsGrid = async (sortData, id) => {
    const queryString = Object.keys(sortData).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(sortData[key])}`).join('&');
    return await commonApi('GET', `${BASE_URL}/api/seller/products-grid/${id}?${queryString}`);
}

//delete product
export const deleteProduct=async(id)=>{
    return await commonApi('DELETE',`${BASE_URL}/api/product/delete/${id}`,{},"")
}