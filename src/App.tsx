import React, { useState, useEffect } from 'react';
import { CVData } from './types';
import { SOFTWARE_ENGINEER_CV, SAMPLE_PRESETS, DEFAULT_STYLE } from './data/sampleCV';
import { TemplateRenderer } from './components/CVTemplates/TemplateRenderer';
import { PersonalInfoForm } from './components/CVEditor/PersonalInfoForm';
import { WorkExperienceForm } from './components/CVEditor/WorkExperienceForm';
import { EducationForm } from './components/CVEditor/EducationForm';
import { SkillsForm } from './components/CVEditor/SkillsForm';
import { ProjectsForm } from './components/CVEditor/ProjectsForm';
import { CertificationsForm } from './components/CVEditor/CertificationsForm';
import { LanguagesForm } from './components/CVEditor/LanguagesForm';
import { StyleCustomizer } from './components/CVEditor/StyleCustomizer';
import { AIAssistantTab } from './components/CVEditor/AIAssistantTab';
import { ExportModal } from './components/ExportModal';
import { LinkedInImportModal } from './components/LinkedInImportModal';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useLanguage } from './i18n/LanguageContext';
import {
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  Palette,
  Sparkles,
  Download,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Eye,
  Check,
  Layout,
  Printer,
  Linkedin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type TabType = 'personal' | 'experience' | 'education' | 'skills' | 'projects' | 'credentials' | 'style' | 'ai';

export default function App() {
  const { t, language } = useLanguage();

  // Persistence in localStorage
  const [cvData, setCvData] = useState<CVData>(() => {
    try {
      const saved = localStorage.getItem('cv_builder_data_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read saved CV from localStorage:', e);
    }
    return SOFTWARE_ENGINEER_CV;
  });

  const [activeTab, setActiveTab] = useState<TabType>('personal');
  const [zoomScale, setZoomScale] = useState<number>(0.85);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState(false);
  const [savedNotification, setSavedNotification] = useState(false);

  // Auto-save to localStorage on edit
  useEffect(() => {
    try {
      localStorage.setItem('cv_builder_data_v1', JSON.stringify(cvData));
      setSavedNotification(true);
      const timer = setTimeout(() => setSavedNotification(false), 2000);
      return () => clearTimeout(timer);
    } catch (e) {
      console.warn('Failed to auto-save CV:', e);
    }
  }, [cvData]);

  // Handle Preset Reset / Load
  const handleLoadPreset = (presetData: CVData) => {
    if (confirm(t.loadPresetConfirm)) {
      setCvData({ ...presetData, updatedAt: new Date().toISOString() });
    }
  };

  const handleStartBlank = () => {
    if (confirm(t.startFreshConfirm)) {
      setCvData({
        id: `blank-${Date.now()}`,
        title: language === 'bn' ? 'নতুন ফাঁকা সিভি' : 'Untitled Resume',
        updatedAt: new Date().toISOString(),
        personalInfo: {
          fullName: '',
          jobTitle: '',
          email: '',
          phone: '',
          location: ''
        },
        summary: '',
        experience: [],
        education: [],
        skillCategories: [],
        projects: [],
        certifications: [],
        languages: [],
        customSections: [],
        style: DEFAULT_STYLE
      });
    }
  };

  const handlePrintPDF = () => {
    window.print();
  };

  const navTabs: { id: TabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'personal', label: t.tabPersonal, icon: <User className="w-4 h-4" /> },
    { id: 'experience', label: t.tabExperience, icon: <Briefcase className="w-4 h-4" /> },
    { id: 'education', label: t.tabEducation, icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'skills', label: t.tabSkills, icon: <Wrench className="w-4 h-4" /> },
    { id: 'projects', label: t.tabProjects, icon: <FolderGit2 className="w-4 h-4" /> },
    { id: 'credentials', label: t.tabCredentials, icon: <Award className="w-4 h-4" /> },
    { id: 'style', label: t.tabStyle, icon: <Palette className="w-4 h-4" /> },
    { id: 'ai', label: t.tabAI, icon: <Sparkles className="w-4 h-4" />, badge: 'AI' }
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Header Bar */}
      <header className="no-print sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold tracking-tight text-white flex items-center gap-2">
                {t.appName}
                {savedNotification && (
                  <span className="text-[10px] font-normal text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800 flex items-center gap-1 animate-in fade-in">
                    <Check className="w-3 h-3" /> {t.saved}
                  </span>
                )}
              </h1>
              <p className="text-[11px] text-slate-400 hidden sm:block">{t.appSubtitle}</p>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-wrap justify-end">
            {/* Language Switcher (Bengali / English Toggle) */}
            <LanguageSwitcher />

            {/* Presets Menu */}
            <div className="relative group">
              <button
                type="button"
                className="px-2.5 sm:px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
                title={t.presets}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{t.presets}</span>
              </button>
              <div className="absolute right-0 mt-1 w-52 bg-white text-slate-900 rounded-xl shadow-xl border border-slate-200 py-1 hidden group-hover:block z-50 animate-in fade-in">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.sampleResumes}</div>
                {SAMPLE_PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleLoadPreset(p.data)}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 font-medium text-slate-700 block cursor-pointer"
                  >
                    {p.label}
                  </button>
                ))}
                <div className="border-t border-slate-100 my-1" />
                <button
                  type="button"
                  onClick={handleStartBlank}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-red-50 font-medium text-red-600 block cursor-pointer"
                >
                  {t.startFresh}
                </button>
              </div>
            </div>

            {/* LinkedIn JSON Importer */}
            <button
              type="button"
              onClick={() => setIsLinkedInModalOpen(true)}
              className="px-2.5 sm:px-3 py-1.5 text-xs font-semibold bg-[#0a66c2]/90 hover:bg-[#0a66c2] text-white rounded-lg border border-blue-500/40 transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
              title="Import resume data directly from LinkedIn profile JSON"
            >
              <Linkedin className="w-3.5 h-3.5 fill-white" />
              <span className="hidden sm:inline">{t.importLinkedIn}</span>
            </button>

            {/* AI Assistant Quick Tab */}
            <button
              type="button"
              onClick={() => setActiveTab('ai')}
              className="px-2.5 sm:px-3 py-1.5 text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg transition shadow-2xs flex items-center gap-1.5 cursor-pointer"
              title={t.aiStudio}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden xs:inline sm:inline">{t.aiStudio}</span>
            </button>

            {/* Export & Download PDF */}
            <button
              type="button"
              onClick={() => setIsExportOpen(true)}
              className="px-3 sm:px-3.5 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition shadow-2xs flex items-center gap-1.5 cursor-pointer"
              title={t.exportCV}
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.exportCV}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Split Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Editor Form Panel */}
        <div className="no-print lg:col-span-6 xl:col-span-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
          {/* Navigation Tab Bar */}
          <div className="bg-slate-50/80 border-b border-slate-200 p-2 overflow-x-auto scrollbar-none flex gap-1">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl transition whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-white text-blue-600 shadow-2xs border border-slate-200/80 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-purple-600 text-white">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Form Content Body */}
          <div className="p-4 sm:p-5 max-h-[78vh] overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
              >
                {activeTab === 'personal' && (
                  <PersonalInfoForm
                    info={cvData.personalInfo}
                    onChange={(personalInfo) => setCvData({ ...cvData, personalInfo })}
                    showPhoto={cvData.style.showPhoto}
                    onToggleShowPhoto={(show) =>
                      setCvData({
                        ...cvData,
                        style: { ...cvData.style, showPhoto: show }
                      })
                    }
                    onOpenLinkedInImport={() => setIsLinkedInModalOpen(true)}
                  />
                )}

                {activeTab === 'experience' && (
                  <WorkExperienceForm
                    experience={cvData.experience}
                    onChange={(experience) => setCvData({ ...cvData, experience })}
                    onPolishBullet={(bullet, role, company, onApply) => {
                      setActiveTab('ai');
                    }}
                  />
                )}

                {activeTab === 'education' && (
                  <EducationForm
                    education={cvData.education}
                    onChange={(education) => setCvData({ ...cvData, education })}
                  />
                )}

                {activeTab === 'skills' && (
                  <SkillsForm
                    skillCategories={cvData.skillCategories}
                    onChange={(skillCategories) => setCvData({ ...cvData, skillCategories })}
                  />
                )}

                {activeTab === 'projects' && (
                  <ProjectsForm
                    projects={cvData.projects}
                    onChange={(projects) => setCvData({ ...cvData, projects })}
                  />
                )}

                {activeTab === 'credentials' && (
                  <div className="space-y-6">
                    <CertificationsForm
                      certifications={cvData.certifications}
                      onChange={(certifications) => setCvData({ ...cvData, certifications })}
                    />
                    <LanguagesForm
                      languages={cvData.languages}
                      onChange={(languages) => setCvData({ ...cvData, languages })}
                    />
                  </div>
                )}

                {activeTab === 'style' && (
                  <StyleCustomizer
                    style={cvData.style}
                    onChange={(style) => setCvData({ ...cvData, style })}
                  />
                )}

                {activeTab === 'ai' && (
                  <AIAssistantTab
                    cvData={cvData}
                    onUpdateSummary={(summary) => setCvData({ ...cvData, summary })}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Real-Time Preview Canvas Stage */}
        <div
          className={`lg:col-span-6 xl:col-span-7 flex flex-col items-center justify-start ${
            isFullscreen ? 'fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-md p-6 overflow-y-auto' : ''
          }`}
        >
          {/* Zoom & Controls Bar */}
          <div className="no-print w-full max-w-4xl bg-white border border-slate-200 rounded-xl px-4 py-2 mb-4 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-800">
                {t.livePreview} ({cvData.style.template.toUpperCase()})
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => setZoomScale((prev) => Math.max(0.5, prev - 0.1))}
                className="p-1 hover:bg-slate-100 rounded text-slate-600 cursor-pointer"
                title={t.zoomOut}
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="font-mono text-xs text-slate-600 font-semibold min-w-[40px] text-center">
                {Math.round(zoomScale * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoomScale((prev) => Math.min(1.3, prev + 0.1))}
                className="p-1 hover:bg-slate-100 rounded text-slate-600 cursor-pointer"
                title={t.zoomIn}
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <div className="h-4 w-px bg-slate-200 my-auto mx-1" />

              <button
                type="button"
                onClick={handlePrintPDF}
                className="p-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg font-semibold flex items-center gap-1 text-[11px] cursor-pointer"
                title={t.printPDF}
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.printPDF}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1 hover:bg-slate-100 rounded text-slate-600 cursor-pointer"
                title={isFullscreen ? t.exitFullScreen : t.fullScreen}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Render Container for Print & View */}
          <div
            className="w-full overflow-x-auto flex justify-center p-2 sm:p-4 rounded-xl"
            style={{
              transform: `scale(${zoomScale})`,
              transformOrigin: 'top center',
              transition: 'transform 0.15s ease-out'
            }}
          >
            <div id="cv-print-area" className="w-full">
              <TemplateRenderer data={cvData} />
            </div>
          </div>
        </div>
      </div>

      {/* Export & Import Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        cvData={cvData}
        onImportJson={(newCv) => setCvData(newCv)}
        onPrintPDF={handlePrintPDF}
        onOpenLinkedInImport={() => setIsLinkedInModalOpen(true)}
      />

      {/* LinkedIn Profile JSON Importer Modal */}
      <LinkedInImportModal
        isOpen={isLinkedInModalOpen}
        onClose={() => setIsLinkedInModalOpen(false)}
        currentCv={cvData}
        onImport={(newCv) => {
          setCvData(newCv);
          setSavedNotification(true);
          setTimeout(() => setSavedNotification(false), 2500);
        }}
      />
    </div>
  );
}
