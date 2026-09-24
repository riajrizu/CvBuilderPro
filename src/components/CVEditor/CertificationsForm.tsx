import React from 'react';
import { CertificationItem } from '../../types';
import { Award, Plus, Trash2 } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface Props {
  certifications: CertificationItem[];
  onChange: (updated: CertificationItem[]) => void;
}

export const CertificationsForm: React.FC<Props> = ({ certifications, onChange }) => {
  const { t } = useLanguage();

  const handleAdd = () => {
    const newItem: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      issueDate: ''
    };
    onChange([...certifications, newItem]);
  };

  const handleUpdate = (id: string, field: keyof CertificationItem, value: any) => {
    onChange(certifications.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const handleDelete = (id: string) => {
    onChange(certifications.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold text-gray-900">{t.certTitle}</h2>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-2xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          {t.addCert}
        </button>
      </div>

      <p className="text-xs text-gray-500">{t.certSubtitle}</p>

      <div className="space-y-3">
        {certifications.map((cert) => (
          <div key={cert.id} className="p-3.5 border border-gray-200 rounded-xl bg-white shadow-2xs space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-gray-700">{cert.name || t.certName}</span>
              <button
                type="button"
                onClick={() => handleDelete(cert.id)}
                className="text-gray-400 hover:text-red-600 p-1 cursor-pointer"
                title="Delete Certification"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">{t.certName} *</label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => handleUpdate(cert.id, 'name', e.target.value)}
                  placeholder="e.g. AWS Certified Solutions Architect"
                  className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">{t.certIssuer} *</label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => handleUpdate(cert.id, 'issuer', e.target.value)}
                  placeholder="e.g. Amazon Web Services"
                  className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">{t.certDate}</label>
                <input
                  type="text"
                  value={cert.issueDate}
                  onChange={(e) => handleUpdate(cert.id, 'issueDate', e.target.value)}
                  placeholder="2023-05"
                  className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Credential ID (Optional)</label>
                <input
                  type="text"
                  value={cert.credentialId || ''}
                  onChange={(e) => handleUpdate(cert.id, 'credentialId', e.target.value)}
                  placeholder="AWS-83921"
                  className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
