import { Route, Routes } from 'react-router-dom'
import './App.css'
import LayoutAdmin from './components/LayoutAdmin'
import ProductList from './components/ProductList'
import Signin from './components/Signin'
import ProductAdd from './components/ProductAdd'
import ProductEdit from './components/ProductEdit'
import LayoutWebsite from './components/layout/LayoutWebsite'
import Home from './components/page/home'
import Detailproducts from './components/page/detail-product'
import CartPages from './components/Cart'
import OrderPage from './components/Order'


function App() {

  return (
    <>
    <Routes >
      <Route path='/' element={<LayoutWebsite/>} >
        <Route index element={<Home/>} />
        <Route path="/products/:id" element={<Detailproducts/>} />
        <Route path="signin" element={<Signin />} />
        <Route path="cart" element={<CartPages />} />
        <Route  path='order' element={<OrderPage />} />
      </Route>
      
    </Routes>


      <Routes>
        <Route path='admin' element={< LayoutAdmin />}>
          <Route index element={< ProductList />} />
          <Route path="products" element={< ProductList />} />
          <Route path="products/add" element={< ProductAdd />} />
          <Route path="products/:id/edit" element={< ProductEdit />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
