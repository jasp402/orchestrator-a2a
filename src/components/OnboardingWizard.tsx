import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Lock } from 'lucide-react';
import { TurnstileWidget } from './TurnstileWidget';

const OnboardingWizard: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    ia_used: [] as string[],
    knows_a2a: 'Yes',
    project_reason: '',
    terms_accepted: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const BASE_URL = useMemo(() => (import.meta.env.MODE === 'development' ? 'http://localhost:3005' : ''), []);
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.terms_accepted) {
      setError('Debes aceptar los términos experimentales.');
      return;
    }
    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const payload = {
        ...formData,
        email: formData.email.trim().toLowerCase(),
        ia_used: formData.ia_used.join(', '),
        turnstileToken
      };
      const resp = await fetch(`${BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await resp.json();
      if (!resp.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      setTurnstileToken('');
      navigate('/login', { state: { pendingChallenge: { challengeId: data.challengeId, email: data.email } } });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
      <div className="glass-panel max-w-2xl w-full p-8 rounded-2xl border border-outline-variant/30 shadow-2xl relative">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-headline text-3xl font-bold">AITENETIA Onboarding</h2>
          <button onClick={() => navigate('/')} className="text-on-surface-variant hover:text-primary text-sm font-label uppercase tracking-widest transition-colors">
            Volver al Home
          </button>
        </div>
        <p className="text-on-surface-variant font-label uppercase tracking-widest text-xs mb-8">
          Step {step} of 3 - {step === 1 ? 'Technical Profiling' : step === 2 ? 'Project Scope' : 'Identity & Liability'}
        </p>

        {error && (
          <div className="bg-error/10 border border-error/50 text-error p-3 rounded mb-6 text-sm flex justify-between items-center">
            <span>{error}</span>
            {error.includes('Login') && (
              <button onClick={() => navigate('/login')} className="underline font-bold">Go to Login</button>
            )}
          </div>
        )}

        <form onSubmit={step === 3 ? submitForm : (e) => { e.preventDefault(); handleNext(); }}>
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div>
                <label className="block text-sm font-label uppercase text-on-surface-variant mb-4">Do you possess an API_KEY for any of these providers?</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    'OpenAI (ChatGPT)',
                    'Groq',
                    'Cerebras',
                    'Gemini',
                    'Anthropic (Claude)',
                    'Zhipu (GLM)',
                    'Mistral',
                    'Kimi (Moonshot)',
                    'OpenRouter'
                  ].map((ai) => (
                    <label key={ai} className={`flex items-center gap-3 border p-3 rounded cursor-pointer transition-colors ${formData.ia_used.includes(ai) ? 'border-primary bg-primary/10 text-primary' : 'border-outline/30 hover:border-outline text-on-surface'}`}>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={formData.ia_used.includes(ai)}
                        onChange={(e) => {
                          const newIaUsed = e.target.checked
                            ? [...formData.ia_used, ai]
                            : formData.ia_used.filter((item) => item !== ai);
                          setFormData({ ...formData, ia_used: newIaUsed });
                        }}
                      />
                      <span className="text-sm font-bold tracking-wide">{ai}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-label uppercase text-on-surface-variant mb-2">Are you familiar with A2A (Agent-to-Agent) Architecture?</label>
                <div className="flex gap-4">
                  <label className={`flex-1 border p-4 rounded cursor-pointer transition-colors ${formData.knows_a2a === 'Yes' ? 'border-primary bg-primary/10' : 'border-outline/30 hover:border-outline'}`}>
                    <input type="radio" name="a2a" value="Yes" className="hidden" onChange={() => setFormData({ ...formData, knows_a2a: 'Yes' })} checked={formData.knows_a2a === 'Yes'} />
                    <div className="text-center font-bold">Yes, intimately</div>
                  </label>
                  <label className={`flex-1 border p-4 rounded cursor-pointer transition-colors ${formData.knows_a2a === 'No' ? 'border-primary bg-primary/10' : 'border-outline/30 hover:border-outline'}`}>
                    <input type="radio" name="a2a" value="No" className="hidden" onChange={() => setFormData({ ...formData, knows_a2a: 'No' })} checked={formData.knows_a2a === 'No'} />
                    <div className="text-center font-bold">No, but eager to learn</div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div>
                <label className="block text-sm font-label uppercase text-on-surface-variant mb-2">Why do you need access to this project?</label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-surface-container border border-outline/30 rounded p-3 text-on-surface focus:border-primary outline-none resize-none"
                  placeholder="Describe your use case, synthetic agents you plan to orchestrate, or experimental goals..."
                  value={formData.project_reason}
                  onChange={(e) => setFormData({ ...formData, project_reason: e.target.value })}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-label uppercase text-on-surface-variant mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full bg-surface-container border border-outline/30 rounded p-3 text-on-surface focus:border-primary outline-none"
                    placeholder="agent@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value.trim().toLowerCase() })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-label uppercase text-on-surface-variant mb-2">Country</label>
                  <select required className="w-full bg-surface-container border border-outline/30 rounded p-3 text-on-surface focus:border-primary outline-none" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })}>
                    <option value="" disabled>Select your country...</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Spain">Spain</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Peru">Peru</option>
                    <option value="Chile">Chile</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="United States">United States</option>
                    <option value="Global Matrix / Other">Other (Global Matrix)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-label uppercase text-on-surface-variant mb-2">Password</label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    className="w-full bg-surface-container border border-outline/30 rounded p-3 text-on-surface focus:border-primary outline-none"
                    placeholder="At least 8 characters"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-label uppercase text-on-surface-variant mb-2">Confirm Password</label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    className="w-full bg-surface-container border border-outline/30 rounded p-3 text-on-surface focus:border-primary outline-none"
                    placeholder="Repeat your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </div>
              </div>

              <div className="mt-8 p-4 bg-error/5 border border-error/20 rounded-lg">
                <h4 className="flex items-center gap-2 text-error font-bold mb-2">
                  <Lock size={16} /> Experimental T&C
                </h4>
                <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                  AITENETIA is an experimental orchestration project (self-hosted). No warranty is provided regarding its availability, data integrity, or strict adherence from executed agents to absolute guidelines. Results and costs directly depend on the structural API Keys (OpenAI, Groq, etc.) provided on the backend alongside your local Docker isolation config.
                </p>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 w-4 h-4 accent-error" checked={formData.terms_accepted} onChange={(e) => setFormData({ ...formData, terms_accepted: e.target.checked })} />
                  <span className="text-sm font-medium">I accept the inherent risks, acknowledge this is experimental un-warranted software, and assume full responsibility over the agents I orchestrate.</span>
                </label>
              </div>

              <TurnstileWidget siteKey={turnstileSiteKey} onTokenChange={setTurnstileToken} />
            </div>
          )}

          <div className="flex justify-between mt-10 pt-6 border-t border-outline/10">
            {step > 1 ? (
              <button type="button" onClick={handleBack} className="px-6 py-2 border border-outline/30 rounded text-on-surface hover:bg-surface-container uppercase font-label text-sm tracking-widest">
                Back
              </button>
            ) : <div />}

            <button type="submit" disabled={loading} className="px-8 py-2 bg-primary text-on-primary font-bold uppercase font-label text-sm tracking-widest flex items-center gap-2 rounded hover:brightness-110 disabled:opacity-50">
              {loading ? 'Processing...' : step === 3 ? 'Create identity' : 'Continue'}
              {!loading && step < 3 && <ChevronRight size={16} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnboardingWizard;
