import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../Firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const BayarQRIS = () => {
  const [orderData, setOrderData] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        navigate("/login");
      }
    });
    return () => unsub();
  }, [navigate]);

  useEffect(() => {
    const data = localStorage.getItem("pendingOrder");
    if (data) {
      setOrderData(JSON.parse(data));
    } else {
      navigate("/order");
    }
  }, [navigate]);

  const handleSelesaiBayar = async () => {
    if (!userId || !orderData) return;

    try {
      const hutangRef = collection(db, "hutang");
      const q = query(hutangRef, where("user_id", "==", userId));
      const snapshot = await getDocs(q);

      // Hapus semua hutang milik user ini
      const deletePromises = snapshot.docs.map((docu) =>
        deleteDoc(doc(db, "hutang", docu.id))
      );

      await Promise.all(deletePromises);

      localStorage.removeItem("pendingOrder");
      alert("Pembayaran QRIS berhasil. Terima kasih!");
      navigate("/home");
    } catch (error) {
      console.error("Gagal menghapus hutang:", error);
      alert("Terjadi kesalahan saat menghapus hutang.");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-xl">
      <div className="flex justify-start mb-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
        >
          ← Kembali
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Pembayaran QRIS</h2>

      {orderData ? (
        <div className="bg-white p-6 rounded shadow">
          <p className="mb-2 text-lg">
            Silakan scan QR di bawah ini untuk menyelesaikan pembayaran Anda:
          </p>

          <div className="flex justify-center mb-4">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Bayar%20Rp%20${orderData.total}`}
              alt="QRIS Code"
              className="border"
            />
          </div>

          <p className="mb-4 text-center">
            Total yang harus dibayar:{" "}
            <strong>Rp {orderData.total.toLocaleString()}</strong>
          </p>

          <button
            onClick={handleSelesaiBayar}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full"
          >
            Saya Sudah Bayar
          </button>
        </div>
      ) : (
        <p>Memuat data...</p>
      )}
    </div>
  );
};

export default BayarQRIS;
