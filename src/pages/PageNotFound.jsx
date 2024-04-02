import { Box, Button, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <Box style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <Stack sx={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img
          sx={{ width: '750px', height: '600px', objectFit: 'cover' }}
          src="https://shop-point.merku.love/assets/collage_404-78f8df94.webp"
          alt=""
        />
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white', width: '100%' }}>
          <Typography fontSize={90} color={'black'} fontWeight={'bold'}>404</Typography>
          <Typography fontSize={45} color={'black'} fontWeight={'bold'}>Page Not Found</Typography>
          <Link to={'/sales-analytics'}><Button
            sx={{ marginTop: '15px', backgroundColor: '#00ba9d', color: 'white', '&:hover': { backgroundColor: '#00ba9d' }, width: '300px', borderRadius: '20px', padding: '10px' }}
          >
            Back To Home
          </Button></Link>
        </Box>
      </Stack>
    </Box>


  )
}

export default PageNotFound