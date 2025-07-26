import Hero from './components/Hero';
import Header from './components/Header';
import Features from './components/Features';
import ProductCarousel from './components/ProductCarousel';
import ImageTextOverlay from './components/ImageTextOverlay';
import PageRevealWrapper from './components/PageRevealWrapper';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
const App = () => {
  return (
    <div className="bg-[#FEFFF4] overflow-hidden">
      <Header />
      <Hero />
      <Features />
      <ProductCarousel />
      <ImageTextOverlay />
      <PageRevealWrapper />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default App;
