import React from 'react';
import { EducationItem } from '../../types';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface Props {
  education: EducationItem[];
  onChange: (updated: EducationItem[]) => void;
}

export const EducationForm: React.FC<Props> = ({ education, onChange }) => {
  const { t } = useLanguage();

  const handleAdd = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      fieldOfStudy: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: ''
    };
    onChange([...education, newItem]);
  };

  const handleUpdate = (id: string, field: keyof EducationItem, value: any) => {
    onChange(
      education.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleDelete = (id: string) => {
    onChange(education.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold text-gray-900">{t.eduTitle}</h2>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-2xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          {t.addEducation}
        </button>
      </div>

      <p className="text-xs text-gray-500">{t.eduSubtitle}</p>

      {education.length === 0 ? (
        <div className="p-6 text-center border-2 border-dashed border-gray-200 rounded-xl">
          <p className="text-xs text-gray-500 mb-3">{t.emptyEduTitle}</p>
          <button
            type="button"
            onClick={handleAdd}
            className="px-3 py-1.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded-lg border border-blue-200 hover:bg-blue-100 cursor-pointer"
          >
            {t.addEducation}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {education.map((item, idx) => (
            <div key={item.id} className="p-4 border border-gray-200 rounded-xl bg-white shadow-2xs space-y-3 relative">
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span className="text-xs font-bold text-gray-700">#{idx + 1} {item.institution || t.institution}</span>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="text-gray-400 hover:text-red-600 transition p-1 cursor-pointer"
                  title={t.deleteEducation}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{t.degree} *</label>
                  <input
                    type="text"
                    value={item.degree}
                    onChange={(e) => handleUpdate(item.id, 'degree', e.target.value)}
                    placeholder={t.degreePlaceholder}
                    className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{t.fieldOfStudy}</label>
                  <input
                    type="text"
                    value={item.fieldOfStudy || ''}
                    onChange={(e) => handleUpdate(item.id, 'fieldOfStudy', e.target.value)}
                    placeholder={t.fieldPlaceholder}
                    className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{t.institution} *</label>
                  <input
                    type="text"
                    value={item.institution}
                    onChange={(e) => handleUpdate(item.id, 'institution', e.target.value)}
                    placeholder={t.institutionPlaceholder}
                    className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">{t.startDate}</label>
                    <input
                      type="text"
                      value={item.startDate}
                      onChange={(e) => handleUpdate(item.id, 'startDate', e.target.value)}
                      placeholder="2018"
                      className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">{t.endDate}</label>
                    <input
                      type="text"
                      value={item.endDate}
                      onChange={(e) => handleUpdate(item.id, 'endDate', e.target.value)}
                      placeholder="2022"
                      className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">{t.gpa}</label>
                <input
                  type="text"
                  value={item.gpa || ''}
                  onChange={(e) => handleUpdate(item.id, 'gpa', e.target.value)}
                  placeholder="e.g. 3.8 / 4.0"
                  className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
