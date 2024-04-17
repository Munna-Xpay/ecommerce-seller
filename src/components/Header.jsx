import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Sidebar from '../components/Sidebar'
import { Avatar, Button, Drawer, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getResponseNotifications, sellerById } from '../services/allApi';
import { sellerState } from '../recoil/atoms/sellerState';
import { BASE_URL } from '../services/baseUrl';
import Notifications from './Notifications';
import { notificationState } from '../recoil/atoms/notificationState';
import toast, { Toaster } from 'react-hot-toast';


export default function PrimarySearchAppBar({ socket }) {

    const navigate = useNavigate()
    const [seller, setSeller] = useRecoilState(sellerState)
    const [notifications, setNotifications] = useRecoilState(notificationState)
    console.log(seller)
    const [drawer, setDrawer] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [open, setOpen] = useState(false);
    const [notifyMsg, setNotifyMsg] = useState("")

    useEffect(() => {
        socket?.on("getNotify", (msg) => {
            setNotifyMsg(msg)
            // console.log(msg)
        })
        socket?.on("getNotifyCheckout", (msg) => {
            //console.log(msg);
            setNotifyMsg(msg)
        })
        socket?.on("getCancelOrder", (msg) => {
            //console.log(msg);
            setNotifyMsg(msg)
        })
    }, [socket])

    useEffect(() => {
        notifyMsg && toast.success(notifyMsg, { duration: 5000 })
    }, [notifyMsg])


    const toggleDrawer = (isOpen) => () => {
        setOpen(isOpen);
    };



    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };


    useEffect(() => {
        const token = localStorage.getItem('token')
        const sellerId = localStorage.getItem('sellerId')
        if (!seller?._id && token) {
            const reqHeader = {
                "Content-Type": "application/json",
                "user_token": `Bearer ${token}`
            }
            sellerById(sellerId, reqHeader).then(res => {
                setSeller(res.data)
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        }
        else if (!token) {
            navigate('/')
        }
    }, [seller])

    useEffect(() => {
        const token = localStorage.getItem('token')
        const reqHeader = {
            "Content-Type": "application/json",
            "user_token": `Bearer ${token}`
        }
        seller && getResponseNotifications(seller._id, reqHeader).then(res => {
            console.log(res)
            setNotifications(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [seller])

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            {/* <MenuItem onClick={toggleDrawer(true)}>
                <IconButton

                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={notifications.length} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem> */}
            <Link to={'/profile'} style={{ color: 'black', textDecoration: 'none' }}>
                <MenuItem >
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
            </Link>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ height: '80px' }}>
                    {/* {admin.admin && */}
                    <Box display={{ xs: 'block', md: 'none' }}>
                        <IconButton

                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: { xs: 0, md: 5 } }}
                            onClick={() => setDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    {/* } */}
                    <Stack direction={'row'} spacing={1}>
                        <img width={40} height={40} src="https://shop-point.merku.love/assets/logo_light-33bb10d5.svg" alt="" />
                        <Typography fontSize={30} fontWeight={'bold'} color={'white'}>Shop Point</Typography>
                    </Stack>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {seller._id ?
                            <>
                                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                    <Badge badgeContent={4} color="error">
                                        <MailIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton
                                    onClick={toggleDrawer(true)}
                                    size="large"
                                    aria-label="show 17 new notifications"
                                    color="inherit"
                                >
                                    <Badge badgeContent={0} color="error">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                                <Link to={'/profile'} style={{ color: 'white' }}>
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        color="inherit"
                                    >
                                        <Avatar sx={{ width: '40px', height: '40px' }} src={`${BASE_URL}/uploadedFiles/${seller?.company_icon}`} />
                                        {/* <AccountCircle /> */}
                                    </IconButton></Link>
                            </> : <Link to={'/'}>
                                <Button variant='text' sx={{ color: '#efefef' }}>Login</Button>
                            </Link>
                        }
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            <Drawer
                anchor='left'
                open={drawer}
                onClose={() => setDrawer(false)}
            >
                <Sidebar setDrawer={setDrawer} />
            </Drawer>


            <Drawer
                anchor='right'
                open={open}
                onClose={toggleDrawer(false)}
            >
                <Notifications />
            </Drawer>
            <Toaster />
        </Box>
    );
}