import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-red-700 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Nama Restoran */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold mb-2">Restoran Pak"D"</h2>
          <p className="text-sm text-gray-200">
            Cita rasa Nusantara sejak 1970
          </p>
        </div>

        {/* Media Sosial */}
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition transform hover:scale-110"
            aria-label="Facebook"
          >
            <Facebook size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition transform hover:scale-110"
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </a>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition transform hover:scale-110"
            aria-label="WhatsApp"
          >
            <Phone size={24} />
          </a>
          <a
            href="mailto:info@restoransederhana.id"
            className="hover:text-yellow-300 transition transform hover:scale-110"
            aria-label="Email"
          >
            <Mail size={24} />
          </a>
        </div>
      </div>

      {/* Garis & Copyright */}
      <div className="border-t border-red-500 mt-6 pt-4 text-center text-sm text-gray-300">
        &copy; {new Date().getFullYear()} Restoran Pak"D". All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
