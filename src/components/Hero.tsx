import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hero1 from "../assets/Hero1.jpg";
import Hero2 from "../assets/Hero2.jpg";
import Hero3 from "../assets/Hero3.jpg";

const images = [Hero1, Hero2, Hero3];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[80vh] w-full overflow-hidden bg-white">
      {/* Background Images */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-center bg-cover transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* Overlay Text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 text-white z-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          Cita Rasa Nusantara
        </h2>
        <p className="text-lg md:text-xl mb-6 max-w-lg drop-shadow-md">
          Rasakan nikmatnya masakan Minang yang otentik dan legendaris!
        </p>
        <Link
          to="/menu"
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-full font-semibold transition"
        >
          Lihat Menu
        </Link>
      </div>
    </section>
  );
};

export default Hero;
