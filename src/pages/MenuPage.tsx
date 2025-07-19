import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import rendang from "../assets/rendang.jpg";
import ayamPop from "../assets/ayam-pop.jpg";
import gulaiKikil from "../assets/gulai-kikil.jpg";
import tehManis from "../assets/teh-manis.jpg";
import esJeruk from "../assets/es-jeruk.jpg";
import airMineral from "../assets/air-mineral.jpg";
import kerupuk from "../assets/kerupuk-jangek.jpg";
import satePuyuh from "../assets/sate-puyuh.jpg";

interface MenuItem {
  nama: string;
  harga: string;
  deskripsi: string;
  gambar: string;
}

const menuData: Record<string, MenuItem[]> = {
  makanan: [
    {
      nama: "Rendang",
      harga: "Rp25.000",
      deskripsi: "Daging sapi dimasak dengan bumbu khas Minang, pedas dan gurih.",
      gambar: rendang,
    },
    {
      nama: "Ayam Pop",
      harga: "Rp20.000",
      deskripsi: "Ayam rebus khas Padang dengan cita rasa gurih dan lembut.",
      gambar: ayamPop,
    },
    {
      nama: "Gulai Kikil",
      harga: "Rp22.000",
      deskripsi: "Kikil sapi dimasak dalam kuah santan kental yang gurih dan pedas.",
      gambar: gulaiKikil,
    },
  ],
  minuman: [
    {
      nama: "Teh Manis",
      harga: "Rp5.000",
      deskripsi: "Teh hitam disajikan dingin atau hangat dengan gula.",
      gambar: tehManis,
    },
    {
      nama: "Es Jeruk",
      harga: "Rp6.000",
      deskripsi: "Minuman segar dari perasan jeruk asli, cocok untuk cuaca panas.",
      gambar: esJeruk,
    },
    {
      nama: "Air Mineral",
      harga: "Rp3.000",
      deskripsi: "Air mineral botol dingin untuk menyegarkan dahaga.",
      gambar: airMineral,
    },
  ],
  snacks: [
    {
      nama: "Kerupuk Jangek",
      harga: "Rp4.000",
      deskripsi: "Kerupuk kulit sapi goreng khas Padang yang renyah dan gurih.",
      gambar: kerupuk,
    },
    {
      nama: "Sate Telur Puyuh",
      harga: "Rp7.000",
      deskripsi: "Telur puyuh direbus, ditusuk, dan dibalur saus manis gurih.",
      gambar: satePuyuh,
    },
  ],
};

const MenuPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-white flex justify-baseline px-6 py-4 shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="text-red-600 hover:text-red-800 font-medium"
        >
          ← Kembali
        </button>
      </div>

      <section className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-red-700">
          Daftar Menu
        </h2>

        {Object.entries(menuData).map(([kategori, items]) => (
          <div key={kategori} className="mb-16">
            <h3 className="text-2xl font-semibold mb-6 capitalize border-b pb-2 border-gray-300">
              {kategori}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden"
                >
                  <img
                    src={item.gambar}
                    alt={item.nama}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-xl font-bold text-red-700">{item.nama}</h4>
                    <p className="text-sm text-gray-600 mb-2">{item.deskripsi}</p>
                    <p className="font-semibold text-yellow-600">{item.harga}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </>
  );
};

export default MenuPage;
