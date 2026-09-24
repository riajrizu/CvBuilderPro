import React from 'react';
import { PersonalInfo } from '../../types';
import { User, Briefcase, Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { ProfilePhotoManager } from './ProfilePhotoManager';
import { useLanguage } from '../../i18n/LanguageContext';

interface Props {
  info: PersonalInfo;
  onChange: (updated: PersonalInfo) => void;
  showPhoto?: boolean;
  onToggleShowPhoto?: (show: boolean) => void;
  onOpenLinkedInImport?: () => void;
}

export const PersonalInfoForm: React.FC<Props> = ({
  info,
  onChange,
  showPhoto = true,
  onToggleShowPhoto,
  onOpenLinkedInImport
}) => {
  const { t } = useLanguage();

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...info, [field]: value });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between pb-2 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold text-gray-900">{t.personalTitle}</h2>
        </div>

        {onOpenLinkedInImport && (
          <button
            type="button"
            onClick={onOpenLinkedInImport}
            className="text-xs font-semibold text-[#0a66c2] hover:text-[#004182] bg-blue-50/80 hover:bg-blue-100/80 px-2.5 py-1.5 rounded-lg border border-blue-200/80 flex items-center gap-1.5 transition shadow-2xs cursor-pointer"
          >
            <Linkedin className="w-3.5 h-3.5 fill-[#0a66c2]" />
            <span>{t.importLinkedIn}</span>
          </button>
        )}
      </div>

      {/* Picture Change & Upload Section */}
      <ProfilePhotoManager
        photoUrl={info.photoUrl}
        showPhoto={showPhoto}
        onPhotoChange={(newPhoto) => handleChange('photoUrl', newPhoto)}
        onToggleShowPhoto={(show) => onToggleShowPhoto?.(show)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">{t.fullName} *</label>
          <div className="relative">
            <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={info.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder={t.fullNamePlaceholder}
              className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">{t.jobTitle} *</label>
          <div className="relative">
            <Briefcase className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={info.jobTitle}
              onChange={(e) => handleChange('jobTitle', e.target.value)}
              placeholder={t.jobTitlePlaceholder}
              className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">{t.email}</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="email"
              value={info.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="alex.morgan@domain.com"
              className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">{t.phone}</label>
          <div className="relative">
            <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={info.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+1 (555) 019-2831"
              className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">{t.location}</label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={info.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder={t.locationPlaceholder}
              className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">{t.website}</label>
          <div className="relative">
            <Globe className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={info.website || ''}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="https://alexmorgan.dev"
              className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">{t.linkedin}</label>
          <div className="relative">
            <Linkedin className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={info.linkedin || ''}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              placeholder="linkedin.com/in/alexmorgan"
              className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">{t.github}</label>
          <div className="relative">
            <Github className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={info.github || ''}
              onChange={(e) => handleChange('github', e.target.value)}
              placeholder="github.com/alexmorgan"
              className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
