import { CVData } from '../types';

export const DEFAULT_STYLE: CVData['style'] = {
  template: 'modern',
  accentColor: '#2563eb', // Royal Blue
  fontFamily: 'sans',
  fontSize: 'standard',
  lineHeight: 'normal',
  marginSize: 'standard',
  showPhoto: true,
  sectionOrder: [
    'summary',
    'experience',
    'skills',
    'education',
    'projects',
    'certifications',
    'languages',
    'custom'
  ],
  visibleSections: {
    summary: true,
    experience: true,
    skills: true,
    education: true,
    projects: true,
    certifications: true,
    languages: true,
    custom: false
  }
};

export const SOFTWARE_ENGINEER_CV: CVData = {
  id: 'software-engineer-default',
  title: 'Senior Full-Stack Engineer Resume',
  updatedAt: new Date().toISOString(),
  personalInfo: {
    fullName: 'Alex R. Morgan',
    jobTitle: 'Senior Full-Stack Engineer',
    email: 'alex.morgan@techmail.dev',
    phone: '+1 (555) 382-9102',
    location: 'San Francisco, CA',
    website: 'https://alexmorgan.dev',
    linkedin: 'linkedin.com/in/alexmorgan-dev',
    github: 'github.com/alexmorgan-dev',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
  },
  summary: 'Results-driven Senior Full-Stack Engineer with 7+ years of experience architecting high-throughput distributed systems, microservices, and modern web applications. Proven track record of scaling cloud infrastructure to support 2M+ active users while reducing latency by 35%. Expert in TypeScript, React, Node.js, and GCP/AWS cloud architectures.',
  experience: [
    {
      id: 'exp-1',
      company: 'Apex Cloud Technologies',
      position: 'Senior Staff Engineer',
      location: 'San Francisco, CA',
      startDate: '2023-01',
      endDate: 'Present',
      current: true,
      highlights: [
        'Spearheaded redesign of real-time collaboration pipeline using WebSocket & WebRTC, handling 50k concurrent channels with 99.99% uptime.',
        'Architected serverless microservices architecture in Node.js and Go, reducing AWS infrastructure expenditure by $120k annually.',
        'Mentored a cross-functional engineering squad of 8 engineers, introducing automated CI/CD workflows and raising code coverage to 92%.'
      ]
    },
    {
      id: 'exp-2',
      company: 'Veloce Systems',
      position: 'Full-Stack Software Engineer',
      location: 'Palo Alto, CA',
      startDate: '2020-03',
      endDate: '2022-12',
      current: false,
      highlights: [
        'Engineered responsive customer analytics dashboard in React & Tailwind CSS, boosting user engagement metrics by 28%.',
        'Implemented optimized GraphQL query batching and Redis caching, slashing API p99 latency from 450ms down to 85ms.',
        'Collaborated with product design teams to build a scalable UI component library adopted across 14 internal repositories.'
      ]
    },
    {
      id: 'exp-3',
      company: 'BrightByte Studio',
      position: 'Junior Web Developer',
      location: 'San Jose, CA',
      startDate: '2018-06',
      endDate: '2020-02',
      current: false,
      highlights: [
        'Developed RESTful APIs and interactive front-end web interfaces for fintech client projects.',
        'Automated database migration scripts using PostgreSQL and Knex.js, preventing data loss across multi-tenant deployments.'
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science & Software Engineering',
      location: 'Berkeley, CA',
      startDate: '2014-08',
      endDate: '2018-05',
      current: false,
      gpa: '3.85 / 4.0',
      highlights: [
        'Dean’s Honor List for 6 consecutive semesters',
        'Head Teaching Assistant for Data Structures and Algorithms'
      ]
    }
  ],
  skillCategories: [
    {
      id: 'skill-cat-1',
      categoryName: 'Languages & Core',
      skills: [
        { name: 'TypeScript', level: 5 },
        { name: 'JavaScript (ESNext)', level: 5 },
        { name: 'Python', level: 4 },
        { name: 'SQL & PostgreSQL', level: 4 },
        { name: 'Go / Golang', level: 3 }
      ]
    },
    {
      id: 'skill-cat-2',
      categoryName: 'Frameworks & Tools',
      skills: [
        { name: 'React 18/19', level: 5 },
        { name: 'Next.js / Express', level: 5 },
        { name: 'Tailwind CSS', level: 5 },
        { name: 'Node.js', level: 5 },
        { name: 'GraphQL / REST', level: 4 }
      ]
    },
    {
      id: 'skill-cat-3',
      categoryName: 'Cloud & DevOps',
      skills: [
        { name: 'Docker / Kubernetes', level: 4 },
        { name: 'Google Cloud Platform (GCP)', level: 4 },
        { name: 'AWS (Lambda, S3, ECS)', level: 4 },
        { name: 'GitHub Actions CI/CD', level: 4 }
      ]
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'DevPulse - Open-Source Dev Observability Platform',
      description: 'Real-time telemetry and error monitoring dashboard built for high-throughput containerized microservices.',
      technologies: ['TypeScript', 'React', 'Go', 'Prometheus', 'Tailwind'],
      url: 'https://devpulse.io',
      githubUrl: 'https://github.com/alexmorgan-dev/devpulse',
      highlights: [
        'Starred over 2,400 times on GitHub with 40+ active open-source contributors.',
        'Processed over 10M events daily with sub-second dashboard rendering.'
      ]
    },
    {
      id: 'proj-2',
      title: 'PulseCanvas - Collaborative Whiteboard App',
      description: 'Multi-user infinite canvas supporting real-time cursor syncing and vector drawing.',
      technologies: ['React', 'WebSockets', 'HTML5 Canvas', 'Tailwind CSS'],
      url: 'https://pulsecanvas.app',
      githubUrl: 'https://github.com/alexmorgan-dev/pulsecanvas'
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'Google Cloud Certified Professional Cloud Architect',
      issuer: 'Google Cloud Platform',
      issueDate: '2023-04',
      expiryDate: '2025-04',
      credentialId: 'GCP-PCA-83921'
    },
    {
      id: 'cert-2',
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      issueDate: '2022-08',
      expiryDate: '2025-08',
      credentialId: 'AWS-ASA-99212'
    }
  ],
  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Native' },
    { id: 'lang-2', language: 'Spanish', proficiency: 'Advanced' }
  ],
  customSections: [],
  style: DEFAULT_STYLE
};

export const PRODUCT_MANAGER_CV: CVData = {
  id: 'product-manager-preset',
  title: 'Lead Product Manager CV',
  updatedAt: new Date().toISOString(),
  personalInfo: {
    fullName: 'Elena Vance',
    jobTitle: 'Lead Technical Product Manager',
    email: 'elena.vance@productcraft.com',
    phone: '+1 (555) 921-4401',
    location: 'New York, NY',
    website: 'https://elenavance.com',
    linkedin: 'linkedin.com/in/elenavance-pm',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
  },
  summary: 'Strategic Lead Product Manager with 8+ years driving product vision, market strategy, and roadmap execution for high-growth B2B SaaS platforms. Scaled flagship product revenue from $3M to $18M ARR by executing customer-centric discovery and data-informed retention experiments.',
  experience: [
    {
      id: 'pm-exp-1',
      company: 'ScaleX Digital',
      position: 'Lead Product Manager',
      location: 'New York, NY',
      startDate: '2022-02',
      endDate: 'Present',
      current: true,
      highlights: [
        'Owned product roadmap for enterprise analytics suite, managing a $4M annual R&D budget across 3 engineering teams.',
        'Launched AI-powered automated workflow engine, driving 42% adoption rate in Q1 and generating $2.4M in expansion ARR.',
        'Championed product-led growth initiatives that boosted trial-to-paid conversion from 4.2% to 8.9%.'
      ]
    },
    {
      id: 'pm-exp-2',
      company: 'Innova SaaS Inc.',
      position: 'Senior Product Manager',
      location: 'Boston, MA',
      startDate: '2019-05',
      endDate: '2022-01',
      current: false,
      highlights: [
        'Led cross-functional launch of self-serve onboarding portal, reducing customer time-to-value from 14 days to 2 days.',
        'Conducted over 120 customer interviews and usability tests to identify core churn drivers.'
      ]
    }
  ],
  education: [
    {
      id: 'pm-edu-1',
      institution: 'Columbia University',
      degree: 'Master of Business Administration (MBA)',
      fieldOfStudy: 'Technology & Product Innovation',
      location: 'New York, NY',
      startDate: '2017-09',
      endDate: '2019-05',
      current: false,
      gpa: '3.9 / 4.0'
    }
  ],
  skillCategories: [
    {
      id: 'pm-sc-1',
      categoryName: 'Product Strategy & Growth',
      skills: [
        { name: 'Roadmap & PRDs', level: 5 },
        { name: 'Product-Led Growth (PLG)', level: 5 },
        { name: 'A/B Testing & Funnels', level: 5 },
        { name: 'User Discovery', level: 4 }
      ]
    },
    {
      id: 'pm-sc-2',
      categoryName: 'Analytics & Tools',
      skills: [
        { name: 'Mixpanel / Amplitude', level: 5 },
        { name: 'Jira & Confluence', level: 5 },
        { name: 'SQL & Tableau', level: 4 },
        { name: 'Figma / Wireframing', level: 4 }
      ]
    }
  ],
  projects: [],
  certifications: [
    {
      id: 'pm-cert-1',
      name: 'Certified Product Executive (CPE)',
      issuer: 'Product School',
      issueDate: '2021-03'
    }
  ],
  languages: [
    { id: 'pm-lang-1', language: 'English', proficiency: 'Native' },
    { id: 'pm-lang-2', language: 'French', proficiency: 'Fluent' }
  ],
  customSections: [],
  style: {
    ...DEFAULT_STYLE,
    template: 'executive',
    accentColor: '#1e293b' // Slate
  }
};

export const BENGALI_SAMPLE_CV: CVData = {
  id: 'bengali-sample-preset',
  title: 'সফটওয়্যার ইঞ্জিনিয়ার সিভি',
  updatedAt: new Date().toISOString(),
  personalInfo: {
    fullName: 'রিয়াজ আহমেদ',
    jobTitle: 'সিনিয়র ফুল-স্ট্যাক সফটওয়্যার ইঞ্জিনিয়ার',
    email: 'riaj.ahmed@example.com',
    phone: '+৮৮০১৭১২৩৪৫৬৭৮',
    location: 'ঢাকা, বাংলাদেশ',
    website: 'https://riajahmed.dev',
    linkedin: 'linkedin.com/in/riajahmed',
    github: 'github.com/riajahmed',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
  },
  summary: '৭+ বছরের অভিজ্ঞতাসম্পন্ন সিনিয়র ফুল-স্ট্যাক সফটওয়্যার ইঞ্জিনিয়ার। ডিস্ট্রিবিউটেড ক্লাউড সিস্টেম, হাই-পারফরম্যান্স ওয়েব অ্যাপ্লিকেশন এবং মাইক্রোসার্ভিস স্থাপত্যে দক্ষ। ২০ লাখের বেশি সক্রিয় ব্যবহারকারীর জন্য ক্লাউড অবকাঠামো পরিচালনা ও সিস্টেম ল্যাটেন্সি ৩৫% কমিয়ে আনার বাস্তব অভিজ্ঞতা রয়েছে।',
  experience: [
    {
      id: 'bn-exp-1',
      company: 'অ্যাপেক্স টেকনোলজিস',
      position: 'সিনিয়র স্টাফ সফটওয়্যার ইঞ্জিনিয়ার',
      location: 'ঢাকা, বাংলাদেশ (রিমোট)',
      startDate: '২০২৩-০১',
      endDate: 'বর্তমান',
      current: true,
      highlights: [
        'ওয়েবসকেট ও ওয়েবআরটিসি দিয়ে রিয়েল-টাইম ডাটা পাইপলাইন রিডিজাইন সম্পন্ন, যা ৯৯.৯৯% আপটাইম সহ ৫০ হাজার সমকালীন চ্যানেল পরিচালনায় সক্ষম।',
        'Node.js এবং Go-তে ক্লাউড মাইক্রোসার্ভিস তৈরি করে অবকাঠামো খরচ বার্ষিক ১২০ হাজার ডলার হ্রাস।',
        '৮ জন প্রকৌশলীর ক্রস-ফাংশনাল টিম পরিচালনা ও সিআই/সিডি ওয়ার্কফ্লো বাস্তবায়ন।'
      ]
    },
    {
      id: 'bn-exp-2',
      company: 'ভেলোসি সিস্টেমস',
      position: 'ফুল-স্ট্যাক সফটওয়্যার ইঞ্জিনিয়ার',
      location: 'ঢাকা, বাংলাদেশ',
      startDate: '২০২০-০৩',
      endDate: '২০২২-১২',
      current: false,
      highlights: [
        'React ও Tailwind CSS দিয়ে গ্রাহক অ্যানালিটিক্স ড্যাশবোর্ড তৈরি করে ইউজার এনগেজমেন্ট ২৮% বৃদ্ধি।',
        'অপ্টিমাইজড গ্রাফকিউএল ও রেডিস ক্যাশিং ইমপ্লিমেন্ট করে এপিআই রেসপন্স টাইম ৪৫০ মিলি-সেকেন্ড থেকে ৮৫ মিলি-সেকেন্ডে নামিয়ে আনা।'
      ]
    }
  ],
  education: [
    {
      id: 'bn-edu-1',
      institution: 'বাংলাদেশ প্রকৌশল ও প্রযুক্তি বিশ্ববিদ্যালয় (বুয়েট)',
      degree: 'বি.এস.সি ইন কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং (সিএসই)',
      fieldOfStudy: 'কম্পিউটার সায়েন্স',
      location: 'ঢাকা, বাংলাদেশ',
      startDate: '২০১৪',
      endDate: '২০১৮',
      current: false,
      gpa: '৩.৮৫ / ৪.০',
      highlights: [
        'ধারাবাহিক ডিনস লিস্ট অ্যাওয়ার্ড অর্জন',
        'অ্যালগরিদম এবং ডাটা স্ট্রাকচার কোর্সের হেড টিচিং অ্যাসিস্ট্যান্ট'
      ]
    }
  ],
  skillCategories: [
    {
      id: 'bn-cat-1',
      categoryName: 'প্রোগ্রামিং ল্যাঙ্গুয়েজ',
      skills: [
        { name: 'TypeScript', level: 5 },
        { name: 'JavaScript (ESNext)', level: 5 },
        { name: 'Python', level: 4 },
        { name: 'SQL & PostgreSQL', level: 4 },
        { name: 'Go / Golang', level: 3 }
      ]
    },
    {
      id: 'bn-cat-2',
      categoryName: 'ফ্রেমওয়ার্ক ও ফ্রন্টএন্ড',
      skills: [
        { name: 'React 18/19', level: 5 },
        { name: 'Next.js / Node.js', level: 5 },
        { name: 'Tailwind CSS', level: 5 },
        { name: 'GraphQL / REST API', level: 4 }
      ]
    }
  ],
  projects: [
    {
      id: 'bn-proj-1',
      title: 'DevPulse - রিয়েল-টাইম সিস্টেম মনিটরিং ড্যাশবোর্ড',
      description: 'কনটেইনারাইজড ক্লাউড সার্ভার মনিটরিং এবং টেলিমেট্রি পর্যবেক্ষণের ওপেন সোর্স প্ল্যাটফর্ম।',
      technologies: ['React', 'TypeScript', 'Go', 'Prometheus', 'Tailwind'],
      url: 'https://devpulse.io',
      githubUrl: 'https://github.com/riajahmed/devpulse',
      highlights: [
        'গিটহাবে ২,৪০০+ স্টার এবং ৪০+ সক্রিয় ওপেন-সোর্স কন্ট্রিবিউটর।',
        'দৈনিক ১ কোটিরও বেশি ইভেন্ট রিয়েল-টাইমে প্রসেসিং।'
      ]
    }
  ],
  certifications: [
    {
      id: 'bn-cert-1',
      name: 'Google Cloud Certified Professional Cloud Architect',
      issuer: 'Google Cloud',
      issueDate: '২০২৩-০৪',
      credentialId: 'GCP-PCA-83921'
    }
  ],
  languages: [
    { id: 'bn-lang-1', language: 'বাংলা (Bengali)', proficiency: 'Native' },
    { id: 'bn-lang-2', language: 'English (ইংরেজি)', proficiency: 'Fluent' }
  ],
  customSections: [],
  style: DEFAULT_STYLE
};

export const SAMPLE_PRESETS: { label: string; data: CVData }[] = [
  { label: 'Software Engineer (English)', data: SOFTWARE_ENGINEER_CV },
  { label: 'Product Manager (English)', data: PRODUCT_MANAGER_CV },
  { label: 'সফটওয়্যার ইঞ্জিনিয়ার (বাংলা)', data: BENGALI_SAMPLE_CV }
];
