import { CVData, ExperienceItem, EducationItem, SkillCategory, ProjectItem, CertificationItem, LanguageItem } from '../types';
import { DEFAULT_STYLE } from '../data/sampleCV';

export interface LinkedInParseResult {
  success: boolean;
  parsedData: Partial<CVData>;
  stats: {
    hasPersonalInfo: boolean;
    experienceCount: number;
    educationCount: number;
    skillsCount: number;
    projectsCount: number;
    certificationsCount: number;
    languagesCount: number;
  };
  warnings: string[];
}

/**
 * Normalizes date representations from various LinkedIn export formats into YYYY-MM or Year
 */
function normalizeDate(raw: any): string {
  if (!raw) return '';
  if (typeof raw === 'string') {
    const trimmed = raw.trim();
    if (/^\d{4}$/.test(trimmed)) return trimmed;
    if (/^\d{4}-\d{2}/.test(trimmed)) return trimmed.substring(0, 7);
    // Month Year e.g. "Jan 2020" or "January 2020"
    const parsed = Date.parse(trimmed);
    if (!isNaN(parsed)) {
      const d = new Date(parsed);
      const m = String(d.getMonth() + 1).padStart(2, '0');
      return `${d.getFullYear()}-${m}`;
    }
    return trimmed;
  }
  if (typeof raw === 'number') {
    return String(raw);
  }
  if (typeof raw === 'object') {
    // e.g. { year: 2021, month: 3, day: 1 }
    const year = raw.year || raw.Year || raw.y;
    const month = raw.month || raw.Month || raw.m;
    if (year && month) {
      return `${year}-${String(month).padStart(2, '0')}`;
    }
    if (year) return String(year);
  }
  return '';
}

/**
 * Splits multiline string description into crisp bullet points / highlights
 */
function extractHighlights(desc: any): string[] {
  if (!desc) return [];
  if (Array.isArray(desc)) {
    return desc.map((d) => String(d).trim()).filter(Boolean);
  }
  if (typeof desc === 'string') {
    return desc
      .split(/\r?\n|•|\*| - /)
      .map((line) => line.trim().replace(/^[-•*–—]\s*/, ''))
      .filter((line) => line.length > 0);
  }
  return [];
}

/**
 * Resiliently parses pasted LinkedIn JSON data into structured CV data
 */
export function parseLinkedInJson(rawInput: string | object): LinkedInParseResult {
  const warnings: string[] = [];
  let root: any;

  try {
    if (typeof rawInput === 'string') {
      root = JSON.parse(rawInput.trim());
    } else {
      root = rawInput;
    }
  } catch (err: any) {
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
      warnings: ['Invalid JSON format. Please ensure valid JSON is pasted.']
    };
  }

  const result: Partial<CVData> = {
    personalInfo: {
      fullName: '',
      jobTitle: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: '',
      photoUrl: ''
    },
    summary: '',
    experience: [],
    education: [],
    skillCategories: [],
    projects: [],
    certifications: [],
    languages: []
  };

  // If root is an Array, detect what kind of array it is (Positions array, Education array, etc.)
  if (Array.isArray(root)) {
    if (root.length === 0) {
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
        warnings: ['Pasted JSON array is empty.']
      };
    }

    const first = root[0];
    if (first && (first['Company Name'] || first.company || first.companyName || first.title || first.position)) {
      result.experience = parsePositionsArray(root);
    } else if (first && (first['School Name'] || first.school || first.schoolName || first.institution || first.degree)) {
      result.education = parseEducationArray(root);
    } else if (first && (first['Name'] || typeof first === 'string' || first.skill || first.name)) {
      result.skillCategories = parseSkillsArray(root);
    } else {
      // Treat as list of general items or multiple sections
      warnings.push('Unrecognized array schema; attempted best-effort parsing.');
    }
  } else if (typeof root === 'object' && root !== null) {
    // 1. Personal Information extraction
    const firstName =
      root.firstName ||
      root.first_name ||
      root['First Name'] ||
      root.given_name ||
      '';
    const lastName =
      root.lastName ||
      root.last_name ||
      root['Last Name'] ||
      root.family_name ||
      '';
    const fullNameRaw =
      root.fullName ||
      root.full_name ||
      root.name ||
      root.displayName ||
      root['Full Name'] ||
      root['Name'] ||
      '';

    const fullName =
      fullNameRaw || (firstName || lastName ? `${firstName} ${lastName}`.trim() : '');

    const jobTitle =
      root.headline ||
      root.jobTitle ||
      root.job_title ||
      root.title ||
      root.occupation ||
      root.position ||
      root['Headline'] ||
      root['Job Title'] ||
      '';

    const email =
      root.email ||
      root.emailAddress ||
      root.email_address ||
      root['Email Address'] ||
      root['Email'] ||
      '';

    const phone =
      root.phone ||
      root.phoneNumber ||
      root.phone_numbers?.[0] ||
      root.phone_number ||
      root['Phone Number'] ||
      '';

    const locationCity = root.city || root.location?.city || root['City'] || '';
    const locationState = root.state || root.location?.state || root['State'] || '';
    const locationCountry = root.country || root.location?.country || root['Country'] || '';
    const locationName =
      root.locationName ||
      root.location_name ||
      root.location ||
      root['Location Name'] ||
      root['Geo Location'] ||
      '';

    let location = '';
    if (typeof locationName === 'string' && locationName) {
      location = locationName;
    } else {
      location = [locationCity, locationState, locationCountry].filter(Boolean).join(', ');
    }

    const linkedin =
      root.linkedinUrl ||
      root.linkedin_url ||
      root.public_identifier ||
      root.vanity_name ||
      root.profileUrl ||
      root['Linkedin Url'] ||
      '';

    const photoUrl =
      root.profilePicture ||
      root.profile_pic_url ||
      root.avatar ||
      root.photoUrl ||
      root.profile_picture ||
      root.picture ||
      '';

    const website =
      root.website ||
      root.personal_website ||
      root.websites?.[0] ||
      root.websites?.[0]?.url ||
      '';

    result.personalInfo = {
      fullName,
      jobTitle,
      email,
      phone,
      location,
      website: typeof website === 'string' ? website : '',
      linkedin: typeof linkedin === 'string' ? (linkedin.startsWith('http') ? linkedin : `https://linkedin.com/in/${linkedin}`) : '',
      github: typeof root.github === 'string' ? root.github : '',
      photoUrl: typeof photoUrl === 'string' ? photoUrl : ''
    };

    // 2. Summary
    const summary =
      root.summary ||
      root.about ||
      root.bio ||
      root.description ||
      root['Summary'] ||
      root['About'] ||
      '';
    result.summary = typeof summary === 'string' ? summary.trim() : '';

    // 3. Work Experience
    const positionsRaw =
      root.positions ||
      root.experience ||
      root.experiences ||
      root.workExperience ||
      root.work_experience ||
      root['Positions'] ||
      root['Experience'] ||
      [];
    if (Array.isArray(positionsRaw)) {
      result.experience = parsePositionsArray(positionsRaw);
    }

    // 4. Education
    const educationRaw =
      root.education ||
      root.educations ||
      root.schools ||
      root['Education'] ||
      root['Schools'] ||
      [];
    if (Array.isArray(educationRaw)) {
      result.education = parseEducationArray(educationRaw);
    }

    // 5. Skills
    const skillsRaw =
      root.skills ||
      root.skillCategories ||
      root.skillsList ||
      root['Skills'] ||
      [];
    if (Array.isArray(skillsRaw)) {
      result.skillCategories = parseSkillsArray(skillsRaw);
    }

    // 6. Projects
    const projectsRaw =
      root.projects ||
      root.projectList ||
      root['Projects'] ||
      [];
    if (Array.isArray(projectsRaw)) {
      result.projects = parseProjectsArray(projectsRaw);
    }

    // 7. Certifications
    const certsRaw =
      root.certifications ||
      root.licenses ||
      root.credentials ||
      root['Certifications'] ||
      [];
    if (Array.isArray(certsRaw)) {
      result.certifications = parseCertificationsArray(certsRaw);
    }

    // 8. Languages
    const languagesRaw =
      root.languages ||
      root.languageList ||
      root['Languages'] ||
      [];
    if (Array.isArray(languagesRaw)) {
      result.languages = parseLanguagesArray(languagesRaw);
    }
  }

  const stats = {
    hasPersonalInfo: Boolean(result.personalInfo?.fullName || result.personalInfo?.jobTitle),
    experienceCount: result.experience?.length || 0,
    educationCount: result.education?.length || 0,
    skillsCount: result.skillCategories?.reduce((acc, c) => acc + c.skills.length, 0) || 0,
    projectsCount: result.projects?.length || 0,
    certificationsCount: result.certifications?.length || 0,
    languagesCount: result.languages?.length || 0
  };

  const hasAnyData =
    stats.hasPersonalInfo ||
    stats.experienceCount > 0 ||
    stats.educationCount > 0 ||
    stats.skillsCount > 0 ||
    Boolean(result.summary);

  return {
    success: hasAnyData,
    parsedData: result,
    stats,
    warnings: hasAnyData
      ? warnings
      : ['Could not detect recognized LinkedIn profile fields. Please check your JSON format.']
  };
}

function parsePositionsArray(arr: any[]): ExperienceItem[] {
  return arr.map((item, idx) => {
    if (typeof item !== 'object' || item === null) {
      return {
        id: `exp-${Date.now()}-${idx}`,
        company: 'Company',
        position: String(item),
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        highlights: []
      };
    }

    const company =
      item.company ||
      item.companyName ||
      item.company_name ||
      item['Company Name'] ||
      item['Company'] ||
      '';

    const position =
      item.title ||
      item.position ||
      item.jobTitle ||
      item.role ||
      item['Title'] ||
      item['Position'] ||
      '';

    const location =
      item.location ||
      item.locationName ||
      item.location_name ||
      item['Location'] ||
      item['Company Location'] ||
      '';

    const startDate =
      normalizeDate(item.startDate || item.start_date || item.starts_at || item['Started On'] || item['Start Date']) ||
      '';

    const isCurrent =
      item.current === true ||
      item.is_current === true ||
      item['Finished On'] === 'Present' ||
      item['End Date'] === 'Present' ||
      item.endDate === 'Present' ||
      (!item.endDate && !item.end_date && !item.ends_at && !item['Finished On'] && Boolean(startDate));

    const endDate = isCurrent
      ? ''
      : normalizeDate(item.endDate || item.end_date || item.ends_at || item['Finished On'] || item['End Date']) || '';

    const rawDesc =
      item.description ||
      item.summary ||
      item.highlights ||
      item.responsibilities ||
      item['Description'] ||
      '';

    const highlights = extractHighlights(rawDesc);

    return {
      id: `exp-${Date.now()}-${idx}`,
      company: String(company || 'Company'),
      position: String(position || 'Role'),
      location: String(location || ''),
      startDate,
      endDate,
      current: isCurrent,
      highlights: highlights.length > 0 ? highlights : []
    };
  });
}

function parseEducationArray(arr: any[]): EducationItem[] {
  return arr.map((item, idx) => {
    if (typeof item !== 'object' || item === null) {
      return {
        id: `edu-${Date.now()}-${idx}`,
        institution: String(item),
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        current: false,
        highlights: []
      };
    }

    const institution =
      item.school ||
      item.schoolName ||
      item.institution ||
      item.university ||
      item.college ||
      item['School Name'] ||
      item['School'] ||
      '';

    const degree =
      item.degree ||
      item.degreeName ||
      item.degree_name ||
      item['Degree Name'] ||
      item['Degree'] ||
      '';

    const fieldOfStudy =
      item.fieldOfStudy ||
      item.field_of_study ||
      item.major ||
      item['Field of Study'] ||
      item['Major'] ||
      '';

    const location =
      item.location ||
      item.locationName ||
      item['Location'] ||
      '';

    const startDate =
      normalizeDate(item.startDate || item.start_date || item.starts_at || item['Start Date'] || item['Started On']) ||
      '';

    const isCurrent =
      item.current === true ||
      item.is_current === true ||
      item['Finished On'] === 'Present' ||
      item['End Date'] === 'Present' ||
      item.endDate === 'Present' ||
      (!item.endDate && !item.end_date && !item.ends_at && !item['Finished On'] && Boolean(startDate));

    const endDate = isCurrent
      ? ''
      : normalizeDate(item.endDate || item.end_date || item.ends_at || item['End Date'] || item['Finished On']) || '';

    const notes = item.notes || item.description || item.grade || item['Notes'] || '';
    const gpa = item.gpa || item.grade || item['GPA'] || '';
    const highlights = extractHighlights(notes);

    return {
      id: `edu-${Date.now()}-${idx}`,
      institution: String(institution || 'University'),
      degree: String(degree || 'Degree'),
      fieldOfStudy: String(fieldOfStudy || ''),
      location: String(location || ''),
      startDate,
      endDate,
      current: isCurrent,
      gpa: typeof gpa === 'string' ? gpa : '',
      highlights: highlights.length > 0 ? highlights : []
    };
  });
}

function parseSkillsArray(arr: any[]): SkillCategory[] {
  // If array is strings: ["React", "Node.js", "Docker"]
  const skillsList: string[] = [];

  arr.forEach((item) => {
    if (typeof item === 'string') {
      skillsList.push(item.trim());
    } else if (typeof item === 'object' && item !== null) {
      const name = item.name || item.skill || item.title || item['Name'] || item['Skill Name'];
      if (name && typeof name === 'string') {
        skillsList.push(name.trim());
      } else if (item.skills && Array.isArray(item.skills)) {
        item.skills.forEach((s: any) => {
          if (typeof s === 'string') skillsList.push(s.trim());
          else if (s?.name) skillsList.push(String(s.name).trim());
        });
      }
    }
  });

  const uniqueSkills = Array.from(new Set(skillsList.filter(Boolean)));

  if (uniqueSkills.length === 0) return [];

  // Group skills intelligently or into Core Expertise category
  return [
    {
      id: `cat-${Date.now()}`,
      categoryName: 'Skills & Competencies',
      skills: uniqueSkills.map((name) => ({ name, level: 4 }))
    }
  ];
}

function parseProjectsArray(arr: any[]): ProjectItem[] {
  return arr.map((item, idx) => {
    const title = item.title || item.name || item['Title'] || item['Project Name'] || 'Project';
    const description = item.description || item.summary || item['Description'] || '';
    const url = item.url || item.link || item['Url'] || '';
    const githubUrl = item.githubUrl || item.github || '';
    const technologies = Array.isArray(item.technologies)
      ? item.technologies
      : typeof item.skills === 'string'
      ? item.skills.split(',').map((s: string) => s.trim())
      : [];

    return {
      id: `proj-${Date.now()}-${idx}`,
      title: String(title),
      description: String(description),
      technologies,
      url: String(url),
      githubUrl: String(githubUrl)
    };
  });
}

function parseCertificationsArray(arr: any[]): CertificationItem[] {
  return arr.map((item, idx) => {
    const name = item.name || item.title || item['Name'] || item['Certification Name'] || 'Certification';
    const issuer = item.authority || item.issuer || item.organization || item['Authority'] || item['Issuer'] || '';
    const issueDate = normalizeDate(item.issueDate || item.date || item.starts_at || item['Started On'] || item['Issue Date']) || '';
    const credentialId = item.licenseNumber || item.credentialId || item.id || item['License Number'] || '';

    return {
      id: `cert-${Date.now()}-${idx}`,
      name: String(name),
      issuer: String(issuer),
      issueDate,
      credentialId: String(credentialId)
    };
  });
}

function parseLanguagesArray(arr: any[]): LanguageItem[] {
  return arr.map((item, idx) => {
    if (typeof item === 'string') {
      return {
        id: `lang-${Date.now()}-${idx}`,
        language: item,
        proficiency: 'Fluent'
      };
    }
    const language = item.name || item.language || item['Name'] || item['Language'] || 'Language';
    const prof = item.proficiency || item['Proficiency'] || 'Fluent';
    return {
      id: `lang-${Date.now()}-${idx}`,
      language: String(language),
      proficiency: String(prof) as any
    };
  });
}
