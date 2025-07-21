import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

import rendang from "../assets/rendang.jpg";
import ayamPop from "../assets/ayam-pop.jpg";
import gulaiKikil from "../assets/gulai-kikil.jpg";
import tehManis from "../assets/teh-manis.jpg";
import esJeruk from "../assets/es-jeruk.jpg";
import airMineral from "../assets/air-mineral.jpg";
import kerupuk from "../assets/kerupuk-jangek.jpg";
import satePuyuh from "../assets/sate-puyuh.jpg";

const menuList = [
  { name: "Rendang", price: 25000, image: rendang, category: "Ala Carte" },
  { name: "Ayam Pop", price: 20000, image: ayamPop, category: "Ala Carte" },
  { name: "Gulai Kikil", price: 22000, image: gulaiKikil, category: "Ala Carte" },
  { name: "Sate Puyuh", price: 15000, image: satePuyuh, category: "Ala Carte" },
  { name: "Box A", price: 35000, image: ayamPop, category: "Box" },
  { name: "Box B", price: 40000, image: rendang, category: "Box" },
  { name: "Box C", price: 45000, image: gulaiKikil, category: "Box" },
  { name: "Teh Manis", price: 5000, image: tehManis, category: "Ala Carte" },
  { name: "Es Jeruk", price: 7000, image: esJeruk, category: "Ala Carte" },
  { name: "Air Mineral", price: 4000, image: airMineral, category: "Ala Carte" },
  { name: "Kerupuk Jangek", price: 3000, image: kerupuk, category: "Ala Carte" },
];

type OrderItem = {
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  note: string;
};

const OrderPage = () => {
  const [orders, setOrders] = useState<OrderItem[]>(
    menuList.map((item) => ({ ...item, quantity: 0, note: "" }))
  );
  const [userId, setUserId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("QRIS");
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
    });
    return () => unsub();
  }, []);

  const handleChange = (
    index: number,
    key: "quantity" | "note",
    value: number | string
  ) => {
    const updated = [...orders];
    updated[index][key] = value as never;
    setOrders(updated);
  };

  const totalHarga = orders.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleProceedToPayment = async () => {
    const selectedOrders = orders.filter((item) => item.quantity > 0);
    if (selectedOrders.length === 0) {
      alert("Silakan pilih menu terlebih dahulu.");
      return;
    }

    const payload = {
      items: selectedOrders,
      user_id: userId,
      total: totalHarga,
      paymentMethod,
      created_at: new Date().toISOString(),
    };

    if (paymentMethod === "QRIS") {
      localStorage.setItem("pendingOrder", JSON.stringify(payload));
      navigate("/bayar-qris");
    } else if (paymentMethod === "COD") {
      alert("Pesanan Anda akan segera diantar dan dibayar di tempat.");
      navigate("/home");
    } else if (paymentMethod === "HUTANG") {
      try {
        await addDoc(collection(db, "hutang"), {
          ...payload,
          status: "belum lunas",
          hutang_date: new Date().toISOString(),
        });
        alert("Pesanan dengan hutang berhasil dicatat.");
        navigate("/hutang");
      } catch (error) {
        alert("Gagal menyimpan data hutang.");
        console.error(error);
      }
    }
  };

  const renderSection = (category: "Ala Carte" | "Box") => (
    <>
      <h3 className="text-xl font-semibold my-4">{category} Menu</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {orders
          .filter((item) => item.category === category)
          .map((item, i) => (
            <div key={i} className="bg-white p-4 rounded shadow">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h4 className="text-lg font-semibold">{item.name}</h4>
              <p className="text-sm text-gray-600">Rp {item.price.toLocaleString()}</p>
              <input
                type="number"
                min="0"
                value={item.quantity}
                onChange={(e) =>
                  handleChange(i, "quantity", parseInt(e.target.value))
                }
                className="mt-2 w-full border p-1 rounded"
                placeholder="Jumlah"
              />
              <input
                type="text"
                value={item.note}
                onChange={(e) => handleChange(i, "note", e.target.value)}
                className="mt-1 w-full border p-1 rounded"
                placeholder="Catatan (opsional)"
              />
            </div>
          ))}
      </div>
    </>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-start">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
        >
          ← Kembali
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-6">Pesan Menu</h2>

      {renderSection("Ala Carte")}
      {renderSection("Box")}

      <div className="mt-6 border-t pt-4">
        <p className="text-lg font-semibold mb-2">
          Total Harga: Rp {totalHarga.toLocaleString()}
        </p>
        <div className="mb-4">
          <label className="block font-medium mb-1">Metode Pembayaran:</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="QRIS">QRIS</option>
            <option value="COD">Cash</option>
            <option value="HUTANG">Hutang</option>
          </select>
        </div>
        <button
          onClick={handleProceedToPayment}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Lanjut ke Pembayaran
        </button>
      </div>
    </div>
  );
};

export default OrderPage;