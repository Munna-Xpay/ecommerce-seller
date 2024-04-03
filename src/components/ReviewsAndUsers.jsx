import React, { useEffect } from 'react'
import { Avatar, Grid, LinearProgress, Paper, Rating, Stack, Typography } from '@mui/material'
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import StarIcon from '@mui/icons-material/Star';
import { useRecoilState } from 'recoil';
import { reviewState } from '../recoil/atoms/reviewStat';
import { sellerState } from '../recoil/atoms/sellerState';
import { getSellerReviewStat } from '../services/allApi';
import toast from 'react-hot-toast';

const ReviewsAndUsers = () => {

    const [reviewStat, setReviewStat] = useRecoilState(reviewState)
    const [seller, setSeller] = useRecoilState(sellerState)
    console.log(reviewStat)
    const rating = reviewStat?.avg_review?.toFixed(1)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const reqHeader = {
            "Content-Type": "application/json",
            "user_token": `Bearer ${token}`
        }
        seller._id && getSellerReviewStat(seller?._id, reqHeader).then(res => {
            console.log(res)
            setReviewStat(res.data)
        }).catch(err => {
            console.log(err)
            toast.error("Something went wrong!")
        })
    }, [seller])

    return (
        <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md={2}>
                <Paper>
                    <Stack p={2} spacing={1} height={'170px'} justifyContent={'center'} alignItems={'center'}>
                        <Rating precision={0.5} readOnly value={reviewStat?.avg_review?.toFixed(1)} />
                        <Typography variant='h4' sx={{ fontWeight: 'bold' }} >{reviewStat?.avg_review?.toFixed(1)}</Typography>
                        <Typography variant='h6' sx={{ fontWeight: 'bold' }} >Review Score</Typography>
                    </Stack>
                </Paper>
            </Grid>
            <Grid item xs={12} md={2}>
                <Paper>
                    <Stack p={2} spacing={1} height={'170px'} justifyContent={'center'} alignItems={'center'}>
                        <Avatar sx={{ bgcolor: '#00ba9d' }} variant='rounded'><GroupIcon /></Avatar>
                        <Typography variant='h4' sx={{ fontWeight: 'bold' }} >{reviewStat?.total_rating}</Typography>
                        <Typography variant='h6' sx={{ fontWeight: 'bold' }} >Total</Typography>
                    </Stack>
                </Paper>
            </Grid>
            <Grid item xs={12} md={2}>
                <Paper>
                    <Stack p={2} spacing={1} height={'170px'} justifyContent={'center'} alignItems={'center'}>
                        <Avatar sx={{ bgcolor: '#035ecf' }} variant='rounded'><PersonAddIcon /></Avatar>
                        <Typography variant='h4' sx={{ fontWeight: 'bold' }} >26%</Typography>
                        <Typography variant='h6' sx={{ fontWeight: 'bold' }} >New</Typography>
                    </Stack>
                </Paper>
            </Grid>
            <Grid item xs={12} md={2}>
                <Paper>
                    <Stack p={2} spacing={1} height={'170px'} justifyContent={'center'} alignItems={'center'}>
                        <Avatar sx={{ bgcolor: '#ff5470' }} variant='rounded'><Diversity3Icon /></Avatar>
                        <Typography variant='h4' sx={{ fontWeight: 'bold' }} >73%</Typography>
                        <Typography variant='h6' sx={{ fontWeight: 'bold' }} >Regular </Typography>
                    </Stack>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} >
                <Paper>
                    <Stack p={2} spacing={1} height={'170px'} justifyContent={'center'} alignItems={'center'}>
                        {reviewStat?.rating_stat?.map(item => (
                            item.star && <Stack width={'100%'} spacing={1} direction={'row'} alignItems={'center'}>
                                <Stack direction={'row'} alignItems={'center'}>
                                    <Typography sx={{ fontWeight: 'bold' }}>{item.star}</Typography>
                                    <StarIcon color='warning' />
                                </Stack>
                                <LinearProgress sx={{ flex: '1', height: '10px', borderRadius: '50px' }} color='warning' value={Math.floor((item.total_rating / reviewStat?.total_rating) * 100)} fourColor variant="determinate" />
                                <Typography sx={{ fontWeight: 'bold' }}>{Math.floor((item.total_rating / reviewStat?.total_rating) * 100)}%</Typography>
                            </Stack>
                        ))
                        }
                    </Stack>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default ReviewsAndUsers