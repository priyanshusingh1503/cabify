import { useState, useCallback, useEffect } from 'react';

let toastId = 0;

export function showToast(msg) {
  window.dispatchEvent(new CustomEvent('toast-show', { detail: { id: ++toastId, message: msg } }));
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ detail }) => {
    setToasts((prev) => [...prev, { id: detail.id, message: detail.message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== detail.id)), 4000);
  }, []);

  useEffect(() => {
    window.addEventListener('toast-show', addToast);
    return () => window.removeEventListener('toast-show', addToast);
  }, [addToast]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2">
      {toasts.map((t) => (
        <div key={t.id} className="bg-black text-white px-6 py-3 rounded-xl shadow-xl text-sm font-medium transition-all duration-300">
          {t.message}
        </div>
      ))}
    </div>
  );
}
