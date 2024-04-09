import { Avatar, Box, Button, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../services/baseUrl'
import { useRecoilState } from 'recoil'
import { notificationState } from '../recoil/atoms/notificationState'

const Notifications = () => {

    const navigate = useNavigate()
    const [notifications, setNotifications] = useRecoilState(notificationState)
    console.log(notifications)

    const showAllNotifications = notifications.map((item, index) => {
        return (
            <Stack spacing={3} mb={2}>
                <Stack direction={'row'} spacing={2}>
                    <Avatar sx={{ width: '40px', height: '40px' }} variant='rounded'>AD</Avatar>
                    <Stack>
                        <Typography sx={{ fontWeight: 'bold' }} gutterBottom>Admin</Typography>
                        <Stack direction={'row'} spacing={1} alignItems={'center'}>
                            <Typography sx={{ opacity: '.7' }}>{new Date(item?.updatedAt).toDateString()}</Typography>
                            <Box sx={{ width: '17px', height: '17px', borderRadius: '50%', bgcolor: '#00000070' }} />
                            <Typography sx={{ opacity: '.7' }}>{item?.type}</Typography>
                        </Stack>
                        <Typography variant='body2' sx={{ opacity: '.7' }}>{new Date(item?.updatedAt).toLocaleTimeString()}</Typography>
                        {!item.response ?
                            <Typography color={'primary'} sx={{ fontWeight: 'bold' }}>- Waiting for response</Typography>
                            :
                            <Typography color={'secondary'} sx={{ fontWeight: 'bold' }}>- {item.response} by admin</Typography>
                        }
                    </Stack>
                </Stack>
                <Divider />
            </Stack>
        )
    })

    return (
        <Stack p={2} spacing={2} width={{ xs: '250px', md: 300 }}>
            <Typography gutterBottom variant='h5' sx={{ fontWeight: 'bold' }}>Notifications</Typography>
            <Divider />
            {showAllNotifications.length > 0
                ?
                showAllNotifications
                :
                <Typography color={'secondary'}>Notification is empty !</Typography>
            }
        </Stack>
    )
}

export default Notifications