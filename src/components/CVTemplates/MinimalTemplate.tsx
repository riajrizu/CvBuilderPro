import React from 'react';
import { CVData } from '../../types';
import {
  getFontFamilyClass,
  getFontSizeClasses,
  getLineHeightClass,
  getMarginSizeClass
} from '../../utils/templateHelpers';
import { useLanguage } from '../../i18n/LanguageContext';

interface TemplateProps {
  data: CVData;
}

export const MinimalTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { t } = useLanguage();
  const { personalInfo, summary, experience, education, skillCategories, projects, visibleSections, style } = data;
  const { accentColor, fontFamily, fontSize, lineHeight, marginSize, showPhoto } = style;

  const fontClass = getFontFamilyClass(fontFamily);
  const sizeClasses = getFontSizeClasses(fontSize);
  const lineClass = getLineHeightClass(lineHeight);
  const marginClass = getMarginSizeClass(marginSize);

  return (
    <div className={`bg-white text-gray-900 ${fontClass} ${marginClass} shadow-lg rounded-sm max-w-4xl mx-auto w-full space-y-6`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2 flex-1">
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-gray-900">{personalInfo.fullName}</h1>
          <p className="text-sm uppercase tracking-widest font-semibold" style={{ color: accentColor }}>{personalInfo.jobTitle}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 pt-1">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.location && <span>• {personalInfo.location}</span>}
            {personalInfo.website && <span>• {personalInfo.website}</span>}
          </div>
        </div>
        {showPhoto && personalInfo.photoUrl && (
          <img
            src={personalInfo.photoUrl}
            alt={personalInfo.fullName}
            referrerPolicy="no-referrer"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-md object-cover grayscale contrast-125 border border-gray-200 shrink-0"
          />
        )}
      </div>

      <hr className="border-gray-200" />

      {/* Summary */}
      {visibleSections.summary && summary && (
        <div className="space-y-1">
          <h2 className="text-xs uppercase tracking-widest font-bold text-gray-400">{t.sectionSummary}</h2>
          <p className={`${sizeClasses.body} text-gray-800 leading-relaxed font-light`}>{summary}</p>
        </div>
      )}

      {/* Experience */}
      {visibleSections.experience && experience.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xs uppercase tracking-widest font-bold text-gray-400">{t.sectionExperience}</h2>
          <div className={lineClass}>
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium text-sm text-gray-900">{exp.position} — <span style={{ color: accentColor }}>{exp.company}</span></h3>
                  <span className="text-xs text-gray-400">{exp.startDate} – {exp.current ? t.present : exp.endDate}</span>
                </div>
                {exp.highlights && (
                  <ul className="list-disc list-outside pl-4 text-xs text-gray-600 space-y-1 font-light">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
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
        <div className="space-y-2">
          <h2 className="text-xs uppercase tracking-widest font-bold text-gray-400">{t.sectionEducation}</h2>
          {education.map((edu) => (
            <div key={edu.id} className="flex justify-between text-xs">
              <div>
                <span className="font-medium text-gray-900">{edu.degree}</span>
                <span className="text-gray-500">, {edu.institution}</span>
              </div>
              <span className="text-gray-400">{edu.startDate} – {edu.current ? t.present : edu.endDate}</span>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {visibleSections.skills && skillCategories.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-xs uppercase tracking-widest font-bold text-gray-400">{t.sectionSkills}</h2>
          <div className="flex flex-wrap gap-2 text-xs text-gray-700">
            {skillCategories.flatMap(c => c.skills.map(s => s.name)).join('  •  ')}
          </div>
        </div>
      )}
    </div>
  );
};
