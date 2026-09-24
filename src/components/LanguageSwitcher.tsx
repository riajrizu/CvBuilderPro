import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Globe } from 'lucide-react';

interface Props {
  className?: string;
  compact?: boolean;
}

export const LanguageSwitcher: React.FC<Props> = ({ className = '', compact = false }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`inline-flex items-center p-1 rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-inner ${className}`}
      role="group"
      aria-label="Language selector"
    >
      <div className="pl-1.5 pr-1.5 text-slate-400 flex items-center shrink-0">
        <Globe className="w-3.5 h-3.5 text-blue-400" />
      </div>

      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all duration-150 cursor-pointer flex items-center gap-1 ${
          language === 'en'
            ? 'bg-blue-600 text-white shadow-xs scale-100 ring-1 ring-blue-400/50'
            : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
        }`}
        title="Switch to English"
        aria-pressed={language === 'en'}
      >
        <span>ENG</span>
      </button>

      <button
        type="button"
        onClick={() => setLanguage('bn')}
        className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all duration-150 cursor-pointer flex items-center gap-1 ${
          language === 'bn'
            ? 'bg-emerald-600 text-white shadow-xs scale-100 ring-1 ring-emerald-400/50'
            : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
        }`}
        title="বাংলায় পরিবর্তন করুন"
        aria-pressed={language === 'bn'}
      >
        <span>বাং (BN)</span>
      </button>
    </div>
  );
};
