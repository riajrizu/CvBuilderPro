import React from 'react';
import { LanguageItem } from '../../types';
import { Languages, Plus, Trash2 } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface Props {
  languages: LanguageItem[];
  onChange: (updated: LanguageItem[]) => void;
}

export const LanguagesForm: React.FC<Props> = ({ languages, onChange }) => {
  const { t } = useLanguage();

  const handleAdd = () => {
    const newItem: LanguageItem = {
      id: `lang-${Date.now()}`,
      language: '',
      proficiency: 'Fluent'
    };
    onChange([...languages, newItem]);
  };

  const handleUpdate = (id: string, field: keyof LanguageItem, value: any) => {
    onChange(languages.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  };

  const handleDelete = (id: string) => {
    onChange(languages.filter((l) => l.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Languages className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold text-gray-900">{t.languagesTitle}</h2>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-2xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          {t.addLanguage}
        </button>
      </div>

      <p className="text-xs text-gray-500">{t.languagesSubtitle}</p>

      <div className="space-y-2">
        {languages.map((lang) => (
          <div key={lang.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl bg-white shadow-2xs">
            <input
              type="text"
              value={lang.language}
              onChange={(e) => handleUpdate(lang.id, 'language', e.target.value)}
              placeholder="e.g. English, Bengali, Spanish, German"
              className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <select
              value={lang.proficiency}
              onChange={(e) => handleUpdate(lang.id, 'proficiency', e.target.value as any)}
              className="px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white font-medium text-gray-700"
            >
              <option value="Native">Native / Mother tongue</option>
              <option value="Fluent">Fluent</option>
              <option value="Advanced">Advanced</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Basic">Basic</option>
            </select>
            <button
              type="button"
              onClick={() => handleDelete(lang.id)}
              className="text-gray-400 hover:text-red-600 p-1 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
