import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Pagination, Select, Stack, Typography } from '@mui/material'
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import CreateIcon from '@mui/icons-material/Create';
import toast, { Toaster } from 'react-hot-toast';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import PageHead from '../components/PageHead';
import { useRecoilState } from 'recoil';
import { productsGrid } from '../recoil/atoms/productState';
import { deleteProduct, getProductsGrid } from '../services/allApi';
import { BASE_URL } from '../services/baseUrl';
import { useNavigate } from 'react-router-dom';


function ProductGrid() {
    const [products, setProducts] = useRecoilState(productsGrid)
   // console.log(products);
    const [sortData, setSortData] = useState({
        categoryFilter: "",
        sort_option: "Best_selling"
    })
   // console.log(sortData);
   const navigate=useNavigate()

    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const lastIndexOfItemInAPage = itemsPerPage * currentPage;
    const firstIndexOfItemInAPage = lastIndexOfItemInAPage - itemsPerPage;

    const getProductsInGrid = async () => {
        const id = "660277ef036d11f9e12e0ed8"
        const result = await getProductsGrid(sortData, id)
        console.log(result);
        setProducts(result.data)
    }

    useEffect(() => {
        getProductsInGrid()
    }, [sortData])

    const handleDelete = async (id) => {
        const response=await deleteProduct(id)
            toast.success('Product deleted!')
            getProductsInGrid()
      }

      const handleEdit=(id)=>{
        navigate(`/edit-product/${id}`)
      }

    return (
        <>
            <PageHead heading={'Products Grid'} />
            <Stack marginTop={2} direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'}>
                <Stack sx={{ width: { xs: 350, md: 170 } }} bgcolor={'white'} direction={'row'} spacing={1} boxShadow={4} p={2} borderRadius={2} >
                    {products?.some(product => product.category === 'Electronics') ? (<LaptopMacIcon sx={{ backgroundColor: '#035ECF', color: 'white', padding: '5px', borderRadius: '3px', height: '20px', width: '20px' }} />) : null}
                    {products?.some(product => product.category === 'Fashion') ? (<CheckroomIcon sx={{ backgroundColor: '#ff5470', color: 'white', padding: '5px', borderRadius: '3px', height: '20px', width: '20px' }} />) : null}
                    {products?.some(product => product.category === 'Groceries') ? (<RestaurantIcon sx={{ backgroundColor: 'orange', color: 'white', padding: '5px', borderRadius: '3px', height: '20px', width: '20px' }} />) : null}
                    {products.slice(0, 1).map((i) => (<Typography fontSize={20} fontWeight={'bold'} >{i.category}</Typography>))}
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ marginTop: { xs: 5, md: 0 } }}>

                    <FormControl size='small' sx={{ width: { xs: '300', md: 150 } }}>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>

                        <Select
                            sx={{ bgcolor: 'white' }}
                            value={sortData.categoryFilter}
                            onChange={(e) => setSortData({ ...sortData, ["categoryFilter"]: e.target.value })}
                        >
                            
                            <MenuItem value={'Electronics'}>Electronics</MenuItem>
                            <MenuItem value={'Fashion'}>Fashion</MenuItem>
                            <MenuItem value={'Groceries'}>Groceries</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl size='small' sx={{ width: { xs: '300', md: 150 } }} >
                        <Select
                            sx={{ bgcolor: 'white' }}
                            value={sortData.sort_option}
                            onChange={(e) => setSortData({ ...sortData, ["sort_option"]: e.target.value })}
                        >
                            <MenuItem selected value={'Best_selling'}>Best seling</MenuItem>
                            <MenuItem value={'Availability'}>Availability</MenuItem>
                            <MenuItem value={'low_to_high'}>Price: Low to High</MenuItem>
                            <MenuItem value={'high_to_low'}>Price: High to Low</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </Stack>
            <Typography gutterBottom sx={{ opacity: '.9' }} fontSize={16} textAlign={{ xs: 'start', md: 'end' }}>View Products {products.length > 24 ? 24 : products.length}/{products.length}</Typography>

            <Grid container mt={4} spacing={2}>
                {products.slice(firstIndexOfItemInAPage, lastIndexOfItemInAPage).map((product) => (
                    <Grid item xs={12} md={2.5}>
                        <Stack spacing={1} boxShadow={4} borderRadius={2} bgcolor={'white'} padding={3} sx={{ width: { xs: 350, md: 190 } }}>
                            <Box border={1} borderColor={'#f1f1f1'} marginBottom={2} textAlign={'center'}> <img width={170} height={130} src={`${BASE_URL}/uploadedFiles/${product?.thumbnail}`} alt="" /></Box>
                            <Typography fontWeight={'bold'} fontSize={16} > {product.title.length > 20 ? `${product.title.slice(0, 20)}...` : product.title}</Typography>
                            <Typography fontWeight={'bold'} fontSize={15} color={'#0dd1b0'}>Available :<span>{product.stockQuantity}</span></Typography>
                            <Typography fontWeight={'bold'} fontSize={15} color={'darkblue'}>Already sold :<span>{product.product_sold}</span></Typography>
                            <Typography fontWeight={'bold'} fontSize={15} color={'gray'}>Regular price :<span>${product.original_price}</span></Typography>
                            <Typography fontWeight={'bold'} fontSize={15} color={'gray'}>Sale price :<span>${product.discounted_price}</span></Typography>
                            <Stack direction={'row'} marginTop={3}>
                                <Button onClick={()=>handleEdit(product._id)} sx={{ borderRadius: '20px', fontWeight: 'bold', width: { xs: 200 } }} variant='outlined'><CreateIcon sx={{ width: '15px' }} />Edit</Button>
                                <Button onClick={()=>handleDelete(product._id)} sx={{ marginLeft: '5px', borderRadius: '20px', fontWeight: 'bold', width: { xs: 200 } }} color='error' variant='outlined'>Delete</Button>
                            </Stack>
                        </Stack>
                    </Grid>
                ))
                }
            </Grid>
            <Pagination count={Math.ceil(products.length / itemsPerPage)} onChange={(e, pageNumber) => setCurrentPage(pageNumber)} sx={{ margin: '30px 0px' }} color="primary" />
            <Toaster position="top-center"
                reverseOrder={false}
                containerStyle={{
                    padding: '10px',
                    fontSize: '17px',
                    fontFamily: 'sans-serif',
                }}
            />
        </>
    )
}

export default ProductGrid