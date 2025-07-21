import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import Logo from "../assets/logo.png";
import {
  FaWhatsapp,
  FaSignOutAlt,
  FaUser,
  FaClipboardList,
  FaHandshake,
} from "react-icons/fa";

const UserHeader = ({ user }: { user: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <header className="bg-red-700 text-white p-2 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo + Judul */}
        <div className="flex items-center gap-2">
          <img src={Logo} alt="Logo" className="h-12 w-12 rounded-full" />
          <h1 className="text-xl font-bold">Restoran Pak "D"</h1>
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
        <nav className="hidden md:flex gap-6 items-center text-sm md:text-base">
          <button onClick={() => navigate("/pesan")} className="hover:text-yellow-300">
            <FaClipboardList className="inline mr-1" /> Pesan
          </button>
          <button onClick={() => navigate("/reservasi")} className="hover:text-yellow-300">
            <FaClipboardList className="inline mr-1" /> Reservasi
          </button>
          <button onClick={() => navigate("/profil")} className="hover:text-yellow-300">
            <FaUser className="inline mr-1" /> Profil
          </button>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300"
          >
            <FaWhatsapp className="inline mr-1" /> Admin
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 bg-red-800 hover:bg-red-900 px-3 py-1 rounded text-white"
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </div>

      {/* Navigasi Mobile */}
      {isOpen && (
        <nav className="md:hidden mt-4">
          <ul className="flex flex-col gap-3 text-base text-white">
            <li>
              <button onClick={() => navigate("/pesan")} className="hover:text-yellow-300">
                <FaClipboardList className="inline mr-1" /> Pesan
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/reservasi")} className="hover:text-yellow-300">
                <FaClipboardList className="inline mr-1" /> Reservasi
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/profil")} className="hover:text-yellow-300">
                <FaUser className="inline mr-1" /> Profil
              </button>
            </li>
            <li>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-300"
              >
                <FaWhatsapp className="inline mr-1" /> Hubungi Admin
              </a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-red-800 hover:bg-red-900 px-3 py-1 rounded text-white w-fit"
              >
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default UserHeader;
