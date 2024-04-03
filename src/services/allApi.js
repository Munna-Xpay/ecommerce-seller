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

//product edit
export const productEdit=async(body,id)=>{
    return await commonApi('PUT',`${BASE_URL}/api/seller/product-update/${id}`,body,"")
}

//product image edit
export const productImageUpdate=async(body,id)=>{
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    return await commonApi('PUT',`${BASE_URL}/api/seller/product-image-update/${id}`,body,config)
}

//product management
export const getProductsInProductsManagement = async (filter, id, searchData) => {
    let queryParams = Object.keys(filter).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(filter[key])}`).join('&');
    
    // Include searchData in the query string if provided
    if (searchData) {
        queryParams += `&searchData=${encodeURIComponent(searchData)}`;
    }
    return await commonApi('GET', `${BASE_URL}/api/seller/products-management/${id}?${queryParams}`);
}
