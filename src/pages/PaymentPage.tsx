import { useEffect, useState } from "react";
import { db } from "../Firebase";
import { collection, addDoc } from "firebase/firestore";
import QRISImage from "../assets/Qris.jpg"; // Gambar QRIS

const PaymentPage = () => {
  const [pendingOrder, setPendingOrder] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const storedOrder = localStorage.getItem("pendingOrder");
    if (storedOrder) {
      setPendingOrder(JSON.parse(storedOrder));
    }
  }, []);

  const handlePayment = async () => {
    if (!paymentMethod || !pendingOrder) return;

    const orderToSave = {
      ...pendingOrder,
      payment_method: paymentMethod,
      status: paymentMethod === "QRIS" ? "Menunggu Pembayaran" : "Pesanan Diproses",
    };

    try {
      await addDoc(collection(db, "orders"), orderToSave);
      localStorage.removeItem("pendingOrder");
      setSubmitted(true);
    } catch (error) {
      console.error("Gagal menyimpan pesanan:", error);
    }
  };

  if (submitted) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Pesanan Anda Berhasil Dikirim!</h2>
        <p className="text-gray-700">
          {paymentMethod === "QRIS"
            ? "Silakan lakukan pembayaran dengan memindai kode QR di atas."
            : "Pesanan Anda akan segera diproses dan diantar ke alamat Anda."}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Pilih Metode Pembayaran</h2>

      <div className="space-y-4">
        <label className="block">
          <input
            type="radio"
            name="payment"
            value="QRIS"
            checked={paymentMethod === "QRIS"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-2"
          />
          QRIS
        </label>

        <label className="block">
          <input
            type="radio"
            name="payment"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-2"
          />
          Bayar di Tempat (COD)
        </label>
        <label className="block">
          <input
            type="radio"
            name="payment"
            value="Hutang"
            checked={paymentMethod === "Hutang"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-2"
          />
          Hutang Bayar Nanti        </label>
     </div>

      {paymentMethod === "QRIS" && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Scan QR Code untuk Pembayaran</h3>
          <img src={QRISImage} alt="QRIS" className="w-64 mx-auto border rounded" />
        </div>
      )}

      <button
        onClick={handlePayment}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Konfirmasi Pembayaran
      </button>
    </div>
  );
};

export default PaymentPage;
