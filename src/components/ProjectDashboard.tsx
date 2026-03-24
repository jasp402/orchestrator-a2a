import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, ShieldCheck, LogOut, Copy, RefreshCw } from 'lucide-react';

const ProjectDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('aitenetia_user');
    if (!session) {
      navigate('/login');
      return;
    }
    const parsedUser = JSON.parse(session);
    setUser(parsedUser);
    if (parsedUser.project_api_key) {
      setApiKey(parsedUser.project_api_key);
    }
  }, [navigate]);

  const generateKey = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:3001' : '';
      const resp = await fetch(`${BASE_URL}/api/generate-key`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id })
      });
      const data = await resp.json();
      if (resp.ok) {
        setApiKey(data.apiKey);
        // Update local session
        const updatedUser = { ...user, project_api_key: data.apiKey };
        localStorage.setItem('aitenetia_user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (error) {
      console.error(error);
      alert('Error connecting to core logic.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('aitenetia_user');
    navigate('/');
  };

  if (!user) return <div className="min-h-screen hero-gradient flex items-center justify-center">Loading core...</div>;

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Nano Header */}
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
            <LogOut size={16}/> Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-8 py-16 max-w-4xl">
        <div className="mb-12">
          <h1 className="font-headline text-4xl font-bold mb-4">Project Architecture Keys</h1>
          <p className="text-on-surface-variant text-lg">
            This dashboard guarantees isolated generation of your global AITENETIA project key. Inject this key inside your local `.env` file to authorize agent scaling and LLM allocation.
          </p>
        </div>

        <div className="glass-panel border border-outline-variant/20 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
          
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
            <ShieldCheck size={200} />
          </div>

          <div className="relative z-10">
            <h3 className="text-xl font-headline font-bold mb-8 flex items-center gap-3">
              <span className="p-2 rounded bg-primary/10 text-primary"><KeyRound size={20}/></span>
              Primary API Key
            </h3>

            {apiKey ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-label uppercase text-on-surface-variant mb-2">Secret Token (Do not share publicly)</label>
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      readOnly 
                      value={apiKey} 
                      className="w-full bg-surface-container-highest border border-outline/50 rounded-lg px-4 py-4 font-mono text-lg text-primary focus:outline-none"
                    />
                    <button 
                      onClick={copyToClipboard}
                      className="shrink-0 px-6 bg-surface-container border border-outline/50 rounded-lg hover:border-primary transition-colors flex items-center gap-2"
                    >
                      {copied ? <span className="text-secondary font-bold">Copied!</span> : <><Copy size={18}/> Copy</>}
                    </button>
                  </div>
                </div>
                <div className="pt-6 border-t border-outline-variant/10 flex justify-between items-center">
                  <p className="text-xs text-on-surface-variant max-w-sm">
                    Warning: Re-generating the key will instantly tear down and invalidate any existing runtimes globally connected with the old key.
                  </p>
                  <button 
                    onClick={generateKey}
                    disabled={loading}
                    className="flex items-center gap-2 text-error text-sm font-bold uppercase tracking-widest hover:bg-error/10 px-4 py-2 rounded transition-colors disabled:opacity-50"
                  >
                    <RefreshCw size={16} className={loading ? "animate-spin" : ""}/> Revoke & Regenerate
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-outline-variant/20 rounded-xl bg-surface-container/30">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                  <KeyRound size={24}/>
                </div>
                <h4 className="text-lg font-bold mb-2">No active API Key found</h4>
                <p className="text-on-surface-variant text-sm mb-6 max-w-md mx-auto">
                  Initialize your project footprint by generating a cryptographic master key. This allows the orchestrator to deploy containers on your machine.
                </p>
                <button 
                  onClick={generateKey}
                  disabled={loading}
                  className="bg-primary text-on-primary font-bold uppercase tracking-widest px-8 py-3 rounded shadow-[0_0_20px_rgba(161,250,255,0.3)] hover:scale-105 transition-all"
                >
                  {loading ? 'Crunching...' : 'Generate New API_KEY'}
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
