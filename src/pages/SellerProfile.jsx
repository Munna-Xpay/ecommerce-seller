import React from 'react'
import PageHead from '../components/PageHead'
import { Grid } from '@mui/material'

import { Toaster } from 'react-hot-toast'
import SellerProfileBox from '../components/SellerProfileBox'
import SellerProfileEditBox from '../components/SellerProfileEditBox'

const SellerProfile = () => {
    return (
        <>
            <PageHead heading='Profile' />
            <Grid container spacing={2} my={1}>
                <Grid item xs={12} md={4}>
                    <SellerProfileBox />
                </Grid>
                <Grid item xs={12} md={8}>
                    <SellerProfileEditBox />
                </Grid>
            </Grid>
            <Toaster />
        </>
    )
}

export default SellerProfile