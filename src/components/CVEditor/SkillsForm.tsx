import React, { useState } from 'react';
import { SkillCategory } from '../../types';
import { Wrench, Plus, Trash2, X } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface Props {
  skillCategories: SkillCategory[];
  onChange: (updated: SkillCategory[]) => void;
}

export const SkillsForm: React.FC<Props> = ({ skillCategories, onChange }) => {
  const { t } = useLanguage();
  const [newCatName, setNewCatName] = useState('');

  const handleAddCategory = () => {
    if (!newCatName.trim()) return;
    const newCat: SkillCategory = {
      id: `cat-${Date.now()}`,
      categoryName: newCatName.trim(),
      skills: []
    };
    onChange([...skillCategories, newCat]);
    setNewCatName('');
  };

  const handleDeleteCategory = (catId: string) => {
    onChange(skillCategories.filter((c) => c.id !== catId));
  };

  const handleAddSkill = (catId: string, skillName: string) => {
    if (!skillName.trim()) return;
    onChange(
      skillCategories.map((c) => {
        if (c.id === catId) {
          if (c.skills.some((s) => s.name.toLowerCase() === skillName.trim().toLowerCase())) return c;
          return { ...c, skills: [...c.skills, { name: skillName.trim(), level: 4 }] };
        }
        return c;
      })
    );
  };

  const handleDeleteSkill = (catId: string, skillName: string) => {
    onChange(
      skillCategories.map((c) => {
        if (c.id === catId) {
          return { ...c, skills: c.skills.filter((s) => s.name !== skillName) };
        }
        return c;
      })
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Wrench className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold text-gray-900">{t.skillsTitle}</h2>
        </div>
      </div>

      <p className="text-xs text-gray-500">{t.skillsSubtitle}</p>

      {/* Add New Category */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newCatName}
          onChange={(e) => setNewCatName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
          placeholder={t.categoryPlaceholder}
          className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          type="button"
          onClick={handleAddCategory}
          className="px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-1 shrink-0 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          {t.addCategory}
        </button>
      </div>

      {/* Existing Categories */}
      <div className="space-y-3">
        {skillCategories.map((cat) => (
          <div key={cat.id} className="p-3.5 border border-gray-200 rounded-xl bg-white shadow-2xs space-y-2.5">
            <div className="flex justify-between items-center">
              <input
                type="text"
                value={cat.categoryName}
                onChange={(e) =>
                  onChange(
                    skillCategories.map((c) => (c.id === cat.id ? { ...c, categoryName: e.target.value } : c))
                  )
                }
                className="font-bold text-xs text-gray-900 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 outline-none px-1 py-0.5"
              />
              <button
                type="button"
                onClick={() => handleDeleteCategory(cat.id)}
                className="text-gray-400 hover:text-red-600 p-1 transition cursor-pointer"
                title={t.deleteCategory}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Skills Pills */}
            <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 bg-gray-50 rounded-lg border border-gray-100">
              {cat.skills.map((s, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-white border border-gray-200 rounded-md text-gray-800 shadow-2xs"
                >
                  {s.name}
                  <button
                    type="button"
                    onClick={() => handleDeleteSkill(cat.id, s.name)}
                    className="text-gray-400 hover:text-red-600 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {cat.skills.length === 0 && (
                <span className="text-xs text-gray-400 italic py-0.5">No skills yet</span>
              )}
            </div>

            {/* Add Skill Input */}
            <SkillInputOnEnter
              placeholder={t.skillNamePlaceholder}
              addText={t.addSkill}
              onAdd={(val) => handleAddSkill(cat.id, val)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

function SkillInputOnEnter({
  onAdd,
  placeholder,
  addText
}: {
  onAdd: (val: string) => void;
  placeholder: string;
  addText: string;
}) {
  const [val, setVal] = useState('');
  const handleAdd = () => {
    if (val.trim()) {
      onAdd(val);
      setVal('');
    }
  };

  return (
    <div className="flex gap-2 pt-1">
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleAdd();
          }
        }}
        placeholder={placeholder}
        className="flex-1 px-2.5 py-1 text-xs border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 outline-none"
      />
      <button
        type="button"
        onClick={handleAdd}
        disabled={!val.trim()}
        className="px-2.5 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-md transition disabled:opacity-40 cursor-pointer"
      >
        {addText}
      </button>
    </div>
  );
}
