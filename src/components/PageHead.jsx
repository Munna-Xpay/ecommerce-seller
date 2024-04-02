import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import CachedIcon from '@mui/icons-material/Cached';

const PageHead = ({ heading }) => {
    return (
        <Paper sx={{ marginTop: '10px' }}>
            <Stack direction={{ xs: "column", md: 'row' }} spacing={2} justifyContent={'space-between'} p={2}>
                <Typography variant='h4' sx={{ fontWeight: 'bold', opacity: '.9' }} >{heading}</Typography>
                <Stack spacing={2} direction={'row'}>
                    <Button sx={{ display: { xs: 'none', md: 'flex' } }} endIcon={<CachedIcon fontSize='small' />}>
                        Data Refresh
                    </Button>
                    <Stack justifyContent={'center'} alignItems={'center'} p={2} sx={{ border: '1px solid #f2f2f2', bgcolor: '#f5f2f2', fontWeight: 'bold', borderRadius: '8px', width: { xs: '100%', md: 'inherit' } }}>
                        {new Date().toLocaleString()}
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    )
}

export default PageHead