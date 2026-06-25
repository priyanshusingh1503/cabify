import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../components/Toast';

export default function Login() {
  const [view, setView] = useState('login'); // login | otp | qr | success
  const [email, setEmail] = useState('');
  const [otpValues, setOtpValues] = useState(['','','','']);
  const [timer, setTimer] = useState(30);
  const [timerActive, setTimerActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOauth, setShowOauth] = useState(false);
  const [oauthProvider, setOauthProvider] = useState('');
  const otpRefs = useRef([]);
  const intervalRef = useRef(null);
  const { loginWithOtp, confirmOtp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (timerActive && timer > 0) { intervalRef.current = setInterval(() => setTimer(t => t-1), 1000); return () => clearInterval(intervalRef.current); }
    if (timer === 0) setTimerActive(false);
  }, [timerActive, timer]);

  const handleSendOtp = async () => {
    const e = email.trim().toLowerCase();
    if (!e || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) { setErrorMsg('Enter a valid email address.'); return; }
    setErrorMsg(''); setLoading(true);
    const res = await loginWithOtp(e);
    setLoading(false);
    if (res.success) { setView('otp'); setTimer(30); setTimerActive(true); setOtpValues(['','','','']); setTimeout(() => otpRefs.current[0]?.focus(), 100); }
    else setErrorMsg(res.message || 'Failed to send OTP.');
  };

  const handleOtpChange = (idx, val) => {
    const d = val.replace(/[^0-9]/g, '').slice(0,1);
    const next = [...otpValues]; next[idx] = d; setOtpValues(next);
    if (d && idx < 3) otpRefs.current[idx+1]?.focus();
    const code = next.join('');
    if (code.length === 4) verifyOtpCode(code);
  };

  const verifyOtpCode = async (code) => {
    setLoading(true);
    const res = await confirmOtp(email, code);
    setLoading(false);
    if (res.success) { setView('success'); }
    else { setErrorMsg(res.message || 'Invalid code.'); setOtpValues(['','','','']); otpRefs.current[0]?.focus(); }
  };

  const handleResend = async () => {
    setTimer(30); setTimerActive(true);
    await loginWithOtp(email);
    showToast('New code sent!');
  };

  const triggerOauth = (provider) => {
    setOauthProvider(provider); setShowOauth(true);
    setTimeout(() => { setShowOauth(false); setView('success'); }, 2000);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: "'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}>
      <header style={{ background: '#000', height: 64, display: 'flex', alignItems: 'center', padding: '0 64px' }}>
        <span onClick={() => navigate('/')} style={{ color: '#fff', fontSize: 24, fontWeight: 500, cursor: 'pointer', letterSpacing: '-0.05em' }}>Uber</span>
      </header>
      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '64px 24px' }}>
        <div style={{ width: '100%', maxWidth: 440, position: 'relative', minHeight: 500 }}>

          {/* VIEW: LOGIN */}
          {view === 'login' && (
            <div style={{ animation: 'slideUpFade 0.4s forwards' }}>
              <h1 style={{ fontSize: 32, fontWeight: 500, lineHeight: '40px', letterSpacing: '-0.02em', marginBottom: 24 }}>What's your phone number or email?</h1>
              <div style={{ position: 'relative', width: '100%', borderRadius: 8, background: '#f6f6f6', border: '2px solid #000', overflow: 'hidden' }}>
                <input type="text" placeholder="Enter phone number or email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendOtp()} style={{ width: '100%', height: 54, border: 'none', background: 'transparent', padding: '0 16px', fontSize: 16, outline: 'none' }} />
              </div>
              {errorMsg && <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#e11900', fontSize: 14, fontWeight: 500, marginTop: 12, padding: '10px 12px', background: '#fdf2f2', borderRadius: 6, borderLeft: '3px solid #e11900' }}>{errorMsg}</div>}
              <button onClick={handleSendOtp} disabled={loading} style={{ background: '#000', color: '#fff', border: 'none', height: 54, borderRadius: 8, fontSize: 16, fontWeight: 500, cursor: 'pointer', marginTop: 16, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: loading ? 0.7 : 1 }}>{loading ? 'Sending...' : 'Continue'}</button>
              <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', margin: '20px 0' }}>
                <span style={{ flex: 1, borderBottom: '1.5px solid #e2e2e2' }}></span>
                <span style={{ padding: '0 12px', fontSize: 14, color: '#5e5e5e' }}>or</span>
                <span style={{ flex: 1, borderBottom: '1.5px solid #e2e2e2' }}></span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <button onClick={() => triggerOauth('google')} style={{ background: '#eef0f2', color: '#000', border: 'none', height: 54, borderRadius: 8, fontSize: 16, fontWeight: 500, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12 }}>
                  <svg viewBox="0 0 24 24" width="18" height="18"><path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.96 5.96 0 0 1 8.07 12.56a5.96 5.96 0 0 1 5.92-5.956c1.616 0 3.085.614 4.228 1.623l3.05-3.048A10.137 10.137 0 0 0 13.99 2.22C8.243 2.22 3.58 6.848 3.58 12.56c0 5.71 4.663 10.34 10.41 10.34 5.998 0 9.98-4.215 9.98-10.16 0-.614-.055-1.205-.156-1.776H12.24Z"/><path fill="#4285F4" d="M23.814 10.925c-.01-.358-.04-.716-.09-1.07H12.24v4.114h6.887c-.286 1.488-1.127 2.766-2.38 3.61l3.693 2.865c2.16-1.992 3.374-4.928 3.374-8.52Z"/><path fill="#FBBC05" d="M6.35 15.023A5.963 5.963 0 0 1 5.92 12.56c0-.877.164-1.716.43-2.497l-3.79-2.937a10.176 10.176 0 0 0-.02 10.871l3.81-3.027c-.22-.303-.434-.637-.62-1.047Z"/><path fill="#34A853" d="M13.99 22.9c2.72 0 5.01-.902 6.685-2.434l-3.693-2.865c-1.02.684-2.327 1.096-3.878 1.096-2.986 0-5.518-2.022-6.42-4.743l-3.81 3.027C4.697 20.316 9.027 22.9 13.99 22.9Z"/></svg>
                  <span>Continue with Google</span>
                </button>
                <button onClick={() => triggerOauth('apple')} style={{ background: '#eef0f2', color: '#000', border: 'none', height: 54, borderRadius: 8, fontSize: 16, fontWeight: 500, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12 }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.83-.98 2.94 1.07.08 2.15-.52 2.81-1.33z"/></svg>
                  <span>Continue with Apple</span>
                </button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', margin: '20px 0' }}>
                <span style={{ flex: 1, borderBottom: '1.5px solid #e2e2e2' }}></span>
                <span style={{ padding: '0 12px', fontSize: 14, color: '#5e5e5e' }}>or</span>
                <span style={{ flex: 1, borderBottom: '1.5px solid #e2e2e2' }}></span>
              </div>
              <button onClick={() => setView('qr')} style={{ background: '#eef0f2', color: '#000', border: 'none', height: 54, borderRadius: 8, fontSize: 16, fontWeight: 500, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 4 }}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h2v2h-2zm2 2h2v2h-2zm-2 2h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2zm2-2h2v2h-2z"/></svg>
                <span>Log in with QR code</span>
              </button>
              <p style={{ fontSize: 12, lineHeight: 1.6, color: '#5e5e5e', marginTop: 24 }}>You consent to receive a verification code by text or WhatsApp. Message and data rates may apply. Use code <strong>1234</strong> in mock mode.</p>
            </div>
          )}

          {/* VIEW: OTP */}
          {view === 'otp' && (
            <div style={{ animation: 'slideUpFade 0.4s forwards' }}>
              <button onClick={() => { setView('login'); clearInterval(intervalRef.current); }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: -10, marginBottom: 20, color: '#000' }}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              </button>
              <h1 style={{ fontSize: 32, fontWeight: 500, lineHeight: '40px', letterSpacing: '-0.02em', marginBottom: 8 }}>Enter the 4-digit code</h1>
              <p style={{ fontSize: 16, color: '#5e5e5e', marginBottom: 24 }}>Sent to <strong>{email}</strong></p>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, margin: '24px 0' }}>
                {otpValues.map((v, i) => (
                  <input key={i} ref={(el) => (otpRefs.current[i] = el)} type="text" maxLength={1} inputMode="numeric" value={v}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !v && i > 0) { const n = [...otpValues]; n[i-1] = ''; setOtpValues(n); otpRefs.current[i-1]?.focus(); }
                      if (e.key === 'ArrowLeft' && i > 0) otpRefs.current[i-1]?.focus();
                      if (e.key === 'ArrowRight' && i < 3) otpRefs.current[i+1]?.focus();
                    }}
                    style={{ width: '22%', height: 64, border: `2px solid ${errorMsg ? '#e11900' : '#e2e2e2'}`, borderRadius: 8, background: '#f6f6f6', textAlign: 'center', fontSize: 24, fontWeight: 600, outline: 'none' }}
                    className="otp-input" />
                ))}
              </div>
              {errorMsg && <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#e11900', fontSize: 14, fontWeight: 500, padding: '10px 12px', background: '#fdf2f2', borderRadius: 6, borderLeft: '3px solid #e11900' }}>{errorMsg}</div>}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14, marginTop: 12, color: '#5e5e5e' }}>
                {timerActive ? <span>Resend code in <strong>{timer}</strong>s</span> : <span></span>}
                <button onClick={handleResend} disabled={timerActive} style={{ background: 'none', border: 'none', color: timerActive ? '#e2e2e2' : '#000', fontFamily: 'inherit', fontWeight: 600, fontSize: 14, cursor: timerActive ? 'not-allowed' : 'pointer', textDecoration: 'underline' }}>Resend code</button>
              </div>
              <div style={{ marginTop: 40, padding: 16, background: '#f6f6f6', borderRadius: 8, fontSize: 13, color: '#5e5e5e', border: '1px dashed #e2e2e2' }}>
                <p>Tip: Enter any 4 numbers (e.g. 1 2 3 4) to sign in.</p>
              </div>
              {loading && <p style={{ textAlign: 'center', marginTop: 12, fontSize: 14, color: '#5e5e5e' }}>Verifying...</p>}
            </div>
          )}

          {/* VIEW: QR */}
          {view === 'qr' && (
            <div style={{ animation: 'slideUpFade 0.4s forwards' }}>
              <button onClick={() => setView('login')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: -10, marginBottom: 20, color: '#000' }}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              </button>
              <h1 style={{ fontSize: 32, fontWeight: 500, lineHeight: '40px', letterSpacing: '-0.02em', marginBottom: 8 }}>Log in with QR code</h1>
              <p style={{ fontSize: 16, color: '#5e5e5e', marginBottom: 24 }}>Scan this code with your mobile device's camera to log in instantly.</p>
              <div style={{ width: 240, height: 240, border: '2px solid #000', borderRadius: 12, alignSelf: 'center', margin: '32px auto', position: 'relative', overflow: 'hidden', background: '#f6f6f6', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 24, boxShadow: '0 8px 30px rgba(0,0,0,0.05)' }}>
                <div style={{ position: 'absolute', left: 0, width: '100%', height: 3, background: 'linear-gradient(to right, transparent, #000, transparent)', animation: 'laserScan 3s ease-in-out infinite', zIndex: 10 }}></div>
                <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', color: '#000' }}>
                  <path d="M10 10h30v30H10z" fill="none" stroke="currentColor" strokeWidth="5"/>
                  <path d="M18 18h14v14H18z" fill="currentColor"/>
                  <path d="M60 10h30v30H60z" fill="none" stroke="currentColor" strokeWidth="5"/>
                  <path d="M68 18h14v14H68z" fill="currentColor"/>
                  <path d="M10 60h30v30H10z" fill="none" stroke="currentColor" strokeWidth="5"/>
                  <path d="M18 68h14v14H18z" fill="currentColor"/>
                  <rect x="70" y="70" width="10" height="10" fill="currentColor"/>
                  <rect x="45" y="15" width="5" height="5" fill="currentColor"/>
                  <rect x="50" y="20" width="5" height="5" fill="currentColor"/>
                  <rect x="45" y="45" width="10" height="5" fill="currentColor"/>
                  <rect x="80" y="45" width="5" height="5" fill="currentColor"/>
                  <rect x="45" y="60" width="5" height="5" fill="currentColor"/>
                </svg>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, fontSize: 14, color: '#5e5e5e', marginTop: 12 }}>
                <span style={{ width: 8, height: 8, background: '#000', borderRadius: '50%', animation: 'pulse 1.5s infinite ease-in-out' }}></span>
                <span>Waiting for scan...</span>
              </div>
            </div>
          )}

          {/* VIEW: SUCCESS */}
          {view === 'success' && (
            <div style={{ animation: 'slideUpFade 0.4s forwards' }}>
              <div style={{ width: 120, height: 120, alignSelf: 'center', margin: '48px auto 32px' }}>
                <svg viewBox="0 0 100 100" style={{ width: 100, height: 100, display: 'block', strokeWidth: 4, stroke: '#059669', strokeMiterlimit: 10, margin: '0 auto' }}>
                  <circle cx="50" cy="50" r="45" fill="none" strokeWidth="4" stroke="#059669" strokeDasharray="283" strokeDashoffset="0"/>
                  <path fill="none" d="M25 52 l17 17 l33 -34" strokeWidth="4" stroke="#059669" strokeLinecap="round" strokeDasharray="98" strokeDashoffset="0"/>
                </svg>
              </div>
              <h1 style={{ fontSize: 32, fontWeight: 500, textAlign: 'center' }}>Welcome back!</h1>
              <p style={{ fontSize: 16, color: '#5e5e5e', textAlign: 'center', marginBottom: 24 }}>You have successfully logged in with {email}.</p>
              <button onClick={() => navigate('/dashboard')} style={{ background: '#000', color: '#fff', border: 'none', height: 54, borderRadius: 8, fontSize: 16, fontWeight: 500, cursor: 'pointer', width: '100%' }}>Go to Uber Dashboard</button>
            </div>
          )}

        </div>
      </main>

      {/* OAuth Modal */}
      {showOauth && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 16 }}>
          <div style={{ background: '#fff', width: '100%', maxWidth: 400, borderRadius: 12, boxShadow: '0 12px 40px rgba(0,0,0,0.15)', padding: '32px 24px 24px', position: 'relative', animation: 'slideUpFade 0.4s forwards' }}>
            <button onClick={() => setShowOauth(false)} style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', fontSize: 24, cursor: 'pointer', color: '#5e5e5e', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&times;</button>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>Sign in with {oauthProvider === 'google' ? 'Google' : 'Apple'}</h2>
              <p style={{ fontSize: 14, color: '#5e5e5e' }}>to continue to Uber Clone</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 0', gap: 16 }}>
              <div style={{ width: 36, height: 36, border: '3px solid #e2e2e2', borderTop: '3px solid #000', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
              <p>Connecting to Uber...</p>
            </div>
            <footer style={{ fontSize: 11, lineHeight: 1.5, color: '#5e5e5e', borderTop: '1px solid #e2e2e2', paddingTop: 16 }}>To continue, {oauthProvider === 'google' ? 'Google' : 'Apple'} will share your name, email address, language preference, and profile picture with Uber.</footer>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUpFade { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes laserScan { 0% { top:0%; } 50% { top:100%; } 100% { top:0%; } }
        @keyframes pulse { 0%,100% { transform:scale(0.8); opacity:0.5; } 50% { transform:scale(1.2); opacity:1; } }
        @keyframes spin { 0% { transform:rotate(0deg); } 100% { transform:rotate(360deg); } }
      `}</style>
    </div>
  );
}
