import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import SellerProfile from './pages/SellerProfile';
import Login from './pages/Login';
import TopProducts from './pages/TopProducts';
import ProductGrid from './pages/ProductGrid';
import AddProduct from './pages/AddProduct';
import EditProducts from './pages/EditProducts';
import Orders from './pages/Orders';
import ProductManagement from './pages/ProductManagement';
import Transactions from './pages/Transactions';
import PageNotFound from './pages/PageNotFound';
import { Box, Container, Divider, Stack } from '@mui/material';
import Sidebar from './components/Sidebar';
import { useRecoilState } from 'recoil';
import { sellerState } from './recoil/atoms/sellerState';
import Reviews from './pages/Reviews';

function App() {
  const [seller, setSeller] = useRecoilState(sellerState)

  return (
    <>
      <Header />
      <Stack direction={'row'}>
        {seller?._id &&
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Sidebar />
          </Box>
        }
        <Container maxWidth sx={{ height: '90vh', overflow: 'scroll' }}>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/top-product' element={<TopProducts />} />
            <Route path='/product-grid' element={<ProductGrid />} />
            <Route path='/add-product' element={<AddProduct />} />
            <Route path='/profile' element={<SellerProfile />} />
            <Route path='/edit-product/:id' element={<EditProducts />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/product-management' element={<ProductManagement />} />
            <Route path='/reviews' element={<Reviews />} />
            <Route path='/transactions' element={<Transactions />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
          <Divider sx={{ marginBottom: '25px', marginTop: '30px' }} />
          <Footer />
        </Container >
      </Stack >
    </>
  );
}

export default App;
