import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";
import UserHeader from "../components/Userheader";

const HomePage = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
      else window.location.href = "/login"; // redirect kalau belum login
    });
    return () => unsubscribe();
  }, []);

  if (!user) return null;

  return (
    <>
      <UserHeader user={user} />
      <div className="container mx-auto mt-8 px-4 text-center">
        <h2 className="text-3xl font-bold text-red-700 mb-4">Selamat Datang, {user.displayName || user.email}!</h2>
        <p className="text-gray-700 text-lg">
          Silakan mulai dengan memilih menu di atas: pesan makanan, reservasi, atau kerja sama.
        </p>
      </div>
    </>
  );
};

export default HomePage;
