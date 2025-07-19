import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png"; // Adjust t

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-red-700 text-white p-2 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo + Judul */}
        <div className="flex items-center gap-1">
          <img src={Logo} alt="Logo" className="h-15" />
          <h1 className="text-xl font-bold">Restoran Pak"D"</h1>
        </div>

        {/* Tombol Hamburger */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigasi Desktop */}
        <nav className="hidden md:block">
          <ul className="flex gap-6 text-sm md:text-base">
             <li><Link to="/login" onClick={toggleMenu} className="hover:text-yellow-300">Login</Link></li>
            <li><a href="#menu" className="hover:text-yellow-300">Menu</a></li>
            <li><a href="#lokasi" className="hover:text-yellow-300">Lokasi</a></li>
            <li><a href="#kontak" className="hover:text-yellow-300">Kontak</a></li>
          </ul>
        </nav>
      </div>

      {/* Navigasi Mobile */}
      {isOpen && (
        <nav className="md:hidden mt-4">
          <ul className="flex flex-col gap-4 text-base">
            <li><Link to="/login" onClick={toggleMenu} className="hover:text-yellow-300">Login</Link></li>
            <li><a href="#menu" onClick={toggleMenu} className="hover:text-yellow-300">Menu</a></li>
            <li><a href="#lokasi" onClick={toggleMenu} className="hover:text-yellow-300">Lokasi</a></li>
            <li><a href="#kontak" onClick={toggleMenu} className="hover:text-yellow-300">Kontak</a></li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
