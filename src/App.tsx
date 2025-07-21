
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import LocationSection from './components/Lokasi'
import LandingPage from './pages/LandingPage'
import MenuPage from './pages/MenuPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import PesanPage from './pages/PesanPage'
import FoodOrderPage from './pages/FoodOrderPage'
import CateringService from './pages/CateringServicePage'
import HutangPage from './pages/HutangPage'
import BayarQRIS from './pages/BayarQrisPage'
import ProfilePage from './pages/ProfilePage'
import ReservationPage from './pages/ReservasiPage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage/>} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/pesan" element={<PesanPage />} />
          <Route path="/catering-service" element={<CateringService />} />
          <Route path="/reservasi" element={<ReservationPage />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="/hutang" element={<HutangPage/>} />
          <Route path="/bayar-qris" element={<BayarQRIS/>} />
        <Route path="/pesan-makanan" element={<FoodOrderPage />} />
      
      </Routes>
    </>
  )
}

export default App
