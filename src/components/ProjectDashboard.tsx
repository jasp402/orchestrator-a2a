import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, KeyRound, LogOut, RefreshCw, ShieldCheck } from 'lucide-react';

type SessionUser = {
  id: string;
  email: string;
  license?: {
    id: string;
    key: string;
    status: string;
    plan: string;
    expires_at: string | null;
    last_validated_at: string | null;
  } | null;
};

const ProjectDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [keyLoading, setKeyLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const BASE_URL = useMemo(() => (import.meta.env.MODE === 'development' ? 'http://localhost:3005' : ''), []);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const resp = await fetch(`${BASE_URL}/api/session`, { credentials: 'include' });
        const data = await resp.json();
        if (!resp.ok || !data?.authenticated) {
          navigate('/login');
          return;
        }
        setUser(data.user);
        setApiKey(data.user.license?.key || data.user.project_api_key || null);
      } catch {
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    bootstrap();
  }, [BASE_URL, navigate]);

  const generateKey = async () => {
    setKeyLoading(true);
    setError('');
    try {
      const resp = await fetch(`${BASE_URL}/api/generate-key`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({})
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Failed to generate key');
      setApiKey(data.apiKey);
      setUser((current) => current ? { ...current, license: data.license } : current);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setKeyLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLogout = async () => {
    await fetch(`${BASE_URL}/api/logout`, { method: 'POST', credentials: 'include' }).catch(() => null);
    navigate('/login');
  };

  if (loading) return <div className="min-h-screen hero-gradient flex items-center justify-center">Loading core...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <header className="border-b border-outline-variant/10 bg-surface-container py-4 px-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
            <span className="font-label text-primary font-bold text-xs">A2A</span>
          </div>
          <span className="font-headline font-bold text-xl tracking-widest">AITENETIA</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-sm font-mono text-on-surface-variant">{user.email}</span>
          <button onClick={handleLogout} className="flex items-center gap-2 text-error text-sm font-bold uppercase tracking-widest hover:opacity-80 transition-opacity">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto px-8 py-16 max-w-4xl">
        <div className="mb-12">
          <h1 className="font-headline text-4xl font-bold mb-4">Project Architecture Key</h1>
          <p className="text-on-surface-variant text-lg">
            This panel issues the activation key that your local AITENETIA runtime must use to unlock orchestration, container deployment, and model execution.
          </p>
        </div>

        {error && <div className="mb-6 rounded-xl border border-error/40 bg-error/10 px-4 py-3 text-sm text-error">{error}</div>}

        <div className="glass-panel border border-outline-variant/20 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
            <ShieldCheck size={200} />
          </div>

          <div className="relative z-10">
            <h3 className="text-xl font-headline font-bold mb-8 flex items-center gap-3">
              <span className="p-2 rounded bg-primary/10 text-primary"><KeyRound size={20} /></span>
              Primary Activation Key
            </h3>

            {apiKey ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-label uppercase text-on-surface-variant mb-2">Secret token</label>
                  <div className="flex gap-4">
                    <input type="text" readOnly value={apiKey} className="w-full bg-surface-container-highest border border-outline/50 rounded-lg px-4 py-4 font-mono text-lg text-primary focus:outline-none" />
                    <button onClick={copyToClipboard} className="shrink-0 px-6 bg-surface-container border border-outline/50 rounded-lg hover:border-primary transition-colors flex items-center gap-2">
                      {copied ? <span className="text-secondary font-bold">Copied!</span> : <><Copy size={18} /> Copy</>}
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl border border-outline/20 bg-surface-container/40 p-4">
                    <div className="text-xs uppercase tracking-widest text-on-surface-variant">Status</div>
                    <div className="mt-2 text-lg font-bold text-on-surface">{user.license?.status || 'active'}</div>
                  </div>
                  <div className="rounded-xl border border-outline/20 bg-surface-container/40 p-4">
                    <div className="text-xs uppercase tracking-widest text-on-surface-variant">Plan</div>
                    <div className="mt-2 text-lg font-bold text-on-surface">{user.license?.plan || 'pro'}</div>
                  </div>
                  <div className="rounded-xl border border-outline/20 bg-surface-container/40 p-4">
                    <div className="text-xs uppercase tracking-widest text-on-surface-variant">Last validation</div>
                    <div className="mt-2 text-sm font-bold text-on-surface">{user.license?.last_validated_at ? new Date(user.license.last_validated_at).toLocaleString() : 'Not used yet'}</div>
                  </div>
                </div>

                <div className="pt-6 border-t border-outline-variant/10 flex justify-between items-center">
                  <p className="text-xs text-on-surface-variant max-w-sm">
                    Re-generating the key revokes the previous activation path for all local runtimes still using it.
                  </p>
                  <button onClick={generateKey} disabled={keyLoading} className="flex items-center gap-2 text-error text-sm font-bold uppercase tracking-widest hover:bg-error/10 px-4 py-2 rounded transition-colors disabled:opacity-50">
                    <RefreshCw size={16} className={keyLoading ? 'animate-spin' : ''} /> Revoke & Regenerate
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-outline-variant/20 rounded-xl bg-surface-container/30">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                  <KeyRound size={24} />
                </div>
                <h4 className="text-lg font-bold mb-2">No active key found</h4>
                <p className="text-on-surface-variant text-sm mb-6 max-w-md mx-auto">
                  Generate your activation key to unlock the local AITENETIA runtime and validate against the remote licensing webhook.
                </p>
                <button onClick={generateKey} disabled={keyLoading} className="bg-primary text-on-primary font-bold uppercase tracking-widest px-8 py-3 rounded shadow-[0_0_20px_rgba(161,250,255,0.3)] hover:scale-105 transition-all">
                  {keyLoading ? 'Crunching...' : 'Generate Activation Key'}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDashboard;

