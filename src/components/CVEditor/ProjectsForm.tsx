import React from 'react';
import { ProjectItem } from '../../types';
import { FolderGit2, Plus, Trash2 } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface Props {
  projects: ProjectItem[];
  onChange: (updated: ProjectItem[]) => void;
}

export const ProjectsForm: React.FC<Props> = ({ projects, onChange }) => {
  const { t } = useLanguage();

  const handleAdd = () => {
    const newItem: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: '',
      description: '',
      technologies: [],
      url: '',
      githubUrl: ''
    };
    onChange([...projects, newItem]);
  };

  const handleUpdate = (id: string, field: keyof ProjectItem, value: any) => {
    onChange(projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleDelete = (id: string) => {
    onChange(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <FolderGit2 className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold text-gray-900">{t.projectsTitle}</h2>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-2xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          {t.addProject}
        </button>
      </div>

      <p className="text-xs text-gray-500">{t.projectsSubtitle}</p>

      <div className="space-y-3">
        {projects.map((proj, idx) => (
          <div key={proj.id} className="p-4 border border-gray-200 rounded-xl bg-white shadow-2xs space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <span className="text-xs font-bold text-gray-700">#{idx + 1} {proj.title || t.projectName}</span>
              <button
                type="button"
                onClick={() => handleDelete(proj.id)}
                className="text-gray-400 hover:text-red-600 transition p-1 cursor-pointer"
                title={t.deleteProject}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">{t.projectName} *</label>
                <input
                  type="text"
                  value={proj.title}
                  onChange={(e) => handleUpdate(proj.id, 'title', e.target.value)}
                  placeholder="e.g. CloudPulse Analytics"
                  className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">{t.techStack}</label>
                <input
                  type="text"
                  value={proj.technologies ? proj.technologies.join(', ') : ''}
                  onChange={(e) =>
                    handleUpdate(
                      proj.id,
                      'technologies',
                      e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                    )
                  }
                  placeholder={t.techStackPlaceholder}
                  className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">{t.liveUrl}</label>
                <input
                  type="text"
                  value={proj.url || ''}
                  onChange={(e) => handleUpdate(proj.id, 'url', e.target.value)}
                  placeholder="https://myproject.com"
                  className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">{t.githubUrl}</label>
                <input
                  type="text"
                  value={proj.githubUrl || ''}
                  onChange={(e) => handleUpdate(proj.id, 'githubUrl', e.target.value)}
                  placeholder="https://github.com/user/repo"
                  className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Description / Summary</label>
              <textarea
                rows={2}
                value={proj.description}
                onChange={(e) => handleUpdate(proj.id, 'description', e.target.value)}
                placeholder="Key highlights, architecture, impact..."
                className="w-full p-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
