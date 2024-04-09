import React, { useEffect, useState } from 'react'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import { getProductPriceByCategory, getSellerProductsByCategory } from '../services/allApi';
import { BASE_URL } from '../services/baseUrl';

function TopProductsCategory() {
    const [categoryTotalPrice,setCategoryTotalPrice]=useState([])
    const [sellerCategory,setSellerCategory]=useState([])
    const getPriceByCategory=async()=>{
        const token = localStorage.getItem('token')
        const reqHeader = {
            "Content-Type": "application/json",
            "user_token": `Bearer ${token}`
        }
        const result=await getProductPriceByCategory(reqHeader)
        setCategoryTotalPrice(result.data)
    }
    const sortedCategoryData = categoryTotalPrice.sort((a, b) => b.total_price - a.total_price);
    // Get the highest total price
    const highestTotalPrice = categoryTotalPrice.map((i) => i.total_price).reduce((a, b) => a + b, 0)
    //console.log(highestTotalPrice);

const getSellerProducts=async()=>{
    const token = localStorage.getItem('token')
    const reqHeader = {
        "Content-Type": "application/json",
        "user_token": `Bearer ${token}`
    }
    const result=await getSellerProductsByCategory(reqHeader)
    setSellerCategory(result.data)
}
console.log(sellerCategory);

    useEffect(()=>{
        getPriceByCategory()
        getSellerProducts()
    },[])

  return (
    <Grid container mt={2}>
    <Grid item p={2} boxShadow={4} borderRadius={2} md={3.5} xs={12} bgcolor={'white'}>
        <Stack spacing={2} >
            <Typography fontSize={20} fontWeight={'bold'}>Top Sales By Category</Typography>
            {sortedCategoryData?.map((category) => (
                <Box>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}><Typography fontSize={15} fontWeight={'bold'}>{category._id}</Typography><Typography fontSize={15} fontWeight={'bold'}>₹ {category.total_price}</Typography></Stack>
                    <LinearProgress sx={{ height: '13px', borderRadius: '5px', flexGrow: 1 }} variant="determinate" color={category._id === 'Electronics' ? 'info' : category._id === 'Fashion' ? 'error' : 'warning'} value={(category.total_price / highestTotalPrice) * 100} />
                </Box>
            ))}
        </Stack>
    </Grid>
     {sellerCategory.map((product) => (
                <Grid item sx={{
                    marginLeft: {
                        xs: 0,
                        md: 3
                    }, marginTop: {
                        xs: 5,
                        md: 0
                    }
                }} bgcolor={'white'} p={2} boxShadow={4} borderRadius={2} xs={12} md={2.5}>


                    <Box border={1} borderColor={'#f1f1f1'} textAlign={'center'}><img width={90} height={90} src={`${BASE_URL}/uploadedFiles/${product.sellerLogo.company_icon}`} alt="" /></Box>
                    <Stack spacing={2} direction={'row'} mt={3}>
                        <Box><Typography fontSize={16} fontWeight={'bold'} color={'gray'}>{product.category}</Typography><Typography fontSize={18} fontWeight={'bold'} >₹ {product.totalPrice}</Typography></Box>
                    </Stack>
                </Grid>
            ))
            }
    </Grid>
  )
}

export default TopProductsCategory