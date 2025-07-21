import { useState, useEffect } from "react";
import { auth, db } from "../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const packages = [
  { name: "Paket A", description: "Rp 35.000 / pax", price: 35000 },
  { name: "Paket B", description: "Rp 40.000 / pax", price: 40000 },
  { name: "Paket C", description: "Rp 45.000 / pax", price: 45000 },
];

const CateringService = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    date: "",
    time: "",
    notes: "",
    selectedPackage: "",
    pax: "",
    paymentMethod: "",
  });
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const selected = packages.find((p) => p.name === form.selectedPackage);
    const pax = parseInt(form.pax);
    if (selected && pax > 0) {
      setTotalPrice(selected.price * pax);
    } else {
      setTotalPrice(0);
    }
  }, [form.selectedPackage, form.pax]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePackageSelect = (pkgName: string) => {
    setForm((prev) => ({ ...prev, selectedPackage: pkgName }));
  };

  const handlePaymentSelect = (method: string) => {
    setForm((prev) => ({ ...prev, paymentMethod: method }));
  };

  const handleSubmit = async () => {
    const { name, phone, address, date, time, selectedPackage, pax, paymentMethod } = form;

    if (!name || !phone || !address || !date || !time || !selectedPackage || !pax || !paymentMethod) {
      alert("Mohon lengkapi semua data dan metode pembayaran.");
      return;
    }

    const orderData = {
      ...form,
      user_id: userId,
      total: totalPrice,
      created_at: new Date().toISOString(),
      type: "catering",
    };

    if (paymentMethod === "qriss") {
      localStorage.setItem("cateringOrder", JSON.stringify(orderData));
      navigate("/bayar");
    } else if (paymentMethod === "cod") {
      alert("Pesanan Anda akan segera diantar dan dibayar di tempat.");
      navigate("/beranda");
    } else if (paymentMethod === "hutang") {
      try {
        await addDoc(collection(db, "hutang"), {
          ...orderData,
          status: "belum lunas",
          hutang_date: new Date().toISOString(), // ✅ tanggal hutang tercatat
        });
        alert("Pesanan dengan hutang berhasil dicatat.");
        navigate("/hutang");
      } catch (error) {
        alert("Gagal menyimpan data hutang.");
        console.error(error);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded relative">
      {/* Tombol Kembali */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 text-gray-600 hover:text-black flex items-center"
      >
        <ArrowLeft className="w-5 h-5 mr-1" />
        Kembali
      </button>
<div className="mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Form Catering Service</h2>
      <div className="space-y-4 mt-6">
        <input type="text" name="name" placeholder="Nama Pemesan" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="text" name="phone" placeholder="Nomor Telepon" value={form.phone} onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="text" name="address" placeholder="Alamat Lengkap" value={form.address} onChange={handleChange} className="w-full border p-2 rounded" />
        <div className="flex gap-4">
          <input type="date" name="date" value={form.date} onChange={handleChange} className="w-1/2 border p-2 rounded" />
          <input type="time" name="time" value={form.time} onChange={handleChange} className="w-1/2 border p-2 rounded" />
        </div>

        {/* Paket */}
        <div>
          <label className="block font-medium mb-2">Pilih Paket Catering:</label>
          <div className="grid grid-cols-1 gap-3">
            {packages.map((pkg, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handlePackageSelect(pkg.name)}
                className={`w-full p-4 rounded-lg border transition-all text-left ${
                  form.selectedPackage === pkg.name
                    ? "border-red-500 bg-red-100"
                    : "border-gray-300 bg-white hover:bg-gray-50"
                }`}
              >
                <div className="font-semibold">{pkg.name}</div>
                <div className="text-sm text-gray-600">{pkg.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Pax & Total */}
        <input type="number" name="pax" placeholder="Jumlah Pax" value={form.pax} onChange={handleChange} className="w-full border p-2 rounded" min="1" />
        {totalPrice > 0 && (
          <div className="text-lg font-semibold text-green-600">
            Total Harga: Rp {totalPrice.toLocaleString()}
          </div>
        )}

        <textarea name="notes" placeholder="Catatan Tambahan" value={form.notes} onChange={handleChange} className="w-full border p-2 rounded h-24"></textarea>

        {/* Metode Pembayaran */}
        <div>
          <label className="block font-medium mb-2">Metode Pembayaran:</label>
          <div className="grid grid-cols-1 gap-3">
            {["qriss", "cod", "hutang"].map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => handlePaymentSelect(method)}
                className={`w-full p-4 rounded-lg border transition-all text-left ${
                  form.paymentMethod === method
                    ? "border-blue-500 bg-blue-100"
                    : "border-gray-300 bg-white hover:bg-gray-50"
                }`}
              >
                {method === "qriss" ? "QRIS" : method === "cod" ? "Bayar di Tempat (COD)" : "Hutang (Tangguhkan Pembayaran)"}
              </button>
            ))}
          </div>
        </div>

        {/* Gambar QRIS */}
        {form.paymentMethod === "qriss" && (
          <div className="mt-4 flex text-center">
            <div className="flex flex-col items-center w-full">
            <p className="mb-2 font-medium">Silakan Scan QRIS di bawah ini:</p>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Bayar%20Rp%20${totalPrice}`}
              alt="QRIS Code"
              className="border justify-center flex"
            /></div>
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full mt-6 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
      >
        Kirim Pesanan
      </button>
    </div></div>
  );
};

export default CateringService;
