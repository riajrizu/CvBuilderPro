import React from 'react';
import { CVData } from '../../types';
import {
  getFontFamilyClass,
  getFontSizeClasses,
  getLineHeightClass,
  getMarginSizeClass,
  hexToRgba
} from '../../utils/templateHelpers';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Code, Terminal, GitBranch, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface TemplateProps {
  data: CVData;
}

export const TechTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { t } = useLanguage();
  const { personalInfo, summary, experience, education, skillCategories, projects, certifications, languages, style } = data;
  const { accentColor, fontFamily, fontSize, lineHeight, marginSize, showPhoto, visibleSections, sectionOrder } = style;

  const fontClass = getFontFamilyClass(fontFamily === 'sans' ? 'mono' : fontFamily); // Tech theme defaults to mono or clean sans
  const sizeClasses = getFontSizeClasses(fontSize);
  const lineClass = getLineHeightClass(lineHeight);
  const marginClass = getMarginSizeClass(marginSize);

  const bgHeader = hexToRgba(accentColor, 0.06);
  const borderAccent = hexToRgba(accentColor, 0.3);

  const renderSectionHeader = (title: string, icon: React.ReactNode) => (
    <div className="flex items-center gap-2 mb-3 pb-1 border-b" style={{ borderColor: borderAccent }}>
      <span style={{ color: accentColor }}>{icon}</span>
      <h2 className={`${sizeClasses.sectionHeader} font-mono font-bold tracking-wider uppercase text-gray-900`}>
        {title}
      </h2>
    </div>
  );

  const renderSummary = () => (
    visibleSections.summary && summary ? (
      <div key="summary" className="break-inside-avoid">
        {renderSectionHeader('// System.Summary', <Terminal className="w-4 h-4" />)}
        <p className={`${sizeClasses.body} text-gray-800 bg-gray-50 p-3 rounded-md border font-mono text-xs leading-relaxed`} style={{ borderColor: borderAccent }}>
          {summary}
        </p>
      </div>
    ) : null
  );

  const renderExperience = () => (
    visibleSections.experience && experience.length > 0 ? (
      <div key="experience" className="break-inside-avoid">
        {renderSectionHeader('// Experience.Log', <Code className="w-4 h-4" />)}
        <div className={lineClass}>
          {experience.map((exp) => (
            <div key={exp.id} className="relative pl-4 border-l-2" style={{ borderColor: accentColor }}>
              <div className="flex flex-wrap justify-between items-baseline">
                <h3 className={`${sizeClasses.body} font-bold text-gray-900`}>{exp.position}</h3>
                <span className="text-xs font-mono text-gray-500">
                  [{exp.startDate} :: {exp.current ? t.present : exp.endDate}]
                </span>
              </div>
              <p className="text-xs font-mono font-semibold" style={{ color: accentColor }}>
                @{exp.company} {exp.location ? `(${exp.location})` : ''}
              </p>
              {exp.highlights && exp.highlights.length > 0 && (
                <ul className="list-none space-y-1 text-gray-700 mt-1.5">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className={`${sizeClasses.body} flex items-start gap-1.5`}>
                      <span className="text-gray-400 font-mono font-bold">$</span>
                      <span>{h}</span>
                    </li>
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
        {renderSectionHeader('// Stack.Capabilities', <GitBranch className="w-4 h-4" />)}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {skillCategories.map((cat) => (
            <div key={cat.id} className="p-2.5 rounded bg-slate-900 text-white font-mono text-xs">
              <span className="text-emerald-400 font-bold block mb-1.5">$ {cat.categoryName}</span>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((s, i) => (
                  <span key={i} className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded text-[11px] border border-slate-700">
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
        {renderSectionHeader('// Education.Credentials', <Terminal className="w-4 h-4" />)}
        <div className="space-y-2">
          {education.map((edu) => (
            <div key={edu.id} className="flex justify-between items-start font-mono">
              <div>
                <h3 className={`${sizeClasses.body} font-bold text-gray-900`}>{edu.degree}</h3>
                <p className="text-xs" style={{ color: accentColor }}>{edu.institution}</p>
              </div>
              <span className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</span>
            </div>
          ))}
        </div>
      </div>
    ) : null
  );

  const renderProjects = () => (
    visibleSections.projects && projects.length > 0 ? (
      <div key="projects" className="break-inside-avoid">
        {renderSectionHeader('// Repositories.Featured', <Code className="w-4 h-4" />)}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {projects.map((p) => (
            <div key={p.id} className="p-3 border rounded-lg bg-gray-50/70" style={{ borderColor: borderAccent }}>
              <div className="flex justify-between items-start">
                <h3 className="font-mono font-bold text-xs text-gray-900">{p.title}</h3>
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-gray-600 hover:text-black">
                    <Github className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
              <p className="text-xs text-gray-600 mt-1 font-sans">{p.description}</p>
              {p.technologies && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {p.technologies.map((t, i) => (
                    <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-200">
                      #{t}
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

  const sectionMap: Record<string, () => React.ReactNode> = {
    summary: renderSummary,
    experience: renderExperience,
    skills: renderSkills,
    education: renderEducation,
    projects: renderProjects
  };

  return (
    <div className={`bg-white text-gray-900 ${fontClass} ${marginClass} shadow-lg rounded-sm max-w-4xl mx-auto w-full`}>
      {/* Header */}
      <div className="p-4 rounded-lg border mb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" style={{ backgroundColor: bgHeader, borderColor: borderAccent }}>
        <div className="flex items-center gap-3.5">
          {showPhoto && personalInfo.photoUrl && (
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              referrerPolicy="no-referrer"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover border-2 shadow-2xs shrink-0"
              style={{ borderColor: accentColor }}
            />
          )}
          <div>
            <h1 className={`${sizeClasses.name} font-mono font-extrabold text-gray-900 tracking-tight`}>
              {personalInfo.fullName}
            </h1>
            <p className="font-mono text-sm font-bold mt-0.5" style={{ color: accentColor }}>
              &lt;{personalInfo.jobTitle} /&gt;
            </p>
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-col gap-1 text-xs font-mono text-gray-600 sm:text-right">
          {personalInfo.email && <span className="flex items-center gap-1 sm:justify-end"><Mail className="w-3 h-3" />{personalInfo.email}</span>}
          {personalInfo.github && <span className="flex items-center gap-1 sm:justify-end"><Github className="w-3 h-3" />{personalInfo.github}</span>}
          {personalInfo.location && <span className="flex items-center gap-1 sm:justify-end"><MapPin className="w-3 h-3" />{personalInfo.location}</span>}
        </div>
      </div>

      <div className="space-y-5">
        {sectionOrder.map((key) => sectionMap[key] ? sectionMap[key]() : null)}
      </div>
    </div>
  );
};
