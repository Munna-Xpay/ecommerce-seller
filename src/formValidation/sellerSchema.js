import * as yup from 'yup'

export const sellerSchema = yup.object({
    email: yup.string().email("Invalid email address").required(),
    phoneNum: yup.number().min(1000000000).max(9999999999),
    zipCode: yup.number().min(100000).max(999999),
    company_name: yup.string().required()
})

export const sellerPasswordSchema = yup.object({
    updatePassword: yup.string().min(6).required('Password required')
})