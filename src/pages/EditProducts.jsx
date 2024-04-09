import { Box, Button, FormControl, FormHelperText, Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import JoditEditor from 'jodit-react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { productsManagement } from '../recoil/atoms/productState';
import { BASE_URL } from '../services/baseUrl';
import { getProductsInProductsManagement, productEdit, productImageUpdate } from '../services/allApi';
import PageHead from '../components/PageHead';
import { productValidationSchema } from '../formValidation/ProductValidation';

function AddProduct() {

  const { id } = useParams()
  // console.log(id);
  const [productsData, setProductsData] = useRecoilState(productsManagement)
 // console.log(productsData);

  const productDetails = productsData.find((item) => item._id === id)
  //console.log(productDetails);

  const [errors, setErrors] = useState(false)
  const [filter, setFilter] = useState({
    categoryFilter: '',
    stockFilter: '',
    productTypeFilter: '',
    additionalOption: ''
  })
  //productdata
  const [productData, setProductData] = useState({
    features: []
  })

  //state for storing images
  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('')
  const [image4, setImage4] = useState('')
  const [thumbnailImage, setThumbnailImage] = useState('')

  //preview states
  const [thumbnailPreview, setThumbnailPreview] = useState('')
  const [image1Preview, setImage1Preview] = useState('')
  const [image2Preview, setImage2Preview] = useState('')
  const [image3Preview, setImage3Preview] = useState('')
  const [image4Preview, setImage4Preview] = useState('')


  //select field states
  const [category, setCategory] = useState('')
  const [stockStatus, setStockStatus] = useState('')
  const [productType, setProductType] = useState('')

  //onchange
  const setInput = (e) => {
    const { value, name } = e.target
    setProductData({ ...productData, [name]: value })
  }
  // console.log(productData);

  // Handler for Jodit content change
  const handleDescriptionChange = (content) => {
    setProductData({
      ...productData,
      description: content
    });
  }

  //funcs for dynamic textfields
  const handleFeatureInputChange = (index, key, value) => {
    const updatedFeatures = [...productData.features];
    updatedFeatures[index] = { ...updatedFeatures[index], [key]: value };
    setProductData({ ...productData, features: updatedFeatures });
  };

  const handleRemoveFeature = (index) => {
    const updatedFeatures = [...productData.features];
    updatedFeatures.splice(index, 1);
    setProductData({ ...productData, features: updatedFeatures });
  };

  const handleAddFeature = () => {
    const newFeature = { key: '', value: '' };
    setProductData({
      ...productData,
      features: [...productData.features, newFeature]
    });
  };


  useEffect(() => {
    if (productDetails) {
      setProductData(productDetails)
    }
  }, [productDetails])


  //images preview
  useEffect(() => {
    if (image1) {
      setImage1Preview(URL.createObjectURL(image1))
    }
    if (image2) {
      setImage2Preview(URL.createObjectURL(image2))
    }
    if (image3) {
      setImage3Preview(URL.createObjectURL(image3))
    }
    if (image4) {
      setImage4Preview(URL.createObjectURL(image4))
    }
    if (thumbnailImage) {
      setThumbnailPreview(URL.createObjectURL(thumbnailImage))
    }
  }, [image1, image2, image3, image4, thumbnailImage]);


  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await productValidationSchema.validate(productData, { abortEarly: false })
      const token = localStorage.getItem('token')
      const reqHeader = {
        "Content-Type": "application/json",
        "user_token": `Bearer ${token}`
      }
      const result = await productEdit(productData, id, reqHeader)
      if (result.status === 200) {
        toast.success('Product updated!')
      }
      else {
        toast.error(result.response.data)
      }
    } catch (err) {
      const newErrors = {};
      err.inner.forEach(validationError => {
        newErrors[validationError.path] = validationError.message;
      });
      setErrors(newErrors);
    }
  }
  console.log(errors);
  //handle product image edit
  const handleProductImageEdit = async () => {
    const imageData = new FormData();
    imageData.append("thumbnail", thumbnailImage ? thumbnailImage : productData.thumbnail);
    imageData.append("images", image1 ? image1 : productData.images[0]);
    imageData.append("images", image2 ? image2 : productData.images[1]);
    imageData.append("images", image3 ? image3 : productData.images[2]);
    imageData.append("images", image4 ? image4 : productData.images[3]);
    const token = localStorage.getItem('token')
    const reqHeader = {
      "Content-Type": "multipart/form-data",
      "user_token": `Bearer ${token}`
    }
    const result = await productImageUpdate(imageData, reqHeader, id)
    if (result.status === 200) {
      toast.success('Product image updated!')
    }
    else {
      toast.error(result.response.data)
    }
  };

  const handleData = async () => {
    const token = localStorage.getItem('token')
    const reqHeader = {
      "Content-Type": "application/json",
      "user_token": `Bearer ${token}`
    }
    const result = await getProductsInProductsManagement(filter, '', reqHeader)
    console.log(result);
    if (result.status === 200) {
      setProductsData(result.data)
    }
  }

  useEffect(() => {
    handleData()
  }, [])


  return (
    <>
      <PageHead heading={'Product Editor'} />
      <Box mt={2} boxShadow={{ xs: 0, md: 3 }} bgcolor={'white'} p={{ xs: 0, md: 1 }} borderRadius={2}>
        <Typography fontSize={16} fontWeight={'bold'}>Product Settings</Typography>
        <Typography mt={3} fontSize={12} color={'gray'} fontWeight={'bold'}>Product Images</Typography>
        <Grid container spacing={{ xs: 0, md: 35 }}>
          <Grid item xs={12} md={6} direction={'row'}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
              <label htmlFor='img1'>
                <Stack bgcolor={'#dedede'} sx={{ width: { xs: 378, md: 200 }, height: '235px' }} borderRadius={1}>
                  <input onChange={(e) => setImage1(e.target.files[0])} id='img1' style={{ display: 'none' }} type="file" />
                  <Box textAlign={'center'} display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">
                    {productData.images ? (
                      <img width={200} height={235} src={image1Preview ? image1Preview : `${BASE_URL}/uploadedFiles/${productData.images[0]}`} alt="" />) :
                      <>    <PhotoLibraryIcon />
                        <Typography>Browse Image</Typography>
                      </>
                    }
                  </Box>
                </Stack>
              </label>

              <label htmlFor='img2'>
                <Stack bgcolor={'#dedede'} sx={{ width: { xs: 378, md: 200 }, height: '235px' }} borderRadius={1}>
                  <input onChange={(e) => setImage2(e.target.files[0])} id='img2' style={{ display: 'none' }} type="file" />
                  <Box textAlign={'center'} display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">
                    {productData.images ? (
                      <img width={200} height={235} src={image2Preview ? image2Preview : `${BASE_URL}/uploadedFiles/${productData.images[1]}`} alt="" />) :
                      <>    <PhotoLibraryIcon />
                        <Typography>Browse Image</Typography>
                      </>
                    }
                  </Box>
                </Stack>
              </label>

              <label htmlFor='img3'>
                <Stack bgcolor={'#dedede'} sx={{ width: { xs: 378, md: 200 }, height: '235px' }} borderRadius={1}>
                  <input onChange={(e) => setImage3(e.target.files[0])} id='img3' style={{ display: 'none' }} type="file" />
                  <Box textAlign={'center'} display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">
                    {productData.images ? (
                      <img width={200} height={235} src={image3Preview ? image3Preview : `${BASE_URL}/uploadedFiles/${productData.images[2]}`} alt="" />) :
                      <>    <PhotoLibraryIcon />
                        <Typography>Browse Image</Typography>
                      </>
                    }
                  </Box>
                </Stack>
              </label>

              <label htmlFor='img4'>
                <Stack bgcolor={'#dedede'} sx={{ width: { xs: 378, md: 200 }, height: '235px' }} borderRadius={1}>
                  <input onChange={(e) => setImage4(e.target.files[0])} id='img4' style={{ display: 'none' }} type="file" />
                  <Box textAlign={'center'} display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">
                    {productData.images ? (
                      <img width={200} height={235} src={image4Preview ? image4Preview : `${BASE_URL}/uploadedFiles/${productData.images[3]}`} alt="" />) :
                      <>    <PhotoLibraryIcon />
                        <Typography>Browse Image</Typography>
                      </>
                    }
                  </Box>
                </Stack>
              </label>
            </Stack>
            <Stack width={{ xs: 380, md: 210 }}>
              <Typography mt={3} fontSize={12} color={'gray'} fontWeight={'bold'}>Product Thumbnail</Typography>

              <label htmlFor='thumbnailInput'  >
                <Stack bgcolor={'#dedede'} sx={{ width: { xs: 378, md: 200 }, height: '235px' }} borderRadius={1}>
                  <input onChange={(e) => setThumbnailImage(e.target.files[0])} name='thumbnail' id='thumbnailInput' style={{ display: 'none' }} type="file" />
                  <Box textAlign={'center'} display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">
                    {productData.thumbnail ? (
                      <img width={200} height={235} src={thumbnailPreview ? thumbnailPreview : `${BASE_URL}/uploadedFiles/${productData.thumbnail}`} alt="" />) :
                      <>    <PhotoLibraryIcon />
                        <Typography>Browse Image</Typography>
                      </>
                    }
                  </Box>
                </Stack>
              </label>
              <FormHelperText sx={{ color: 'red' }}>{errors.thumbnail}</FormHelperText>
            </Stack>
            <Button onClick={handleProductImageEdit} sx={{ marginTop: '15px', backgroundColor: '#0384fc', color: 'white', '&:hover': { backgroundColor: '#0384fc' }, width: '150px', borderRadius: '10px', padding: '10px' }}>
              Save Images
            </Button>
            <Box>
              <Typography mt={1} fontSize={12} color={'gray'} fontWeight={'bold'}>Product description</Typography>
              <JoditEditor
                value={productData.description}
                onChange={handleDescriptionChange}
              />
              <FormHelperText sx={{ color: 'red' }}>{errors.description}</FormHelperText>

            </Box>
          </Grid>
          <Grid item md={6} xs={12} >
            <Box
              sx={{
                width: 804,
                maxWidth: '100%',
              }}
            >
              <Typography fontSize={12} color={'gray'} fontWeight={'bold'}>Product name</Typography>
              <TextField onChange={(e) => setInput(e)} value={productData?.title} name='title' InputProps={{ style: { borderRadius: '7px', height: '50px' } }} fullWidth label="" id="fullWidth" />
              <FormHelperText sx={{ color: 'red' }}>{errors.title}</FormHelperText>
            </Box>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} mt={2}>
              <Box>
                <Typography fontSize={12} color={'gray'} fontWeight={'bold'}>Brand name</Typography>
                <TextField onChange={(e) => setInput(e)} value={productData?.manufacturer} name='manufacturer' InputProps={{ style: { borderRadius: '7px', height: '50px' } }} sx={{ width: { xs: 380, md: 295 } }} label="" id="fullWidth" />
                <FormHelperText sx={{ color: 'red' }}>{errors.manufacturer}</FormHelperText>

              </Box>
              <Box>
                <Typography fontSize={12} color={'gray'} fontWeight={'bold'}>Category</Typography>
                <FormControl sx={{ width: { xs: 380, md: 295 } }}>
                  <Select
                    sx={{ height: '50px' }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='category'
                    value={productData?.category || category}
                    onChange={(e) => setProductData({ ...productData, ["category"]: e.target.value })}
                    InputProps={{ style: { borderRadius: '7px' } }}
                  >
                    <MenuItem value={'Electronics'}>Electronics</MenuItem>
                    <MenuItem value={'Fashion'}>Fashion</MenuItem>
                    <MenuItem value={'Groceries'}>Groceries</MenuItem>
                  </Select>
                  <FormHelperText sx={{ color: 'red', marginX: '0px' }}>{errors.category}</FormHelperText>

                </FormControl>
              </Box>
            </Stack>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} mt={2}>
              <Box>
                <Typography fontSize={12} color={'gray'} fontWeight={'bold'}>Regular price</Typography>
                <TextField onChange={(e) => setInput(e)} value={productData?.original_price} name='original_price' InputProps={{ style: { borderRadius: '7px', height: '50px' } }} sx={{ width: { xs: 380, md: 295 } }} label="" id="fullWidth" />
                <FormHelperText sx={{ color: 'red' }}>{errors.original_price}</FormHelperText>

              </Box>
              <Box>
                <Typography fontSize={12} color={'gray'} fontWeight={'bold'}>Sale price</Typography>
                <TextField onChange={(e) => setInput(e)} value={productData?.discounted_price} name='discounted_price' InputProps={{ style: { borderRadius: '7px', height: '50px' } }} sx={{ width: { xs: 380, md: 295 } }} label="" id="fullWidth" />
                <FormHelperText sx={{ color: 'red' }}>{errors.discounted_price}</FormHelperText>
              </Box>
            </Stack>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} mt={2}>
              <Box>
                <Typography fontSize={12} color={'gray'} fontWeight={'bold'}>About</Typography>
                <TextField onChange={(e) => setInput(e)} value={productData?.about} name='about' InputProps={{ style: { borderRadius: '7px', height: '50px' } }} type='text' sx={{ width: { xs: 380, md: 295 } }} label="" id="fullWidth" />
                <FormHelperText sx={{ color: 'red' }}>{errors.about}</FormHelperText>

              </Box>
              <Box>
                <Typography fontSize={12} color={'gray'} fontWeight={'bold'}>Stock status</Typography>
                <FormControl sx={{ width: { xs: 380, md: 295 } }}>
                  <Select

                    sx={{ height: '50px' }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={productData?.stock || stockStatus}
                    onChange={(e) => setProductData({ ...productData, ["stock"]: e.target.value })}
                    InputProps={{ style: { borderRadius: '7px' } }}
                  >
                    <MenuItem value={'In stock'}>In stock</MenuItem>
                    <MenuItem value={'Low inventory'}>Low Inventory</MenuItem>
                    <MenuItem value={'Out of stock'}>Out of Stock</MenuItem>
                    <MenuItem value={'On demand'}>On Demand</MenuItem>
                    <MenuItem value={'Temporarily unavailable'}>Temporarily Unavailable</MenuItem>
                  </Select>
                  <FormHelperText sx={{ color: 'red', marginX: '0px' }}>{errors.stock}</FormHelperText>

                </FormControl>
              </Box>
            </Stack>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} mt={2}>
              <Box>
                <Typography fontSize={12} color={'gray'} fontWeight={'bold'}>Stock Quantity</Typography>
                <TextField onChange={(e) => setInput(e)} value={productData?.stockQuantity} name='stockQuantity' InputProps={{ style: { borderRadius: '7px', height: '50px' } }} type='text' sx={{ width: { xs: 380, md: 295 } }} label="" id="fullWidth" />
                <FormHelperText sx={{ color: 'red' }}>{errors.stockQuantity}</FormHelperText>
              </Box>
              <Box>
                <Typography fontSize={12} color={'gray'} fontWeight={'bold'}>Product Type</Typography>
                <FormControl sx={{ width: { xs: 380, md: 295 } }}>
                  <Select

                    name='product_type'
                    sx={{ height: '50px' }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={productData?.product_type || productType}
                    onChange={(e) => setProductData({ ...productData, ["product_type"]: e.target.value })} InputProps={{ style: { borderRadius: '7px' } }}
                  >
                    <MenuItem value={'Simple Product'}>Simple Product</MenuItem>
                    <MenuItem value={'Variable Product'}>Variable Product</MenuItem>
                    <MenuItem value={'Grouped Product'}>Grouped Product</MenuItem>

                  </Select>
                  <FormHelperText sx={{ color: 'red', marginX: '0px' }}>{errors.product_type}</FormHelperText>

                </FormControl>
              </Box>
            </Stack>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} mt={2}>

              <Box>
                <Typography fontSize={12} color={'gray'} fontWeight={'bold'}>Ships From</Typography>
                <TextField onChange={(e) => setInput(e)} value={productData?.ships_from} name='ships_from' InputProps={{ style: { borderRadius: '7px', height: '50px' } }} type='text' sx={{ width: { xs: 380, md: 295 } }} label="" id="fullWidth" />
                <FormHelperText sx={{ color: 'red' }}>{errors.ships_from}</FormHelperText>
              </Box>
              <Stack>
                <Typography fontSize={12} color={'gray'} fontWeight={'bold'}>Status</Typography>

                <FormControl sx={{ width: { xs: 380, md: 295 } }}>
                  <Select
                    sx={{ height: '50px' }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='category'
                    value={productData?.isActive ? true : false}
                    onChange={(e) => setProductData({ ...productData, isActive: e.target.value === true ? true : false })}
                    InputProps={{ style: { borderRadius: '7px' } }}
                  >
                    <MenuItem value={true}>Active</MenuItem>
                    <MenuItem value={false}>Disable</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
            <Box>
              <Typography mt={1} fontSize={12} color={'gray'} fontWeight={'bold'}>
                Features
              </Typography>
              {productData.features.map((feature, index) => (
                <Stack key={index} direction="row" spacing={1}>
                  <TextField
                    value={feature.key}
                    onChange={(e) => handleFeatureInputChange(index, 'key', e.target.value)}
                    placeholder="Feature name"
                    InputProps={{ style: { borderRadius: '7px', height: '50px' } }}
                    sx={{ width: { xs: 180, md: 140 } }}
                    label=""
                  />
                  <TextField
                    value={feature.value}
                    onChange={(e) => handleFeatureInputChange(index, 'value', e.target.value)}
                    placeholder="Feature details"
                    InputProps={{ style: { borderRadius: '7px', height: '50px' } }}
                    sx={{ width: { xs: 180, md: 140 } }}
                    label=""
                  />
                  <Button onClick={() => handleRemoveFeature(index)}>Remove</Button>
                </Stack>
              ))}
              <FormHelperText sx={{ color: 'red' }}>{errors.features}</FormHelperText>
              <Button onClick={handleAddFeature}>Add Feature</Button>
            </Box>

            <Stack direction={{ xs: 'column', md: 'row' }} textAlign={'center'} spacing={1} mt={2}>

              <Button onClick={(e) => handleEdit(e)} sx={{ marginTop: '15px', backgroundColor: 'green', color: 'white', '&:hover': { backgroundColor: 'green' }, width: '300px', borderRadius: '20px', padding: '10px' }}>
                Save Changes
              </Button>
              <Button onClick={() => window.history.back()} sx={{ marginTop: '15px', backgroundColor: '#1e2e4a', color: 'white', '&:hover': { backgroundColor: '#1e2e4a' }, width: '100px', borderRadius: '20px', padding: '10px' }}>
                Back
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Toaster position="top-center"
          reverseOrder={false}
          containerStyle={{
            padding: '10px',
            fontSize: '17px',
            fontFamily: 'sans-serif',
          }}
        />
      </Box>
    </>
  )
}

export default AddProduct
