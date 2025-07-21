import { useNavigate } from "react-router-dom";
import UserHeader from "../components/Userheader";

const PesanPage = () => {
  const navigate = useNavigate();

  return (
    <>
    <UserHeader user={undefined} />
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-red-700 mb-8">
        Layanan Pemesanan
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Pesan Makanan */}
        <div
          onClick={() => navigate("/pesan-makanan")}
          className="bg-white hover:bg-red-50 shadow-lg rounded-xl p-6 text-center cursor-pointer transition duration-300"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
            alt="Pesan Makanan"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Pesan Makanan
          </h2>
          <p className="text-gray-600 text-sm">
            Pilih berbagai menu favorit Anda dan nikmati kemudahan pemesanan.
          </p>
        </div>

        {/* Catering Service */}
        <div
          onClick={() => navigate("/catering-service")}
          className="bg-white hover:bg-red-50 shadow-lg rounded-xl p-6 text-center cursor-pointer transition duration-300"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2784/2784469.png"
            alt="Catering"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Catering Service
          </h2>
          <p className="text-gray-600 text-sm">
            Layanan katering harian, mingguan, atau event spesial Anda.
          </p>
        </div>

        {/* Menu Bayar */}
        <div
          onClick={() => navigate("/hutang")}
          className="bg-white hover:bg-red-50 shadow-lg rounded-xl p-6 text-center cursor-pointer transition duration-300"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1000/1000807.png"
            alt="Bayar"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-red-600 mb-2">Hutang</h2>
          <p className="text-gray-600 text-sm">
            Selesaikan transaksi dan pantau status pembayaran Anda.
          </p>
        </div>
      </div>
    </div>
 </> );
};

export default PesanPage;
