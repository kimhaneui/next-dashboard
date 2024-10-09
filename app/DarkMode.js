'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DarkMode() {
  const router = useRouter();
  const [mode, setMode] = useState('light');

  useEffect(() => {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('mode='));
    const currentMode = cookie ? cookie.split('=')[1] : 'light';

    // 쿠키가 없을 때 초기값 설정
    if (!cookie) {
      document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400);
    }
    setMode(currentMode);
  }, []);

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    document.cookie = `mode=${newMode}; max-age=${3600 * 24 * 400}`;
    setMode(newMode);
    router.refresh();
  };

  return (
    <span onClick={toggleMode}>
      {mode === 'light' ? '🌙' : '☀️'}
    </span>
  );
}
