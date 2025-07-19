const branches = [
  {
    nama: "Cabang Jakarta",
    alamat: "Jl. MH Thamrin No.1, Jakarta Pusat",
    telepon: "0812-3456-7890",
  },
  {
    nama: "Cabang Bandung",
    alamat: "Jl. Asia Afrika No.23, Bandung",
    telepon: "0813-9876-5432",
  },
  {
    nama: "Cabang Surabaya",
    alamat: "Jl. Raya Darmo No.77, Surabaya",
    telepon: "0821-1234-5678",
  },
  {
    nama: "Cabang Padang",
    alamat: "Jl. Adinegoro No.12, Padang",
    telepon: "0852-8765-4321",
  },
];

const ContactSection = () => {
  return (
    <section className="py-16 px-6 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-red-700 mb-12">Kontak Cabang</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {branches.map((cabang, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-red-600">{cabang.nama}</h3>
              <p className="text-sm text-gray-600">{cabang.alamat}</p>
              <p className="text-md font-medium mt-2">
                📞 <a href={`tel:${cabang.telepon}`} className="text-blue-600 hover:underline">
                  {cabang.telepon}
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
