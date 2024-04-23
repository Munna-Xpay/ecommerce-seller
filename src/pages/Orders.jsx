import React, { useEffect, useState } from 'react'
import { Pagination, FormControl, Table, TableBody, TableCell, TableContainer, TableHead, Paper, TableRow, Grid, MenuItem, Select, Stack, Typography, Rating, InputLabel, Box, } from '@mui/material'
import FactCheckIcon from '@mui/icons-material/FactCheck';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import PageHead from '../components/PageHead'
import CountUp from 'react-countup';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getOrdersBySeller, updateOrderBySeller } from '../services/allApi';
import { useRecoilState } from 'recoil';
import { sellerState } from '../recoil/atoms/sellerState';
import { orderState } from '../recoil/atoms/orderState';
import { BASE_URL } from '../services/baseUrl';
import toast, { Toaster } from 'react-hot-toast';

const Orders = ({ socket }) => {

    const [seller, setSeller] = useRecoilState(sellerState)
    const [orders, setOrders] = useRecoilState(orderState)
   // console.log(orders)
    const [sortData, setSortData] = useState({
        categoryFilter: "All",
        sort_option: "latest"
    })

    const [status, setStatus] = useState('')
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const getOrders = () => {
        const token = localStorage.getItem('token')
        const reqHeader = {
            "Content-Type": "application/json",
            "user_token": `Bearer ${token}`
        }
        getOrdersBySeller(seller?._id, reqHeader, sortData).then(res => {
            console.log(res)
            setOrders(res.data)
        }).catch(err => {
            toast.error("Failed to fetch orders")
        })
    }

    useEffect(() => {
        getOrders()
    }, [seller, sortData])

    const orderStatus1 = orders.filter((i) => i.orderStatus === 'Ordered')
    const orderStatus2 = orders.filter((i) => i.orderStatus === 'Confirmed')
    const orderStatus3 = orders.filter((i) => i.orderStatus === 'Canceled')
    const orderStatus4 = orders.filter((i) => i.orderStatus === 'Completed')
    const ordered = orderStatus1.length
    // console.log(ordered);
    const confirmed = orderStatus2.length
    const canceled = orderStatus3.length
    const completed = orderStatus4.length

    const lastIndexOfItemInAPage = itemsPerPage * currentPage;
    const firstIndexOfItemInAPage = lastIndexOfItemInAPage - itemsPerPage;

    const handleOrderUpdate = async (e, id, userId, title) => {
        const orderStatus = e.target.value
        try {
            const token = localStorage.getItem('token')
            const reqHeader = {
                "Content-Type": "application/json",
                "user_token": `Bearer ${token}`
            }
            const res = await updateOrderBySeller(id, reqHeader, { orderStatus })
            console.log(res)
            toast.success(res.data.message)
            getOrders()
            socket.emit("sendUpdate", { receiverId: userId, msg: `${title} has ${e.target.value}` })
        } catch (err) {
            console.log(err)
            toast.error("Failed to update order status")
        }
    }

    return (
        <Stack minHeight={'100vh'}>
            <PageHead heading={'Orders'} />
            <Stack mt={2}>
                <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={{ xs: 'center', md: 'end' }} spacing={3} sx={{ marginTop: { xs: 5, md: 0 } }}>
                    <FormControl size='small' sx={{ width: { xs: 380, md: 160 } }}>
                        <Select
                            sx={{ bgcolor: 'white' }}
                            value={sortData.categoryFilter}
                            onChange={(e) => setSortData({ ...sortData, ["categoryFilter"]: e.target.value })}
                        >
                            <MenuItem value={'All'}>All Products</MenuItem>
                            <MenuItem value={'Electronics'}>Electronics</MenuItem>
                            <MenuItem value={'Fashion'}>Fashion</MenuItem>
                            <MenuItem value={'Groceries'}>Groceries</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl size='small' sx={{ width: { xs: 380, md: 160 } }}>
                        <Select
                            sx={{ bgcolor: 'white' }}
                            value={sortData.sort_option}
                            onChange={(e) => setSortData({ ...sortData, ["sort_option"]: e.target.value })}
                        >
                            <MenuItem selected value={'latest'}>Latest</MenuItem>
                            <MenuItem selected value={'A-Z'}>By name: A-Z</MenuItem>
                            <MenuItem value={'Z-A'}>By name: Z-A</MenuItem>
                            <MenuItem value={'rating_low_to_high'}>Rating: Low to High</MenuItem>
                            <MenuItem value={'rating_high_to_low'}>Rating: High to Low</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </Stack>
            <Grid container mt={2}>
                <Grid item xs={12} md={2} boxShadow={5} p={2} mt={{ xs: 2, md: 0 }} bgcolor={'white'} borderRadius={2}>
                    <FactCheckIcon sx={{ backgroundColor: 'blue', borderRadius: '4px', color: 'white', padding: '7px' }} />
                    <Stack mt={3}>
                        <Typography fontSize={20} fontWeight={'bold'}>Ordered</Typography>

                        <Typography fontSize={30} fontWeight={'bold'}><CountUp end={ordered} /></Typography>

                    </Stack>
                </Grid>
                <Grid item xs={12} md={2} boxShadow={5} marginLeft={{ xs: 0, md: 2 }} bgcolor={'white'} p={2} mt={{ xs: 2, md: 0 }} borderRadius={2}>
                    <AssignmentTurnedInIcon sx={{ backgroundColor: 'green', borderRadius: '4px', color: 'white', padding: '7px' }} />
                    <Stack mt={3}>
                        <Typography fontSize={20} fontWeight={'bold'}>Orders Confirmed</Typography>
                        <Typography fontSize={30} fontWeight={'bold'}><CountUp end={confirmed} /></Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={2} boxShadow={5} marginLeft={{ xs: 0, md: 2 }} bgcolor={'white'} p={2} mt={{ xs: 2, md: 0 }} borderRadius={2}>
                    <DoDisturbIcon sx={{ backgroundColor: 'red', borderRadius: '4px', color: 'white', padding: '7px' }} />
                    <Stack mt={3}>
                        <Typography fontSize={20} fontWeight={'bold'}>Orders Canceled</Typography>
                        <Typography fontSize={30} fontWeight={'bold'}><CountUp end={canceled} /></Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={2} boxShadow={5} marginLeft={{ xs: 0, md: 2 }} bgcolor={'white'} p={2} mt={{ xs: 2, md: 0 }} borderRadius={2}>
                    <CheckCircleIcon sx={{ backgroundColor: '#035ecf', borderRadius: '4px', color: 'white', padding: '7px' }} />
                    <Stack mt={3}>
                        <Typography fontSize={20} fontWeight={'bold'}>Orders Completed</Typography>
                        <Typography fontSize={30} fontWeight={'bold'}><CountUp end={completed} /></Typography>
                    </Stack>
                </Grid>
            </Grid>
            {orders.length > 0 ?
                <TableContainer component={Paper} sx={{ marginTop: '15px' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {/* <TableCell sx={{ fontSize: '14px', color: '#035ECF' }}># ORDER</TableCell> */}
                                <TableCell sx={{ fontSize: '14px', color: '#035ECF' }}>PRODUCT</TableCell>
                                <TableCell sx={{ fontSize: '14px', color: '#035ECF' }}>CATEGORY</TableCell>
                                <TableCell sx={{ fontSize: '14px', color: '#035ECF' }}>PRICE</TableCell>
                                <TableCell sx={{ fontSize: '14px', color: '#035ECF' }}>ORDER DELIVERY</TableCell>
                                <TableCell sx={{ fontSize: '14px', color: '#035ECF' }}>ORDER STATUS</TableCell>
                                <TableCell sx={{ fontSize: '14px', color: '#035ECF' }}>ORDERED DATE</TableCell>
                                <TableCell sx={{ fontSize: '14px', color: '#035ECF' }}>RATING</TableCell>
                                <TableCell sx={{ fontSize: '14px', color: '#035ECF' }}>ACTIONS</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.slice(firstIndexOfItemInAPage, lastIndexOfItemInAPage).map((order, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {/* <Typography fontWeight={'bold'}>{order._id}</Typography> */}
                                    <TableCell component="th" scope="row">
                                        <Stack direction={'row'} width={'270px'}>
                                            <img width={70} height={55} style={{ objectFit: 'contain' }} src={`${BASE_URL}/uploadedFiles/${order?.products.product.thumbnail}`} alt="" />
                                            <Stack marginLeft={1}>
                                                <Typography fontWeight={'bold'}>{order.products.product.title}</Typography>
                                                <Typography fontSize={13} color={'gray'}>Regular Price: {order.products.product.original_price}</Typography>
                                                <Typography fontSize={13} color={'gray'}>Sale Price{order.products.product.discounted_price}</Typography>
                                            </Stack>
                                        </Stack>
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}> {order.products.product.category}</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>{order.totalPrice}</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>{order.shippingMethod}</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>
                                        <Stack spacing={1}>
                                            <Typography sx={{
                                                backgroundColor: (() => {
                                                    switch (order.orderStatus) {
                                                        case 'Ordered':
                                                            return '#f0ad4e';
                                                        case 'Confirmed':
                                                            return '#00ba9d';
                                                        case 'Canceled':
                                                            return 'red';
                                                        case 'Completed':
                                                            return '#035ecf';
                                                        case 'Shipped':
                                                            return '#f55505';
                                                        default:
                                                            return 'black';
                                                    }
                                                })(),
                                                borderRadius: '20px',
                                                color: 'white',
                                                width: '100px'
                                            }} p={1} textAlign={'center'}>{order.orderStatus}
                                            </Typography>
                                            {order.canceledReason && <Typography variant='body2' >(Reason : {order.canceledReason})</Typography>}
                                        </Stack>
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>
                                        <Stack>
                                            <Typography> {new Date(order.createdAt).toLocaleDateString('en-US')}</Typography>
                                            <Typography variant='body2'> {new Date(order.createdAt).toLocaleTimeString()}</Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}><Rating name="read-only" value={order.products.product.review_star} readOnly /></TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>
                                        <FormControl size='small' sx={{ width: { xs: 380, md: 160 } }}>
                                            <InputLabel id="demo-simple-select-label">Order Status</InputLabel>
                                            <Select
                                                value={order?.orderStatus}
                                                onChange={(e) => handleOrderUpdate(e, order._id, order.userId, order.products.product.title)}
                                            >
                                                <MenuItem value={'Ordered'}>Ordered</MenuItem>
                                                <MenuItem value={'Canceled'}>Order canceled</MenuItem>
                                                <MenuItem value={'Shipped'}>Order shipped</MenuItem>
                                                <MenuItem value={'Completed'}>Order Completed</MenuItem>
                                                <MenuItem value={'Refunded'}>Order refunded</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                :
                <Stack alignItems={'center'}>
                    <Box component={'img'} width={250} src='https://cdni.iconscout.com/illustration/premium/thumb/folder-is-empty-4064360-3363921.png' />
                    <Typography variant='h6' color={'secondary'}>Customers have not purchased any products yet !</Typography>
                </Stack>
            }
            {orders.length > 0 && <Pagination count={Math.ceil(orders.length / itemsPerPage)} onChange={(e, pageNumber) => setCurrentPage(pageNumber)} sx={{ margin: '30px 0px' }} color="primary" />}

            <Toaster />
        </Stack >
    )
}

export default Orders