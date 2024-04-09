import { Autocomplete, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { countries } from '../countryDatas'
import toast, { Toaster } from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import { sellerState } from '../recoil/atoms/sellerState';
import { sellerPasswordSchema, sellerSchema } from '../formValidation/sellerSchema';
import { updateSeller, updateSellerPassword } from '../services/allApi';

const SellerProfileEditBox = () => {

    const [seller, setSeller] = useRecoilState(sellerState)
    const [sellerData, setSellerData] = useState({})
    const [errors, setErrors] = useState({})
    const [updatePassword, setUpdatePassword] = useState("")

    useEffect(() => {
        if (seller) {
            setSellerData(seller)
        }
    }, [seller])

    const updateAdminProfile = async () => {
        console.log(sellerData)
        try {
            sellerData.zipCode == null ? await sellerSchema.validate({ ...sellerData, zipCode: 100000 }, { abortEarly: false }) : await sellerSchema.validate(sellerData, { abortEarly: false })
            const { _id, __v, ...others } = sellerData
            console.log(others)
            const token = localStorage.getItem('token')
            const reqHeader = {
                "Content-Type": "application/json",
                "user_token": `Bearer ${token}`
            }
            const res = await updateSeller(_id, reqHeader, others)
            if (res.status == 200) {
                console.log(res)
                setSeller(res.data)
                setSellerData(seller)
                setErrors({})
                toast.success("Seller updated successfully")
            } else {
                console.log(res)
                toast.error(res.response.data)
                setErrors({})
            }
        } catch (err) {
            console.log(err)
            const newErrors = {};
            err.inner.forEach((error) => {
                newErrors[error.path] = error.message;
            });
            setErrors(newErrors);
            console.log(newErrors)
        }

    }

    const handleUpdatePassword = async () => {
        try {
            await sellerPasswordSchema.validate({ updatePassword }, { abortEarly: false })
            const token = localStorage.getItem('token')
            const reqHeader = {
                "Content-Type": "application/json",
                "user_token": `Bearer ${token}`
            }
            const res = await updateSellerPassword(seller._id, reqHeader, { password: updatePassword })
            if (res.status == 200) {
                console.log(res)
                setSeller(res.data)
                setErrors({})
                toast.success("Password updated successfully")
            } else {
                console.log(res)
                toast.error(res.response.data)
                setErrors({})
            }
        } catch (err) {
            console.log(err.message)
            const newErrors = {};
            err.inner.forEach((error) => {
                newErrors[error.path] = error.message;
            });
            setErrors(newErrors);
            console.log(newErrors)
        }
    }

    return (
        <Paper>
            <Stack p={2} spacing={2}>
                <Typography variant='h6' sx={{ fontWeight: 'bold', opacity: '.9' }} >My Profile Details</Typography>
                <Grid container spacing={2} pr={3}>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={4}>
                            <TextField error={errors.company_name} helperText={errors.company_name} value={seller && sellerData?.company_name} onChange={(e) => setSellerData({ ...sellerData, company_name: e.target.value })} InputLabelProps={{ shrink: true }} InputProps={{ disableUnderline: true, style: { borderRadius: '7px' } }} fullWidth label="Name" variant="filled" />
                            <TextField error={errors.email} helperText={errors.email} value={seller && sellerData?.email} onChange={(e) => setSellerData({ ...sellerData, email: e.target.value })} InputLabelProps={{ shrink: true }} InputProps={{ disableUnderline: true, style: { borderRadius: '7px' } }} fullWidth label="Email" variant="filled" />
                            <TextField error={errors.phoneNum} helperText={errors.phoneNum} value={seller && sellerData?.phoneNum ? sellerData?.phoneNum : null} onChange={(e) => setSellerData({ ...sellerData, phoneNum: e.target.value })} type='number' InputLabelProps={{ shrink: true }} InputProps={{ disableUnderline: true, style: { borderRadius: '7px' } }} fullWidth label="Phone Number" variant="filled" />
                            <TextField value={seller && sellerData?.website} onChange={(e) => setSellerData({ ...sellerData, website: e.target.value })} InputLabelProps={{ shrink: true }} InputProps={{ disableUnderline: true, style: { borderRadius: '7px' } }} fullWidth label="Website" variant="filled" />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={4}>
                            <TextField
                                value={seller && sellerData?.address ? sellerData?.address : ""}
                                onChange={(e) => setSellerData({ ...sellerData, address: e.target.value })}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{ disableUnderline: true, style: { borderRadius: '7px' } }}
                                fullWidth
                                label="Street Address"
                                type='text'
                                variant="filled" />
                            <TextField error={errors.zipCode} helperText={errors.zipCode} value={seller && sellerData?.zipCode ? sellerData?.zipCode : ""} onChange={(e) => setSellerData({ ...sellerData, zipCode: e.target.value })} InputLabelProps={{ shrink: true }} InputProps={{ disableUnderline: true, style: { borderRadius: '7px' } }} fullWidth label="Zip Code" variant="filled" />
                            <TextField value={seller && sellerData?.city ? sellerData?.city : null} onChange={(e) => setSellerData({ ...sellerData, city: e.target.value })} InputLabelProps={{ shrink: true }} InputProps={{ disableUnderline: true, style: { borderRadius: '7px' } }} fullWidth label="City" type='text' variant="filled" />
                            <Autocomplete
                                onChange={(e, newVal) => setSellerData({ ...sellerData, country: newVal })}
                                value={seller && sellerData?.country ? sellerData?.country : ""}
                                style={{ borderRadius: '7px' }}
                                id="country-select-demo"
                                sx={{ backgroundColor: '#edf2ef' }}
                                fullWidth
                                options={countries.map(country => country.label)}
                                autoHighlight
                                renderInput={(params) => (
                                    <TextField

                                        {...params}
                                        label="Choose a country"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                    />
                                )}
                            />
                        </Stack>
                    </Grid>
                </Grid>
                <Stack justifyContent={'flex-end'} direction={{ md: 'row', xs: 'column' }} px={1}>
                    <Button onClick={updateAdminProfile} variant='contained' color='success' size='large' >Update Informations</Button>
                </Stack>
                <Stack direction={'row'} px={2} spacing={1}>
                    <TextField error={errors.updatePassword} helperText={errors.updatePassword} value={updatePassword} onChange={(e) => setUpdatePassword(e.target.value)} fullWidth InputLabelProps={{ shrink: true }} InputProps={{ disableUnderline: true, style: { borderRadius: '7px' } }} type='password' label="Update Your Password Here" variant="filled" />
                    <Button onClick={handleUpdatePassword} variant='outlined' size='small' sx={{ width: '250px' }}>Update Password</Button>
                </Stack>
            </Stack>
        </Paper >
    )
}

export default SellerProfileEditBox