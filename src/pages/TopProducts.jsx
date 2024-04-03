import React, { useEffect, useState } from 'react'
import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import CachedIcon from '@mui/icons-material/Cached';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PageHead from '../components/PageHead'
import CheckroomIcon from '@mui/icons-material/Checkroom';
import TopProductsCategory from '../components/TopProductsCategory';
import TopProductsElectronics from '../components/TopProductsElectronics';
import { useRecoilState } from 'recoil';
import { getProductsByCategory } from '../services/allApi';
import { productByCategory } from '../recoil/atoms/productState';
import TopProductsFashion from '../components/TopProductsFashion';
import TopProductsGroceries from '../components/TopProductsGroceries';

function TopProducts() {
    const [categoryProducts,setCategoryProducts]=useRecoilState(productByCategory)
    const getProducts=async()=>{
        const token = localStorage.getItem('token')
        const reqHeader = {
            "Content-Type": "application/json",
            "user_token": `Bearer ${token}`
        }
        const result=await getProductsByCategory(reqHeader)
        //console.log(result);
         setCategoryProducts(result.data)
    }
//console.log(categoryProducts);
    useEffect(()=>{
        getProducts()
    },[])
  return (
    <>
    <PageHead heading={'Top Products'}/>
     <TopProductsCategory />
     <Grid container mt={4}>

       <Grid item xs={12} md={5.5}>
         <Stack direction={'row'} spacing={1}><LaptopMacIcon sx={{ backgroundColor: '#035ECF', color: 'white', padding: '5px', borderRadius: '3px', height: '20px', width: '20px' }} /> <Typography fontSize={20} fontWeight={'bold'} >Electronics</Typography></Stack>
         <TopProductsElectronics />
       </Grid>
       <Grid item sx={{
         marginLeft: {
           xs: 0,
           md: 10
         }
       }} xs={12} md={5.5}>
         <Stack direction={'row'} spacing={1}><CheckroomIcon sx={{ backgroundColor: '#ff5470', color: 'white', padding: '5px', borderRadius: '3px', height: '20px', width: '20px' }}/><Typography fontSize={20} fontWeight={'bold'} >Fashion</Typography></Stack>
         <TopProductsFashion />
       </Grid>
       <Grid item sx={{
         marginLeft: {
           xs: 0,
           md: 0
         }
       }} xs={12} md={5.5}>
         <Stack direction={'row'} spacing={1}><RestaurantIcon sx={{ backgroundColor: 'orange', color: 'white', padding: '5px', borderRadius: '3px', height: '20px', width: '20px' }} /> <Typography fontSize={20} fontWeight={'bold'} >Groceries</Typography></Stack>
         <TopProductsGroceries />
       </Grid>
     </Grid>
   </>
  )
}

export default TopProducts