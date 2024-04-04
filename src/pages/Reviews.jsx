import React, { useEffect } from 'react'
import PageHead from '../components/PageHead'
import AllReviews from '../components/AllReviews'
import ReviewsAndUsers from '../components/ReviewsAndUsers'
import toast, { Toaster } from 'react-hot-toast'
import { getSellerReviewStat } from '../services/allApi'
import { useRecoilState } from 'recoil'
import { reviewState } from '../recoil/atoms/reviewStat'
import { sellerState } from '../recoil/atoms/sellerState'

const Reviews = () => {

    const [reviewStat, setReviewStat] = useRecoilState(reviewState)
    const [seller, setSeller] = useRecoilState(sellerState)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const reqHeader = {
            "Content-Type": "application/json",
            "user_token": `Bearer ${token}`
        }
        seller._id && getSellerReviewStat(seller?._id, reqHeader, '').then(res => {
            console.log(res)
            setReviewStat(res.data)
        }).catch(err => {
            console.log(err)
            toast.error("Something went wrong!")
        })
    }, [seller])

    return (
        <>
            <PageHead heading='Reviews' />
            <ReviewsAndUsers />
            <AllReviews />
            <Toaster />
        </>
    )
}

export default Reviews