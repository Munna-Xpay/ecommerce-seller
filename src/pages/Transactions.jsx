import { FormControl, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, Paper, TableRow, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PageHead from '../components/PageHead';
import { sellerState } from '../recoil/atoms/sellerState';
import { useRecoilState } from 'recoil';
import { getTransactions } from '../services/allApi';


function Transactions() {
  const [sort, setSort] = useState('recent')
  const [transactions, setTransactions] = useState([])
  const [seller, setSeller] = useRecoilState(sellerState)


  const fetchAllTransaction = async () => {
    const token = localStorage.getItem('token')
    const reqHeader = {
      "Content-Type": "application/json",
      "user_token": `Bearer ${token}`
    }
    const res = await getTransactions(sort, seller?._id, reqHeader);
    console.log(res)
    setTransactions(res.data)
  }

  useEffect(() => {
    seller._id && fetchAllTransaction()
  }, [seller, sort])

  const showAllTransactions = transactions.map((item) => {
    return (
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell sx={{ fontWeight: 'bold' }} component="th" scope="row"><Stack direction={'row'} spacing={1}> <><AccessTimeIcon /></><Stack><Typography fontSize={12}>{new Date(item?.createdAt).toLocaleDateString()}</Typography><Typography fontSize={10} color={'gray'}>at {new Date(item?.createdAt).toLocaleTimeString()}</Typography></Stack></Stack> </TableCell>
        <TableCell sx={{ fontWeight: 'bold' }}>{item.method}</TableCell>
        <TableCell sx={{ fontWeight: 'bold' }}>{item.type}</TableCell>
        <TableCell sx={{ fontWeight: 'bold' }}><Typography sx={{ backgroundColor: '#035ecf', borderRadius: '20px', color: 'white', width: '100px' }} p={1} textAlign={'center'}>{item.status}</Typography></TableCell>
        <TableCell sx={{ fontWeight: 'bold' }}>{item.country}</TableCell>
        <TableCell sx={{ fontWeight: 'bold' }}>{item.currency}</TableCell>
        <TableCell sx={{ fontWeight: 'bold' }}>₹ {item?.products?.product?.discounted_price}</TableCell>
      </TableRow>
    )
  })

  return (
    <Stack minHeight={'100vh'}>
      <PageHead heading='Transactions' />
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={{ xs: 'center', md: 'end' }} sx={{ marginTop: { xs: 5, md: 2 } }}>
        <FormControl size='small' sx={{ width: { xs: 379, md: 200 } }}>
          <Typography>View transactions : 6/12</Typography>
          <Select
            value={sort}
            sx={{ bgcolor: 'white' }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            InputProps={{ style: { borderRadius: '7px' } }}
            onChange={(e) => setSort(e.target.value)}
          >
            <MenuItem value={'recent'}>Recent</MenuItem>
            <MenuItem value={'oldest'}>Oldest</MenuItem>
            <MenuItem value={'amount_low_to_high'}>Amount : Low to High</MenuItem>
            <MenuItem value={'amount_high_to_low'}>Amount : High to Low</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <TableContainer sx={{ marginTop: '10px' }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '14px', color: '#035ECF' }}>DATE & TIME</TableCell>
              <TableCell sx={{ fontSize: '14px', color: '#035ECF' }}>METHOD</TableCell>
              <TableCell sx={{ fontSize: '14px', color: '#035ECF' }}>TYPE</TableCell>
              <TableCell sx={{ fontSize: '14px', color: '#035ECF' }}>STATUS</TableCell>
              <TableCell sx={{ fontSize: '14px', color: '#035ECF' }}>COUNTRY</TableCell>
              <TableCell sx={{ fontSize: '14px', color: '#035ECF' }}>CURR</TableCell>
              <TableCell sx={{ fontSize: '14px', color: '#035ECF' }}>AMOUNT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showAllTransactions}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}

export default Transactions