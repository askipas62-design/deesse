import { motion } from 'motion/react';
import { Lock, MapPin, Calendar, Clock, Download } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { useEffect, useState } from 'react';

export default function Revelation() {
  const [purchase, setPurchase] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('deesse_last_purchase');
    if (saved) {
      setPurchase(JSON.parse(saved));
    }
  }, []);

  const handleDownloadQR = () => {
    const canvas = document.getElementById('qr-code-final') as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = `Pass_Final_DeesseAngele.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const qrValue = purchase 
    ? `DEESSE_ANGELE_PASS_${purchase.tierName}_${purchase.email}_${purchase.timestamp}`
    : "DEESSE_ANGELE_GUEST";

  return (
    <section className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center relative overflow-hidden">
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1.5, opacity: 0.1 }}
        transition={{ duration: 2 }}
        className="absolute w-[800px] h-[800px] bg-brand-gold rounded-full blur-[150px] pointer-events-none"
      />

      <div className="max-w-4xl w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ clipPath: 'circle(0% at 50% 50%)' }}
          animate={{ clipPath: 'circle(150% at 50% 50%)' }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="glass-card p-12 purple-glow border-brand-gold/30 h-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center mb-10"
          >
            <Lock className="w-12 h-12 text-brand-gold mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl gold-gradient-text font-display mb-4 uppercase tracking-[0.2em]">Accès Autorisé</h2>
            <p className="font-cursive text-brand-purple-glow text-2xl">voici ton passe temporaire .</p>
            {purchase && (
              <p className="text-brand-gold font-bold text-xs uppercase tracking-widest mt-2">{purchase.tierName}</p>
            )}
            <p className="text-white/40 text-[10px] uppercase tracking-widest mt-4">Un mail de confirmation te seras  envoyé.</p>
          </motion.div>

          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 }}
              className="flex items-center gap-6 group"
            >
              <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors">
                <Calendar className="text-brand-gold w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40">Prochain Rendez-vous</p>
                <p className="text-lg font-display uppercase tracking-widest">Les informations sur le lien l'heure et la date vous serons communiqué par mails</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8 }}
              className="flex items-center gap-6 group"
            >
              <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors">
                <MapPin className="text-brand-gold w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40">Domaine de Luxe (Secret)</p>
                <p className="text-lg font-display uppercase tracking-widest">???</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.1 }}
              className="flex items-center gap-6 group"
            >
              <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors">
                <Clock className="text-brand-gold w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40">⏳ 6 Heures d'Immersion</p>
                <p className="text-lg font-display uppercase tracking-widest"></p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="mt-10 p-4 border border-brand-gold/10 bg-brand-gold/5 rounded-lg text-center"
          >
            <p className="text-[9px] uppercase tracking-[0.3em] text-brand-gold leading-relaxed">
              Ces informations que nous vous enverrons seronts strictement confidentielles.<br />
              Vous ne devez en aucun cas les divulger.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          className="glass-card p-12 purple-glow border-brand-gold/30 text-center flex flex-col items-center justify-center h-full min-h-[500px]"
        >
          <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-8">Ton Code d'Accès</p>
          
          <div className="bg-white p-4 rounded-2xl shadow-[0_0_50px_rgba(212,175,55,0.2)] mb-8">
            <QRCodeCanvas 
              id="qr-code-final"
              value={qrValue} 
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>

          <button 
            onClick={handleDownloadQR}
            className="gold-btn !py-2 !px-8 flex items-center gap-3 mb-8"
          >
            <Download className="w-4 h-4" />
            Télécharger le Pass
          </button>

          <p className="text-white/40 text-[10px] uppercase tracking-widest leading-relaxed max-w-xs">
            
          </p>
          
          <div className="mt-auto pt-8 border-t border-white/5 w-full">
            <p className="font-cursive text-brand-gold text-2xl">La Déesse Angèle t'attend.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
