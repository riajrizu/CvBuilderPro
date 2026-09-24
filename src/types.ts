export type TemplateType = 'modern' | 'executive' | 'creative' | 'tech' | 'minimal';
export type FontFamily = 'sans' | 'serif' | 'mono';
export type FontSizeScale = 'compact' | 'standard' | 'large';
export type LineHeightScale = 'tight' | 'normal' | 'relaxed';
export type MarginSizeScale = 'compact' | 'standard' | 'spacious';

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  photoUrl?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description?: string;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa?: string;
  highlights?: string[];
}

export interface SkillItem {
  name: string;
  level?: number; // 1 to 5
}

export interface SkillCategory {
  id: string;
  categoryName: string;
  skills: SkillItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  url?: string;
  githubUrl?: string;
  highlights?: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  url?: string;
  credentialId?: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic';
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface CVStyleConfig {
  template: TemplateType;
  accentColor: string;
  fontFamily: FontFamily;
  fontSize: FontSizeScale;
  lineHeight: LineHeightScale;
  marginSize: MarginSizeScale;
  showPhoto: boolean;
  sectionOrder: string[];
  visibleSections: Record<string, boolean>;
}

export interface CVData {
  id: string;
  title: string;
  updatedAt: string;
  personalInfo: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skillCategories: SkillCategory[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
  customSections: CustomSection[];
  style: CVStyleConfig;
}

export interface ATSAnalysisResult {
  score: number;
  summary: string;
  strengths: string[];
  improvements: string[];
  suggestedKeywords: string[];
}
