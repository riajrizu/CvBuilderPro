import React from 'react';
import { CVData } from '../../types';
import {
  getFontFamilyClass,
  getFontSizeClasses,
  getLineHeightClass,
  hexToRgba
} from '../../utils/templateHelpers';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Award, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface TemplateProps {
  data: CVData;
}

export const CreativeTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { t } = useLanguage();
  const { personalInfo, summary, experience, education, skillCategories, projects, certifications, languages, style } = data;
  const { accentColor, fontFamily, fontSize, lineHeight, showPhoto, visibleSections } = style;

  const fontClass = getFontFamilyClass(fontFamily);
  const sizeClasses = getFontSizeClasses(fontSize);
  const lineClass = getLineHeightClass(lineHeight);

  // Background for left sidebar using dark theme or accent hue
  const sidebarBg = accentColor;
  const lightText = 'text-white';

  return (
    <div className={`bg-white text-gray-900 ${fontClass} shadow-lg rounded-sm max-w-4xl mx-auto w-full flex flex-col md:flex-row overflow-hidden min-h-[900px]`}>
      {/* Left Sidebar */}
      <div className="w-full md:w-1/3 p-6 text-white space-y-6 flex-shrink-0" style={{ backgroundColor: sidebarBg }}>
        {/* Profile / Contact */}
        <div className="text-center md:text-left space-y-3">
          {showPhoto && personalInfo.photoUrl && (
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              referrerPolicy="no-referrer"
              className="w-24 h-24 rounded-full mx-auto md:mx-0 object-cover border-4 border-white/30 shadow-md shrink-0"
            />
          )}
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight leading-tight">{personalInfo.fullName}</h1>
            <p className="text-sm font-medium text-white/80 mt-1">{personalInfo.jobTitle}</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 text-xs text-white/90 pt-3 border-t border-white/20">
          <h3 className="text-xs uppercase tracking-wider font-bold text-white/70 mb-2">{t.sectionContact}</h3>
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 shrink-0 opacity-80" />
              <span className="truncate">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 shrink-0 opacity-80" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 shrink-0 opacity-80" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 shrink-0 opacity-80" />
              <span className="truncate">{personalInfo.website.replace(/^https?:\/\//, '')}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin className="w-3.5 h-3.5 shrink-0 opacity-80" />
              <span className="truncate">{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {visibleSections.skills && skillCategories.length > 0 && (
          <div className="pt-3 border-t border-white/20 space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-bold text-white/70">{t.sectionSkills}</h3>
            {skillCategories.map((cat) => (
              <div key={cat.id} className="space-y-1">
                <p className="text-[11px] font-bold text-white/90">{cat.categoryName}</p>
                <div className="flex flex-wrap gap-1">
                  {cat.skills.map((s, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/15 text-white font-medium">
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {visibleSections.languages && languages.length > 0 && (
          <div className="pt-3 border-t border-white/20 space-y-2">
            <h3 className="text-xs uppercase tracking-wider font-bold text-white/70">{t.sectionLanguages}</h3>
            {languages.map((l) => (
              <div key={l.id} className="flex justify-between text-xs">
                <span className="font-semibold">{l.language}</span>
                <span className="text-white/70">{l.proficiency}</span>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {visibleSections.certifications && certifications.length > 0 && (
          <div className="pt-3 border-t border-white/20 space-y-2">
            <h3 className="text-xs uppercase tracking-wider font-bold text-white/70">{t.sectionCertifications}</h3>
            {certifications.map((c) => (
              <div key={c.id} className="text-xs">
                <p className="font-semibold text-white">{c.name}</p>
                <p className="text-white/70 text-[10px]">{c.issuer}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Main Content Column */}
      <div className="w-full md:w-2/3 p-6 sm:p-8 space-y-6">
        {/* Summary */}
        {visibleSections.summary && summary && (
          <div>
            <h2 className="text-xs uppercase tracking-wider font-extrabold text-gray-900 border-b pb-1 mb-2" style={{ borderColor: accentColor }}>
              {t.sectionSummary}
            </h2>
            <p className={`${sizeClasses.body} text-gray-700 leading-relaxed`}>{summary}</p>
          </div>
        )}

        {/* Experience */}
        {visibleSections.experience && experience.length > 0 && (
          <div>
            <h2 className="text-xs uppercase tracking-wider font-extrabold text-gray-900 border-b pb-1 mb-3" style={{ borderColor: accentColor }}>
              {t.sectionExperience}
            </h2>
            <div className={lineClass}>
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className={`${sizeClasses.body} font-bold text-gray-900`}>{exp.position}</h3>
                    <span className="text-xs font-semibold text-gray-500">
                      {exp.startDate} – {exp.current ? t.present : exp.endDate}
                    </span>
                  </div>
                  <p className="text-xs font-semibold" style={{ color: accentColor }}>{exp.company} • {exp.location}</p>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-outside pl-4 space-y-1 text-gray-700 mt-1">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className={sizeClasses.body}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {visibleSections.education && education.length > 0 && (
          <div>
            <h2 className="text-xs uppercase tracking-wider font-extrabold text-gray-900 border-b pb-1 mb-3" style={{ borderColor: accentColor }}>
              {t.sectionEducation}
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className={`${sizeClasses.body} font-bold text-gray-900`}>{edu.degree}</h3>
                    <p className="text-xs font-semibold" style={{ color: accentColor }}>{edu.institution}</p>
                  </div>
                  <span className="text-xs text-gray-500">{edu.startDate} – {edu.current ? t.present : edu.endDate}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {visibleSections.projects && projects.length > 0 && (
          <div>
            <h2 className="text-xs uppercase tracking-wider font-extrabold text-gray-900 border-b pb-1 mb-3" style={{ borderColor: accentColor }}>
              {t.sectionProjects}
            </h2>
            <div className="space-y-2">
              {projects.map((p) => (
                <div key={p.id}>
                  <h3 className={`${sizeClasses.body} font-bold text-gray-900`}>{p.title}</h3>
                  <p className={`${sizeClasses.body} text-gray-700`}>{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
