import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Bitcoin, Banknote, Upload, CheckCircle2, Loader2, Mail, Download, Smartphone, Copy, Check, Info } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

interface PaymentField {
  label: string;
  value: string;
}

interface PaymentMethodInfo {
  label: string;
  fields: PaymentField[];
  instruction: string;
}

interface PaymentDetailsMap {
  [key: string]: PaymentMethodInfo;
}

interface PaymentModalProps {
  tierName: string;
  price: string;
  onClose: () => void;
  onSuccess: () => void;
}

type PaymentMethod = 'wero' | 'crypto' | 'virement' | null;

export default function PaymentModal({ tierName, price, onClose, onSuccess }: PaymentModalProps) {
  const [method, setMethod] = useState<PaymentMethod>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [step, setStep] = useState<'method' | 'email' | 'upload'>('method');
  const [confirmationEmail, setConfirmationEmail] = useState('');
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetailsMap | null>(null);

  const methodIcons: Record<string, React.ReactNode> = {
    wero: <Smartphone className="w-6 h-6" />,
    crypto: <Bitcoin className="w-6 h-6" />,
    virement: <Banknote className="w-6 h-6" />
  };

  React.useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {
        const response = await axios.get('/api/payment-info');
        if (response.data) {
          setPaymentDetails(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch payment info", err);
      }
    };
    fetchPaymentInfo();
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedValue(text);
    setTimeout(() => setCopiedValue(null), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!file) return;
    setIsVerifying(true);
    setError(null);
    
    const formData = new FormData();
    formData.append("proof", file);
    formData.append("tier", tierName);
    formData.append("email", confirmationEmail);

    try {
      const response = await axios.post("/api/send-payment-proof", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.warning || response.data.debug) {
        console.warn("Server Warning:", response.data.message);
        console.warn("Debug Info:", response.data.debug || response.data.warning);
      }

      // Persist locally for the Revelation page if needed
      localStorage.setItem('deesse_last_purchase', JSON.stringify({
        tierName,
        email: confirmationEmail,
        timestamp: new Date().getTime()
      }));
      
      setIsVerifying(false);
      setIsDone(true);
    } catch (err: any) {
      console.error("Submission error:", err);
      const serverError = err.response?.data?.error || err.response?.data?.message || "Une erreur est survenue lors de l'envoi.";
      setError(serverError);
      setIsVerifying(false);
    }
  };

  const handleDownloadQR = () => {
    const canvas = document.getElementById('qr-code') as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = `Pass_${tierName}_DeesseAngele.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const qrUrl = `${window.location.origin}/verify?tier=${encodeURIComponent(tierName)}&email=${encodeURIComponent(confirmationEmail)}&id=${new Date().getTime()}`;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-brand-black/95 backdrop-blur-md"
        onClick={isDone ? undefined : onClose}
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative max-w-xl w-full glass-card p-8 border-brand-gold/30 bg-brand-black/90"
      >
        {!isDone && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/40 hover:text-brand-gold transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        <div className="text-center mb-8">
          <h2 className="text-2xl gold-gradient-text font-display uppercase tracking-widest mb-2">Finaliser mon Pass</h2>
          <p className="text-brand-gold font-cursive text-xl">{tierName} — {price}</p>
        </div>

        {isDone ? (
          <div className="py-8 text-center space-y-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold mx-auto"
            >
              <CheckCircle2 className="w-10 h-10" />
            </motion.div>
            
            <h3 className="text-2xl gold-gradient-text font-display uppercase tracking-widest">Paiement Envoyé</h3>
            
            <div className="bg-brand-gold/5 p-6 rounded-xl border border-brand-gold/20">
              <p className="text-white font-serif italic text-sm leading-relaxed mb-4">
                "Ta preuve de paiement a été téléversée. Dès que ton paiement sera vérifié manuellement, tu recevras toutes les informations (lieu et heure) par mail sur <span className="text-brand-gold font-bold">{confirmationEmail}</span>."
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10 inline-block">
              <p className="text-[10px] uppercase tracking-widest text-brand-gold mb-4">Ton Code d'Accès Provisoire</p>
              <div className="bg-white p-3 rounded-xl inline-block mb-4 relative group shadow-[0_0_30px_rgba(197,166,102,0.3)]">
                <QRCodeCanvas 
                  id="qr-code"
                  value={qrUrl} 
                  size={180}
                  level="H"
                  includeMargin={false}
                  fgColor="#000000"
                  bgColor="#FFFFFF"
                />
              </div>
              <button
                onClick={handleDownloadQR}
                className="w-full flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-brand-gold hover:text-white transition-colors font-bold"
              >
                <Download className="w-4 h-4" />
                Télécharger le QR Code
              </button>
            </div>

            <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 pt-4">
              La Déesse Angèle reviendra vers toi très vite.
            </p>
            
            <button 
              onClick={onSuccess}
              className="text-[10px] uppercase tracking-widest text-white/40 hover:text-brand-gold transition-colors block mx-auto"
            >
              Fermer la fenêtre
            </button>
          </div>
        ) : !paymentDetails ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-8 h-8 text-brand-gold animate-spin" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gold/60">Connexion au Sanctuaire...</p>
          </div>
        ) : step === 'method' ? (
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-widest text-white/40 text-center mb-6">Choisissez votre mode de paiement</p>
            {(Object.keys(paymentDetails) as PaymentMethod[]).map((m) => m && (
              <button
                key={m}
                onClick={() => {
                  setMethod(m);
                  setStep('email');
                }}
                className="w-full flex items-center gap-6 p-6 rounded-xl border border-brand-purple/20 bg-brand-purple/5 hover:border-brand-gold/50 hover:bg-brand-gold/5 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform">
                  {methodIcons[m]}
                </div>
                <div className="text-left">
                  <p className="text-lg font-display uppercase tracking-widest text-white group-hover:text-brand-gold transition-colors">
                    {paymentDetails[m].label}
                  </p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Paiement sécurisé & discret</p>
                </div>
              </button>
            ))}
          </div>
        ) : step === 'email' ? (
          <div className="space-y-8 py-4">
            <div className="text-center">
              <Mail className="w-12 h-12 text-brand-gold mx-auto mb-4" />
              <p className="text-sm text-white/60 italic font-serif leading-relaxed mb-6">
                "Où souhaites-tu recevoir tes accès une fois le paiement validé ?"
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-brand-gold ml-1">Email de confirmation</label>
              <input
                type="email"
                required
                value={confirmationEmail}
                onChange={(e) => setConfirmationEmail(e.target.value)}
                className="w-full bg-brand-purple/5 border border-brand-purple/20 rounded-full py-4 px-6 text-white focus:border-brand-gold/50 outline-none transition-all text-center"
                placeholder="votre@email.com"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setStep('method')}
                className="flex-1 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] border border-white/10 text-white/40 hover:text-white transition-colors"
              >
                Retour
              </button>
              <button
                disabled={!confirmationEmail || !confirmationEmail.includes('@')}
                onClick={() => setStep('upload')}
                className="flex-[2] gold-btn py-4 rounded-full font-bold uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continuer
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="p-6 rounded-xl bg-brand-gold/10 border border-brand-gold/20 text-center relative overflow-hidden">
              <p className="text-[10px] uppercase tracking-widest text-brand-gold/60 mb-4">{method && paymentDetails[method].label}</p>
              
              <div className="space-y-4 mb-6">
                {method && paymentDetails[method].fields.map((field, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1">{field.label}</span>
                    <div className="flex items-center justify-center gap-3 w-full">
                      <div className="text-sm font-mono text-white select-all break-all leading-relaxed">
                        {field.value}
                      </div>
                      <button 
                        onClick={() => handleCopy(field.value)}
                        className="flex-shrink-0 p-2 rounded-full bg-brand-gold/10 text-brand-gold hover:bg-brand-gold/20 transition-all active:scale-95 group"
                        title={`Copier ${field.label}`}
                      >
                        {copiedValue === field.value ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-brand-gold italic font-serif leading-relaxed px-4">
                {method && paymentDetails[method].instruction}
              </p>
              
              <AnimatePresence>
                {copiedValue && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-black text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg z-20"
                  >
                    Information copiée !
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-widest text-white/40">Téléverser la preuve de paiement (Capture d'écran)</p>
              <label className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                file ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-purple/20 bg-brand-purple/5 hover:border-brand-gold/30'
              }`}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {file ? (
                    <>
                      <CheckCircle2 className="w-10 h-10 text-brand-gold mb-3" />
                      <p className="text-xs text-brand-gold font-semibold uppercase tracking-widest px-4 text-center line-clamp-1">{file.name}</p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-10 h-10 text-brand-gold/40 mb-3" />
                      <p className="text-sm text-white/40 font-semibold uppercase tracking-widest">Choisir un fichier</p>
                    </>
                  )}
                </div>
                <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
              </label>
            </div>

            {error && (
              <p className="text-[10px] text-red-500 uppercase tracking-widest text-center animate-pulse">
                {error}
              </p>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => setStep('email')}
                className="flex-1 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] border border-white/10 text-white/40 hover:text-white transition-colors"
              >
                Retour
              </button>
              <button
                onClick={handleSubmit}
                disabled={!file || isVerifying}
                className={`flex-[2] py-4 rounded-full font-bold uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 ${
                  !file || isVerifying 
                    ? 'bg-white/5 text-white/20 cursor-not-allowed border border-white/10' 
                    : 'gold-btn'
                }`}
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Vérification...
                  </>
                ) : (
                  "Valider mon paiement"
                )}
              </button>
            </div>
            
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/20 text-center italic leading-relaxed">
              * Une vérification manuelle sera effectuée sous 24h.<br />
              Tes accès te seront envoyés par mail dès validation.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
