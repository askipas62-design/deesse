import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'motion/react';
import { Save, Lock, Smartphone, Bitcoin, Banknote, Plus, Trash2, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

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

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [data, setData] = useState<PaymentDetailsMap | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/payment-info');
        setData(response.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setMessage({ type: 'error', text: "Impossible de charger les données" });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app we'd verify with the server, but for simplicity we'll check on save
    setIsLoggedIn(true);
  };

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    setMessage(null);
    try {
      const response = await axios.post('/api/payment-info', {
        password,
        data
      });
      setMessage({ type: 'success', text: "Mise à jour réussie !" });
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.error || "Erreur lors de la sauvegarde" 
      });
    } finally {
      setSaving(false);
    }
  };

  const updateField = (method: string, index: number, value: string) => {
    if (!data) return;
    const newData = { ...data };
    newData[method].fields[index].value = value;
    setData(newData);
  };

  const updateInstruction = (method: string, value: string) => {
    if (!data) return;
    const newData = { ...data };
    newData[method].instruction = value;
    setData(newData);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-black">
        <Loader2 className="w-10 h-10 text-brand-gold animate-spin" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-black p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full glass-card p-10 border-brand-gold/30"
        >
          <div className="text-center mb-8">
            <Lock className="w-12 h-12 text-brand-gold mx-auto mb-4" />
            <h2 className="text-2xl gold-gradient-text font-display uppercase tracking-widest">Sanctuaire Admin</h2>
            <p className="text-white/40 text-[10px] uppercase tracking-widest mt-2">Accès réservé à la Déesse</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe secret"
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-white text-center focus:border-brand-gold/50 outline-none transition-all"
            />
            <button className="gold-btn w-full">Entrer</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl gold-gradient-text font-display uppercase tracking-[0.2em]">Dashboard Paiements</h1>
            <p className="text-white/40 text-xs uppercase tracking-widest mt-2">Gérez les informations visibles par vos fidèles</p>
          </div>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="gold-btn flex items-center gap-3 px-8 justify-center disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Sauvegarder les changements
          </button>
        </div>

        {message && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={`p-4 rounded-xl mb-8 flex items-center gap-3 border ${
              message.type === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}
          >
            {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="text-sm font-medium uppercase tracking-wider">{message.text}</span>
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-12">
          {data && (Object.entries(data) as [string, PaymentMethodInfo][]).map(([key, info]) => (
            <motion.div 
              key={key}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card p-8 border-brand-gold/20 relative group"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                  {key === 'wero' && <Smartphone className="w-6 h-6" />}
                  {key === 'crypto' && <Bitcoin className="w-6 h-6" />}
                  {key === 'virement' && <Banknote className="w-6 h-6" />}
                </div>
                <h3 className="text-xl font-display uppercase tracking-widest text-white">{info.label}</h3>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {info.fields.map((field, idx) => (
                    <div key={idx} className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-brand-gold ml-1 font-bold">{field.label}</label>
                      <input 
                        type="text"
                        value={field.value}
                        onChange={(e) => updateField(key, idx, e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-brand-gold/40 outline-none transition-all font-mono text-sm"
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-brand-gold ml-1 font-bold">Instruction / Note</label>
                  <textarea 
                    value={info.instruction}
                    onChange={(e) => updateInstruction(key, e.target.value)}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-brand-gold/40 outline-none transition-all text-sm italic font-serif"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 text-center border-t border-white/5 pt-12">
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/20">Propulsé par la Force Divine</p>
        </div>
      </div>
    </div>
  );
}
