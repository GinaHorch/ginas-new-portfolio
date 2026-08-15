const person = {
  firstName: "Gina",
  lastName: "Horch",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Full-Stack Developer - TypeScript, Python & AI-Augmented Systems",
  avatar: "/images/GinaHeadShot.webp",
  location: "Australia/Perth", // Expecting the IANA time zone identifier
  languages: ["English", "German"],
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/GinaHorch",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/gina-sis/",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:Social-Insight-Solutions@pm.me",
  },
];

const flags = [
  {
    name: "Aboriginal Flag",
    src: "/images/about/AboriginalFlag.svg",
    alt: "Aboriginal Flag",
    link: "https://aiatsis.gov.au/explore/aboriginal-flag",
  },
  {
    name: "Torres Strait Islander Flag",
    src: "/images/about/TorresStraitIslanderFlag.svg",
    alt: "Torres Strait Islander Flag",
    link: "https://aiatsis.gov.au/explore/torres-strait-islander-flag",
  },
  {
    name: "Pride Flag",
    src: "/images/about/PrideFlag.svg",
    alt: "LGBTQIA+ Pride Flag",
    link: "https://aifs.gov.au/resources/resource-sheets/lgbtiqa-glossary-common-terms",
  },
];

const home = {
  label: "Home",
  title: `${person.name} | Full-Stack Developer`,
  description:
    "Systems, security and development specialist working across TypeScript and Python. Full-stack developer building and improving production applications with React, Next.js, Astro, Supabase and APIs, with security and AI-assisted engineering built into the work.",
  ogTitle: "I build real systems, and protect what they touch",
  headline: <>Kaya. I build real systems, and protect what they touch.</>,
  subline: (
    <>
      I'm Gina, a systems, security and development specialist working across TypeScript and Python. I build and 
      improve real applications — a connected data platform, a public product I inherited and extended, a commercial 
      website heading into production — and I treat AI as an engineering practice: context, constraints, review and 
      verification. Security is part of how I build, not something added afterwards.
    </>
  ),
  focus: {
    label: "What I work with",
    // Every capability the subline claims in prose has to appear here too — see the
    // hero guidance in .claude/context/positioning.md.
    primary: ["TypeScript", "Python", "Full Stack", "Security & Systems", "AI-Assisted Engineering"],
    supporting: ["React", "Next.js", "Astro", "Supabase", "APIs", "Cloudflare"],
  },
};

const about = {
  label: "About",
  title: `About ${person.name} | Software Developer`,
  ogTitle: "About Gina",
  description: `${person.name} is a full-stack developer in Perth, Western Australia, working across TypeScript and Python and building production applications with security, systems and AI-assisted engineering built in.`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
      <p>
      I'm a software developer working across TypeScript and Python, building full-stack production systems 
      with an AI-augmented engineering practice — context, constraints, review and verification, not just 
      prompting and accepting. Day to day that means React and Next.js applications, an Astro site in
      commercial production, PostgreSQL and Supabase behind them, Python-based automation and integrations, and
      the webhooks and scheduled jobs that connect those systems to everything else an organisation already 
      runs on.
      </p>
      <p>
      The work I care most about is the kind that has real users attached to it: rebuilding a company's
      public website and planning its production migration; taking over a partially built product and
      getting it into a reliable state; developing and maintaining a data platform where a wrong assumption
      about identity can quietly corrupt years of history. Building something new is enjoyable. Understanding
      a system you did not write, and changing it safely, is the harder and more useful skill.
      </p>
      <p>
      I work with AI-assisted development tools - Claude Code, Cursor, Replit - as part of a disciplined
      engineering workflow rather than as a shortcut. That means persistent project context and constraints,
      planning before implementation, reviewing what comes back, testing behaviour, diagnosing failures, and
      keeping a clear Definition of Done. I remain responsible for the requirements, the technical decisions,
      the security considerations and the finished system.
      </p>
      <p>
      Security and systems thinking run through all of it. I work on authentication and access control, Row
      Level Security, privacy and consent, secure configuration and security headers, and I hold a
      Diploma of Information Technology specialising in cyber security and business analysis. Treating security as part of engineering,
      rather than a pass to run after the build, is considerably cheaper and produces better software.
      </p>
      <p>
      I came to development along an unusual path: twenty-two years in law enforcement leading complex
      investigations, then research with the Australian Centre for Child Protection, then technology. Digital
      forensics is where I first saw how much technical work sits underneath a good answer, and research is
      where I saw how many processes could be improved by building something better. That background is why I
      approach problems the way I do — establish what is actually true before acting, look for the evidence
      rather than the assumption, document what you found, and think carefully about the people whose data
      you are handling.
      </p>
      <p>
      I work collaboratively and iteratively: short feedback loops, transparency about what is and isn't done,
      and reviewing outcomes rather than assuming that shipping equals finished. I'm based on Whadjuk Noongar
      boodja in Perth, Western Australia.
      </p>
      </>
    ),
  },
  technical: {
    display: true, // set to false to hide this section
    title: "A Journey of Service",
    description: (
      <>
      <p>
      Before technology, I spent my career championing the needs of vulnerable children, victim-survivors
      and the wider community. That work is not what I do now, but it is where the habits came from:
      resilience, evidence over assumption, care with sensitive information, and a commitment to
      collaborating with others to drive meaningful and lasting change.
      </p>
      <p>
      Each recognition below reflects that period of service.
      </p>
      </>
    ),
    services: [
      {
        title: "Reconciliation & Truth Telling",
        description: <>Gina is committed to supporting reconciliation and truth-telling in all aspects of her work.
        As a proud ally of First Nations Peoples, she strives to create inclusive spaces that honour
        their voices, histories, and cultures. Gina has taken the Ally Pledge to stand up for Justice,
        Treaty, and Truth and actively engages in learning, listening, and advocating for meaningful change.</>,
        images: [
          {
            title: "I invite you to find out more",
            src: "/images/about/ally-pledge.webp",
            alt: "Evolve Communities Ally Pledge",
            link: "https://www.evolves.com.au/ask-aunty/",
            sizes: "(max-width: 768px) 80vw, (max-width: 1200px) 60vw, 40vw",
            width: 16,
            height: 16,
          },
        ],
        videos: []
      },
      {
        title: "WA Police Excellence Awards (2017)",
        description: <>Gina was awarded the 9 News WA Police Excellence Award 2017 - Police Officer of the Year
        for her dedication to victim-survivors and their families.</>,
        images: [],
        videos: [
          {
            title: "WA Police Excellence Award 2017",
            embedUrl: "https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/WA.Police/videos/1814792681887509/",
            alt: "WA Police Excellence Award 2017",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Canva Force for Good Scholarship (2024)",
        description: <>Gina was awarded the Canva Force for Good Scholarship, a partnership with She Codes Australia
        supporting women to break into tech and building meaningful careers through education, inclusion, and empowerment.</>,
        images: [],
        videos: [],
      },
      {
        title: "First Class Honours in Psychology (2021)",
          description: <>Gina was awarded First Class Honours in Psychology at Edith Cowan University (2021) with her thesis
          focused on improving responses for children and young people who have displayed harmful sexual behaviours.</>,
        images: [],
        videos: [],
      },
      {
        title: "WA Police Medal (2018)",
        description: <>Gina was awarded the WA Police Medal for 10 years of diligent and ethical service with the
          Western Australia Police Force.</>,
        images: [],
        videos: [],
      },
      {
        title: "Certificate of Outstanding Performance (2017)",
        description: <>Gina was awarded the Certificate of Outstanding Performance in recognition for her nomination for the 2017
        Australian Council of Women and Policing "Excellence in Policing" Awards in the category of "Most Outstanding Female Investigator".</>,
        images: [],
        videos: [],
      },
      {
        title: "Certificate of Outstanding Performance (2015)",
        description: <>Gina was awarded the Certificate of Outstanding Performance for her dedication and exemplary compassion to victims of
        the Australian Federal Government's Royal Commission into Institutional Child Sex Abuse.</>,
        images: [],
        videos: [],
      },
      {
        title: "Bravery Award (2005)",
        description: <>Gina was awarded the Bravery Award by the Bavarian Police Force for her decisive actions while off duty in Munich, where she
        intervened to stop the mugging of an elderly man at a train station, ensuring his safety and the arrest of both offenders.</>,
        images: [],
        videos: [],
      },
    ],
  },



  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "Diploma of Information Technology (Cyber Security & Business Analysis)",
        description: <>ICT50220, completed 2026 through EQC Institute (Equinim College, RTO 45758) and
        recognised under the Australian Qualifications Framework. Units covered network security, cyber
        security requirements, threat data analysis, security architecture, incident response, disaster
        recovery and critical-infrastructure protection, alongside business analysis: technical requirements,
        feasibility reporting and quality assurance.</>,
      },
      {
        name: "Microsoft Career Essentials in Software Development",
        description: <>Completed the Microsoft and LinkedIn Career Essentials pathway in Software Development.</>,
      },
      {
        name: "Microsoft Career Essentials in Cyber Security",
        description: <>Completed the Microsoft and LinkedIn Career Essentials pathway in Cyber Security.</>,
      },
      {
        name: "Microsoft Career Essentials in Business Analysis",
        description: <>Completed the Microsoft and LinkedIn Career Essentials pathway in Business Analysis.</>,
      },
      {
        name: "First Class Honours in Psychology",
        description: <>Completed a Bachelor of Psychology (Honours) at Edith Cowan University (2020-2021).</>,
      },
      {
        name: "Bachelor of Arts (Psychology)",
        description: <>Completed a Bachelor of Arts (Psychology) at Edith Cowan University (2013-2019).</>,
      },
      {
        name: "Agile and collaborative delivery",
        description: <>Professional Scrum Master (PSM I, Scrum.org, 2025), Certified SAFe® 6 Scrum Master (2025) and
        Atlassian Agile Project Management (2024) — the background behind how I work with teams and stakeholders.</>,
      },
      {
        name: "Responding to Childhood Trauma",
        description: <>Completed a Professional Certificate in Responding to Childhood Trauma at the University of South Australia (2022).</>,
      },
      {
        name: "Assessing Childhood Trauma",
        description: <>Completed a Professional Certificate in Assessing Childhood Trauma at the University of South Australia (2021).</>,
      },
      {
        name: "Understanding Childhood Trauma",
        description: <>Completed a Professional Certificate in Understanding Childhood Trauma at the University of South Australia (2021).</>,
      },
      {
        name: "Investigative Interviewer of Children and Vulnerable Persons",
        description: <>Completed the Investigative Interviewer of Children and Vulnerable Persons (IICVP) course at Western Australia Police Academy (2016).</>,
      },
      {
        name: "Advanced Diploma of Public Safety (Police Investigation)",
        description: <>Studied the Advanced Diploma of Public Safety (Police Investigation) at Western Australia Police Academy (2010-2012).</>,
      },
      {
        name: "Certificate IV in Training and Assessment",
        description: <>Studied the Certificate IV in Training and Assessment at Education Training Advisory Services (2007-2008).</>,
      },
      {
        name: "Diploma of Horticulture",
        description: <>Studied the Diploma of Horticulture at Challenger TAFE (2006-2007).</>,
      },
    ],
  },
};

const work = {
  display: true,
  label: "Projects",
  tableOfContent: {
    display: true,
    subItems: false,
  },
  title: `Projects | ${person.name}`,
  ogTitle: "Projects",
  description:
    "Case studies by Gina Horch — a commercial Astro website rebuild, an inherited TypeScript product, a Next.js/Supabase data platform, a full-stack guestbook PWA, an end-to-end data pipeline, and the spec-driven agentic workflow behind the work.",
  // Create new project pages by adding a new .mdx file to app/work/projects
  // All projects will be listed on the /home and /work routes
};

const skills = {
  label: "Skills",
  title: `Skills | ${person.name}`,
  ogTitle: "Skills",
  description:
    "TypeScript and Python, React, Next.js, Astro, Supabase and PostgreSQL, API and webhook integrations, AI-assisted engineering, cyber security, cloud and systems, and collaborative delivery.",
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  intro: {
    display: true,
    title: "Skills",
    description: (
    <>
    <p>
      These are the tools and practices I work with, grouped by what I actually do with them rather than
      by a self-assigned score. Every skill below is tagged with the strongest evidence behind it:
      <strong> production experience</strong> means it is in a system real people use,
      <strong> practical experience</strong> means I have built or investigated with it,
      <strong> working knowledge</strong> means I can work in it with support, and
      <strong> currently developing</strong> means it is active study rather than delivered work.
    </p>
    </>
    ),
  },
  certifications: {
    display: true,
    title: "Certifications & courses",
    description: (
      <>Formal qualifications and completed courses, most recent first. Verification is available on
      request — certificates issued through an organisation's LinkedIn Learning licence no longer resolve
      to public URLs once that access ends, so none is linked here rather than linking somewhere broken.</>
    ),
    // Dates below are taken from the issued certificates. No links: the LinkedIn
    // Learning certificate URLs were issued under an organisation licence and now
    // return 404, and a PDF proves nothing a line of text does not.
    items: [
      {
        title: "ICT50220 Diploma of Information Technology (Cyber Security & Business Analysis)",
        issuer: "EQC Institute (Equinim College, RTO 45758) — nationally recognised training",
        year: "2026",
      },
      {
        title: "Master AI-Assisted Development with GitHub Copilot",
        issuer: "Packt — virtual event, attended",
        year: "2026",
      },
      {
        title: "Career Essentials in Cybersecurity",
        issuer: "Microsoft & LinkedIn",
        year: "2024",
      },
      {
        title: "Career Essentials in Software Development",
        issuer: "Microsoft & LinkedIn",
        year: "2024",
      },
      {
        title: "Career Essentials in Business Analysis",
        issuer: "Microsoft & LinkedIn",
        year: "2024",
      },
      {
        title: "Agile Project Management Professional Certificate",
        issuer: "Atlassian",
        year: "2024",
      },
    ],
  },

  technical: {
    display: true, // set to false to hide this section
    title: "Skill groups",
    description: (
      <>Grouped by capability, with the evidence level shown for each skill. The chart below summarises how
      that evidence is distributed across groups.</>
    ),

    // `title` must match a group name in src/components/skills/skillsData.ts
    skills: [
      {
        title: "Software Development",
        description: <>Where most of my work happens: TypeScript across the stack and Python for automation and
        data work, React and Next.js applications, an Astro site in commercial production, and the HTML,
        CSS, SQL and Git practice underneath it all.</>,
      },
      {
        title: "AI-Assisted Engineering",
        description: <>AI as a way of engineering rather than a list of tools — persistent project context,
        explicit constraints, planning before implementation, agent-assisted development, and review and
        verification against a clear Definition of Done.</>,
      },
      {
        title: "Data & Integrations",
        description: <>PostgreSQL and Supabase work, schema investigation and data reconciliation, identity
        resolution, and the API, webhook and scheduled-automation integrations that connect applications to
        the systems around them.</>,
      },
      {
        title: "Cyber Security",
        description: <>Security treated as part of engineering rather than a pass at the end: authentication and
        access control, Row Level Security, privacy and consent, secure configuration and headers — alongside
        network security, threat analysis, security architecture and incident response from a completed
        Diploma of Information Technology specialising in cyber security.</>,
      },
      {
        title: "Cloud, Systems & Deployment",
        description: <>Getting software into production and keeping it running — Cloudflare, Vercel and Netlify
        deployment, DNS and TLS, Microsoft 365 and Google Workspace administration, systems migration and
        production troubleshooting.</>,
      },
      {
        title: "Ways of Working",
        description: <>Collaborative, iterative delivery: short feedback loops, stakeholder engagement,
        requirements analysis, documentation, verification and continuous improvement. Agile, Scrum, Kanban and
        SAFe describe how I work with teams, not what I do.</>,
      },
    ],
  },
};

export { person, social, home, about, work, skills, flags };
