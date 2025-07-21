import { useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import {
  onAuthStateChanged,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          setName(data.name || "");
          setAddress(data.address || "");
        } else {
          // Jika dokumen belum ada, buat dokumen baru dengan data default
          await setDoc(userRef, {
            name: "",
            address: "",
            email: currentUser.email,
            createdAt: new Date()
          });
        }
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const handleUpdateProfile = async () => {
    if (!user) return;

    try {
      await updateDoc(doc(db, "users", user.uid), {
        name,
        address,
      });
      alert("Profil berhasil diperbarui.");
    } catch (error) {
      alert("Gagal memperbarui profil.");
      console.error(error);
    }
  };

  const handleChangePassword = async () => {
    if (!user || !oldPassword || !newPassword) {
      alert("Mohon isi semua kolom password.");
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email!, oldPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      alert("Password berhasil diperbarui.");
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      alert("Gagal mengubah password. Pastikan password lama benar.");
      console.error(error);
    }
  };

  if (loading) return <div className="text-center mt-10">Memuat profil...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 text-gray-600 hover:text-black flex items-center"
      >
        <ArrowLeft className="w-5 h-5 mr-1" />
        Kembali
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center">Profil Pengguna</h2>

      <div className="space-y-4 mt-6">
        <div>
          <label className="block text-sm font-medium mb-1">Email (tidak bisa diubah)</label>
          <input type="text" value={user?.email} disabled className="w-full border p-2 rounded bg-gray-100" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Nama</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Alamat</label>
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border p-2 rounded h-20" />
        </div>

        <button onClick={handleUpdateProfile} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Simpan Perubahan
        </button>

        <hr className="my-4" />

        <h3 className="text-lg font-semibold">Ganti Password</h3>
        <input
          type="password"
          placeholder="Password Lama"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password Baru"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button onClick={handleChangePassword} className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">
          Ubah Password
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
