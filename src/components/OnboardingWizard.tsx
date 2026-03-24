import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Lock } from 'lucide-react';

const OnboardingWizard: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    country: '',
    ia_used: 'OpenAI GPT-4o',
    knows_a2a: 'Yes',
    project_reason: '',
    terms_accepted: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleNext = () => setStep(s => Math.min(s + 1, 3));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.terms_accepted) {
      setError('Debes aceptar los términos experimentales.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:3001' : '';
      const resp = await fetch(`${BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await resp.json();
      
      if (!resp.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Store basic user session locally
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
      <div className="glass-panel max-w-2xl w-full p-8 rounded-2xl border border-outline-variant/30 shadow-2xl relative">
        <h2 className="font-headline text-3xl font-bold mb-2">AITENETIA Onboarding</h2>
        <p className="text-on-surface-variant font-label uppercase tracking-widest text-xs mb-8">
          Step {step} of 3 • {step === 1 ? 'Technical Profiling' : step === 2 ? 'Project Scope' : 'Access & Liability'}
        </p>

        {error && (
          <div className="bg-error/10 border border-error/50 text-error p-3 rounded mb-6 text-sm flex justify-between items-center">
             <span>{error}</span>
             {error.includes('Login') && (
                <button onClick={() => navigate('/login')} className="underline font-bold">Ir a Login</button>
             )}
          </div>
        )}

        <form onSubmit={step === 3 ? submitForm : (e) => { e.preventDefault(); handleNext(); }}>
          
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div>
                <label className="block text-sm font-label uppercase text-on-surface-variant mb-2">Primary AI Provider you intend to use</label>
                <select 
                  className="w-full bg-surface-container border border-outline/30 rounded p-3 text-on-surface focus:border-primary outline-none"
                  value={formData.ia_used}
                  onChange={e => setFormData({...formData, ia_used: e.target.value})}
                >
                  <option>OpenAI (GPT-4o-mini / GPT-4o)</option>
                  <option>Anthropic (Claude 3.5 Sonnet)</option>
                  <option>Gemini (Flash / Pro)</option>
                  <option>Groq (Llama 3)</option>
                  <option>Mistral</option>
                  <option>Other / OpenRouter</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-label uppercase text-on-surface-variant mb-2">Are you familiar with A2A (Agent-to-Agent) Architecture?</label>
                <div className="flex gap-4">
                  <label className={`flex-1 border p-4 rounded cursor-pointer transition-colors ${formData.knows_a2a === 'Yes' ? 'border-primary bg-primary/10' : 'border-outline/30 hover:border-outline'}`}>
                    <input type="radio" name="a2a" value="Yes" className="hidden" 
                      onChange={() => setFormData({...formData, knows_a2a: 'Yes'})} 
                      checked={formData.knows_a2a === 'Yes'}/>
                    <div className="text-center font-bold">Yes, intimately</div>
                  </label>
                  <label className={`flex-1 border p-4 rounded cursor-pointer transition-colors ${formData.knows_a2a === 'No' ? 'border-primary bg-primary/10' : 'border-outline/30 hover:border-outline'}`}>
                    <input type="radio" name="a2a" value="No" className="hidden" 
                      onChange={() => setFormData({...formData, knows_a2a: 'No'})}
                      checked={formData.knows_a2a === 'No'}/>
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
                  onChange={e => setFormData({...formData, project_reason: e.target.value})}
                ></textarea>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-label uppercase text-on-surface-variant mb-2">Email Address</label>
                  <input 
                    type="email" required
                    className="w-full bg-surface-container border border-outline/30 rounded p-3 text-on-surface focus:border-primary outline-none"
                    placeholder="agent@domain.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value.trim()})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-label uppercase text-on-surface-variant mb-2">Country</label>
                  <select 
                    required
                    className="w-full bg-surface-container border border-outline/30 rounded p-3 text-on-surface focus:border-primary outline-none"
                    value={formData.country}
                    onChange={e => setFormData({...formData, country: e.target.value})}
                  >
                    <option value="" disabled>Selecciona tu país...</option>
                    <option value="Mexico">México</option>
                    <option value="Spain">España</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Peru">Perú</option>
                    <option value="Chile">Chile</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="United States">United States</option>
                    <option value="Global Matrix / Other">Otro (Global Matrix)</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 p-4 bg-error/5 border border-error/20 rounded-lg">
                <h4 className="flex items-center gap-2 text-error font-bold mb-2">
                  <Lock size={16}/> Experimental T&C
                </h4>
                <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                  AITENETIA es un proyecto experimental de orquestación (self-hosted). No se ofrece ninguna garantía sobre su disponibilidad, integridad de datos, o que los agentes ejecutados obedezcan directrices absolutas. Tus resultados y costos dependerán directamente de la API Key (OpenAI, Groq, etc.) que proporciones posteriormente en el backend y de tu configuración de aislamiento Docker local.
                </p>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 accent-error"
                    checked={formData.terms_accepted}
                    onChange={e => setFormData({...formData, terms_accepted: e.target.checked})}
                  />
                  <span className="text-sm font-medium">Acepto los riesgos inherentes, reconozco que esto es un software experimental sin garantías, y asumo toda la responsabilidad de los agentes que orqueste.</span>
                </label>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-10 pt-6 border-t border-outline/10">
            {step > 1 ? (
              <button type="button" onClick={handleBack} className="px-6 py-2 border border-outline/30 rounded text-on-surface hover:bg-surface-container uppercase font-label text-sm tracking-widest">
                Back
              </button>
            ) : <div/>}

            <button type="submit" disabled={loading} className="px-8 py-2 bg-primary text-on-primary font-bold uppercase font-label text-sm tracking-widest flex items-center gap-2 rounded hover:brightness-110 disabled:opacity-50">
              {loading ? 'Processing...' : step === 3 ? 'Deploy Identity' : 'Continue'} 
              {!loading && step < 3 && <ChevronRight size={16}/>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnboardingWizard;
