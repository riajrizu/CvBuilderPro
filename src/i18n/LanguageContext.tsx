import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'bn';

export interface Translations {
  // App Header
  appName: string;
  appSubtitle: string;
  saved: string;
  presets: string;
  sampleResumes: string;
  startFresh: string;
  startFreshConfirm: string;
  loadPresetConfirm: string;
  importLinkedIn: string;
  aiStudio: string;
  exportCV: string;

  // Tabs
  tabPersonal: string;
  tabExperience: string;
  tabEducation: string;
  tabSkills: string;
  tabProjects: string;
  tabCredentials: string;
  tabStyle: string;
  tabAI: string;

  // Personal Info Form
  personalTitle: string;
  fullName: string;
  fullNamePlaceholder: string;
  jobTitle: string;
  jobTitlePlaceholder: string;
  email: string;
  phone: string;
  location: string;
  locationPlaceholder: string;
  website: string;
  linkedin: string;
  github: string;
  summaryTitle: string;
  summarySubtitle: string;
  summaryPlaceholder: string;
  aiEnhanceSummary: string;

  // Profile Photo
  photoTitle: string;
  photoSubtitle: string;
  photoVisible: string;
  photoHidden: string;
  photoUploadTab: string;
  photoPresetsTab: string;
  photoUrlTab: string;
  photoCameraTab: string;
  uploadDragDrop: string;
  uploadFormatSupport: string;
  uploadClipboardTip: string;
  sampleAvatarsDesc: string;
  imageUrlDesc: string;
  imageUrlPlaceholder: string;
  applyUrl: string;
  cameraSnapshot: string;
  cameraClose: string;
  removePhoto: string;
  photoProcessing: string;
  photoSuccess: string;
  photoRemoved: string;
  photoErrorFormat: string;
  photoErrorProcess: string;
  photoErrorCamera: string;

  // Experience Form
  expTitle: string;
  expSubtitle: string;
  addPosition: string;
  positionTitle: string;
  positionPlaceholder: string;
  companyName: string;
  companyPlaceholder: string;
  locationWork: string;
  startDate: string;
  endDate: string;
  present: string;
  currentWork: string;
  responsibilitiesTitle: string;
  bulletPlaceholder: string;
  addBullet: string;
  deletePosition: string;
  emptyExpTitle: string;
  emptyExpDesc: string;

  // Education Form
  eduTitle: string;
  eduSubtitle: string;
  addEducation: string;
  degree: string;
  degreePlaceholder: string;
  fieldOfStudy: string;
  fieldPlaceholder: string;
  institution: string;
  institutionPlaceholder: string;
  gpa: string;
  currentStudy: string;
  deleteEducation: string;
  emptyEduTitle: string;
  emptyEduDesc: string;

  // Skills Form
  skillsTitle: string;
  skillsSubtitle: string;
  addCategory: string;
  categoryName: string;
  categoryPlaceholder: string;
  skillNamePlaceholder: string;
  addSkill: string;
  quickSuggestions: string;
  deleteCategory: string;

  // Projects Form
  projectsTitle: string;
  projectsSubtitle: string;
  addProject: string;
  projectName: string;
  projectRole: string;
  liveUrl: string;
  githubUrl: string;
  techStack: string;
  techStackPlaceholder: string;
  deleteProject: string;

  // Credentials Form
  certTitle: string;
  certSubtitle: string;
  addCert: string;
  certName: string;
  certIssuer: string;
  certDate: string;
  certUrl: string;
  languagesTitle: string;
  languagesSubtitle: string;
  addLanguage: string;
  languageName: string;
  proficiency: string;

  // Style & Design
  styleTitle: string;
  styleSubtitle: string;
  templateLabel: string;
  accentColorLabel: string;
  typographyLabel: string;
  fontSizeLabel: string;
  spacingLabel: string;
  marginsLabel: string;
  showPhotoLabel: string;
  fontSmall: string;
  fontMedium: string;
  fontLarge: string;
  compact: string;
  normal: string;
  spacious: string;

  // Preview & Zoom Toolbar
  previewTitle: string;
  livePreview: string;
  zoomIn: string;
  zoomOut: string;
  resetZoom: string;
  fitWidth: string;
  fullScreen: string;
  exitFullScreen: string;
  printPDF: string;
  pageIndicator: string;

  // CV Template Section Headings
  sectionSummary: string;
  sectionExperience: string;
  sectionEducation: string;
  sectionSkills: string;
  sectionProjects: string;
  sectionCertifications: string;
  sectionLanguages: string;
  sectionContact: string;

  // Export Modal
  exportTitle: string;
  exportSubtitle: string;
  exportPdfBtn: string;
  exportPdfDesc: string;
  downloadJsonBtn: string;
  downloadJsonDesc: string;
  restoreJsonBtn: string;
  restoreJsonDesc: string;
  importLinkedInBtn: string;
  importLinkedInDesc: string;
  copyTextBtn: string;
  copyMarkdownBtn: string;
  copied: string;
  close: string;

  // LinkedIn Importer Modal
  liModalTitle: string;
  liModalSubtitle: string;
  liPasteTab: string;
  liUploadTab: string;
  liLoadSampleBtn: string;
  liDetectedStats: string;
  liPositions: string;
  liEducations: string;
  liSkillsCount: string;
  liReplaceCurrent: string;
  liMergeCurrent: string;
  liImportSuccess: string;
  liParseError: string;
  liDropFile: string;

  // AI Assistant Tab
  aiTitle: string;
  aiSubtitle: string;
  atsScoreTitle: string;
  atsScoreDesc: string;
  analyzeAtsBtn: string;
  jobTailorTitle: string;
  jobTailorDesc: string;
  jobTailorPlaceholder: string;
  tailorResumeBtn: string;
  actionVerbsTitle: string;
  bulletPolisherTitle: string;
  pasteBulletPlaceholder: string;
  improveBulletBtn: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // App Header
    appName: 'CV Craft Pro',
    appSubtitle: 'Professional Resume & CV Builder',
    saved: 'Saved',
    presets: 'Presets',
    sampleResumes: 'Sample Resumes',
    startFresh: 'Start Fresh / Blank',
    startFreshConfirm: 'Clear current resume and start with a blank template?',
    loadPresetConfirm: 'Load this sample resume? Current edits will be replaced.',
    importLinkedIn: 'Import LinkedIn',
    aiStudio: 'AI Studio',
    exportCV: 'Export CV',

    // Tabs
    tabPersonal: 'Personal',
    tabExperience: 'Experience',
    tabEducation: 'Education',
    tabSkills: 'Skills',
    tabProjects: 'Projects',
    tabCredentials: 'Credentials',
    tabStyle: 'Design & Style',
    tabAI: 'AI & ATS',

    // Personal Info Form
    personalTitle: 'Personal & Contact Details',
    fullName: 'Full Name',
    fullNamePlaceholder: 'e.g. Alex Morgan',
    jobTitle: 'Professional Title / Headline',
    jobTitlePlaceholder: 'e.g. Senior Full Stack Engineer',
    email: 'Email Address',
    phone: 'Phone Number',
    location: 'Location',
    locationPlaceholder: 'e.g. San Francisco, CA (or Remote)',
    website: 'Portfolio / Website',
    linkedin: 'LinkedIn Profile URL',
    github: 'GitHub / GitLab Profile URL',
    summaryTitle: 'Professional Summary / About',
    summarySubtitle: '2-4 impactful sentences highlighting your experience, key strengths, and career ambitions.',
    summaryPlaceholder: 'Results-driven software engineer with 5+ years of experience building scalable distributed systems...',
    aiEnhanceSummary: 'Enhance Summary with AI',

    // Profile Photo
    photoTitle: 'Profile Photo',
    photoSubtitle: 'Upload headshot, paste URL, or select a sample avatar',
    photoVisible: 'Visible on CV',
    photoHidden: 'Hidden on CV',
    photoUploadTab: 'Upload File',
    photoPresetsTab: 'Sample Avatars',
    photoUrlTab: 'Image URL',
    photoCameraTab: 'Webcam',
    uploadDragDrop: 'Click to choose photo or Drag & Drop here',
    uploadFormatSupport: 'Supports JPG, PNG, WEBP (Auto-optimized for CV)',
    uploadClipboardTip: 'Tip: You can also press Ctrl+V / Cmd+V to paste any copied image',
    sampleAvatarsDesc: 'Choose a professional sample portrait to test your CV layout:',
    imageUrlDesc: 'Paste any public image link (LinkedIn profile photo, GitHub avatar, Unsplash):',
    imageUrlPlaceholder: 'https://example.com/profile.jpg',
    applyUrl: 'Apply URL',
    cameraSnapshot: 'Take Snapshot',
    cameraClose: 'Close Camera',
    removePhoto: 'Remove Photo',
    photoProcessing: 'Processing image...',
    photoSuccess: 'Photo added successfully!',
    photoRemoved: 'Photo removed',
    photoErrorFormat: 'Please select a valid image file (PNG, JPG, JPEG, WEBP).',
    photoErrorProcess: 'Failed to process photo. Please try another image.',
    photoErrorCamera: 'Camera access denied or not available on this device.',

    // Experience Form
    expTitle: 'Work Experience',
    expSubtitle: 'List your relevant work history in reverse-chronological order (most recent first).',
    addPosition: 'Add Position',
    positionTitle: 'Job Title / Role',
    positionPlaceholder: 'e.g. Senior Frontend Developer',
    companyName: 'Company Name',
    companyPlaceholder: 'e.g. Stripe, Inc.',
    locationWork: 'Location (e.g. New York, NY / Remote)',
    startDate: 'Start Date',
    endDate: 'End Date',
    present: 'Present',
    currentWork: 'I currently work here',
    responsibilitiesTitle: 'Key Responsibilities & Achievements (Bullet Points)',
    bulletPlaceholder: 'Accomplished [X], measured by [Y], by doing [Z]...',
    addBullet: 'Add Bullet Point',
    deletePosition: 'Delete Position',
    emptyExpTitle: 'No work experience added yet',
    emptyExpDesc: 'Click "Add Position" above to add your previous work history.',

    // Education Form
    eduTitle: 'Education',
    eduSubtitle: 'Degrees, diplomas, university courses, and academic achievements.',
    addEducation: 'Add Education',
    degree: 'Degree / Qualification',
    degreePlaceholder: 'e.g. Bachelor of Science in Computer Science',
    fieldOfStudy: 'Field of Study / Major',
    fieldPlaceholder: 'e.g. Software Engineering',
    institution: 'School / University',
    institutionPlaceholder: 'e.g. Stanford University',
    gpa: 'GPA / Honors (Optional)',
    currentStudy: 'Currently enrolled here',
    deleteEducation: 'Delete Education',
    emptyEduTitle: 'No education entries added yet',
    emptyEduDesc: 'Click "Add Education" above to list your academic background.',

    // Skills Form
    skillsTitle: 'Skills & Competencies',
    skillsSubtitle: 'Group your core skills by category (e.g. Frontend, Backend, Cloud, Tools).',
    addCategory: 'Add Skill Category',
    categoryName: 'Category Name',
    categoryPlaceholder: 'e.g. Programming Languages',
    skillNamePlaceholder: 'Type a skill & press Enter...',
    addSkill: 'Add',
    quickSuggestions: 'Quick Suggestions',
    deleteCategory: 'Delete Category',

    // Projects Form
    projectsTitle: 'Featured Projects',
    projectsSubtitle: 'Highlight open-source contributions, web applications, or portfolio achievements.',
    addProject: 'Add Project',
    projectName: 'Project Name',
    projectRole: 'Your Role / Scope',
    liveUrl: 'Live Demo URL',
    githubUrl: 'GitHub Repository URL',
    techStack: 'Technologies Used',
    techStackPlaceholder: 'e.g. React, TypeScript, Node.js, PostgreSQL',
    deleteProject: 'Delete Project',

    // Credentials Form
    certTitle: 'Certifications & Licenses',
    certSubtitle: 'Industry credentials, cloud certifications, and licenses.',
    addCert: 'Add Certification',
    certName: 'Certification Name',
    certIssuer: 'Issuing Organization',
    certDate: 'Issue Date / Expiry',
    certUrl: 'Verification URL',
    languagesTitle: 'Spoken Languages',
    languagesSubtitle: 'Languages and your proficiency level.',
    addLanguage: 'Add Language',
    languageName: 'Language Name',
    proficiency: 'Proficiency Level',

    // Style & Design
    styleTitle: 'Template & Design Customizer',
    styleSubtitle: 'Select from 5 ATS-compliant templates, personalize colors, typography, and spacing.',
    templateLabel: 'CV Template Archetype',
    accentColorLabel: 'Accent Color',
    typographyLabel: 'Typography & Font Family',
    fontSizeLabel: 'Body Font Size',
    spacingLabel: 'Section Spacing',
    marginsLabel: 'Page Margins',
    showPhotoLabel: 'Display Profile Photo in Header',
    fontSmall: 'Compact (9.5pt)',
    fontMedium: 'Standard (10.5pt)',
    fontLarge: 'Spacious (11.5pt)',
    compact: 'Compact',
    normal: 'Normal',
    spacious: 'Spacious',

    // Preview & Zoom Toolbar
    previewTitle: 'Live CV Preview',
    livePreview: 'Interactive Page Canvas',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    resetZoom: 'Reset Zoom',
    fitWidth: 'Fit Width',
    fullScreen: 'Fullscreen',
    exitFullScreen: 'Exit Fullscreen',
    printPDF: 'Print / Save PDF',
    pageIndicator: 'Page 1 (A4 / Letter Standard)',

    // CV Template Section Headings
    sectionSummary: 'Professional Summary',
    sectionExperience: 'Work Experience',
    sectionEducation: 'Education',
    sectionSkills: 'Skills & Competencies',
    sectionProjects: 'Key Projects',
    sectionCertifications: 'Certifications & Licenses',
    sectionLanguages: 'Spoken Languages',
    sectionContact: 'Contact Details',

    // Export Modal
    exportTitle: 'Export & Download CV',
    exportSubtitle: 'Generate production-ready PDF prints, JSON backups, or copy plain text for online applications.',
    exportPdfBtn: 'Print / Download PDF',
    exportPdfDesc: 'High-resolution vector print ready for job applications.',
    downloadJsonBtn: 'Download CV Backup',
    downloadJsonDesc: 'Save full JSON schema file.',
    restoreJsonBtn: 'Restore CV Backup',
    restoreJsonDesc: 'Load previously saved JSON backup.',
    importLinkedInBtn: 'Import LinkedIn JSON',
    importLinkedInDesc: 'Populate experience, education, & skills from LinkedIn profile export.',
    copyTextBtn: 'Copy Plain Text',
    copyMarkdownBtn: 'Copy Markdown',
    copied: 'Copied to Clipboard!',
    close: 'Close',

    // LinkedIn Importer Modal
    liModalTitle: 'LinkedIn Profile Importer',
    liModalSubtitle: 'Import your experience, education, skills, and summary directly from a LinkedIn JSON export.',
    liPasteTab: 'Paste JSON Code',
    liUploadTab: 'Upload .JSON File',
    liLoadSampleBtn: 'Load Sample LinkedIn Data',
    liDetectedStats: 'Detected in profile payload:',
    liPositions: 'Positions',
    liEducations: 'Education entries',
    liSkillsCount: 'Skills detected',
    liReplaceCurrent: 'Replace Current CV',
    liMergeCurrent: 'Merge with Current CV',
    liImportSuccess: 'LinkedIn profile imported successfully!',
    liParseError: 'Could not parse JSON. Please verify the syntax.',
    liDropFile: 'Click to select or drop your LinkedIn export JSON file',

    // AI Assistant Tab
    aiTitle: 'AI Resume Assistant & ATS Optimizer',
    aiSubtitle: 'Optimize your CV content, check ATS compatibility, and tailor for specific job descriptions.',
    atsScoreTitle: 'ATS Compatibility & Keyword Checker',
    atsScoreDesc: 'Scans your resume for action verbs, measurable metrics, formatting consistency, and readability score.',
    analyzeAtsBtn: 'Run ATS Analysis',
    jobTailorTitle: 'Tailor Resume for Job Description',
    jobTailorDesc: 'Paste the target job description to get keyword matching recommendations and tailored bullets.',
    jobTailorPlaceholder: 'Paste target Job Description requirements here...',
    tailorResumeBtn: 'Analyze & Tailor',
    actionVerbsTitle: 'Strong Action Verbs Cheat Sheet',
    bulletPolisherTitle: 'AI Bullet Point Polisher (Google XYZ Formula)',
    pasteBulletPlaceholder: 'e.g. Worked on frontend features for the website',
    improveBulletBtn: 'Polish with Google XYZ Formula'
  },

  bn: {
    // App Header
    appName: 'সিভি ক্রাফট প্রো',
    appSubtitle: 'প্রফেশনাল রেজুমে ও সিভি নির্মাতা',
    saved: 'সংরক্ষিত',
    presets: 'নমুনা সিভি',
    sampleResumes: 'নমুনা সিভি তালিকা',
    startFresh: 'নতুন সিভি শুরু করুন',
    startFreshConfirm: 'বর্তমান সিভি মুছে কি সম্পূর্ণ নতুন ফাঁকা সিভি শুরু করতে চান?',
    loadPresetConfirm: 'এই নমুনা সিভিটি লোড করবেন? বর্তমান এডিটগুলো প্রতিস্থাপিত হবে।',
    importLinkedIn: 'লিংকডইন ইম্পোর্ট',
    aiStudio: 'এআই স্টুডিও',
    exportCV: 'সিভি এক্সপোর্ট',

    // Tabs
    tabPersonal: 'ব্যক্তিগত তথ্য',
    tabExperience: 'কাজের অভিজ্ঞতা',
    tabEducation: 'শিক্ষাগত যোগ্যতা',
    tabSkills: 'দক্ষতা সমূহ',
    tabProjects: 'প্রজেক্ট সমূহ',
    tabCredentials: 'সার্টিফিকেট ও ভাষা',
    tabStyle: 'ডিজাইন ও স্টাইল',
    tabAI: 'এআই ও এটিএস',

    // Personal Info Form
    personalTitle: 'ব্যক্তিগত ও যোগাযোগের বিবরণ',
    fullName: 'পূর্ণ নাম',
    fullNamePlaceholder: 'যেমনঃ রিয়াজ আহমেদ',
    jobTitle: 'পেশাগত পদবী / হেডলাইন',
    jobTitlePlaceholder: 'যেমনঃ সিনিয়র ফুলস্ট্যাক সফটওয়্যার ইঞ্জিনিয়ার',
    email: 'ইমেইল অ্যাড্রেস',
    phone: 'মোবাইল নম্বর',
    location: 'ঠিকানা / অবস্থান',
    locationPlaceholder: 'যেমনঃ ঢাকা, বাংলাদেশ (অথবা রিমোট)',
    website: 'পোর্টফোলিও / ওয়েবসাইট',
    linkedin: 'লিংকডইন প্রোফাইল লিঙ্ক',
    github: 'গিটহাব / গিটল্যাব লিঙ্ক',
    summaryTitle: 'পেশাগত সারসংক্ষেপ / নিজের সম্পর্কে',
    summarySubtitle: 'আপনার অভিজ্ঞতা, মূল শক্তি এবং ক্যারিয়ার লক্ষ্যের উপর ২-৪ লাইনের সংক্ষিপ্ত বিবরণ।',
    summaryPlaceholder: 'ফলাফল-কেন্দ্রিক সফটওয়্যার প্রকৌশলী যার স্কেলেবল ডিস্ট্রিবিউটেড সিস্টেম তৈরিতে ৫+ বছরের অভিজ্ঞতা রয়েছে...',
    aiEnhanceSummary: 'এআই দিয়ে সারসংক্ষেপ উন্নত করুন',

    // Profile Photo
    photoTitle: 'প্রোফাইল ছবি',
    photoSubtitle: 'ছবি আপলোড করুন, লিঙ্ক দিন অথবা নমুনা অবতার নির্বাচন করুন',
    photoVisible: 'সিভিতে প্রদর্শিত',
    photoHidden: 'সিভিতে লুকানো',
    photoUploadTab: 'ফাইল আপলোড',
    photoPresetsTab: 'নমুনা অবতার',
    photoUrlTab: 'ছবির লিঙ্ক',
    photoCameraTab: 'ওয়েবক্যাম',
    uploadDragDrop: 'ছবি নির্বাচন করতে ক্লিক করুন অথবা এখানে টেনে আনুন',
    uploadFormatSupport: 'JPG, PNG, WEBP ফরম্যাট সমর্থিত (সিভির জন্য অপ্টিমাইজড)',
    uploadClipboardTip: 'টিপসঃ কপি করা যেকোনো ছবি পেস্ট করতে Ctrl+V / Cmd+V চাপুন',
    sampleAvatarsDesc: 'সিভি লেআউট পরীক্ষা করার জন্য প্রফেশনাল নমুনা পোর্ট্রেট নির্বাচন করুনঃ',
    imageUrlDesc: 'যেকোনো পাবলিক ছবির লিঙ্ক পেস্ট করুন (লিংকডইন, গিটহাব, ড্রাইভ ইত্যাদি):',
    imageUrlPlaceholder: 'https://example.com/profile.jpg',
    applyUrl: 'লিঙ্ক প্রয়োগ করুন',
    cameraSnapshot: 'ছবি তুলুন',
    cameraClose: 'ক্যামেরা বন্ধ করুন',
    removePhoto: 'ছবি মুছুন',
    photoProcessing: 'ছবি প্রসেস হচ্ছে...',
    photoSuccess: 'ছবি সফলভাবে যুক্ত হয়েছে!',
    photoRemoved: 'ছবি মুছে ফেলা হয়েছে',
    photoErrorFormat: 'অনুগ্রহ করে সঠিক ছবি ফাইল (PNG, JPG, JPEG, WEBP) নির্বাচন করুন।',
    photoErrorProcess: 'ছবি প্রসেস করতে ব্যর্থ হয়েছে। অন্য ছবি দিয়ে চেষ্টা করুন।',
    photoErrorCamera: 'ক্যামেরা অ্যাক্সেস পাওয়া যায়নি বা এই ডিভাইসে সমর্থিত নয়।',

    // Experience Form
    expTitle: 'কাজের অভিজ্ঞতা',
    expSubtitle: 'আপনার প্রাসঙ্গিক চাকরির অভিজ্ঞতা সাম্প্রতিক থেকে পূর্ববর্তী ক্রমে সাজান।',
    addPosition: 'নতুন অভিজ্ঞতা যোগ করুন',
    positionTitle: 'চাকরির পদবী / রোল',
    positionPlaceholder: 'যেমনঃ সিনিয়র ফ্রন্টএন্ড ডেভেলপার',
    companyName: 'প্রতিষ্ঠানের নাম',
    companyPlaceholder: 'যেমনঃ গুগল, মাইক্রোসফট বা পাঠাও',
    locationWork: 'কাজের স্থান (যেমনঃ ঢাকা / রিমোট)',
    startDate: 'শুরুর তারিখ',
    endDate: 'শেষের তারিখ',
    present: 'বর্তমান',
    currentWork: 'আমি বর্তমানে এখানে কর্মরত',
    responsibilitiesTitle: 'মূল দায়িত্ব ও সাফল্য সমূহ (বুলেট পয়েন্ট)',
    bulletPlaceholder: '[Z] পদ্ধতি প্রয়োগ করে [Y] পরিমাপের মাধ্যমে [X] লক্ষ্য অর্জন করেছি...',
    addBullet: 'নতুন বুলেট যোগ করুন',
    deletePosition: 'অভিজ্ঞতা মুছুন',
    emptyExpTitle: 'কোনো কাজের অভিজ্ঞতা এখনো যোগ করা হয়নি',
    emptyExpDesc: 'আপনার পূর্ববর্তী কাজের বিবরণ যোগ করতে উপরের "নতুন অভিজ্ঞতা যোগ করুন" বাটনে ক্লিক করুন।',

    // Education Form
    eduTitle: 'শিক্ষাগত যোগ্যতা',
    eduSubtitle: 'ডিগ্রি, ডিপ্লোমা, প্রাতিষ্ঠানিক কোর্স এবং একাডেমিক অর্জনসমূহ।',
    addEducation: 'নতুন শিক্ষা যোগ করুন',
    degree: 'ডিগ্রি / শিক্ষাগত স্তর',
    degreePlaceholder: 'যেমনঃ বি.এস.সি ইন কম্পিউটার সায়েন্স',
    fieldOfStudy: 'অধ্যয়নের বিষয় / মেজর',
    fieldPlaceholder: 'যেমনঃ সফটওয়্যার ইঞ্জিনিয়ারিং',
    institution: 'শিক্ষা প্রতিষ্ঠান / বিশ্ববিদ্যালয়',
    institutionPlaceholder: 'যেমনঃ ঢাকা বিশ্ববিদ্যালয় / বুয়েট',
    gpa: 'সিজিপিএ / গ্রেড (ঐচ্ছিক)',
    currentStudy: 'বর্তমানে এখানে অধ্যয়নরত',
    deleteEducation: 'শিক্ষা বিবরণ মুছুন',
    emptyEduTitle: 'কোনো শিক্ষাগত যোগ্যতা এখনো যোগ করা হয়নি',
    emptyEduDesc: 'আপনার শিক্ষাগত পটভূমি যোগ করতে "নতুন শিক্ষা যোগ করুন" বাটনে ক্লিক করুন।',

    // Skills Form
    skillsTitle: 'দক্ষতা ও কারিগরি পারদর্শিতা',
    skillsSubtitle: 'আপনার দক্ষতাগুলো ক্যাটাগরি অনুযায়ী সাজান (যেমনঃ ফ্রন্টএন্ড, ব্যাকএন্ড, ক্লাউড, টুলস)।',
    addCategory: 'নতুন ক্যাটাগরি যোগ করুন',
    categoryName: 'ক্যাটাগরির নাম',
    categoryPlaceholder: 'যেমনঃ প্রোগ্রামিং ল্যাঙ্গুয়েজ',
    skillNamePlaceholder: 'দক্ষতার নাম লিখে এন্টার চাপুন...',
    addSkill: 'যোগ করুন',
    quickSuggestions: 'জনপ্রিয় সাজেস্টসমূহ',
    deleteCategory: 'ক্যাটাগরি মুছুন',

    // Projects Form
    projectsTitle: 'উল্লেখযোগ্য প্রজেক্ট সমূহ',
    projectsSubtitle: 'আপনার সেরা ওপেন-সোর্স প্রজেক্ট, ওয়েব অ্যাপ্লিকেশন বা পোর্টফোলিও কাজগুলো তুলে ধরুন।',
    addProject: 'নতুন প্রজেক্ট যোগ করুন',
    projectName: 'প্রজেক্টের নাম',
    projectRole: 'আপনার ভূমিকা / দায়িত্ব',
    liveUrl: 'লাইভ ডেমো লিঙ্ক',
    githubUrl: 'গিটহাব কোড রিপোজিটরি লিঙ্ক',
    techStack: 'ব্যবহৃত প্রযুক্তিসমূহ',
    techStackPlaceholder: 'যেমনঃ React, TypeScript, Node.js, PostgreSQL',
    deleteProject: 'প্রজেক্ট মুছুন',

    // Credentials Form
    certTitle: 'সার্টিফিকেশন ও লাইসেন্স',
    certSubtitle: 'প্রফেশনাল কোর্স, ক্লাউড সার্টিফিকেশন এবং পেশাগত স্বীকৃতি।',
    addCert: 'সার্টিফিকেট যোগ করুন',
    certName: 'সার্টিফিকেটের নাম',
    certIssuer: 'প্রদানকারী প্রতিষ্ঠান',
    certDate: 'অর্জনের তারিখ / মেয়াদ',
    certUrl: 'যাচাইকরণ লিঙ্ক',
    languagesTitle: 'ভাষাগত দক্ষতা',
    languagesSubtitle: 'জানা ভাষা ও দক্ষতার স্তর।',
    addLanguage: 'ভাষা যোগ করুন',
    languageName: 'ভাষার নাম',
    proficiency: 'দক্ষতার স্তর',

    // Style & Design
    styleTitle: 'টেমপ্লেট ও ডিজাইন কাস্টমাইজেশন',
    styleSubtitle: '৫টি এটিএস-বান্ধব টেমপ্লেট থেকে পছন্দ করুন, রঙ, ফন্ট ও স্পেসিং পরিবর্তন করুন।',
    templateLabel: 'সিভি টেমপ্লেট স্টাইল',
    accentColorLabel: 'হাইলাইট কালার',
    typographyLabel: 'ফন্ট ফ্যামিলি',
    fontSizeLabel: 'ফন্ট সাইজ',
    spacingLabel: 'সেকশন স্পেসিং',
    marginsLabel: 'মার্জিন সাইজ',
    showPhotoLabel: 'হেডারে প্রোফাইল ছবি প্রদর্শন করুন',
    fontSmall: 'কম্প্যাক্ট (৯.৫ পয়েন্ট)',
    fontMedium: 'স্ট্যান্ডার্ড (১০.৫ পয়েন্ট)',
    fontLarge: 'প্রশস্ত (১১.৫ পয়েন্ট)',
    compact: 'কম্প্যাক্ট',
    normal: 'স্বাভাবিক',
    spacious: 'প্রশস্ত',

    // Preview & Zoom Toolbar
    previewTitle: 'লাইভ সিভি প্রিভিউ',
    livePreview: 'ইন্টারেক্টিভ পেজ ক্যানভাস',
    zoomIn: 'বড় করুন (Zoom In)',
    zoomOut: 'ছোট করুন (Zoom Out)',
    resetZoom: 'রিসেট জুম',
    fitWidth: 'স্ক্রিন ফিট',
    fullScreen: 'ফুলস্ক্রিন',
    exitFullScreen: 'ফুলস্ক্রিন বন্ধ',
    printPDF: 'পিডিএফ প্রিন্ট / ডাউনলোড',
    pageIndicator: 'পৃষ্ঠা ১ (A4 / Letter স্ট্যান্ডার্ড)',

    // CV Template Section Headings
    sectionSummary: 'পেশাগত সারসংক্ষেপ',
    sectionExperience: 'কাজের অভিজ্ঞতা',
    sectionEducation: 'শিক্ষাগত যোগ্যতা',
    sectionSkills: 'দক্ষতা ও পারদর্শিতা',
    sectionProjects: 'উল্লেখযোগ্য প্রজেক্ট সমূহ',
    sectionCertifications: 'সার্টিফিকেশন ও লাইসেন্স',
    sectionLanguages: 'ভাষাগত দক্ষতা',
    sectionContact: 'যোগাযোগের বিবরণ',

    // Export Modal
    exportTitle: 'সিভি এক্সপোর্ট ও ডাউনলোড',
    exportSubtitle: 'চাকরির আবেদনের জন্য হাই-রেজোলিউশন পিডিএফ প্রিন্ট নিন বা ব্যাকআপ সংরক্ষণ করুন।',
    exportPdfBtn: 'পিডিএফ প্রিন্ট / ডাউনলোড',
    exportPdfDesc: 'জব আবেদনের জন্য সরাসরি ভেক্টর কোয়ালিটি প্রিন্ট।',
    downloadJsonBtn: 'সিভি ব্যাকআপ ডাউনলোড',
    downloadJsonDesc: 'সম্পূর্ণ JSON ফাইল হিসেবে সেভ রাখুন।',
    restoreJsonBtn: 'সিভি ব্যাকআপ রিস্টোর',
    restoreJsonDesc: 'পূর্বের সংরক্ষিত JSON ব্যাকআপ লোড করুন।',
    importLinkedInBtn: 'লিংকডইন JSON ইম্পোর্ট',
    importLinkedInDesc: 'লিংকডইন প্রোফাইল এক্সপোর্ট থেকে সরাসরি তথ্য যুক্ত করুন।',
    copyTextBtn: 'প্লেইন টেক্সট কপি',
    copyMarkdownBtn: 'মার্কডাউন কপি',
    copied: 'ক্লিপবোর্ডে কপি হয়েছে!',
    close: 'বন্ধ করুন',

    // LinkedIn Importer Modal
    liModalTitle: 'লিংকডইন প্রোফাইল ইম্পোর্টার',
    liModalSubtitle: 'লিংকডইন প্রোফাইল JSON ফাইল দিয়ে সরাসরি অভিজ্ঞতা, শিক্ষা ও দক্ষতা পূরণ করুন।',
    liPasteTab: 'JSON কোড পেস্ট করুন',
    liUploadTab: '.JSON ফাইল আপলোড',
    liLoadSampleBtn: 'নমুনা লিংকডইন ডেটা লোড করুন',
    liDetectedStats: 'প্রোফাইলে পাওয়া গেছে:',
    liPositions: 'টি কাজের অভিজ্ঞতা',
    liEducations: 'টি শিক্ষাগত যোগ্যতা',
    liSkillsCount: 'টি স্কিল বা দক্ষতা',
    liReplaceCurrent: 'বর্তমান সিভি প্রতিস্থাপন করুন',
    liMergeCurrent: 'বর্তমান সিভির সাথে একত্রিত করুন',
    liImportSuccess: 'লিংকডইন প্রোফাইল সফলভাবে ইম্পোর্ট হয়েছে!',
    liParseError: 'JSON পার্স করা যায়নি। অনুগ্রহ করে সিনট্যাক্স চেক করুন।',
    liDropFile: 'লিংকডইন এক্সপোর্ট JSON ফাইল এখানে নির্বাচন করুন বা টেনে আনুন',

    // AI Assistant Tab
    aiTitle: 'এআই রেজুমে অ্যাসিস্ট্যান্ট ও এটিএস অপ্টিমাইজার',
    aiSubtitle: 'সিভির কনটেন্ট নিখুঁত করুন, এটিএস স্কোর চেক করুন এবং নির্দিষ্ট চাকরির জন্য সাজান।',
    atsScoreTitle: 'এটিএস কম্প্যাটিবিলিটি ও কিওয়ার্ড চেকার',
    atsScoreDesc: 'সিভিতে উপযুক্ত অ্যাকশন ভার্ব, পরিমাপযোগ্য ফলাফল এবং ফরম্যাটিং চেক করে স্কোর নির্ণয় করে।',
    analyzeAtsBtn: 'এটিএস বিশ্লেষণ করুন',
    jobTailorTitle: 'জব ডেসক্রিপশন অনুযায়ী সিভি কাস্টমাইজেশন',
    jobTailorDesc: 'কাঙ্ক্ষিত চাকরির বিজ্ঞপ্তিটি পেস্ট করুন এবং মানানসই কি-ওয়ার্ড ও পয়েন্ট সাজেস্ট পান।',
    jobTailorPlaceholder: 'টার্গেট চাকরির বিবরণী বা রিকোয়ারমেন্টস এখানে পেস্ট করুন...',
    tailorResumeBtn: 'বিশ্লেষণ ও কাস্টমাইজ করুন',
    actionVerbsTitle: 'কার্যকর অ্যাকশন ভার্ব তালিকা',
    bulletPolisherTitle: 'এআই বুলেট পয়েন্ট পলিশার (Google XYZ ফর্মুলা)',
    pasteBulletPlaceholder: 'যেমনঃ ওয়েবসাইটের ফ্রন্টএন্ড ফিচার তৈরির কাজ করেছি',
    improveBulletBtn: 'Google XYZ ফর্মুলায় রূপান্তর করুন'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('cv_builder_lang');
      if (saved === 'bn' || saved === 'en') return saved;
    } catch {
      // Fallback
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('cv_builder_lang', lang);
    } catch {
      // ignore
    }
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
