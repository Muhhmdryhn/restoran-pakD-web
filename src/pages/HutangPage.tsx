import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../Firebase";
import { onAuthStateChanged } from "firebase/auth";

const HutangPage = () => {
  const navigate = useNavigate();
  const [hutangList, setHutangList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const fetchHutang = async () => {
      if (!userId) return;

      setLoading(true);
      try {
        const hutangRef = collection(db, "hutang");
        const q = query(hutangRef, where("user_id", "==", userId));
        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as any[];

        setHutangList(data);
      } catch (error) {
        console.error("Gagal mengambil data hutang:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHutang();
  }, [userId]);

  const totalTunggakan = hutangList.reduce((acc, curr) => acc + curr.total, 0);

  const handleBayarQRIS = () => {
    const orderData = {
      total: totalTunggakan,
      source: "hutang",
    };
    localStorage.setItem("pendingOrder", JSON.stringify(orderData));
    navigate("/bayar-qris");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md mt-10 rounded relative">
      {/* Tombol Kembali */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 text-gray-600 hover:text-black flex items-center"
      >
        <ArrowLeft className="w-5 h-5 mr-1" />
        Kembali
      </button>
      <div className="mt-10">

      <h1 className="text-2xl font-bold text-center text-red-700 mb-6">Menu Hutang</h1>

      {loading ? (
        <p className="text-center text-gray-600">Memuat data hutang...</p>
      ) : hutangList.length > 0 ? (
        <>
          <div className="bg-red-100 p-4 rounded-lg mb-4">
            <p className="text-lg font-semibold text-red-700">
              Total Tunggakan: Rp {totalTunggakan.toLocaleString()}
            </p>
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={handleBayarQRIS}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow"
            >
              Bayar dengan QRIS
            </button>
          </div>

          <div className="space-y-3 mt-6">
            {hutangList.map((item) => (
              <div
                key={item.id}
                className="border border-gray-300 rounded p-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-gray-800">{item.nama}</p>
                  <p className="text-sm text-gray-500">Tanggal: {item.created_at}</p>
                </div>
                <p className="text-red-600 font-bold">Rp {item.total.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600 text-lg font-medium mt-10">
          Kamu tidak memiliki hutang atau tunggakan.
        </p>
      )}
    </div></div>
  );
};

export default HutangPage;
