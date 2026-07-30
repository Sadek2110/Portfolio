import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', nextTheme);
    setTheme(nextTheme);
  };

  // Render a placeholder matching button size to prevent layout shifts
  if (theme === null) {
    return (
      <div className="w-[44px] h-[44px] border-2 border-zinc-950 dark:border-zinc-50 bg-white dark:bg-zinc-900 shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#fafafa]"></div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Alternar tema de color"
      className="p-2.5 border-2 border-zinc-950 dark:border-zinc-50 bg-white dark:bg-zinc-900 shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#fafafa] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#18181b] dark:hover:shadow-[4px_4px_0px_0px_#fafafa] active:translate-x-0 active:translate-y-0 active:shadow-[1px_1px_0px_0px_#18181b] dark:active:shadow-[1px_1px_0px_0px_#fafafa] transition-all duration-200 cursor-pointer flex items-center justify-center"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-yellow-500 fill-yellow-500 transition-transform duration-300 hover:scale-110" />
      ) : (
        <Moon className="w-5 h-5 text-zinc-950 transition-transform duration-300 hover:scale-110" />
      )}
    </button>
  );
}
