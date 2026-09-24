import React from 'react';
import { CVStyleConfig, TemplateType, FontFamily, FontSizeScale, MarginSizeScale } from '../../types';
import { Palette, Layout, Type, Eye, Check } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface Props {
  style: CVStyleConfig;
  onChange: (updated: CVStyleConfig) => void;
}

const ACCENT_COLORS = [
  { label: 'Royal Blue', hex: '#2563eb' },
  { label: 'Slate Gray', hex: '#1e293b' },
  { label: 'Emerald Green', hex: '#059669' },
  { label: 'Deep Violet', hex: '#7c3aed' },
  { label: 'Crimson Red', hex: '#b91c1c' },
  { label: 'Amber Orange', hex: '#d97706' },
  { label: 'Teal Blue', hex: '#0d9488' },
  { label: 'Rose Pink', hex: '#e11d48' },
];

export const StyleCustomizer: React.FC<Props> = ({ style, onChange }) => {
  const { t, language } = useLanguage();

  const TEMPLATE_CARDS: { id: TemplateType; title: string; desc: string }[] = [
    {
      id: 'modern',
      title: language === 'bn' ? 'মডার্ন ক্লিন' : 'Modern Clean',
      desc: language === 'bn' ? 'আধুনিক লেআউট, রাউন্ডেড ব্যাজ ও এক্সেন্ট বার' : 'Contemporary layout with rounded badges and accent headers'
    },
    {
      id: 'executive',
      title: language === 'bn' ? 'এক্সিকিউটিভ এলিট' : 'Executive Elite',
      desc: language === 'bn' ? 'সেরিফ ফর্মাল স্টাইল ও সেন্টারড হেডার' : 'Serif formal style with centered header and divider bars'
    },
    {
      id: 'creative',
      title: language === 'bn' ? 'ক্রিয়েটিভ স্প্লিট' : 'Creative Split',
      desc: language === 'bn' ? '২-কলাম লেআউট ও সাইডবার' : '2-column layout with left colored sidebar for contacts & skills'
    },
    {
      id: 'tech',
      title: language === 'bn' ? 'টেকনিক্যাল প্রো' : 'Technical Pro',
      desc: language === 'bn' ? 'কোড ও ডেভেলপার ফ্রেন্ডলি লেআউট' : 'Code-inspired layout with repo badges & tech stack tags'
    },
    {
      id: 'minimal',
      title: language === 'bn' ? 'নর্ডিক মিনিমাল' : 'Nordic Minimal',
      desc: language === 'bn' ? 'মার্জিত স্পেসিং ও পরিচ্ছন্ন টাইপোগ্রাফি' : 'Generous white space, fine hairline borders, clean typography'
    },
  ];

  const SECTION_LABELS: Record<string, string> = {
    summary: t.summaryTitle,
    experience: t.tabExperience,
    skills: t.tabSkills,
    education: t.tabEducation,
    projects: t.tabProjects,
    certifications: t.certTitle,
    languages: t.languagesTitle,
    custom: language === 'bn' ? 'কাস্টম সেকশন' : 'Custom Sections'
  };

  const updateField = <K extends keyof CVStyleConfig>(field: K, value: CVStyleConfig[K]) => {
    onChange({ ...style, [field]: value });
  };

  const toggleSection = (key: string) => {
    onChange({
      ...style,
      visibleSections: {
        ...style.visibleSections,
        [key]: !style.visibleSections[key]
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 pb-1 border-b border-gray-200">
          <Layout className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold text-gray-900">{t.styleTitle}</h2>
        </div>
        <p className="text-xs text-gray-500">{t.styleSubtitle}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {TEMPLATE_CARDS.map((tc) => {
            const isSelected = style.template === tc.id;
            return (
              <div
                key={tc.id}
                onClick={() => updateField('template', tc.id)}
                className={`p-3 rounded-xl border-2 cursor-pointer transition flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/60 shadow-2xs'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-xs text-gray-900">{tc.title}</span>
                    {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                  </div>
                  <p className="text-[11px] text-gray-500 leading-tight">{tc.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Color Swatches */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 pb-1 border-b border-gray-200">
          <Palette className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold text-gray-900">{t.accentColorLabel}</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {ACCENT_COLORS.map((color) => {
            const isSelected = style.accentColor === color.hex;
            return (
              <button
                key={color.hex}
                type="button"
                onClick={() => updateField('accentColor', color.hex)}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition cursor-pointer ${
                  isSelected ? 'border-gray-900 scale-110 shadow-sm' : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.label}
              >
                {isSelected && <Check className="w-4 h-4 text-white drop-shadow-xs" />}
              </button>
            );
          })}
          <div className="flex items-center gap-1.5 ml-2 pl-2 border-l border-gray-200">
            <span className="text-xs text-gray-500 font-medium">Custom:</span>
            <input
              type="color"
              value={style.accentColor}
              onChange={(e) => updateField('accentColor', e.target.value)}
              className="w-7 h-7 rounded cursor-pointer border border-gray-300"
            />
          </div>
        </div>
      </div>

      {/* Typography & Sizing */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 pb-1 border-b border-gray-200">
          <Type className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold text-gray-900">{t.typographyLabel}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Font Family */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">{t.typographyLabel}</label>
            <select
              value={style.fontFamily}
              onChange={(e) => updateField('fontFamily', e.target.value as FontFamily)}
              className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="sans">Modern Sans (Plus Jakarta)</option>
              <option value="serif">Classic Serif (Playfair / Merriweather)</option>
              <option value="mono">Technical Mono (JetBrains Code)</option>
            </select>
          </div>

          {/* Font Scale */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">{t.fontSizeLabel}</label>
            <select
              value={style.fontSize}
              onChange={(e) => updateField('fontSize', e.target.value as FontSizeScale)}
              className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="compact">{t.fontSmall}</option>
              <option value="standard">{t.fontMedium}</option>
              <option value="large">{t.fontLarge}</option>
            </select>
          </div>

          {/* Margins */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">{t.marginsLabel}</label>
            <select
              value={style.marginSize}
              onChange={(e) => updateField('marginSize', e.target.value as MarginSizeScale)}
              className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="compact">{t.compact}</option>
              <option value="standard">{t.normal}</option>
              <option value="spacious">{t.spacious}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section Visibility */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 pb-1 border-b border-gray-200">
          <Eye className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold text-gray-900">
            {language === 'bn' ? 'সেকশন দৃশ্যমানতা কন্ট্রোল' : 'Section Visibility Toggles'}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.entries(style.visibleSections).map(([key, isVisible]) => (
            <button
              key={key}
              type="button"
              onClick={() => toggleSection(key)}
              className={`flex items-center justify-between p-2.5 rounded-lg border text-xs font-semibold transition cursor-pointer ${
                isVisible
                  ? 'border-blue-200 bg-blue-50/70 text-blue-900'
                  : 'border-gray-200 bg-gray-50 text-gray-400 line-through'
              }`}
            >
              <span className="capitalize">{SECTION_LABELS[key] || key}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${isVisible ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {isVisible ? 'ON' : 'OFF'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Profile Photo Toggle */}
      <div className="flex items-center gap-3 pt-2">
        <input
          type="checkbox"
          id="photoToggle"
          checked={style.showPhoto}
          onChange={(e) => updateField('showPhoto', e.target.checked)}
          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
        />
        <label htmlFor="photoToggle" className="text-xs font-semibold text-gray-800 cursor-pointer">
          {t.showPhotoLabel}
        </label>
      </div>
    </div>
  );
};
