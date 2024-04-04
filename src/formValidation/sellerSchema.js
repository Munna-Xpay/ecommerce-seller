import * as yup from 'yup'

export const sellerSchema = yup.object({
    email: yup.string().email("Invalid email address").required(),
    phoneNum: yup.number().min(1000000000,"Enter a valid phone number").max(9999999999,"Enter a valid phone number"),
    zipCode: yup.number().min(100000,"Enter a valid zip code").max(999999,"Enter a valid zip code"),
    company_name: yup.string().required()
})

export const sellerPasswordSchema = yup.object({
    updatePassword: yup.string().min(6, "Password must be at least 6 characters").required('Password required')
})