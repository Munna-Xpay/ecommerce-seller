import * as Yup from 'yup'

export const productValidationSchema=Yup.object({
    images: Yup.array().min(1, 'At least one image is required').required('Images is required'),
    thumbnail:Yup.string().required('Thumbnail is required'),
    description:Yup.string().required('Description is required'),
    title:Yup.string().required('Product name is required'),
    manufacturer:Yup.string().required('Brand name is required'),
    about:Yup.string().required('About is required'),
    stock:Yup.string().required('Stock status is required'),
    stockQuantity:Yup.number().required('Stock Quantity is required').typeError('Stock Quantity must be a number'),
    features: Yup.array().of(
        Yup.object().shape({
            key: Yup.string().required('Feature key is required'),
            value: Yup.string().required('Feature value is required')
        })
    ).min(1, 'At least one feature is required'),
    product_type:Yup.string().required('Product type is required'),
    discounted_price:Yup.number().required('Sale price is required').typeError('Sale price must be a number'),
    original_price:Yup.number().required('Regular price is required').typeError('Regular price must be a number'),
    ships_from:Yup.string().required("Ships from is required"),
    category:Yup.string().required('Category is required')
})