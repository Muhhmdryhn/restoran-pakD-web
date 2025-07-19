
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

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/menu" element={<MenuPage />} />
      </Routes>
    </>
  )
}

export default App
