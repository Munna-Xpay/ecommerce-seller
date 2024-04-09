import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import { Box, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';
import { BASE_URL } from '../services/baseUrl';
import { useRecoilValue } from 'recoil';
import { productByCategory } from '../recoil/atoms/productState';

function TopProductsGroceries() {
  const products = useRecoilValue(productByCategory)
  const groceries = products.filter((i) => i.category === 'Groceries')
  // console.log(groceries);
  return (
    <>
      <Swiper
        style={{ padding: '5px' }}
        spaceBetween={10}
        freeMode={true}
        width={205}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {groceries.map((product) => (
          <SwiperSlide style={{ padding: '25px' }}>
            <Box boxShadow={4} borderRadius={2} padding={4} width={150} bgcolor={'white'}>
              <Box border={1} borderColor={'#f1f1f1'} marginBottom={2}> <img width={150} height={130} src={`${BASE_URL}/uploadedFiles/${product?.thumbnail}`} alt="" /></Box>
              <Typography fontWeight={'bold'} fontSize={15} textAlign={'center'}>{product.title.length > 15 ? `${product.title.slice(0, 15)}...` : product.title}</Typography>
              <Box textAlign={'center'}><Rating name="read-only" value={product.review_star} readOnly /></Box>
              <Typography textAlign={'center'} fontWeight={'bold'} fontSize={15} color={'#0dd1b0'}>Available :<span>{product.stockQuantity}</span></Typography>
              <Typography textAlign={'center'} fontWeight={'bold'} fontSize={15} color={'darkblue'}>Already sold :<span>{product.product_sold}</span></Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default TopProductsGroceries