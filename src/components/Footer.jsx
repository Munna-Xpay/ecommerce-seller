import React from 'react'
import { Box, Stack, Typography } from '@mui/material'


const Footer = () => {
    return (
        <>
            <Stack direction={{xs:'column',md:'row'}} alignItems={{xs:'center'}} justifyContent={{xs:'center',md:'space-between'}}>
   <Typography fontSize={10} color={'gray'}>Copyright @2024 By Shopify. All Rights Reserved</Typography>
   <Stack direction={'row'}>
    <Typography mt={1} fontSize={10} color={'gray'}>Powered by</Typography>
    <Box marginLeft={1}>
        <img width={36} height={26} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAaCAYAAAA9rOU8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARRSURBVHgB7VZdiFVVFF5r733OvXN/mjtGM1qaQ9gPw+CMRQ8pwUih4oxODhpYRFAUaZTNZM0wSE0k4oPS4FMYaJT2MKIQhRFDzBhpoJTzh0QlTVpQlmQEw/05Z6/WPvfHc8+9Z5rpqcDFPZzNXuv79rfW3nudC3DD/geG/xRwxzDVJjO6h4ePgYAEEF4kxIMT6/G9MMy9H9IyV+l+HrYRgBYAZx1H7J3qxAn4t2JaP6FG0jQCQI3+edK8giMGpjbhG0HMipPUpEmf5mHqOiCPQUc8Pd6Fh8LWEzCLkat3B4UYYo/c0QN3vZ+9P4hhIUfKhBRhjHEcvb/xMKVg3mKIkL2doX7OFDLyYNsAqeJU60fpO/m1ojqfSQ5StqNfgfmKaRwcrWWCRBix99LQeimpXyxNK9kwS7g3cHPQs3hPehnMR8z0S21/cmmvVnVi/kE0Zwd21fZRnZnORdX3YeE+TBRddcir/FzFMIovjX4n3M8/yW8JdTEBL5upC6vxFwadCgn3VjMYlPhgfb/bOXcxbJGI2scZXKtgNUIMMZ8WaZux3rFg28wS49ba7Ycw8YwRFj+2yQEHFz1LsTmLOfswXhWIr1fw+ohlBEDVQMKORQeNb6rDOsOvw9USECqPUVEPs1THoWfOYoydb5cHmGkkSG7K7ZEbYs5PRKir/gXnceMmJfo44lowAShWpiaPQVvvjG+nhaFizFX1X1djGnAgGOcJUoWSF8iFjbuatpA9sRavENG+ivhCdeR1TG08At0VYlqO5dY0H81+ceU2J/1TIpdZ2pc9vWR7vqlNtuPn3HSOlXEXDqO3VSxEJbz3Pb8tzJNPzIi9SDBegTEJRHwYW3fXPZdpLolpOZHrBaRPWfUqYZNkxUIlYaUr8Mv6J3NrvNJrb5G/qpGbTFWcn6TJWPcmn6eb4VF0CXR3sDrFrZK8vVYeY9kxdQS2kBTLj88s5u/PnhJ5IdAot5IcoPS7DU9QfHwD/syZHqgovQ9jtopF1UWtvIjxDmuEO8TJ0IrWFJKIQUv9re5WIbR8AIvbhYFAk2kCF5HMrDRuF8R+7qI/BslF4eyoArkVhfWlAEcOgK8JlwmySwmYG/aQcLPphopAq7CvhvgmgOgC9D5ukx34B1riGQgrfU1puyJF99hGPMcVfbuiotJ3+JPmhjkpoWpik1XJfYEyjt+WyNfiMDfCz8JK71UnQRf8fqnFa1yby9UwhT7FCVvnxPku6xTfuamKwOLBTODxH960y24FKf1qsPTguymYlG/5XV9txN/5guysqE6x70QhrSzxgXdWMOts4Gyng8Fg0ZjG3A4I2MQ6+2vk28W9xCnPlBxOoPfiU3gmiBlvV0Mcshsqq/Mrr7P5m204XfpyNg2RrSi9FaRc5SWqaTR1iz00uhodCLH7hul2J+Ou04h3M9ElncucmHokdhlmseUfZ5oFqs38dyjFpf1OZsXRsU3l3fqG/aftb1guW0J0Lo9gAAAAAElFTkSuQmCC" alt="" />
    </Box>
   </Stack>
        </Stack>
        </>
    )
}

export default Footer