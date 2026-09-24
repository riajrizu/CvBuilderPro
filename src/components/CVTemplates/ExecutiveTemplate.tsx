import React from 'react';
import { CVData } from '../../types';
import {
  getFontFamilyClass,
  getFontSizeClasses,
  getLineHeightClass,
  getMarginSizeClass,
  hexToRgba
} from '../../utils/templateHelpers';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface TemplateProps {
  data: CVData;
}

export const ExecutiveTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { t } = useLanguage();
  const { personalInfo, summary, experience, education, skillCategories, projects, certifications, languages, customSections, style } = data;
  const { accentColor, fontFamily, fontSize, lineHeight, marginSize, showPhoto, visibleSections, sectionOrder } = style;

  const fontClass = getFontFamilyClass(fontFamily === 'sans' ? 'serif' : fontFamily); // Executive defaults to serif
  const sizeClasses = getFontSizeClasses(fontSize);
  const lineClass = getLineHeightClass(lineHeight);
  const marginClass = getMarginSizeClass(marginSize);

  const borderAccent = hexToRgba(accentColor, 0.4);

  const renderSectionHeader = (title: string) => (
    <div className="mb-3 text-center border-b-2 pb-1" style={{ borderColor: accentColor }}>
      <h2 className={`${sizeClasses.sectionHeader} tracking-widest uppercase font-serif text-gray-900 font-bold`}>
        {title}
      </h2>
    </div>
  );

  const renderSummary = () => (
    visibleSections.summary && summary ? (
      <div key="summary" className="break-inside-avoid">
        {renderSectionHeader(t.sectionSummary)}
        <p className={`${sizeClasses.body} text-gray-800 text-justify leading-relaxed`}>
          {summary}
        </p>
      </div>
    ) : null
  );

  const renderExperience = () => (
    visibleSections.experience && experience.length > 0 ? (
      <div key="experience" className="break-inside-avoid">
        {renderSectionHeader(t.sectionExperience)}
        <div className={lineClass}>
          {experience.map((exp) => (
            <div key={exp.id} className="space-y-1">
              <div className="flex justify-between items-baseline border-b border-gray-200 pb-0.5">
                <span className={`${sizeClasses.body} font-bold text-gray-900 font-serif`}>{exp.position}</span>
                <span className={`${sizeClasses.subText} font-semibold text-gray-700`}>
                  {exp.startDate} – {exp.current ? t.present : exp.endDate}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider" style={{ color: accentColor }}>
                <span>{exp.company}</span>
                <span className="text-gray-500 font-normal capitalize">{exp.location}</span>
              </div>
              {exp.description && <p className={`${sizeClasses.body} text-gray-700 italic`}>{exp.description}</p>}
              {exp.highlights && exp.highlights.length > 0 && (
                <ul className="list-disc list-outside pl-4 space-y-1 text-gray-800">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className={sizeClasses.body}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    ) : null
  );

  const renderSkills = () => (
    visibleSections.skills && skillCategories.length > 0 ? (
      <div key="skills" className="break-inside-avoid">
        {renderSectionHeader(t.sectionSkills)}
        <div className="space-y-2">
          {skillCategories.map((cat) => (
            <div key={cat.id} className="text-xs">
              <span className="font-bold text-gray-900 font-serif mr-2" style={{ color: accentColor }}>{cat.categoryName}:</span>
              <span className="text-gray-700">{cat.skills.map(s => s.name).join(' • ')}</span>
            </div>
          ))}
        </div>
      </div>
    ) : null
  );

  const renderEducation = () => (
    visibleSections.education && education.length > 0 ? (
      <div key="education" className="break-inside-avoid">
        {renderSectionHeader(t.sectionEducation)}
        <div className="space-y-2">
          {education.map((edu) => (
            <div key={edu.id} className="flex justify-between items-baseline">
              <div>
                <span className={`${sizeClasses.body} font-bold text-gray-900 font-serif`}>{edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}</span>
                <p className={sizeClasses.subText} style={{ color: accentColor }}>{edu.institution}</p>
              </div>
              <span className={sizeClasses.subText}>{edu.startDate} – {edu.current ? t.present : edu.endDate}</span>
            </div>
          ))}
        </div>
      </div>
    ) : null
  );

  const renderProjects = () => (
    visibleSections.projects && projects.length > 0 ? (
      <div key="projects" className="break-inside-avoid">
        {renderSectionHeader(t.sectionProjects)}
        <div className="space-y-2">
          {projects.map((p) => (
            <div key={p.id}>
              <div className="font-bold text-xs text-gray-900 flex justify-between">
                <span>{p.title}</span>
                <span className="text-gray-500 font-normal">{p.technologies?.join(', ')}</span>
              </div>
              <p className={`${sizeClasses.body} text-gray-700`}>{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    ) : null
  );

  const renderCertifications = () => (
    visibleSections.certifications && certifications.length > 0 ? (
      <div key="certifications" className="break-inside-avoid">
        {renderSectionHeader(t.sectionCertifications)}
        <div className="grid grid-cols-2 gap-2 text-xs">
          {certifications.map((c) => (
            <div key={c.id}>
              <span className="font-bold text-gray-900">{c.name}</span>
              <p className="text-gray-600">{c.issuer} ({c.issueDate})</p>
            </div>
          ))}
        </div>
      </div>
    ) : null
  );

  const renderLanguages = () => (
    visibleSections.languages && languages.length > 0 ? (
      <div key="languages" className="break-inside-avoid">
        {renderSectionHeader(t.sectionLanguages)}
        <div className="flex justify-center gap-6 text-xs font-serif">
          {languages.map((l) => (
            <span key={l.id}><strong>{l.language}:</strong> {l.proficiency}</span>
          ))}
        </div>
      </div>
    ) : null
  );

  const sectionMap: Record<string, () => React.ReactNode> = {
    summary: renderSummary,
    experience: renderExperience,
    skills: renderSkills,
    education: renderEducation,
    projects: renderProjects,
    certifications: renderCertifications,
    languages: renderLanguages
  };

  return (
    <div className={`bg-white text-gray-900 ${fontClass} ${marginClass} shadow-lg rounded-sm max-w-4xl mx-auto w-full`}>
      {/* Centered Executive Header */}
      <div className="text-center pb-4 mb-4 border-b-2" style={{ borderColor: borderAccent }}>
        {showPhoto && personalInfo.photoUrl && (
          <img
            src={personalInfo.photoUrl}
            alt={personalInfo.fullName}
            referrerPolicy="no-referrer"
            className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 shadow-sm shrink-0"
            style={{ borderColor: accentColor }}
          />
        )}
        <h1 className={`${sizeClasses.name} font-serif tracking-wide text-gray-900 uppercase`}>{personalInfo.fullName}</h1>
        <p className={`${sizeClasses.title} font-serif uppercase tracking-widest text-xs font-bold mt-1`} style={{ color: accentColor }}>
          {personalInfo.jobTitle}
        </p>

        <div className="flex flex-wrap justify-center items-center gap-3 text-xs text-gray-600 mt-3 font-sans">
          {personalInfo.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{personalInfo.location}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{personalInfo.phone}</span>}
          {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{personalInfo.email}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" />{personalInfo.linkedin}</span>}
          {personalInfo.website && <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{personalInfo.website}</span>}
        </div>
      </div>

      <div className="space-y-5">
        {sectionOrder.map((key) => sectionMap[key] ? sectionMap[key]() : null)}
      </div>
    </div>
  );
};
