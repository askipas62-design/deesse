import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Bitcoin,
  Banknote,
  Upload,
  CheckCircle2,
  Loader2,
  Mail,
  Download,
  Smartphone,
  Copy,
  Check
} from 'lucide-react';
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

export default function PaymentModal({
  tierName,
  price,
  onClose,
  onSuccess
}: PaymentModalProps) {

  const [method, setMethod] = useState<PaymentMethod>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [step, setStep] = useState<'method' | 'email' | 'upload'>('method');
  const [confirmationEmail, setConfirmationEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Gestion du bouton copier individuel
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetailsMap>({
    wero: {
      label: "Wero",
      fields: [
        {
          label: "Numéro",
          value: "INDISPONILE"
        },
        {
          label: "Nom",
          value: "INDISPONIBLE"
        }
      ],
      instruction:
        ""
    },

    crypto: {
      label: "Crypto (Litecoin)",
      fields: [
        {
          label: "Adresse LTC",
          value: "ltc1qtclzqfsk8wjyn99asx7h37n403mxmc24889247"
        }
      ],
      instruction:
        "Envoyez uniquement du Litecoin (LTC) vers cette adresse crypto."
    },

    virement: {
      label: "Virement Instantané",
      fields: [
        {
          label: "IBAN",
          value: "FR76 1723 8000 0100 4146 8128 515"
        },
        {
          label: "BIC",
          value: "SCSYFRP2"
        },
        {
          label: "Nom du Bénéficiaire",
          value: "Madisonne marjolaine crucon"
        }
      ],
      instruction:
        "⚠️ IMPORTANT : Lors du virement bancaire, vous devez impérativement saisir EXACTEMENT le nom du bénéficiaire comme Indiqué. Toute erreur dans le nom peut entraîner un rejet automatique ou un blocage du transfert bancaire."
    }
  });

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
        console.error("Erreur récupération infos paiement", err);
      }
    };

    fetchPaymentInfo();
  }, []);

  const handleCopy = (text: string, fieldLabel: string) => {
    navigator.clipboard.writeText(text);

    setCopiedField(fieldLabel);

    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    setIsVerifying(true);
    setError(null);

    const formData = new FormData();

    formData.append("proof", file);
    formData.append("tier", tierName);
    formData.append("email", confirmationEmail);

    try {
      await axios.post(
        "/api/send-payment-proof",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      localStorage.setItem(
        'deesse_last_purchase',
        JSON.stringify({
          tierName,
          email: confirmationEmail,
          timestamp: new Date().getTime()
        })
      );

      setIsVerifying(false);
      setIsDone(true);

    } catch (err: any) {

      setError(
        err.response?.data?.error ||
        "Une erreur est survenue lors de l'envoi."
      );

      setIsVerifying(false);
    }
  };

  const handleDownloadQR = () => {

    const canvas = document.getElementById(
      'qr-code'
    ) as HTMLCanvasElement;

    if (canvas) {

      const url = canvas.toDataURL('image/png');

      const link = document.createElement('a');

      link.href = url;
      link.download = `Pass_${tierName}.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const qrUrl = `${window.location.origin}/verify?tier=${encodeURIComponent(
    tierName
  )}&email=${encodeURIComponent(
    confirmationEmail
  )}&id=${new Date().getTime()}`;

  return (

    <div className="fixed inset-0 z-[200] overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4">

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-2xl max-h-[95vh] overflow-y-auto rounded-[32px] border border-yellow-500/20 bg-[#0b0b0c] shadow-[0_0_80px_rgba(255,215,0,0.08)]"
      >

        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-yellow-500/5 pointer-events-none" />

        {!isDone && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-50 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-yellow-400 hover:border-yellow-400/30 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="relative z-10 p-8 md:p-10">

          {/* HEADER */}
          <div className="text-center mb-10">

            <p className="uppercase tracking-[0.4em] text-[10px] text-yellow-500/60 mb-3">
              Paiement Sécurisé
            </p>

            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-[0.15em] text-yellow-400">
              Finaliser Mon Pass
            </h2>

            <p className="text-white/50 mt-4 text-sm">
              {tierName} • {price}
            </p>

          </div>

          {isDone ? (

            <div className="text-center py-10">

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mx-auto mb-8"
              >
                <CheckCircle2 className="w-10 h-10 text-yellow-400" />
              </motion.div>

              <h3 className="text-3xl uppercase font-black tracking-[0.2em] text-yellow-400 mb-6">
                Paiement Envoyé
              </h3>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-8">

                <p className="text-white/70 leading-relaxed">
                  Votre preuve de paiement a bien été reçue.
                  Après vérification manuelle, toutes les informations
                  seront envoyées à :
                </p>

                <p className="text-yellow-400 font-bold mt-3 break-all">
                  {confirmationEmail}
                </p>

              </div>

              <div className="bg-white rounded-3xl inline-block p-4 shadow-2xl mb-6">

                <QRCodeCanvas
                  id="qr-code"
                  value={qrUrl}
                  size={220}
                  level="H"
                />

              </div>

              <button
                onClick={handleDownloadQR}
                className="mx-auto flex items-center gap-3 px-6 py-4 rounded-full bg-yellow-500 text-black font-bold uppercase tracking-widest hover:scale-105 transition-all"
              >
                <Download className="w-5 h-5" />
                Télécharger le QR
              </button>

              <button
                onClick={onSuccess}
                className="block mx-auto mt-8 text-white/40 hover:text-yellow-400 transition-all uppercase tracking-widest text-xs"
              >
                Fermer
              </button>

            </div>

          ) : step === 'method' ? (

            <div className="space-y-5">

              <p className="text-center text-white/30 uppercase tracking-[0.3em] text-[10px] mb-8">
                Choisissez votre méthode
              </p>

              {(Object.keys(paymentDetails) as PaymentMethod[]).map(
                (m) =>
                  m && (

                    <button
                      key={m}
                      onClick={() => {
                        setMethod(m);
                        setStep('email');
                      }}
                      className="group w-full p-6 rounded-3xl border border-white/10 bg-white/[0.02] hover:border-yellow-400/40 hover:bg-yellow-500/[0.04] transition-all duration-300"
                    >

                      <div className="flex items-center gap-5">

                        <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-all">
                          {methodIcons[m]}
                        </div>

                        <div className="text-left">

                          <p className="uppercase tracking-[0.2em] text-white font-bold">
                            {paymentDetails[m].label}
                          </p>

                          <p className="text-white/40 text-xs mt-1">
                            Paiement rapide • sécurisé • discret
                          </p>

                        </div>

                      </div>

                    </button>
                  )
              )}

            </div>

          ) : step === 'email' ? (

            <div className="max-w-lg mx-auto">

              <div className="text-center mb-10">

                <div className="w-16 h-16 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mx-auto mb-5">
                  <Mail className="w-8 h-8 text-yellow-400" />
                </div>

                <h3 className="text-2xl uppercase font-black tracking-[0.2em] text-yellow-400 mb-4">
                  Confirmation
                </h3>

                <p className="text-white/50 leading-relaxed">
                  Entrez votre adresse email afin de recevoir
                  vos accès après validation du paiement.
                </p>

              </div>

              <input
                type="email"
                required
                value={confirmationEmail}
                onChange={(e) =>
                  setConfirmationEmail(e.target.value)
                }
                placeholder="votre@email.com"
                className="w-full h-16 rounded-2xl bg-white/[0.03] border border-white/10 px-6 text-white outline-none focus:border-yellow-400 transition-all text-center"
              />

              <div className="flex gap-4 mt-8">

                <button
                  onClick={() => setStep('method')}
                  className="flex-1 h-14 rounded-2xl border border-white/10 text-white/40 uppercase tracking-widest text-xs hover:text-white transition-all"
                >
                  Retour
                </button>

                <button
                  disabled={!confirmationEmail.includes('@')}
                  onClick={() => setStep('upload')}
                  className="flex-[2] h-14 rounded-2xl bg-yellow-500 text-black font-black uppercase tracking-[0.2em] text-xs hover:scale-[1.02] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continuer
                </button>

              </div>

            </div>

          ) : (

            <div>

              {/* Coordonnées */}
              <div className="bg-gradient-to-b from-yellow-500/[0.08] to-transparent border border-yellow-500/20 rounded-[28px] p-7 mb-8">

                <p className="text-center uppercase tracking-[0.3em] text-[10px] text-yellow-400 mb-8">
                  {method && paymentDetails[method].label}
                </p>

                <div className="space-y-6">

                  {method &&
                    paymentDetails[method].fields.map(
                      (field, idx) => (

                        <div
                          key={idx}
                          className="bg-black/30 border border-white/5 rounded-2xl p-5"
                        >

                          <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-3">
                            {field.label}
                          </p>

                          <div className="flex items-center justify-between gap-4">

                            <div className="text-white font-mono break-all text-sm md:text-base">
                              {field.value}
                            </div>

                            <button
                              onClick={() =>
                                handleCopy(
                                  field.value,
                                  field.label
                                )
                              }
                              className="flex-shrink-0 w-11 h-11 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 flex items-center justify-center hover:scale-105 transition-all"
                            >

                              {copiedField === field.label ? (
                                <Check className="w-5 h-5" />
                              ) : (
                                <Copy className="w-5 h-5" />
                              )}

                            </button>

                          </div>

                        </div>
                      )
                    )}

                </div>

                <AnimatePresence>

                  {copiedField && (

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-5 text-center text-yellow-400 uppercase tracking-[0.3em] text-[10px]"
                    >
                      Coordonnée copiée
                    </motion.div>

                  )}

                </AnimatePresence>

                <div className="mt-8 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-5">

                  <p className="text-yellow-200 text-sm leading-relaxed">
                    {method && paymentDetails[method].instruction}
                  </p>

                </div>

              </div>

              {/* Upload */}
              <div className="mb-8">

                <p className="uppercase tracking-[0.3em] text-[10px] text-white/30 mb-5">
                  Preuve de Paiement
                </p>

                <label className={`group relative flex flex-col items-center justify-center h-52 rounded-[28px] border-2 border-dashed transition-all cursor-pointer overflow-hidden ${
                  file
                    ? 'border-yellow-400 bg-yellow-500/[0.04]'
                    : 'border-white/10 bg-white/[0.02] hover:border-yellow-400/30'
                }`}>

                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/[0.02] to-transparent" />

                  {file ? (

                    <>

                      <CheckCircle2 className="w-14 h-14 text-yellow-400 mb-4 relative z-10" />

                      <p className="relative z-10 text-yellow-400 uppercase tracking-widest text-xs px-6 text-center break-all">
                        {file.name}
                      </p>

                    </>

                  ) : (

                    <>

                      <Upload className="w-14 h-14 text-yellow-400/40 mb-4 relative z-10 group-hover:scale-110 transition-all" />

                      <p className="relative z-10 text-white/40 uppercase tracking-[0.3em] text-xs">
                        Importer une capture
                      </p>

                    </>

                  )}

                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept="image/*"
                  />

                </label>

              </div>

              {error && (

                <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-2xl p-4">

                  <p className="text-red-400 text-center text-sm">
                    {error}
                  </p>

                </div>

              )}

              <div className="flex gap-4">

                <button
                  onClick={() => setStep('email')}
                  className="flex-1 h-14 rounded-2xl border border-white/10 text-white/40 uppercase tracking-widest text-xs hover:text-white transition-all"
                >
                  Retour
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={!file || isVerifying}
                  className={`flex-[2] h-14 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all ${
                    !file || isVerifying
                      ? 'bg-white/5 text-white/20 cursor-not-allowed'
                      : 'bg-yellow-500 text-black hover:scale-[1.02]'
                  }`}
                >

                  {isVerifying ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Vérification...
                    </>
                  ) : (
                    <>
                      Valider Mon Paiement
                    </>
                  )}

                </button>

              </div>

              <p className="text-center text-white/20 uppercase tracking-[0.25em] text-[9px] mt-8 leading-relaxed">
                Vérification manuelle sous 24h.<br />
                Les accès seront envoyés après validation.
              </p>

            </div>

          )}

        </div>

      </motion.div>

    </div>
  );
}
