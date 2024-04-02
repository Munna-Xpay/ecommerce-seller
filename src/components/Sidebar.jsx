import { List, ListItemButton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import ListSubheader from '@mui/material/ListSubheader';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Link } from 'react-router-dom';

const Sidebar = () => {

    const [dashboardOpen, setDashboardOpen] = useState(false);
    const [productsOpen, setProductsOpen] = useState(false)
    const handleDashboardClick = () => {
        setDashboardOpen(!dashboardOpen);
    };
    const handleProductClick = () => {
        setProductsOpen(!productsOpen)
    }

    return (
        <>
            <List
                sx={{ width: '700px', height: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader" >
                    </ListSubheader>
                }
            >
                <ListItemButton onClick={handleProductClick}>
                    <ListItemIcon>
                        <ListAltIcon />
                    </ListItemIcon>
                    <ListItemText><Typography fontWeight={'bold'} fontSize={17}>Products</Typography></ListItemText>
                    {productsOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={productsOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{
                            '&:hover': {
                                bgcolor: 'transparent'
                            },
                            '&:hover .MuiTouchRipple-root': {
                                display: 'none',
                            },
                            pl: 10
                        }}>
                            <Stack direction={'column'} spacing={4}>
                                <Link to={'/top-product'} style={{ textDecoration: 'none' }}> <ListItemText sx={{ color: 'black', }}><Typography sx={{ ":hover": { color: 'black' } }} fontWeight={'bold'} color={'#6E757f'} fontSize={15}>Top Products</Typography></ListItemText></Link>
                                <Link to={'/product-grid'} style={{ textDecoration: 'none' }}> <ListItemText sx={{ color: 'black' }}><Typography sx={{ ":hover": { color: 'black' } }} fontWeight={'bold'} color={'#6E757f'} fontSize={15}>Products Grid</Typography></ListItemText></Link>
                                <Link to={'/product-management'} style={{ textDecoration: 'none' }}> <ListItemText sx={{ color: 'black' }}><Typography sx={{ ":hover": { color: 'black' } }} fontWeight={'bold'} color={'#6E757f'} fontSize={15}>Products Management</Typography></ListItemText></Link>
                                <Link to={'/add-product'} style={{ textDecoration: 'none' }}><ListItemText sx={{ color: 'black' }}><Typography sx={{ ":hover": { color: 'black' } }} fontWeight={'bold'} color={'#6E757f'} fontSize={15}>Add Product</Typography></ListItemText></Link>
                            </Stack>
                        </ListItemButton>
                    </List>
                </Collapse>
                <ListItemButton>
                    <ListItemIcon>
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    <Link to={'/orders'} style={{ textDecoration: 'none' }}> <ListItemText sx={{ color: 'black' }}><Typography fontWeight={'bold'} fontSize={17}>Orders</Typography></ListItemText></Link>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <StarHalfIcon />
                    </ListItemIcon>
                    <Link to={'/reviews'} style={{ textDecoration: 'none' }}> <ListItemText sx={{ color: 'black' }}><Typography fontWeight={'bold'} fontSize={17}>Reviews</Typography></ListItemText></Link>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <AccountBalanceWalletIcon />
                    </ListItemIcon>
                    <Link to={'/transactions'} style={{ textDecoration: 'none' }}><ListItemText sx={{ color: 'black' }} ><Typography fontWeight={'bold'} fontSize={17}>Transaction</Typography></ListItemText></Link>
                </ListItemButton>
            </List>
        </>
    )
}

export default Sidebar