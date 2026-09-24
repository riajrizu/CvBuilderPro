import React, { useState } from 'react';
import { CVData } from '../types';
import { Printer, Download, Upload, Check, FileText, FileCode, X, Linkedin } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cvData: CVData;
  onImportJson: (data: CVData) => void;
  onPrintPDF: () => void;
  onOpenLinkedInImport?: () => void;
}

export const ExportModal: React.FC<Props> = ({
  isOpen,
  onClose,
  cvData,
  onImportJson,
  onPrintPDF,
  onOpenLinkedInImport
}) => {
  const { t, language } = useLanguage();
  const [copiedText, setCopiedText] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);

  if (!isOpen) return null;

  // Export JSON
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(cvData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${cvData.personalInfo.fullName.replace(/\s+/g, '_')}_CV.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.personalInfo && parsed.style) {
          onImportJson(parsed);
          onClose();
        } else {
          alert(language === 'bn' ? 'ভুল CV JSON ফাইল ফরম্যাট।' : 'Invalid CV JSON file structure.');
        }
      } catch (err) {
        alert(language === 'bn' ? 'JSON ফাইল পার্স করা যায়নি।' : 'Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  // Convert CV to Plain Text
  const generatePlainText = () => {
    const { personalInfo, summary, experience, education, skillCategories } = cvData;
    let txt = `${personalInfo.fullName.toUpperCase()}\n`;
    txt += `${personalInfo.jobTitle}\n`;
    txt += `Email: ${personalInfo.email} | Phone: ${personalInfo.phone} | Location: ${personalInfo.location}\n`;
    if (personalInfo.website) txt += `Website: ${personalInfo.website}\n`;
    if (personalInfo.linkedin) txt += `LinkedIn: ${personalInfo.linkedin}\n`;
    if (personalInfo.github) txt += `GitHub: ${personalInfo.github}\n`;
    txt += `\n========================================\n`;
    if (summary) {
      txt += `SUMMARY\n----------------------------------------\n${summary}\n\n`;
    }
    if (experience.length > 0) {
      txt += `WORK EXPERIENCE\n----------------------------------------\n`;
      experience.forEach((e) => {
        txt += `${e.position} at ${e.company} (${e.startDate} - ${e.current ? 'Present' : e.endDate})\n`;
        if (e.highlights) {
          e.highlights.forEach((h) => (txt += `  • ${h}\n`));
        }
        txt += `\n`;
      });
    }
    if (education.length > 0) {
      txt += `EDUCATION\n----------------------------------------\n`;
      education.forEach((edu) => {
        txt += `${edu.degree} - ${edu.institution} (${edu.startDate} - ${edu.endDate})\n`;
      });
      txt += `\n`;
    }
    if (skillCategories.length > 0) {
      txt += `SKILLS\n----------------------------------------\n`;
      skillCategories.forEach((cat) => {
        txt += `${cat.categoryName}: ${cat.skills.map((s) => s.name).join(', ')}\n`;
      });
    }
    return txt;
  };

  // Convert CV to Markdown
  const generateMarkdown = () => {
    const { personalInfo, summary, experience, education, skillCategories } = cvData;
    let md = `# ${personalInfo.fullName}\n`;
    md += `### **${personalInfo.jobTitle}**\n\n`;
    md += `📧 ${personalInfo.email} | 📞 ${personalInfo.phone} | 📍 ${personalInfo.location}\n\n`;
    if (summary) {
      md += `## Professional Summary\n${summary}\n\n`;
    }
    if (experience.length > 0) {
      md += `## Experience\n`;
      experience.forEach((e) => {
        md += `### ${e.position} — **${e.company}**\n*${e.startDate} – ${e.current ? 'Present' : e.endDate} | ${e.location}*\n\n`;
        if (e.highlights) {
          e.highlights.forEach((h) => (md += `- ${h}\n`));
        }
        md += `\n`;
      });
    }
    if (education.length > 0) {
      md += `## Education\n`;
      education.forEach((edu) => {
        md += `- **${edu.degree}** — ${edu.institution} (${edu.startDate} – ${edu.endDate})\n`;
      });
      md += `\n`;
    }
    if (skillCategories.length > 0) {
      md += `## Skills\n`;
      skillCategories.forEach((cat) => {
        md += `- **${cat.categoryName}:** ${cat.skills.map((s) => s.name).join(', ')}\n`;
      });
    }
    return md;
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(generatePlainText());
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <h2 className="text-lg font-bold text-gray-900">{t.exportTitle}</h2>
          <p className="text-xs text-gray-500">{t.exportSubtitle}</p>
        </div>

        {/* Primary Action: Print / PDF */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between gap-3">
          <div>
            <h3 className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
              <Printer className="w-4 h-4 text-blue-600" />
              {t.printPDF}
            </h3>
            <p className="text-[11px] text-blue-800 mt-0.5">
              {t.exportPdfDesc}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              onPrintPDF();
            }}
            className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-2xs shrink-0 cursor-pointer"
          >
            {t.exportPdfBtn}
          </button>
        </div>

        {/* Backup & Restore */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleExportJson}
            className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 text-left transition space-y-1 cursor-pointer"
          >
            <Download className="w-4 h-4 text-gray-700" />
            <h4 className="text-xs font-bold text-gray-900">{t.downloadJsonBtn}</h4>
            <p className="text-[10px] text-gray-500">{t.downloadJsonDesc}</p>
          </button>

          <label className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 text-left transition space-y-1 cursor-pointer block">
            <Upload className="w-4 h-4 text-gray-700" />
            <h4 className="text-xs font-bold text-gray-900">{t.restoreJsonBtn}</h4>
            <p className="text-[10px] text-gray-500">{t.restoreJsonDesc}</p>
            <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        {/* LinkedIn Import Option */}
        {onOpenLinkedInImport && (
          <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#0a66c2] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Linkedin className="w-4 h-4 fill-white" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900">{t.importLinkedIn}</h4>
                <p className="text-[10px] text-gray-600">
                  {language === 'bn' ? 'লিঙ্কডইন প্রোফাইল ডেটা দিয়ে দ্রুত সিভি আপডেট করুন।' : 'Populate experience, education, & skills from LinkedIn profile export.'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenLinkedInImport();
              }}
              className="px-3 py-1.5 text-xs font-bold text-white bg-[#0a66c2] hover:bg-[#004182] rounded-lg transition shadow-2xs shrink-0 cursor-pointer"
            >
              {language === 'bn' ? 'ইমপোর্টার খুলুন' : 'Open Importer'}
            </button>
          </div>
        )}

        {/* Copy Plain Text / Markdown */}
        <div className="space-y-2 pt-2 border-t border-gray-100">
          <h4 className="text-xs font-bold text-gray-800">
            {language === 'bn' ? 'ক্লিপবোর্ডে কপি করুন (অনলাইন জবের জন্য)' : 'Copy to Clipboard (for Online Job Applications)'}
          </h4>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCopyText}
              className="flex-1 py-2 px-3 border border-gray-300 rounded-lg text-xs font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <FileText className="w-3.5 h-3.5 text-gray-600" />}
              {copiedText ? t.copied : t.copyTextBtn}
            </button>

            <button
              type="button"
              onClick={handleCopyMarkdown}
              className="flex-1 py-2 px-3 border border-gray-300 rounded-lg text-xs font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copiedMarkdown ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <FileCode className="w-3.5 h-3.5 text-gray-600" />}
              {copiedMarkdown ? t.copied : t.copyMarkdownBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
