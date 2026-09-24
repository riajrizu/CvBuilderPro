import React, { useState } from 'react';
import { CVData, ATSAnalysisResult } from '../../types';
import { Sparkles, Wand2, ShieldCheck, AlertCircle, CheckCircle2, RefreshCw, BarChart2, Layers } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface Props {
  cvData: CVData;
  onUpdateSummary: (newSummary: string) => void;
}

export const AIAssistantTab: React.FC<Props> = ({ cvData, onUpdateSummary }) => {
  const { t, language } = useLanguage();

  // Summary Writer State
  const [summaryTone, setSummaryTone] = useState<'professional' | 'executive' | 'creative' | 'technical'>('professional');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState('');

  // Bullet Polish State
  const [bulletText, setBulletText] = useState('');
  const [isPolishing, setIsPolishing] = useState(false);
  const [polishedOptions, setPolishedOptions] = useState<{ label: string; text: string }[]>([]);

  // ATS Analysis State
  const [targetRole, setTargetRole] = useState(cvData.personalInfo.jobTitle || '');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [atsResult, setAtsResult] = useState<ATSAnalysisResult | null>(null);

  // Error States
  const [errorMessage, setErrorMessage] = useState('');

  // 1. Generate Summary
  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true);
    setErrorMessage('');
    try {
      const skills = cvData.skillCategories.flatMap((c) => c.skills.map((s) => s.name));
      const response = await fetch('/api/ai/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle: cvData.personalInfo.jobTitle || 'Professional',
          keySkills: skills,
          experienceOverview: `${cvData.experience.length} relevant positions in tech/business`,
          tone: summaryTone
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to generate summary');
      setGeneratedSummary(data.summary);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error communicating with AI service.');
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  // 2. Polish Bullet Point
  const handlePolishBullet = async () => {
    if (!bulletText.trim()) return;
    setIsPolishing(true);
    setErrorMessage('');
    try {
      const response = await fetch('/api/ai/enhance-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bulletPoint: bulletText,
          role: cvData.personalInfo.jobTitle,
          company: cvData.experience[0]?.company || ''
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to polish bullet');
      setPolishedOptions(data.options || []);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error polishing bullet.');
    } finally {
      setIsPolishing(false);
    }
  };

  // 3. ATS Analysis
  const handleAnalyzeATS = async () => {
    setIsAnalyzing(true);
    setErrorMessage('');
    try {
      const response = await fetch('/api/ai/ats-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cvData,
          targetRole: targetRole || cvData.personalInfo.jobTitle
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to analyze ATS');
      setAtsResult(data);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error analyzing ATS score.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex items-center gap-2.5 pb-2 border-b border-gray-200">
        <div className="p-1.5 rounded-lg bg-purple-100 text-purple-700">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-gray-900">{t.aiTitle}</h2>
          <p className="text-xs text-gray-500">{t.aiSubtitle}</p>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Feature 1: AI Summary Generator */}
      <div className="p-4 border border-purple-200 rounded-xl bg-purple-50/40 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-purple-600" />
            <h3 className="text-xs font-bold text-gray-900">
              {language === 'bn' ? 'এআই সামারি রাইটার' : 'AI Summary Writer'}
            </h3>
          </div>
          <select
            value={summaryTone}
            onChange={(e) => setSummaryTone(e.target.value as any)}
            className="text-xs border border-purple-200 rounded-md px-2 py-1 bg-white outline-none cursor-pointer"
          >
            <option value="professional">{language === 'bn' ? 'প্রফেশনাল টোন' : 'Professional Tone'}</option>
            <option value="executive">{language === 'bn' ? 'এক্সিকিউটিভ টোন' : 'Executive Tone'}</option>
            <option value="technical">{language === 'bn' ? 'টেকনিক্যাল ফোকাস' : 'Technical Focus'}</option>
            <option value="creative">{language === 'bn' ? 'ক্রিয়েটিভ টোন' : 'Creative Tone'}</option>
          </select>
        </div>

        <p className="text-xs text-gray-600">
          {language === 'bn'
            ? `আপনার টার্গেট পদবী (${cvData.personalInfo.jobTitle || 'পদবী নির্ধারণ করা হয়নি'}) ও দক্ষতার ওপর ভিত্তি করে সামারি তৈরি হবে।`
            : `Auto-generate a high-impact summary based on your target role (${cvData.personalInfo.jobTitle || 'Not set'}) and skills.`}
        </p>

        <button
          type="button"
          onClick={handleGenerateSummary}
          disabled={isGeneratingSummary}
          className="w-full py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition shadow-2xs flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {isGeneratingSummary ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              {language === 'bn' ? 'সামারি তৈরি হচ্ছে...' : 'Crafting Summary...'}
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              {language === 'bn' ? 'প্রফেশনাল সামারি জেনারেট করুন' : 'Generate Professional Summary'}
            </>
          )}
        </button>

        {generatedSummary && (
          <div className="p-3 bg-white border border-purple-200 rounded-lg space-y-2 mt-2">
            <p className="text-xs text-gray-800 leading-relaxed">{generatedSummary}</p>
            <button
              type="button"
              onClick={() => {
                onUpdateSummary(generatedSummary);
                setGeneratedSummary('');
              }}
              className="px-3 py-1 text-xs font-semibold bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition flex items-center gap-1 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> {language === 'bn' ? 'সিভিতে যুক্ত করুন' : 'Apply to CV'}
            </button>
          </div>
        )}
      </div>

      {/* Feature 2: Bullet Point Polisher */}
      <div className="p-4 border border-blue-200 rounded-xl bg-blue-50/40 space-y-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600" />
          <h3 className="text-xs font-bold text-gray-900">{t.bulletPolisherTitle}</h3>
        </div>

        <textarea
          rows={2}
          value={bulletText}
          onChange={(e) => setBulletText(e.target.value)}
          placeholder={t.pasteBulletPlaceholder}
          className="w-full p-2.5 text-xs border border-blue-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="button"
          onClick={handlePolishBullet}
          disabled={isPolishing || !bulletText.trim()}
          className="w-full py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-2xs flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {isPolishing ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" /> {language === 'bn' ? 'উন্নত করা হচ্ছে...' : 'Enhancing...'}
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" /> {t.improveBulletBtn}
            </>
          )}
        </button>

        {polishedOptions.length > 0 && (
          <div className="space-y-2 pt-2">
            <p className="text-xs font-bold text-gray-800">
              {language === 'bn' ? 'উন্নত বিকল্পসমূহ:' : 'Enhanced Variations:'}
            </p>
            {polishedOptions.map((opt, i) => (
              <div key={i} className="p-2.5 bg-white border border-blue-200 rounded-lg space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">
                  {opt.label}
                </span>
                <p className="text-xs text-gray-800">{opt.text}</p>
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(opt.text)}
                  className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer"
                >
                  {language === 'bn' ? 'টেক্সট কপি করুন' : 'Copy Option Text'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Feature 3: ATS Score Analyzer */}
      <div className="p-4 border border-emerald-200 rounded-xl bg-emerald-50/40 space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <h3 className="text-xs font-bold text-gray-900">{t.atsScoreTitle}</h3>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">{t.jobTailorPlaceholder}</label>
          <input
            type="text"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            placeholder="e.g. Senior Software Engineer"
            className="w-full px-3 py-1.5 text-xs border border-emerald-200 rounded-lg bg-white outline-none"
          />
        </div>

        <button
          type="button"
          onClick={handleAnalyzeATS}
          disabled={isAnalyzing}
          className="w-full py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition shadow-2xs flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              {language === 'bn' ? 'সিভি স্ক্যান করা হচ্ছে...' : 'Scanning Resume Content...'}
            </>
          ) : (
            <>
              <BarChart2 className="w-3.5 h-3.5" />
              {t.analyzeAtsBtn}
            </>
          )}
        </button>

        {atsResult && (
          <div className="p-4 bg-white border border-emerald-200 rounded-xl space-y-4 mt-2 shadow-2xs">
            {/* Score Badge */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {language === 'bn' ? 'এটিএস স্কোর' : 'ATS Score'}
                </span>
                <p className="text-xs text-gray-700">{atsResult.summary}</p>
              </div>
              <div
                className={`w-14 h-14 rounded-full flex flex-col items-center justify-center text-white font-black text-lg shadow-sm ${
                  atsResult.score >= 80
                    ? 'bg-emerald-600'
                    : atsResult.score >= 60
                    ? 'bg-amber-500'
                    : 'bg-red-500'
                }`}
              >
                <span>{atsResult.score}</span>
                <span className="text-[9px] font-normal opacity-80">/ 100</span>
              </div>
            </div>

            {/* Strengths */}
            {atsResult.strengths?.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-emerald-800 mb-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {language === 'bn' ? 'শক্তি ও ইতিবাচক দিক' : 'Strengths'}
                </h4>
                <ul className="list-disc list-inside text-xs text-gray-700 space-y-0.5">
                  {atsResult.strengths.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Improvements */}
            {atsResult.improvements?.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-amber-800 mb-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> {language === 'bn' ? 'উন্নতির সুযোগ ও সংশোধন' : 'Improvements & Fixes'}
                </h4>
                <ul className="list-disc list-inside text-xs text-gray-700 space-y-0.5">
                  {atsResult.improvements.map((imp, idx) => (
                    <li key={idx}>{imp}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Suggested Keywords */}
            {atsResult.suggestedKeywords?.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-gray-900 mb-1">
                  {language === 'bn' ? 'প্রস্তাবিত কি-ওয়ার্ডসমূহ:' : 'Recommended Keywords to Include:'}
                </h4>
                <div className="flex flex-wrap gap-1">
                  {atsResult.suggestedKeywords.map((kw, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-800 font-semibold rounded border border-emerald-200">
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
