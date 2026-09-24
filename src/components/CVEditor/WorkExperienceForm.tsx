import React, { useState } from 'react';
import { ExperienceItem } from '../../types';
import { Briefcase, Plus, Trash2, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface Props {
  experience: ExperienceItem[];
  onChange: (updated: ExperienceItem[]) => void;
  onPolishBullet?: (bullet: string, role: string, company: string, onApply: (newBullet: string) => void) => void;
}

export const WorkExperienceForm: React.FC<Props> = ({ experience, onChange, onPolishBullet }) => {
  const { t } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>(experience[0]?.id || null);

  const handleAdd = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      highlights: ['']
    };
    onChange([...experience, newItem]);
    setExpandedId(newItem.id);
  };

  const handleUpdate = (id: string, field: keyof ExperienceItem, value: any) => {
    onChange(
      experience.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleDelete = (id: string) => {
    onChange(experience.filter((item) => item.id !== id));
  };

  const handleHighlightChange = (expId: string, index: number, text: string) => {
    const exp = experience.find((e) => e.id === expId);
    if (!exp) return;
    const newHighlights = [...exp.highlights];
    newHighlights[index] = text;
    handleUpdate(expId, 'highlights', newHighlights);
  };

  const handleAddHighlight = (expId: string) => {
    const exp = experience.find((e) => e.id === expId);
    if (!exp) return;
    handleUpdate(expId, 'highlights', [...exp.highlights, '']);
  };

  const handleDeleteHighlight = (expId: string, index: number) => {
    const exp = experience.find((e) => e.id === expId);
    if (!exp) return;
    const newHighlights = exp.highlights.filter((_, i) => i !== index);
    handleUpdate(expId, 'highlights', newHighlights);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold text-gray-900">{t.expTitle}</h2>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-2xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          {t.addPosition}
        </button>
      </div>

      <p className="text-xs text-gray-500">{t.expSubtitle}</p>

      {experience.length === 0 ? (
        <div className="p-6 text-center border-2 border-dashed border-gray-200 rounded-xl">
          <p className="text-xs text-gray-500 mb-3">{t.emptyExpTitle}</p>
          <button
            type="button"
            onClick={handleAdd}
            className="px-3 py-1.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded-lg border border-blue-200 hover:bg-blue-100 cursor-pointer"
          >
            {t.addPosition}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {experience.map((item, idx) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className="border border-gray-200 rounded-xl bg-white shadow-2xs overflow-hidden transition"
              >
                {/* Accordion Bar */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="flex items-center justify-between p-3.5 bg-gray-50 hover:bg-gray-100/80 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div>
                      <h3 className="text-xs font-bold text-gray-900">
                        {item.position || t.positionTitle}
                      </h3>
                      <p className="text-[11px] text-gray-500">
                        {item.company || t.companyName} {item.startDate ? `(${item.startDate} - ${item.current ? t.present : item.endDate || ''})` : ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                      className="p-1 text-gray-400 hover:text-red-600 transition cursor-pointer"
                      title={t.deletePosition}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                  </div>
                </div>

                {/* Form Fields */}
                {isExpanded && (
                  <div className="p-4 space-y-3 border-t border-gray-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">{t.positionTitle} *</label>
                        <input
                          type="text"
                          value={item.position}
                          onChange={(e) => handleUpdate(item.id, 'position', e.target.value)}
                          placeholder={t.positionPlaceholder}
                          className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">{t.companyName} *</label>
                        <input
                          type="text"
                          value={item.company}
                          onChange={(e) => handleUpdate(item.id, 'company', e.target.value)}
                          placeholder={t.companyPlaceholder}
                          className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">{t.locationWork}</label>
                        <input
                          type="text"
                          value={item.location}
                          onChange={(e) => handleUpdate(item.id, 'location', e.target.value)}
                          placeholder="e.g. San Francisco, CA / Remote"
                          className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">{t.startDate}</label>
                        <input
                          type="text"
                          value={item.startDate}
                          onChange={(e) => handleUpdate(item.id, 'startDate', e.target.value)}
                          placeholder="e.g. 2021-03 or Mar 2021"
                          className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">{t.endDate}</label>
                        <input
                          type="text"
                          disabled={item.current}
                          value={item.current ? t.present : item.endDate}
                          onChange={(e) => handleUpdate(item.id, 'endDate', e.target.value)}
                          placeholder="e.g. 2024-01 or Present"
                          className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100 disabled:text-gray-500"
                        />
                      </div>

                      <div className="flex items-center pt-5">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={item.current}
                            onChange={(e) => handleUpdate(item.id, 'current', e.target.checked)}
                            className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                          />
                          <span className="text-xs font-medium text-gray-700">{t.currentWork}</span>
                        </label>
                      </div>
                    </div>

                    {/* Bullet Points */}
                    <div className="pt-2 border-t border-gray-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-gray-700">{t.responsibilitiesTitle}</label>
                        <button
                          type="button"
                          onClick={() => handleAddHighlight(item.id)}
                          className="text-[11px] text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          {t.addBullet}
                        </button>
                      </div>

                      {item.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2">
                          <span className="text-gray-400 mt-2 text-xs">•</span>
                          <textarea
                            value={h}
                            rows={2}
                            onChange={(e) => handleHighlightChange(item.id, hIdx, e.target.value)}
                            placeholder={t.bulletPlaceholder}
                            className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-y"
                          />
                          {onPolishBullet && (
                            <button
                              type="button"
                              onClick={() => {
                                onPolishBullet(h, item.position, item.company, (improved) => {
                                  handleHighlightChange(item.id, hIdx, improved);
                                });
                              }}
                              className="p-1.5 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded transition cursor-pointer"
                              title="Polish with AI"
                            >
                              <Sparkles className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteHighlight(item.id, hIdx)}
                            className="p-1.5 text-gray-400 hover:text-red-600 transition cursor-pointer"
                            title="Delete bullet"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
