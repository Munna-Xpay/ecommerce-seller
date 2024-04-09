import { Avatar, Box, FormControl, IconButton, MenuItem, Pagination, Paper, Rating, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, tableCellClasses } from '@mui/material'
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { BASE_URL } from '../services/baseUrl';
import { useRecoilState } from 'recoil';
import { reviewState } from '../recoil/atoms/reviewStat';
import { getSellerReviewStat } from '../services/allApi';
import { sellerState } from '../recoil/atoms/sellerState';
import toast from 'react-hot-toast';

const AllReviews = () => {

    const [reviewStat, setReviewStat] = useRecoilState(reviewState)
    const [seller, setSeller] = useRecoilState(sellerState)
    console.log(reviewStat)
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const [sort, setSort] = useState('recent');

    const lastIndexOfItemInAPage = itemsPerPage * currentPage;
    const firstIndexOfItemInAPage = lastIndexOfItemInAPage - itemsPerPage;
    console.log(reviewStat.ratings)

    const handleChange = (e) => {
        setSort(e.target.value)
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        const reqHeader = {
            "Content-Type": "application/json",
            "user_token": `Bearer ${token}`
        }
        seller._id && getSellerReviewStat(seller?._id, reqHeader, sort).then(res => {
            console.log(res)
            setReviewStat(res.data)
        }).catch(err => {
            console.log(err)
            toast.error("Something went wrong!")
        })
    }, [sort, seller])

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const showAllReviews = reviewStat?.all_reviews?.slice(firstIndexOfItemInAPage, lastIndexOfItemInAPage).map((item) => {
        return (
            <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                    <Stack direction={'row'} spacing={5} py={2} alignItems={'center'}>
                        <Avatar sx={{ height: '80px', width: '80px' }} variant='rounded' src={`${BASE_URL}/uploadedFiles/${item.reviewFrom?.profileImage}`} />
                        <Stack>
                            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>{item.reviewFrom?.fullName}</Typography>
                            <Typography variant='subtitle1' color='primary' sx={{ fontWeight: 'bold' }}>{item.reviewFrom?.email}</Typography>
                        </Stack>
                    </Stack>
                </StyledTableCell>
                <StyledTableCell align="right">
                    <Stack direction={'row'} spacing={1} py={2} alignItems={'center'}>
                        <Rating value={item?.review_stars} precision={0.5} readOnly />
                        <Typography variant='h6' sx={{ fontWeight: 'bold', opacity: '.8' }}>{item?.review_stars}</Typography>
                    </Stack>
                </StyledTableCell>
                <StyledTableCell align="center">
                    <Box maxWidth={'550px'} p={2} sx={{ border: '1px solid #00000070', borderRadius: '10px', bgcolor: 'white' }}>
                        {item?.review}
                    </Box>
                </StyledTableCell>
                <StyledTableCell align="center">
                    <Stack direction={'row'} py={2} alignItems={'start'}>
                        <AccessTimeFilledIcon color='primary' />
                        <Stack alignItems={'start'}>
                            <Typography >{new Date(item.createdAt).toLocaleDateString()}</Typography>
                            <Typography sx={{ opacity: '.8' }}>{new Date(item.createdAt).toLocaleTimeString()}</Typography>
                        </Stack>
                    </Stack>
                </StyledTableCell>
                <StyledTableCell align="center"><IconButton><MoreVertIcon /></IconButton></StyledTableCell>
            </StyledTableRow>
        )
    })


    return (
        <>
            <Paper sx={{ marginTop: '30px' }}>
                <Stack direction={'row'} p={2} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Latest Reviews</Typography>
                    <Box>
                        <FormControl>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={sort}
                                sx={{ width: '200px' }}
                                onChange={handleChange}
                            >
                                <MenuItem value='recent'>Recent</MenuItem>
                                <MenuItem value='oldest'>Oldest</MenuItem>
                                <MenuItem value='highest_rating'>Highest rating</MenuItem>
                                <MenuItem value='lowest_rating'>Lowest rating</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Stack>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableBody>
                            {showAllReviews ? showAllReviews :
                                <Stack my={3} alignItems={'center'}>
                                    <Box component={'img'} width={250} src='https://cdni.iconscout.com/illustration/premium/thumb/folder-is-empty-4064360-3363921.png' />
                                    <Typography variant='h6' color={'secondary'}>Dont have any reviews to show !</Typography>
                                </Stack>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Pagination sx={{ margin: '30px 0px' }} count={Math.ceil(reviewStat?.allReviews?.length / itemsPerPage)} onChange={(e, pageNumber) => setCurrentPage(pageNumber)} color="primary" />
        </>
    )
}

export default AllReviews