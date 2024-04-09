import { atom } from "recoil";

export const productsGrid=atom({
    key:'productsGrid',
    default:[]
})

export const productsManagement=atom({
    key:'productManagement',
    default:[]
})

export const productByCategory=atom({
    key:'productByCategory',
    default:[]
})