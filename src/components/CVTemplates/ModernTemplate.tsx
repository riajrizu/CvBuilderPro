import React from 'react';
import { CVData } from '../../types';
import {
  getFontFamilyClass,
  getFontSizeClasses,
  getLineHeightClass,
  getMarginSizeClass,
  hexToRgba
} from '../../utils/templateHelpers';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink, Calendar, Award } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface TemplateProps {
  data: CVData;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { t } = useLanguage();
  const { personalInfo, summary, experience, education, skillCategories, projects, certifications, languages, customSections, style } = data;
  const { accentColor, fontFamily, fontSize, lineHeight, marginSize, showPhoto, visibleSections, sectionOrder } = style;

  const fontClass = getFontFamilyClass(fontFamily);
  const sizeClasses = getFontSizeClasses(fontSize);
  const lineClass = getLineHeightClass(lineHeight);
  const marginClass = getMarginSizeClass(marginSize);

  const lightAccentBg = hexToRgba(accentColor, 0.08);
  const borderAccentColor = hexToRgba(accentColor, 0.25);

  const renderSectionHeader = (title: string) => (
    <div className="flex items-center gap-3 mb-2.5 pb-1 border-b" style={{ borderColor: borderAccentColor }}>
      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor }} />
      <h2 className={sizeClasses.sectionHeader} style={{ color: accentColor }}>
        {title}
      </h2>
    </div>
  );

  const renderSummary = () => (
    visibleSections.summary && summary ? (
      <div key="summary" className="break-inside-avoid">
        {renderSectionHeader(t.sectionSummary)}
        <p className={`${sizeClasses.body} text-gray-700 whitespace-pre-line`}>
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
            <div key={exp.id} className="group relative pl-3 border-l-2" style={{ borderColor: borderAccentColor }}>
              <div className="flex flex-wrap justify-between items-baseline gap-1">
                <h3 className={`${sizeClasses.body} font-bold text-gray-900`}>{exp.position}</h3>
                <span className={`${sizeClasses.subText} font-medium flex items-center gap-1`}>
                  <Calendar className="w-3 h-3 text-gray-400" />
                  {exp.startDate} – {exp.current ? t.present : exp.endDate}
                </span>
              </div>
              <div className="flex flex-wrap justify-between items-center text-xs text-gray-600 mb-1 font-medium">
                <span style={{ color: accentColor }}>{exp.company}</span>
                {exp.location && <span className="text-gray-500">{exp.location}</span>}
              </div>
              {exp.description && <p className={`${sizeClasses.body} text-gray-700 mb-1.5`}>{exp.description}</p>}
              {exp.highlights && exp.highlights.length > 0 && (
                <ul className="list-disc list-outside pl-4 space-y-1 text-gray-700">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {skillCategories.map((cat) => (
            <div key={cat.id} className="p-2.5 rounded-lg border" style={{ backgroundColor: lightAccentBg, borderColor: borderAccentColor }}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-1.5">{cat.categoryName}</h4>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((s, i) => (
                  <span
                    key={i}
                    className={`inline-block ${sizeClasses.badge} font-medium rounded text-gray-800 bg-white border shadow-2xs`}
                    style={{ borderColor: borderAccentColor }}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
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
        <div className="space-y-2.5">
          {education.map((edu) => (
            <div key={edu.id} className="flex justify-between items-start">
              <div>
                <h3 className={`${sizeClasses.body} font-bold text-gray-900`}>{edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}</h3>
                <p className={`${sizeClasses.subText} font-medium`} style={{ color: accentColor }}>{edu.institution}</p>
                {edu.gpa && <p className="text-xs text-gray-500 mt-0.5">GPA: {edu.gpa}</p>}
              </div>
              <span className={`${sizeClasses.subText} font-medium text-gray-500`}>
                {edu.startDate} – {edu.current ? t.present : edu.endDate}
              </span>
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
        <div className="space-y-3">
          {projects.map((proj) => (
            <div key={proj.id} className="border-l-2 pl-3" style={{ borderColor: borderAccentColor }}>
              <div className="flex flex-wrap justify-between items-center">
                <h3 className={`${sizeClasses.body} font-bold text-gray-900 flex items-center gap-1.5`}>
                  {proj.title}
                  {proj.url && (
                    <a href={proj.url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-600">
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </h3>
              </div>
              <p className={`${sizeClasses.body} text-gray-700 mt-0.5`}>{proj.description}</p>
              {proj.technologies && proj.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {proj.technologies.map((t, i) => (
                    <span key={i} className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              )}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {certifications.map((cert) => (
            <div key={cert.id} className="flex items-start gap-2 p-2 rounded border bg-gray-50/50" style={{ borderColor: borderAccentColor }}>
              <Award className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accentColor }} />
              <div>
                <h4 className={`${sizeClasses.body} font-semibold text-gray-900`}>{cert.name}</h4>
                <p className={sizeClasses.subText}>{cert.issuer} • {cert.issueDate}</p>
              </div>
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
        <div className="flex flex-wrap gap-3">
          {languages.map((lang) => (
            <div key={lang.id} className="flex items-center gap-1.5 text-xs">
              <span className="font-bold text-gray-800">{lang.language}:</span>
              <span className="text-gray-600">{lang.proficiency}</span>
            </div>
          ))}
        </div>
      </div>
    ) : null
  );

  const renderCustomSections = () => (
    visibleSections.custom && customSections.length > 0 ? (
      <>
        {customSections.map((custom) => (
          <div key={custom.id} className="break-inside-avoid">
            {renderSectionHeader(custom.title)}
            <div className="space-y-2">
              {custom.items.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between font-bold text-xs text-gray-900">
                    <span>{item.title}</span>
                    {item.date && <span className="text-gray-500 font-normal">{item.date}</span>}
                  </div>
                  {item.subtitle && <p className="text-xs text-gray-600 font-medium">{item.subtitle}</p>}
                  {item.description && <p className={`${sizeClasses.body} text-gray-700 mt-1`}>{item.description}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </>
    ) : null
  );

  const sectionMap: Record<string, () => React.ReactNode> = {
    summary: renderSummary,
    experience: renderExperience,
    skills: renderSkills,
    education: renderEducation,
    projects: renderProjects,
    certifications: renderCertifications,
    languages: renderLanguages,
    custom: renderCustomSections
  };

  return (
    <div className={`bg-white text-gray-900 ${fontClass} ${marginClass} shadow-lg rounded-sm max-w-4xl mx-auto w-full transition-all`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b-2" style={{ borderColor: accentColor }}>
        <div className="flex items-center gap-4">
          {showPhoto && personalInfo.photoUrl && (
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              referrerPolicy="no-referrer"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 shadow-sm shrink-0"
              style={{ borderColor: accentColor }}
            />
          )}
          <div>
            <h1 className={`${sizeClasses.name} tracking-tight text-gray-900`}>{personalInfo.fullName}</h1>
            <p className={`${sizeClasses.title} font-semibold`} style={{ color: accentColor }}>{personalInfo.jobTitle}</p>
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-col gap-1.5 text-xs text-gray-600 sm:text-right">
          {personalInfo.email && (
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:underline sm:justify-end">
              <Mail className="w-3 h-3 text-gray-400" />
              <span>{personalInfo.email}</span>
            </a>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1 sm:justify-end">
              <Phone className="w-3 h-3 text-gray-400" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1 sm:justify-end">
              <MapPin className="w-3 h-3 text-gray-400" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <a href={personalInfo.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline sm:justify-end text-blue-600">
              <Globe className="w-3 h-3" />
              <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
            </a>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1 sm:justify-end">
              <Linkedin className="w-3 h-3 text-blue-700" />
              <span>{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-1 sm:justify-end">
              <Github className="w-3 h-3 text-gray-700" />
              <span>{personalInfo.github.replace(/^https?:\/\//, '')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Sections Order */}
      <div className="space-y-5 pt-2">
        {sectionOrder.map((sectionKey) => {
          const renderFn = sectionMap[sectionKey];
          return renderFn ? renderFn() : null;
        })}
      </div>
    </div>
  );
};
