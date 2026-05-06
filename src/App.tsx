import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Discover from './pages/Discover'
import Drops from './pages/Drops'
import ArtworkDetail from './pages/ArtworkDetail'
import Artists from './pages/Artists'
import ArtistProfile from './pages/ArtistProfile'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ArtistSubmit from './pages/ArtistSubmit'
import Admin from './pages/Admin'
import About from './pages/About'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/drops" element={<Drops />} />
        <Route path="/artwork/:id" element={<ArtworkDetail />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/artist/:id" element={<ArtistProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/artist-submit" element={<ArtistSubmit />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
