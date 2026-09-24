import React, { useState, useMemo } from 'react';
import { CVData } from '../types';
import { parseLinkedInJson, LinkedInParseResult } from '../utils/linkedinParser';
import { useLanguage } from '../i18n/LanguageContext';
import {
  Linkedin,
  FileJson,
  Upload,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  X,
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  HelpCircle
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentCv: CVData;
  onImport: (newCv: CVData) => void;
}

// Sample realistic LinkedIn profile JSON export for instant testing
const SAMPLE_LINKEDIN_JSON = JSON.stringify(
  {
    firstName: "Sarah",
    lastName: "Jenkins",
    headline: "Staff Software Engineer & Cloud Solutions Architect",
    summary: "Passionate distributed systems and cloud architect with 9+ years of hands-on expertise architecting high-scale microservices, Kubernetes clusters, and low-latency APIs. Proven track record reducing infrastructure latency by 45% and leading cross-functional teams.",
    email: "sarah.jenkins@example.com",
    phone: "+1 (415) 892-3490",
    location: "San Francisco Bay Area, CA",
    linkedinUrl: "https://linkedin.com/in/sarahjenkins-tech",
    github: "https://github.com/sarahjenkins",
    website: "https://sarahjenkins.io",
    profilePicture: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    positions: [
      {
        company: "Stripe",
        title: "Staff Software Engineer",
        location: "San Francisco, CA",
        startDate: "2022-03",
        current: true,
        description: "• Architected high-throughput payment ingestion pipeline handling 35,000+ RPS.\n• Mentored 12 senior engineers across payments and identity platform pods.\n• Spearheaded migration from legacy monolith to Kubernetes and gRPC services."
      },
      {
        company: "Uber Technologies",
        title: "Senior Backend Engineer",
        location: "Seattle, WA",
        startDate: "2019-01",
        endDate: "2022-02",
        description: "• Designed real-time driver dispatch matching algorithm optimizing route computation by 28%.\n• Maintained 99.995% uptime for mission-critical core ride routing services.\n• Reduced Redis cache footprint by 40% through protocol buffer serialization."
      },
      {
        company: "Twilio Inc.",
        title: "Software Engineer",
        location: "San Francisco, CA",
        startDate: "2016-08",
        endDate: "2018-12",
        description: "• Developed distributed messaging webhooks and webhook failure retry queue.\n• Authored automated integration test suites increasing test coverage from 62% to 94%."
      }
    ],
    education: [
      {
        school: "University of California, Berkeley",
        degree: "Bachelor of Science",
        fieldOfStudy: "Computer Science & Electrical Engineering",
        startDate: "2012-08",
        endDate: "2016-05",
        notes: "Graduated Magna Cum Laude. Dean's Honors List (all 8 semesters)."
      }
    ],
    skills: [
      "Distributed Systems",
      "Go (Golang)",
      "TypeScript",
      "React",
      "Kubernetes",
      "Amazon Web Services (AWS)",
      "Docker",
      "PostgreSQL",
      "Redis",
      "GraphQL",
      "Microservices Architecture",
      "System Design"
    ],
    certifications: [
      {
        name: "AWS Certified Solutions Architect – Professional",
        authority: "Amazon Web Services",
        issueDate: "2023-04",
        credentialId: "AWS-PSA-908124"
      },
      {
        name: "Certified Kubernetes Administrator (CKA)",
        authority: "Cloud Native Computing Foundation",
        issueDate: "2022-10",
        credentialId: "CKA-778210"
      }
    ],
    languages: [
      {
        name: "English",
        proficiency: "Native"
      },
      {
        name: "Spanish",
        proficiency: "Fluent"
      }
    ],
    projects: [
      {
        title: "KubeMesh Observability Engine",
        description: "Open-source service mesh monitor providing distributed tracing visualizations.",
        url: "https://github.com/sarahjenkins/kubemesh",
        technologies: ["Go", "React", "eBPF", "Prometheus"]
      }
    ]
  },
  null,
  2
);

export const LinkedInImportModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentCv,
  onImport
}) => {
  const { language } = useLanguage();
  const [rawJson, setRawJson] = useState('');
  const [importMode, setImportMode] = useState<'replace' | 'merge'>('replace');
  const [showInstructions, setShowInstructions] = useState(false);

  // Live parsed results
  const parseResult: LinkedInParseResult = useMemo(() => {
    if (!rawJson.trim()) {
      return {
        success: false,
        parsedData: {},
        stats: {
          hasPersonalInfo: false,
          experienceCount: 0,
          educationCount: 0,
          skillsCount: 0,
          projectsCount: 0,
          certificationsCount: 0,
          languagesCount: 0
        },
        warnings: []
      };
    }
    return parseLinkedInJson(rawJson);
  }, [rawJson]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setRawJson(content);
      }
    };
    reader.readAsText(file);
  };

  const handleLoadSample = () => {
    setRawJson(SAMPLE_LINKEDIN_JSON);
  };

  const handleApplyImport = () => {
    if (!parseResult.success) return;

    const parsed = parseResult.parsedData;
    let finalCv: CVData;

    if (importMode === 'replace') {
      finalCv = {
        ...currentCv,
        id: `cv-${Date.now()}`,
        updatedAt: new Date().toISOString(),
        personalInfo: {
          fullName: parsed.personalInfo?.fullName || currentCv.personalInfo.fullName,
          jobTitle: parsed.personalInfo?.jobTitle || currentCv.personalInfo.jobTitle,
          email: parsed.personalInfo?.email || currentCv.personalInfo.email,
          phone: parsed.personalInfo?.phone || currentCv.personalInfo.phone,
          location: parsed.personalInfo?.location || currentCv.personalInfo.location,
          website: parsed.personalInfo?.website || currentCv.personalInfo.website,
          linkedin: parsed.personalInfo?.linkedin || currentCv.personalInfo.linkedin,
          github: parsed.personalInfo?.github || currentCv.personalInfo.github,
          photoUrl: parsed.personalInfo?.photoUrl || currentCv.personalInfo.photoUrl
        },
        summary: parsed.summary || currentCv.summary,
        experience: parsed.experience && parsed.experience.length > 0 ? parsed.experience : currentCv.experience,
        education: parsed.education && parsed.education.length > 0 ? parsed.education : currentCv.education,
        skillCategories:
          parsed.skillCategories && parsed.skillCategories.length > 0
            ? parsed.skillCategories
            : currentCv.skillCategories,
        projects: parsed.projects && parsed.projects.length > 0 ? parsed.projects : currentCv.projects,
        certifications:
          parsed.certifications && parsed.certifications.length > 0
            ? parsed.certifications
            : currentCv.certifications,
        languages: parsed.languages && parsed.languages.length > 0 ? parsed.languages : currentCv.languages,
        style: {
          ...currentCv.style,
          showPhoto: Boolean(parsed.personalInfo?.photoUrl || currentCv.personalInfo.photoUrl)
        }
      };
    } else {
      // Merge mode
      finalCv = {
        ...currentCv,
        updatedAt: new Date().toISOString(),
        personalInfo: {
          fullName: parsed.personalInfo?.fullName || currentCv.personalInfo.fullName,
          jobTitle: parsed.personalInfo?.jobTitle || currentCv.personalInfo.jobTitle,
          email: parsed.personalInfo?.email || currentCv.personalInfo.email,
          phone: parsed.personalInfo?.phone || currentCv.personalInfo.phone,
          location: parsed.personalInfo?.location || currentCv.personalInfo.location,
          website: parsed.personalInfo?.website || currentCv.personalInfo.website,
          linkedin: parsed.personalInfo?.linkedin || currentCv.personalInfo.linkedin,
          github: parsed.personalInfo?.github || currentCv.personalInfo.github,
          photoUrl: parsed.personalInfo?.photoUrl || currentCv.personalInfo.photoUrl
        },
        summary: parsed.summary || currentCv.summary,
        experience: [...(parsed.experience || []), ...currentCv.experience],
        education: [...(parsed.education || []), ...currentCv.education],
        skillCategories: [
          ...currentCv.skillCategories,
          ...(parsed.skillCategories || [])
        ],
        projects: [...(parsed.projects || []), ...currentCv.projects],
        certifications: [...(parsed.certifications || []), ...currentCv.certifications],
        languages: [...(parsed.languages || []), ...currentCv.languages]
      };
    }

    onImport(finalCv);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-6 space-y-4 shadow-2xl relative border border-gray-100 max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0a66c2] text-white flex items-center justify-center shadow-2xs">
              <Linkedin className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                {language === 'bn' ? 'লিঙ্কডইন JSON থেকে ইমপোর্ট করুন' : 'Import from LinkedIn JSON'}
              </h2>
              <p className="text-xs text-gray-500">
                {language === 'bn' ? 'আপনার লিঙ্কডইন প্রোফাইল JSON ডেটা পেস্ট করে দ্রুত সিভি পূরণ করুন' : 'Paste your profile data JSON export to auto-populate all CV sections'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="space-y-4 overflow-y-auto flex-1 pr-1">
          {/* Quick Action Bar: Load Sample, Upload JSON, Instructions */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleLoadSample}
                className="px-2.5 py-1.5 bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 rounded-lg font-semibold flex items-center gap-1.5 transition shadow-2xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>{language === 'bn' ? 'নমুনা লিঙ্কডইন ডেটা লোড করুন' : 'Load Sample LinkedIn JSON'}</span>
              </button>

              <label className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer transition shadow-2xs">
                <Upload className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? '.JSON ফাইল আপলোড' : 'Upload .JSON'}</span>
                <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            <button
              type="button"
              onClick={() => setShowInstructions(!showInstructions)}
              className="text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 hover:underline cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showInstructions ? (language === 'bn' ? 'গাইড লুকান' : 'Hide Guide') : (language === 'bn' ? 'কীভাবে লিঙ্কডইন JSON পাবেন?' : 'How to export LinkedIn JSON?')}</span>
            </button>
          </div>

          {/* Collapsible Guide */}
          {showInstructions && (
            <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-blue-900 space-y-1.5 animate-in fade-in">
              <h4 className="font-bold flex items-center gap-1 text-blue-950">
                <FileJson className="w-3.5 h-3.5 text-blue-600" /> {language === 'bn' ? 'লিঙ্কডইন ডেটা পাওয়ার উপায়:' : 'Quick Ways to Get Your LinkedIn Data:'}
              </h4>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-blue-800 leading-relaxed">
                <li>
                  <strong>{language === 'bn' ? 'অফিসিয়াল লিঙ্কডইন এক্সপোর্ট:' : 'Official LinkedIn Export:'}</strong> {language === 'bn' ? 'LinkedIn > Settings > Data Privacy > Get a copy of your data।' : 'Go to LinkedIn > Settings > Data Privacy > Get a copy of your data.'}
                </li>
                <li>
                  <strong>{language === 'bn' ? 'ক্রোম এক্সটেনশন:' : 'Direct Profile JSON:'}</strong> {language === 'bn' ? 'যেকোনো লিঙ্কডইন JSON এক্সপোর্টার ক্রোম এক্সটেনশন ব্যবহার করতে পারেন।' : 'Use Chrome extensions or profile tools like Proxycurl/RapidAPI.'}
                </li>
                <li>
                  <strong>{language === 'bn' ? 'কাস্টম JSON:' : 'Custom JSON structure:'}</strong> {language === 'bn' ? 'যেকোনো ফরম্যাট যাতে firstName, positions, education, skills থাকে।' : 'Any standard JSON containing fields like firstName, headline, positions, education, and skills is automatically supported.'}
                </li>
              </ul>
            </div>
          )}

          {/* JSON Textarea Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-gray-700">
                {language === 'bn' ? 'এখানে JSON কোড পেস্ট করুন:' : 'Paste JSON Content Here:'}
              </label>
              {rawJson && (
                <button
                  type="button"
                  onClick={() => setRawJson('')}
                  className="text-red-600 hover:underline text-[11px] cursor-pointer"
                >
                  {language === 'bn' ? 'মুছে ফেলুন' : 'Clear Input'}
                </button>
              )}
            </div>

            <textarea
              rows={7}
              value={rawJson}
              onChange={(e) => setRawJson(e.target.value)}
              placeholder='Paste LinkedIn JSON here... e.g. { "firstName": "Alex", "headline": "Product Manager", "positions": [...] }'
              className="w-full p-3 font-mono text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-slate-900 text-emerald-400 leading-relaxed selection:bg-blue-600 selection:text-white"
            />
          </div>

          {/* Live Parser Feedback Box */}
          {rawJson.trim() && (
            <div className="space-y-3 animate-in fade-in">
              {parseResult.success ? (
                <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-xl space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      {language === 'bn' ? 'লিঙ্কডইন প্রোফাইল সফলভাবে ডিটেক্ট হয়েছে!' : 'Successfully Detected LinkedIn Profile Data!'}
                    </span>
                    <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                      {language === 'bn' ? 'প্রস্তুত' : 'Ready to populate'}
                    </span>
                  </div>

                  {/* Detected Fields Pill Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="bg-white p-2 rounded-lg border border-emerald-100 flex items-center gap-2">
                      <User className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div className="truncate">
                        <p className="text-[10px] text-gray-500 font-medium">{language === 'bn' ? 'নাম' : 'Candidate'}</p>
                        <p className="font-bold text-gray-800 truncate">
                          {parseResult.parsedData.personalInfo?.fullName || 'Named in JSON'}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white p-2 rounded-lg border border-emerald-100 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-blue-600 shrink-0" />
                      <div>
                        <p className="text-[10px] text-gray-500 font-medium">{language === 'bn' ? 'অভিজ্ঞতা' : 'Experience'}</p>
                        <p className="font-bold text-gray-800">{parseResult.stats.experienceCount} {language === 'bn' ? 'টি' : 'Positions'}</p>
                      </div>
                    </div>

                    <div className="bg-white p-2 rounded-lg border border-emerald-100 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-indigo-600 shrink-0" />
                      <div>
                        <p className="text-[10px] text-gray-500 font-medium">{language === 'bn' ? 'শিক্ষা' : 'Education'}</p>
                        <p className="font-bold text-gray-800">{parseResult.stats.educationCount} {language === 'bn' ? 'টি' : 'Degrees'}</p>
                      </div>
                    </div>

                    <div className="bg-white p-2 rounded-lg border border-emerald-100 flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-purple-600 shrink-0" />
                      <div>
                        <p className="text-[10px] text-gray-500 font-medium">{language === 'bn' ? 'দক্ষতা' : 'Skills'}</p>
                        <p className="font-bold text-gray-800">{parseResult.stats.skillsCount} {language === 'bn' ? 'টি' : 'Skills'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Extra credentials pill summary */}
                  {(parseResult.stats.certificationsCount > 0 ||
                    parseResult.stats.languagesCount > 0 ||
                    parseResult.stats.projectsCount > 0) && (
                    <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-gray-600">
                      {parseResult.stats.certificationsCount > 0 && (
                        <span className="bg-white px-2 py-0.5 rounded border border-gray-200">
                          🏅 {parseResult.stats.certificationsCount} {language === 'bn' ? 'সার্টিফিকেট' : 'Certifications'}
                        </span>
                      )}
                      {parseResult.stats.languagesCount > 0 && (
                        <span className="bg-white px-2 py-0.5 rounded border border-gray-200">
                          🌐 {parseResult.stats.languagesCount} {language === 'bn' ? 'ভাষা' : 'Languages'}
                        </span>
                      )}
                      {parseResult.stats.projectsCount > 0 && (
                        <span className="bg-white px-2 py-0.5 rounded border border-gray-200">
                          📁 {parseResult.stats.projectsCount} {language === 'bn' ? 'প্রজেক্ট' : 'Projects'}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2 text-xs text-amber-800">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">{language === 'bn' ? 'ডেটা পার্স করা যায়নি: ' : 'Could not parse data: '}</span>
                    <span>{parseResult.warnings[0] || (language === 'bn' ? 'ইনভ্যালিড JSON সিনট্যাক্স' : 'Invalid JSON syntax')}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Import Mode: Replace vs Merge */}
          {parseResult.success && (
            <div className="p-3 border border-gray-200 rounded-xl bg-gray-50 space-y-2">
              <label className="text-xs font-bold text-gray-700 block">
                {language === 'bn' ? 'ইমপোর্ট পদ্ধতি:' : 'Import Mode:'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setImportMode('replace')}
                  className={`p-2.5 rounded-lg border text-left text-xs transition cursor-pointer ${
                    importMode === 'replace'
                      ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold shadow-2xs'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <p className="font-bold">{language === 'bn' ? 'বর্তমান সিভি প্রতিস্থাপন করুন' : 'Replace Current CV'}</p>
                  <p className="text-[11px] text-gray-500 font-normal">
                    {language === 'bn' ? 'সম্পূর্ণ নতুন করে লিঙ্কডইন ডেটা দিয়ে সাজাবে' : 'Fresh resume built strictly from LinkedIn data'}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setImportMode('merge')}
                  className={`p-2.5 rounded-lg border text-left text-xs transition cursor-pointer ${
                    importMode === 'merge'
                      ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold shadow-2xs'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <p className="font-bold">{language === 'bn' ? 'বর্তমান সিভির সাথে যুক্ত করুন' : 'Merge with Existing'}</p>
                  <p className="text-[11px] text-gray-500 font-normal">
                    {language === 'bn' ? 'নতুন তথ্যগুলো বিদ্যমান সিভির সাথে যোগ করবে' : 'Appends new positions & skills to current CV'}
                  </p>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition cursor-pointer"
          >
            {language === 'bn' ? 'বাতিল' : 'Cancel'}
          </button>

          <button
            type="button"
            onClick={handleApplyImport}
            disabled={!parseResult.success}
            className="px-5 py-2.5 text-xs font-bold text-white bg-[#0a66c2] hover:bg-[#004182] rounded-xl transition shadow-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{language === 'bn' ? 'সিভিতে লিঙ্কডইন ডেটা যুক্ত করুন' : 'Populate CV with LinkedIn Data'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
