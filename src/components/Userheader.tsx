import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import { FaWhatsapp, FaSignOutAlt, FaUser, FaClipboardList, FaHandshake } from "react-icons/fa";

const UserHeader = ({ user }: { user: any }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <header className="bg-red-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-bold">Restoran Pak D</h1>

        <nav className="flex gap-4 items-center text-sm">
          <button onClick={() => navigate("/pesan")} className="hover:underline">Pesan</button>
          <button onClick={() => navigate("/reservasi")} className="hover:underline">Reservasi</button>
          <button onClick={() => navigate("/profil")} className="flex items-center gap-1 hover:underline">
            <FaUser className="text-white" /> Profil
          </button>
          <button onClick={() => navigate("/kerjasama")} className="flex items-center gap-1 hover:underline">
            <FaHandshake className="text-white" /> Kerja Sama
          </button>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline"
          >
            <FaWhatsapp /> Admin
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 bg-red-700 hover:bg-red-800 px-2 py-1 rounded text-white"
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default UserHeader;
