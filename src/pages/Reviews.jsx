import React from 'react'
import PageHead from '../components/PageHead'
import AllReviews from '../components/AllReviews'
import ReviewsAndUsers from '../components/ReviewsAndUsers'
import { Toaster } from 'react-hot-toast'

const Reviews = () => {
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