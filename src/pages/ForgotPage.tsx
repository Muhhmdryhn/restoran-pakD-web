import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Link untuk reset password telah dikirim ke email kamu.");
      setError("");
    } catch (err: any) {
      setMessage("");
      setError("Gagal mengirim email reset. Periksa email kamu dan coba lagi.");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-red-700 mb-4">Lupa Password</h2>
        <p className="text-sm text-gray-600 mb-6">
          Masukkan email kamu dan kami akan mengirimkan link untuk reset password.
        </p>

        <input
          type="email"
          placeholder="Masukkan email kamu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
        />

        <button
          onClick={handleReset}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition"
        >
          Kirim Link Reset
        </button>

        {message && <p className="text-green-600 mt-4">{message}</p>}
        {error && <p className="text-red-600 mt-4">{error}</p>}

        <div className="mt-6">
          <a href="/login" className="text-sm text-gray-600 hover:text-red-600 underline">
            Kembali ke Halaman Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
