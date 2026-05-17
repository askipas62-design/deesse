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

  // ✅ CORRECTION ICI
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetailsMap>({
    wero: {
      label: "Wero",
      fields: [
        { label: "Numéro", value: "0780948256" },
        { label: "Nom", value: "DARDAI A****" }
      ],
      instruction:
        "Effectuez votre paiement via Wero vers ce numéro de téléphone."
    },

    crypto: {
      label: "Crypto (LTC - Litecoin)",
      fields: [
        {
          label: "Adresse LTC",
          value: "ltc1qtclzqfsk8wjyn99asx7h37n403mxmc24889247"
        }
      ],
      instruction:
        "Envoyez le paiement en Litecoin (LTC) uniquement sur cette adresse."
    },

    virement: {
      label: "Virement Instantané",
      fields: [
        {
          label: "IBAN",
          value: "FR76 1723 8000 0100 4006 0933 413"
        },
        {
          label: "BIC",
          value: "SCSYFRP2"
        },
        {
          label: "Nom du Bénéficiaire",
          value: "CHARLINE FAUSTINE BUHOT"
        }
      ],
      instruction:
        "IMPORTANT: Vérifiez soigneusement les informations du bénéficiaire."
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
        console.error("Failed to fetch payment info", err);
      }
    };

    fetchPaymentInfo();
  }, []);

  // ✅ CORRECTION ICI
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
      console.error(err);

      setError(
        err.response?.data?.error ||
        "Une erreur est survenue."
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
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={isDone ? undefined : onClose}
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-xl w-full bg-[#111] border border-yellow-500/20 rounded-3xl p-8"
      >

        {!isDone && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/40 hover:text-yellow-400"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        <div className="text-center mb-8">
          <h2 className="text-2xl uppercase tracking-widest text-yellow-400 font-bold">
            Finaliser mon Pass
          </h2>

          <p className="text-white/70 mt-2">
            {tierName} — {price}
          </p>
        </div>

        {isDone ? (

          <div className="space-y-6 text-center">

            <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-yellow-400" />
            </div>

            <h3 className="text-2xl text-yellow-400 font-bold uppercase">
              Paiement Envoyé
            </h3>

            <p className="text-white/60 text-sm">
              Votre preuve de paiement a bien été envoyée.
            </p>

            <div className="bg-white p-3 rounded-xl inline-block">
              <QRCodeCanvas
                id="qr-code"
                value={qrUrl}
                size={180}
              />
            </div>

            <button
              onClick={handleDownloadQR}
              className="flex items-center gap-2 mx-auto text-yellow-400"
            >
              <Download className="w-4 h-4" />
              Télécharger le QR
            </button>

            <button
              onClick={onSuccess}
              className="text-white/40 hover:text-yellow-400"
            >
              Fermer
            </button>

          </div>

        ) : step === 'method' ? (

          <div className="space-y-4">

            {(Object.keys(paymentDetails) as PaymentMethod[]).map(
              (m) =>
                m && (
                  <button
                    key={m}
                    onClick={() => {
                      setMethod(m);
                      setStep('email');
                    }}
                    className="w-full flex items-center gap-4 p-5 rounded-2xl border border-white/10 hover:border-yellow-400/40 transition-all"
                  >

                    <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-400">
                      {methodIcons[m]}
                    </div>

                    <div className="text-left">
                      <p className="text-white uppercase tracking-widest">
                        {paymentDetails[m].label}
                      </p>

                      <p className="text-white/40 text-xs">
                        Paiement sécurisé
                      </p>
                    </div>

                  </button>
                )
            )}

          </div>

        ) : step === 'email' ? (

          <div className="space-y-6">

            <div className="text-center">
              <Mail className="w-12 h-12 text-yellow-400 mx-auto mb-4" />

              <p className="text-white/60">
                Entrez votre email de confirmation
              </p>
            </div>

            <input
              type="email"
              value={confirmationEmail}
              onChange={(e) =>
                setConfirmationEmail(e.target.value)
              }
              placeholder="votre@email.com"
              className="w-full bg-black border border-white/10 rounded-full py-4 px-6 text-white text-center outline-none focus:border-yellow-400"
            />

            <div className="flex gap-4">

              <button
                onClick={() => setStep('method')}
                className="flex-1 py-4 border border-white/10 rounded-full text-white/50"
              >
                Retour
              </button>

              <button
                disabled={
                  !confirmationEmail.includes('@')
                }
                onClick={() => setStep('upload')}
                className="flex-[2] bg-yellow-500 text-black py-4 rounded-full font-bold disabled:opacity-50"
              >
                Continuer
              </button>

            </div>

          </div>

        ) : (

          <div className="space-y-8">

            <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-6">

              <p className="text-center text-yellow-400 uppercase tracking-widest text-xs mb-6">
                {method && paymentDetails[method].label}
              </p>

              <div className="space-y-5">

                {method &&
                  paymentDetails[method].fields.map(
                    (field, idx) => (

                      <div
                        key={idx}
                        className="flex flex-col items-center"
                      >

                        <span className="text-white/40 text-xs uppercase mb-2">
                          {field.label}
                        </span>

                        <div className="flex items-center gap-3">

                          <div className="text-white font-mono break-all">
                            {field.value}
                          </div>

                          {/* ✅ CORRECTION ICI */}
                          <button
                            onClick={() =>
                              handleCopy(
                                field.value,
                                field.label
                              )
                            }
                            className="p-2 rounded-full bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition-all"
                          >

                            {/* ✅ CORRECTION ICI */}
                            {copiedField === field.label ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
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
                    className="mt-5 text-center text-xs text-yellow-400 uppercase tracking-widest"
                  >
                    Information copiée
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            <div className="space-y-4">

              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:border-yellow-400/30 transition-all">

                {file ? (
                  <>
                    <CheckCircle2 className="w-10 h-10 text-yellow-400 mb-3" />
                    <p className="text-yellow-400 text-xs uppercase">
                      {file.name}
                    </p>
                  </>
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-yellow-400/40 mb-3" />
                    <p className="text-white/40 uppercase text-sm">
                      Choisir un fichier
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
              <p className="text-red-500 text-center text-xs uppercase">
                {error}
              </p>
            )}

            <div className="flex gap-4">

              <button
                onClick={() => setStep('email')}
                className="flex-1 py-4 border border-white/10 rounded-full text-white/50"
              >
                Retour
              </button>

              <button
                onClick={handleSubmit}
                disabled={!file || isVerifying}
                className={`flex-[2] py-4 rounded-full font-bold uppercase tracking-widest flex items-center justify-center gap-2 ${
                  !file || isVerifying
                    ? 'bg-white/5 text-white/20 cursor-not-allowed'
                    : 'bg-yellow-500 text-black'
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

          </div>

        )}

      </motion.div>

    </div>
  );
}
