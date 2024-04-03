import { atom } from "recoil";

export const orderState = atom({
    key: 'orders',
    default: []
})