import Header from "../components/Header";
import Hero from "../components/Hero";
import LocationSection from "../components/Lokasi";
import Footer from "../components/Footer";
import ContactSection from "../components/Kontak";

const LandingPage = () => {
  return (
    <>
      <Header />
      <div id="menu">
        <Hero />
      </div>
      <div id="lokasi">
        <LocationSection />
      </div>
      <div id="kontak">
        <ContactSection />
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
