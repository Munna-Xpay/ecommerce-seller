import { Box, Button, FormControl, FormHelperText, Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import JoditEditor from 'jodit-react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { productValidationSchema } from '../formValidation/ProductValidation';
import PageHead from '../components/PageHead';
import { sellerAddProduct } from '../services/allApi';

function AddProduct() {
    
    const navigate = useNavigate()
    const [errors, setErrors] = useState(false)
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')
    const [thumbnailPreview, setThumbnailPreview] = useState('')
    const [image1Preview, setImage1Preview] = useState('')
    const [image2Preview, setImage2Preview] = useState('')
    const [image3Preview, setImage3Preview] = useState('')
    const [image4Preview, setImage4Preview] = useState('')
  
      //select field states
  const [category, setCategory] = useState('')
  const [stockStatus, setStockStatus] = useState('')
  const [productType, setProductType] = useState('')

    const [productData, setProductData] = useState({
      title: '', about: '', stock: '', stockQuantity: '', product_type: '', discounted_price: '', original_price: '',features:[],
      category: '', manufacturer: '', ships_from: '', description: '', seller: '', thumbnail: '', images: []
    })
    const [features, setFeatures] = useState([{ key: '', value: '' }]);
    
    //feature add  func
    const handleAddFeature = () => {
      setFeatures([...features, { key: '', value: '' }]);
    };
  
    // feature field remove func
    const handleRemoveFeature = (index) => {
      const updatedFeatures = [...features];
      updatedFeatures.splice(index, 1);
      setFeatures(updatedFeatures);
    };
  
    //handle input change for feature key or value
    const handleFeatureInputChange = (index, key, value) => {
      const updatedFeatures = [...features];
      updatedFeatures[index][key] = value;
      setFeatures(updatedFeatures);
    };
  
    //onchange
    const setInput = (e) => {
      const { value, name } = e.target
      setProductData({ ...productData, [name]: value })
    }
    //console.log(productData);
  
    // Handler for Jodit content change
    const handleDescriptionChange = (content) => {
      setProductData({
        ...productData,
        description: content
      });
    }
  
  
    //add funct
    const handleAdd = async (e) => {
      e.preventDefault();
      try {
        // Validate productData
        await productValidationSchema.validate(productData, { abortEarly: false });
      // Format features array
      const formattedFeatures = features.map(feature => ({
        key: feature.key,
        value: feature.value
    }));
    
    const sellerId=localStorage.getItem('sellerId')
   console.log(sellerId);
        const formData = new FormData();
        formData.append('title', productData.title);
        formData.append('about', productData.about);
        formData.append('stock', productData.stock);
        formData.append('stockQuantity', productData.stockQuantity);
        formData.append('product_type', productData.product_type);
        formData.append('discounted_price', productData.discounted_price);
        formData.append('original_price', productData.original_price);
        formData.append('memory', JSON.stringify(productData.memory));
        formData.append('colors', JSON.stringify(productData.colors));
        formData.append('category', productData.category);
        formData.append('manufacturer', productData.manufacturer);
        formData.append('ships_from', productData.ships_from);
        formData.append('description', productData.description);
        formData.append('seller', sellerId);
        formData.append('thumbnail', productData.thumbnail);
        formData.append('images', image1);
        formData.append('images', image2);
        formData.append('images', image3);
        formData.append('images', image4);
        formData.append('features', JSON.stringify(formattedFeatures));    
  
        const token = localStorage.getItem('token')
        const reqHeader = {
            "Content-Type": "multipart/form-data",
            "user_token": `Bearer ${token}`
        }
        const result=await sellerAddProduct(formData,reqHeader)
        console.log(result);
        if(result.status===200){
            toast.success('Product added!')
            navigate('/product-grid')
            setProductData({ title: '', about: '', stock: '', stockQuantity: '', product_type: '', discounted_price: '', original_price: '',features:[],
            category: '', manufacturer: '', ships_from: '', description: '', seller: '', thumbnail: '', images: []})
        }
        else{
            toast.error(result.response.data)
        }
        setErrors({});
      } catch (err) {
        //console.log(err);
        const newErrors = {};
        err.inner.forEach(validationError => {
          newErrors[validationError.path] = validationError.message;
        });
        setErrors(newErrors);
      }
    };
  console.log(errors);
    //thumbnail preview
    useEffect(() => {
      if (productData.thumbnail) {
        setThumbnailPreview(URL.createObjectURL(productData.thumbnail))
      }
  
    }, [productData.thumbnail])
  
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
    }, [image1, image2, image3, image4]);

  return (
    <>
        <PageHead heading={'Add Product'} />
    <Box mt={2} boxShadow={{ xs: 0, md: 3 }} bgcolor={'white'} p={{ xs: 0, md: 1 }} borderRadius={2}>
    <Typography fontSize={16} fontWeight={'bold'}>Product Settings</Typography>
    <Typography mt={3} fontSize={12} color={'gray'} fontWeight={'bold'}>Product Images</Typography>
    <Grid container spacing={{ xs: 0, md: 5 }}>
      <Grid item xs={12} md={7} direction={'row'}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>

          <label htmlFor='img1'>
            <Stack bgcolor={'#dedede'} sx={{ width: { xs: 378, md: 200 }, height: '235px' }} borderRadius={1}>
              <input onChange={(e) => setImage1(e.target.files[0])} id='img1' style={{ display: 'none' }} type="file" />
              <Box textAlign={'center'} display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">
                {image1Preview ? (
                  <img width={200} height={235} src={image1Preview} alt="" />) :
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
                {image2Preview ? (
                  <img width={200} height={235} src={image2Preview} alt="" />) :
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
                {image3Preview ? (
                  <img width={200} height={235} src={image3Preview} alt="" />) :
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
                {image4Preview ? (
                  <img width={200} height={235} src={image4Preview} alt="" />) :
                  <>    <PhotoLibraryIcon />
                    <Typography>Browse Image</Typography>
                  </>
                }
              </Box>
            </Stack>
          </label>
        </Stack>
        {(errors.images && !image1 && !image2 && !image3 && !image4) && (
    <FormHelperText sx={{ color: 'red' }}>{errors.images}</FormHelperText>
  )}
        <Stack width={{ xs: 380, md: 210 }}>
          <Typography mt={3} fontSize={12} color={'gray'} fontWeight={'bold'}>Product Thumbnail</Typography>

          <label htmlFor='thumbnailInput'  >
            <Stack bgcolor={'#dedede'} sx={{ width: { xs: 378, md: 200 }, height: '235px' }} borderRadius={1}>
              <input onChange={(e) => setProductData({ ...productData, ["thumbnail"]: e.target.files[0] })} name='thumbnail' id='thumbnailInput' style={{ display: 'none' }} type="file" />
              <Box textAlign={'center'} display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">
                {thumbnailPreview ? (
                  <img width={200} height={235} src={thumbnailPreview} alt="" />) :
                  <>    <PhotoLibraryIcon />
                    <Typography>Browse Image</Typography>
                  </>
                }
              </Box>

            </Stack>
          </label>
          <FormHelperText sx={{ color: 'red' }}>{errors.thumbnail}</FormHelperText>
        </Stack>
        <Box>
          <Typography mt={1} fontSize={12} color={'gray'} fontWeight={'bold'}>Product description</Typography>
          <JoditEditor
            value={productData.description}
            onChange={handleDescriptionChange}
          />
          <FormHelperText sx={{ color: 'red' }}>{errors.description}</FormHelperText>

        </Box>
      </Grid>
      <Grid item md={5} xs={12}>
        <Box
          sx={{
            width: 804,
            maxWidth: '100%',
          }}
        >
          <Typography fontSize={12} color={'gray'} fontWeight={'bold'}>Product name</Typography>
          <TextField onChange={(e) => setInput(e)} name='title' InputProps={{ style: { borderRadius: '7px', height: '50px' } }} fullWidth label="" id="fullWidth" />
          <FormHelperText sx={{ color: 'red' }}>{errors.title}</FormHelperText>
        </Box>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} mt={2}>
          <Box>
            <Typography fontSize={12} color={'gray'} fontWeight={'bold'}>Brand name</Typography>
            <TextField onChange={(e) => setInput(e)} name='manufacturer' InputProps={{ style: { borderRadius: '7px', height: '50px' } }} sx={{ width: { xs: 380, md: 292 } }} label="" id="fullWidth" />
            <FormHelperText sx={{ color: 'red' }}>{errors.manufacturer}</FormHelperText>

          </Box>
          <Box>
            <Typography fontSize={12} color={'gray'} fontWeight={'bold'}>Category</Typography>
            <FormControl sx={{ width: { xs: 380, md: 292 } }}>
              <Select
                sx={{ height: '50px' }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name='category'
                value={productData.category}
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
            <TextField onChange={(e) => setInput(e)} name='original_price' InputProps={{ style: { borderRadius: '7px', height: '50px' } }} sx={{ width: { xs: 380, md: 292 } }} label="" id="fullWidth" />
            <FormHelperText sx={{ color: 'red' }}>{errors.original_price}</FormHelperText>

          </Box>
          <Box>
            <Typography fontSize={12} color={'gray'} fontWeight={'bold'}>Sale price</Typography>
            <TextField onChange={(e) => setInput(e)} name='discounted_price' InputProps={{ style: { borderRadius: '7px', height: '50px' } }} sx={{ width: { xs: 380, md: 292 } }} label="" id="fullWidth" />
            <FormHelperText sx={{ color: 'red' }}>{errors.discounted_price}</FormHelperText>

          </Box>
        </Stack>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} mt={2}>
          <Box>
            <Typography fontSize={12} color={'gray'} fontWeight={'bold'}>About</Typography>
            <TextField onChange={(e) => setInput(e)} name='about' InputProps={{ style: { borderRadius: '7px', height: '50px' } }} type='text' sx={{ width: { xs: 380, md: 292 } }} label="" id="fullWidth" />
            <FormHelperText sx={{ color: 'red' }}>{errors.about}</FormHelperText>

          </Box>
          <Box>
            <Typography fontSize={12} color={'gray'} fontWeight={'bold'}>Stock status</Typography>
            <FormControl sx={{ width: { xs: 380, md: 292 } }}>
              <Select


                sx={{ height: '50px' }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={productData.stock}
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
            <TextField onChange={(e) => setInput(e)} name='stockQuantity' InputProps={{ style: { borderRadius: '7px', height: '50px' } }} type='text' sx={{ width: { xs: 380, md: 292 } }} label="" id="fullWidth" />
            <FormHelperText sx={{ color: 'red' }}>{errors.stockQuantity}</FormHelperText>
          </Box>
          <Box>
            <Typography fontSize={12} color={'gray'} fontWeight={'bold'}>Product Type</Typography>
            <FormControl sx={{ width: { xs: 380, md: 292 } }}>
              <Select

                name='product_type'
                sx={{ height: '50px' }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={productData.product_type}
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
            <TextField onChange={(e) => setInput(e)} name='ships_from' InputProps={{ style: { borderRadius: '7px', height: '50px' } }} type='text' sx={{ width: { xs: 380, md: 292 } }} label="" id="fullWidth" />
            <FormHelperText sx={{ color: 'red' }}>{errors.ships_from}</FormHelperText>
          </Box>
        </Stack>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} mt={2}>
  
          <Box>
          <Typography mt={1} fontSize={12} color={'gray'} fontWeight={'bold'}>
          Features
        </Typography>

        {features.map((feature, index) => (
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
        </Stack>
        <Stack direction={{ xs: 'column', md: 'row' }} textAlign={'center'} spacing={1} mt={2}>
          <Box>
            <Button onClick={(e) => handleAdd(e)} sx={{ marginTop: '15px', backgroundColor: 'green', color: 'white', '&:hover': { backgroundColor: 'green' }, width: '300px', borderRadius: '20px', padding: '10px' }}>
              Publish Product
            </Button>
          </Box>
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