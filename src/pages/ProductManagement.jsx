
import { Box, Paper, InputBase, IconButton, Divider, Button, Stack, Typography, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, FormControl, InputLabel, Pagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import PageHead from '../components/PageHead'
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import { useRecoilState } from 'recoil';
import { productsManagement } from '../recoil/atoms/productState';
import { getProductsInProductsManagement } from '../services/allApi';

function ProductManagement() {
   const [products,setProducts]=useRecoilState(productsManagement)
    //console.log(products);
    const navigate=useNavigate()
    const [filter, setFilter] = useState({
      categoryFilter: '',
      stockFilter: '',
      productTypeFilter: '',
      additionalOption: ''
    })
   // console.log(filter);
    const [searchData, setSearchData] = useState('')
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    

    //handle apply filter
    const handleApply =async () => {
        const token = localStorage.getItem('token')
        const reqHeader = {
            "Content-Type": "application/json",
            "user_token": `Bearer ${token}`
        }
    const result=await getProductsInProductsManagement(filter,searchData,reqHeader)
    //console.log(result);
    setProducts(result.data)
    }
    //handle clear
    const handleClear = () => {
      setFilter({
        categoryFilter: '',
        stockFilter: '',
        productTypeFilter: '',
        additionalOption: ''
      });
      handleApply()
    }
  
    //handle search
    const handleSearch = (e) => {
      const { value } = e.target;
      setSearchData(value);
    }
  
      //handle edit
      const handleEdit=(id)=>{
        navigate(`/edit-product/${id}`)
      }
  
    const lastIndexOfItemInAPage = itemsPerPage * currentPage;
    const firstIndexOfItemInAPage = lastIndexOfItemInAPage - itemsPerPage;
  
    useEffect(() => {
    handleApply()
    }, [searchData])
  return (
    <Box height={'90vh'}>
    <PageHead heading={'Products Management'} />
    <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'} mt={2} spacing={{ xs: 2, md: 0 }}>
      <Link to={'/add-product'}> <Button sx={{ marginTop: '15px', backgroundColor: 'green', color: 'white', '&:hover': { backgroundColor: 'green' }, width: { xs: 380, md: 200 }, borderRadius: '20px', padding: '10px' }}>
        Add new product
      </Button>   </Link>
      <Paper
        component="form"
        sx={{ display: 'flex', alignItems: 'center', width: { xs: 380, md: 300 } }}
      >
        <InputBase
          onChange={(e) => handleSearch(e)}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Product"

        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>

      </Paper>
    </Stack>
    <Stack direction={'row'} mt={2}>
      <Typography fontSize={14} fontWeight={'bold'}>Products : All <span style={{ fontWeight: 'normal' }}>{products.length}</span></Typography>
      <Divider sx={{ height: 17, m: 0.5, backgroundColor:'black'}} orientation="vertical" />
       <Typography fontSize={14} fontWeight={'bold'}>Trash : <span style={{ fontWeight: 'normal' }}>{products.filter(product => !product.isActive).length}</span></Typography>
    </Stack>
    <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={'space-evenly'} spacing={2} mt={2} mb={2}>
      <FormControl size='small' sx={{ width: { xs: 379, md: 200 } }}>
        <InputLabel id="demo-simple-select-label">Stock</InputLabel>
        <Select
          value={filter.stockFilter}
          onChange={(e) => setFilter({ ...filter, ["stockFilter"]: e.target.value })}
          sx={{  bgcolor:'white'}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
       
        >
          <MenuItem value={'In stock'}>In stock</MenuItem>
          <MenuItem value={'Low inventory'}>Low Inventory</MenuItem>
          <MenuItem value={'Out of stock'}>Out of Stock</MenuItem>
          <MenuItem value={'On demand'}>On Demand</MenuItem>
          <MenuItem value={'Temporarily unavailable'}>Temporarily Unavailable</MenuItem>
        </Select>
      </FormControl>

      <FormControl size='small' sx={{ width: { xs: 379, md: 200 } }}>
        <InputLabel id="demo-simple-select-label">Product Category</InputLabel>
        <Select
          value={filter.categoryFilter}
          onChange={(e) => setFilter({ ...filter, ["categoryFilter"]: e.target.value })}
          sx={{  bgcolor:'white' }}
          InputProps={{ style: { borderRadius: '7px' } }}
        >
          <MenuItem value={'Electronics'}>Electronics</MenuItem>
          <MenuItem value={'Fashion'}>Fashion</MenuItem>
          <MenuItem value={'Groceries'}>Groceries</MenuItem>
        </Select>
      </FormControl>

      <FormControl size='small' sx={{ width: { xs: 379, md: 200 } }}>
        <InputLabel id="demo-simple-select-label">Product Type</InputLabel>

        <Select
        
          sx={{  bgcolor:'white' }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter.productTypeFilter}
          onChange={(e) => setFilter({ ...filter, ["productTypeFilter"]: e.target.value })}
        >
          <MenuItem value={'Simple Product'}>Simple Product</MenuItem>
          <MenuItem value={'Variable Product'}>Variable Product</MenuItem>
          <MenuItem value={'Grouped Product'}>Grouped Product</MenuItem>
        </Select>
      </FormControl>

      <FormControl size='small' sx={{ width: { xs: 379, md: 200 } }}>
        <InputLabel id="demo-simple-select-label">Additional Options</InputLabel>
        <Select
          value={filter.additionalOption}
          onChange={(e) => setFilter({ ...filter, ["additionalOption"]: e.target.value })}
          sx={{  bgcolor:'white' }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          InputProps={{ style: { borderRadius: '7px' } }}
        >
          <MenuItem value={'last_modified'}>Last Modified</MenuItem>
          <MenuItem value={'date_added'}>Date Added</MenuItem>
          <MenuItem value={'rating_low_to_high'}>Rating : Low to High</MenuItem>
          <MenuItem value={"rating_high_to_low"}>Rating : High to Low</MenuItem>
        </Select>
      </FormControl>
      <Stack direction={'row'} spacing={2}>
        <Button onClick={() => handleApply()} sx={{ backgroundColor: '#035ecf', color: 'white', '&:hover': { backgroundColor: '#035ecf' }, width: '100px', borderRadius: '30px', }}>
          <Typography mt={0.3}>Apply</Typography><KeyboardArrowRightIcon />
        </Button>
        <Button onClick={handleClear} variant='outlined' sx={{ backgroundColor: 'white', color: '#035ecf', '&:hover': { backgroundColor: '#035ecf', color: 'white' }, width: '100px', borderRadius: '30px' }}>
          Clear
        </Button>
      </Stack>
    </Stack>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" >
        <TableHead>
          <TableRow>
            {/* <TableCell><CollectionsIcon/></TableCell> */}
            <TableCell sx={{ fontSize: '14px', color: '#035ECF' }}>PRODUCT NAME</TableCell>
            <TableCell sx={{ fontSize: '14px', color: '#035ECF' }} >STOCK</TableCell>
            <TableCell sx={{ fontSize: '14px', color: '#035ECF' }} >PRICE</TableCell>
            <TableCell sx={{ fontSize: '14px', color: '#035ECF' }}>CATEGORY</TableCell>
            <TableCell sx={{ fontSize: '14px', color: '#035ECF' }} >BRAND</TableCell>
            <TableCell sx={{ fontSize: '14px', color: '#035ECF' }} >RATING</TableCell>
            <TableCell sx={{ fontSize: '14px', color: '#035ECF' }} >LAST MODIFIED</TableCell>
            <TableCell sx={{ fontSize: '14px', color: '#035ECF' }} >ACTIONS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.slice(firstIndexOfItemInAPage, lastIndexOfItemInAPage).map((i, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* <TableCell align="right">{i.thumbnail}</TableCell> */}
              <TableCell sx={{ fontWeight: 'bold',color:(i.isActive===false?'red':'black')}} component="th" scope="row">
                {i.title}
              </TableCell>
              <TableCell  sx={{ fontWeight: 'bold', color: (i.stock === 'Low inventory' || i.stock === 'Out of stock') ? 'red' : (i.isActive ? 'black' : 'red') }} >{i.stock}<span style={{ fontSize: '11px' }}>({i.stockQuantity})</span> </TableCell>
              <TableCell sx={{ fontWeight: 'bold',color:(i.isActive===false?'red':'black')}} >{i.discounted_price}</TableCell>
              <TableCell sx={{ fontWeight: 'bold',color:(i.isActive===false?'red':'black')}} >{i.category}</TableCell>
              <TableCell sx={{ fontWeight: 'bold',color:(i.isActive===false?'red':'black')}} >{i.manufacturer}</TableCell>
              <TableCell sx={{ fontWeight: 'bold',color:(i.isActive===false?'red':'black')}} ><StarIcon />({i.review_star})</TableCell>
              <TableCell sx={{ fontWeight: 'bold',color:(i.isActive===false?'red':'black')}} >{new Date(i.updatedAt).toLocaleDateString('en-US')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold',color:(i.isActive===false?'red':'black')}}> <Stack direction={'row'}> <IconButton onClick={()=>handleEdit(i._id)}><EditIcon sx={{ color: 'black' }} /></IconButton>
              </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Pagination count={Math.ceil(products.length / itemsPerPage)} onChange={(e, pageNumber) => setCurrentPage(pageNumber)} sx={{ margin: '30px 0px' }} color="primary" />

  </Box>
  )
}

export default ProductManagement