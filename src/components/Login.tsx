import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:3001' : '';
      const resp = await fetch(`${BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await resp.json();
      
      if (!resp.ok) {
        throw new Error(data.error || 'Authentication offline');
      }

      localStorage.setItem('aitenetia_user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
      <div className="glass-panel max-w-md w-full p-8 rounded-2xl border border-outline-variant/30 shadow-2xl">
        
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center bg-primary/10">
            <span className="material-symbols-outlined text-primary">fingerprint</span>
          </div>
        </div>

        <h2 className="font-headline text-3xl font-bold text-center mb-2">Authentication</h2>
        <p className="text-on-surface-variant text-center font-label uppercase tracking-widest text-xs mb-8">
          AITENETIA Core Access
        </p>

        {error && (
          <div className="bg-error/10 border border-error/50 text-error p-3 rounded mb-6 text-sm flex gap-2">
             <ShieldAlert size={18} className="shrink-0"/>
             <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-label uppercase text-on-surface-variant mb-2">Registered Email Address</label>
            <input 
              type="email" required
              className="w-full bg-surface-container border border-outline/30 rounded p-3 text-on-surface focus:border-primary outline-none"
              placeholder="operator@domain.com"
              value={email}
              onChange={e => setEmail(e.target.value.trim())}
            />
          </div>

          <button type="submit" disabled={loading} className="w-full py-4 bg-primary text-on-primary font-bold uppercase font-label tracking-widest rounded hover:brightness-110 disabled:opacity-50 transition-all">
            {loading ? 'Authenticating...' : 'Access Dashboard'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-on-surface-variant">
          Orquestador nuevo? <button onClick={() => navigate('/onboarding')} className="text-primary hover:underline font-bold">Inicia el Onboarding</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
