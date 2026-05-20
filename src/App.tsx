import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Passes from './components/Passes';
import Footer from './components/Footer';
import Hostesses from './components/Hostesses';
import Revelation from './components/Revelation';
import Manifesto from './components/Manifesto';
import BackgroundCarousel from './components/BackgroundCarousel';
import AestheticSections from './components/AestheticSections';
import Reviews from './components/Reviews'; // ✅ AJOUTÉ
import AdminDashboard from './components/AdminDashboard';
import PrivacyPage from './pages/PrivacyPage';
import LegalPage from './pages/LegalPage';
import ConductPage from './pages/ConductPage';
import FAQPage from './pages/FAQPage';
import PassVerification from './pages/PassVerification';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Custom Cursor removed for better reliability

function HomePage() {
  return (
    <>
      <Hero />

      <Manifesto />

      <AestheticSections />

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="glass-card p-1 aspect-[16/10] overflow-hidden group border-brand-gold/20">
            <img
              src="/images/hero/6.jpg"
              alt="Exclusivité"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
            />
          </div>

          <div className="text-left">
            <h3 className="text-4xl gold-gradient-text font-display mb-8 uppercase tracking-widest flex items-center gap-4">
              <span className="w-12 h-[1px] bg-brand-gold opacity-40" />
              Exclusivité
            </h3>

            <p className="text-white/70 mb-10 leading-relaxed italic serif-font text-xl">
              "Mes événements sont uniques et nuls égalés.
              Discrétion, professionnalisme et sérénité sont
              les valeurs qui guident mon approche."
            </p>

            <Link to="/passes" className="gold-btn inline-flex">
              Réserver votre place
            </Link>
          </div>
        </div>
      </section>

      <Reviews /> {/* ✅ AJOUTÉ */}
    </>
  );
}

export default function App() {
  const [hasPurchased, setHasPurchased] = useState(false);

  useEffect(() => {
    const handlePurchase = () => {
      setHasPurchased(true);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    window.addEventListener('purchase-success', handlePurchase);

    return () =>
      window.removeEventListener(
        'purchase-success',
        handlePurchase
      );
  }, []);

  return (
    <Router>
      <ScrollToTop />

      <BackgroundCarousel />

      <main className="min-h-screen bg-transparent selection:bg-brand-purple relative overflow-x-hidden">
        <div className="smoke-bg fixed inset-0 pointer-events-none z-0" />

        <Navbar />

        {hasPurchased ? (
          <Revelation />
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hôtesses" element={<Hostesses />} />
            <Route path="/passes" element={<Passes />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/conduct" element={<ConductPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/verify" element={<PassVerification />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        )}

        <Footer />
      </main>
    </Router>
  );
}
