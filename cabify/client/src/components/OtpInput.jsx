import { useRef, useState } from 'react';

export default function OtpInput({ onComplete }) {
  const [values, setValues] = useState(['', '', '', '']);
  const refs = useRef([]);

  const handleChange = (idx, val) => {
    const digit = val.replace(/[^0-9]/g, '').slice(0, 1);
    const next = [...values]; next[idx] = digit; setValues(next);
    if (digit && idx < 3) refs.current[idx + 1]?.focus();
    const code = next.join('');
    if (code.length === 4) onComplete?.(code);
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !values[idx] && idx > 0) {
      const next = [...values]; next[idx - 1] = ''; setValues(next);
      refs.current[idx - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && idx > 0) refs.current[idx - 1]?.focus();
    if (e.key === 'ArrowRight' && idx < 3) refs.current[idx + 1]?.focus();
  };

  return (
    <div className="flex gap-3 justify-center">
      {values.map((v, i) => (
        <input key={i} ref={(el) => (refs.current[i] = el)} type="text" inputMode="numeric" maxLength={1} value={v}
          onChange={(e) => handleChange(i, e.target.value)} onKeyDown={(e) => handleKeyDown(i, e)}
          className="w-14 h-16 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition" />
      ))}
    </div>
  );
}
