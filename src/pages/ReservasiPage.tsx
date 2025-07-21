import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ReservationPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [serviceType, setServiceType] = useState("Reservasi Makan di Tempat");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [peopleCount, setPeopleCount] = useState("");

  const handleSendToAdmin = () => {
    const phoneNumber = "6289502799076"; // Ganti dengan nomor admin
    const message = `Halo Admin, saya ingin melakukan *${serviceType}*.\n\nBerikut data saya:\n- Nama: ${name}\n- Tanggal: ${date}\n- Waktu: ${time}\n- Jumlah orang: ${peopleCount}\n\nMohon konfirmasinya, terima kasih.`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 text-gray-600 hover:text-black flex items-center"
      >
        <ArrowLeft className="w-5 h-5 mr-1" />
        Kembali
      </button>
<div className="mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Reservasi / Pemesanan</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Jenis Layanan</label>
          <select
            className="w-full border p-2 rounded"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
          >
            <option>Reservasi Makan di Tempat</option>
            <option>Booking Catering</option>
            <option>Pemesanan Acara</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tanggal</label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Waktu</label>
          <input
            type="time"
            className="w-full border p-2 rounded"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Jumlah Orang</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={peopleCount}
            onChange={(e) => setPeopleCount(e.target.value)}
          />
        </div>

        <button
          onClick={handleSendToAdmin}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Kirim ke Admin (WhatsApp)
        </button>
      </div>
   </div> </div>
  );
};

export default ReservationPage;
