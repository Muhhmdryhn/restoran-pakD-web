import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, provider } from "../Firebase";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png"; // Ganti path sesuai lokasi logo kamu
import LogoGoole from "../assets/Logo_Google.png"; // Ganti path sesuai lokasi logo Google kamu
import { ArrowLeft } from "lucide-react"; // pastikan kamu install lucide-react

const LoginPage = () => {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Toggle login/signup

  const navigate = useNavigate(); // untuk redirect

  // Tombol kembali ke halaman sebelumnya
  const handleBack = () => {
    navigate(-1); // kembali satu langkah
    // Atau: navigate("/"); untuk kembali ke halaman landing
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      console.log("Login Google berhasil:", result.user);
      navigate("/home");
    } catch (error) {
      console.error("Login Google gagal:", error);
    }
  };

  const handleEmailLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      console.log("Login Email berhasil:", result.user);
      navigate("/home");
    } catch (error) {
      console.error("Login Email gagal:", error);
      alert("Email atau password salah");
    }
  };

  const handleSignUp = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: username });
      setUser(result.user);
      console.log("Akun berhasil dibuat:", result.user);
      navigate("/home");
    } catch (error) {
      console.error("Sign Up gagal:", error);
      alert("Gagal membuat akun. Email mungkin sudah terdaftar.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 relative">
      {/* Tombol Kembali */}
    <button
      onClick={handleBack}
      className="absolute top-4 left-4 flex items-center gap-2 text-red-600 hover:text-red-800 font-medium"
    >
      <Link to="/" className="flex items-center gap-2">
        <ArrowLeft className="w-5 h-5" />
        Kembali
      </Link>
    </button>

      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md text-center">
        {/* Logo */}
        <img
          src={Logo}
          alt="Logo Restoran"
          className="w-20 h-20 mx-auto mb-4 rounded-full"
        />

        <h2 className="text-2xl font-bold text-red-700 mb-6">
          {isSignUp ? "Buat Akun Baru" : "Login Restoran"}
        </h2>

        {user ? (
          <div>
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-16 h-16 rounded-full mx-auto mb-2"
            />
            <p className="text-gray-800">{user.displayName}</p>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>
        ) : (
          <>
            {isSignUp && (
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mb-3 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-3 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            />

            <button
              onClick={isSignUp ? handleSignUp : handleEmailLogin}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition mb-4"
            >
              {isSignUp ? "Buat Akun" : "Login"}
            </button>

            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-3 text-gray-500 text-sm">atau</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full bg-white border hover:bg-gray-100 text-gray-800 font-semibold py-2 rounded flex items-center justify-center gap-2"
            >
              <img
                src={LogoGoole}
                alt="Google"
                className="w-5 h-5"
              />
              Login dengan Google
            </button>

            <div className="mt-4">
              <a href="/forgot-password" className="text-sm text-red-600 hover:underline">
                Lupa Password?
              </a>
            </div>

            <div className="mt-2">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-gray-600 hover:underline mt-2"
              >
                {isSignUp
                  ? "Sudah punya akun? Login di sini"
                  : "Belum punya akun? Buat akun"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
