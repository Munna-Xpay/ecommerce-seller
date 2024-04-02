import React, { useEffect, useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Divider, FilledInput, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, Stack, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { sellerLogin } from '../services/allApi';
import { sellerLoginValidation } from '../formValidation/sellerLoginValidation';

const Login = () => {

    const admin = false
    const navigate = useNavigate()
    const [errors, setErrors] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = (field) => {
        if (field === 'password') {
            setShowPassword(!showPassword);
        }
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const [sellerData, setSellerData] = useState({
        email: "",
        password: ""
    })

    const setInputs = (e) => {
        const { value, name } = e.target
        setSellerData({ ...sellerData, [name]: value })
    }

    //login func
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await sellerLoginValidation.validate(sellerData, { abortEarly: false })
            const res = await sellerLogin(sellerData)
            setErrors({})
        }
        catch (err) {
            console.log(err);
            const newErrors = {};
            err.inner.map((validationError) => {
                newErrors[validationError.path] = validationError.message;
            });
            setErrors(newErrors);
        }
    }


    useEffect(() => {
        if (admin) {
            navigate('/sales-analytics')
        }
    }, [admin])

    return (
        <>
            <Stack style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)),url(https://www.goalcast.com/wp-content/uploads/2022/07/Goalcast-44-1-1100x610.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} justifyContent={'center'} alignItems={'center'} sx={{ width: '100%', minHeight: '85vh', marginBottom: '40px' }}>
                <Stack sx={{
                    width: {
                        xs: 300,
                        md: 350
                    },
                    bgcolor: 'white'
                }} spacing={3} borderRadius={5} padding={4} mt={5} boxShadow={15}>
                    <Box>
                        <TextField onChange={(e) => setInputs(e)} value={sellerData.email} name='email' InputProps={{ disableUnderline: true, style: { borderRadius: '7px' } }} sx={{ width: { xs: 300, md: 350 } }} label="Email Address" variant="filled" />
                        <FormHelperText sx={{ color: 'red' }}>{errors.email}</FormHelperText>
                    </Box>
                    <FormControl sx={{ width: '25ch' }} variant="filled">
                        <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                        <FilledInput
                            style={{ borderRadius: '7px' }}
                            disableUnderline
                            sx={{
                                width: {
                                    xs: 300,
                                    md: 350
                                }
                            }}
                            onChange={(e) => setInputs(e)}
                            value={sellerData.password}
                            name='password'
                            id="filled-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => handleClickShowPassword('password')}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText sx={{ color: 'red', marginX: '0px' }}>{errors.password}</FormHelperText>
                    </FormControl>

                    <Box textAlign={'end'}>
                        <Typography fontSize={14}>Forgot Password?</Typography>
                    </Box>
                    <Button
                        onClick={(e) => handleLogin(e)}
                        sx={{
                            padding: "10px",
                            borderRadius: "10px",
                            backgroundColor: "#03111c",
                            "&:hover": { backgroundColor: "#03111c" },
                        }}
                        disableElevation
                        variant="contained"
                    >
                        Login
                    </Button>


                    <Divider><Typography fontSize={13} color={'gray'}>or continue with</Typography></Divider>

                    <Stack direction={'row'} spacing={2} justifyContent={'center'}>
                        <Button sx={{ width: '90px', border: '1px solid', borderColor: 'gray', borderRadius: '7px' }} variant='filled' disableElevation>
                            <svg style={{ marginBottom: '2px', marginRight: '5px' }} xmlns="http://www.w3.org/2000/svg" width="1.5em" height="2em" viewBox="0 0 256 262"><path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path><path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path><path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"></path><path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path></svg>
                        </Button>
                        <Button sx={{ width: '90px', border: '1px solid', borderColor: 'gray', borderRadius: '7px' }} variant='filled' disableElevation>
                            <svg style={{ marginBottom: '2px', marginRight: '5px' }} xmlns="http://www.w3.org/2000/svg" width="1.5em" height="2em" viewBox="0 0 128 128"><rect width={118.35} height={118.35} x={4.83} y={4.83} fill="#3d5a98" rx={6.53} ry={6.53}></rect><path fill="#fff" d="M86.48 123.17V77.34h15.38l2.3-17.86H86.48v-11.4c0-5.17 1.44-8.7 8.85-8.7h9.46v-16A126.56 126.56 0 0 0 91 22.7c-13.62 0-23 8.3-23 23.61v13.17H52.62v17.86H68v45.83z"></path></svg>

                        </Button>
                    </Stack>
                </Stack>
                <Toaster position="top-center"
                    reverseOrder={false}
                    containerStyle={{
                        padding: '10px',
                        fontSize: '17px',
                        fontFamily: 'sans-serif',


                    }}
                />
            </Stack>
        </>
    )
}

export default Login