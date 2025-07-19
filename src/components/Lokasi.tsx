const LocationSection = () => {
  return (
    <section id="lokasi" className="bg-gray-50 py-12 px-4 md:px-16">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-red-700">Lokasi Kami</h2>
        <p className="text-lg mb-8 text-gray-700">
          Kunjungi Restoran Sederhana dan rasakan langsung kelezatan masakan Minang.
        </p>

        {/* Alamat & Jam Operasional */}
        <div className="mb-8 text-left">
          <p className="text-lg font-semibold text-gray-800">Alamat:</p>
          <p className="text-gray-600">
            Jl. Contoh Raya No.123, Jakarta Selatan, DKI Jakarta 12345
          </p>

          <p className="text-lg font-semibold mt-4 text-gray-800">Jam Operasional:</p>
          <p className="text-gray-600">Senin - Minggu: 10.00 - 22.00 WIB</p>
        </div>

        {/* Google Maps Embed */}
        <div className="w-full h-[300px] md:h-[400px] shadow-lg rounded-lg overflow-hidden">
          <iframe
            title="Lokasi Restoran Sederhana"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.6704108431877!2d106.827153!3d-6.175392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e4d6b1c3f5%3A0x7bcfbe7cb7a4e83f!2sMonumen%20Nasional%20(Monas)!5e0!3m2!1sen!2sid!4v1629384863426!5m2!1sen!2sid"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
