// CV content in English and French. Edit here, then run `npm run cv`.
// Dates are YYYY-MM; `end: null` means the role is ongoing.

export const contact = {
  website: {
    label: "bleriotnoguia.com",
    href: "https://www.bleriotnoguia.com",
  },
  email: {
    label: "contact@bleriotnoguia.com",
    href: "mailto:contact@bleriotnoguia.com",
  },
  phone: {
    label: "+237 672 077 465",
    href: "https://api.whatsapp.com/send?phone=237672077465",
  },
  linkedin: {
    label: "linkedin.com/in/bleriotnoguia",
    href: "https://www.linkedin.com/in/bleriotnoguia/",
  },
  github: {
    label: "github.com/bleriotnoguia",
    href: "https://github.com/bleriotnoguia",
  },
};

export const careerStart = 2019;

const experience = [
  {
    company: "Activ'VAE",
    href: "https://activvae.com",
    start: "2025-11",
    end: null,
    role: { en: "Full-Stack Developer", fr: "Développeur full-stack" },
    place: { en: "Remote", fr: "À distance" },
    projects: [
      {
        name: {
          en: "Platform for managing and supporting VAE journeys (Validation of Acquired Experience)",
          fr: "Plateforme de gestion et d'accompagnement des parcours VAE (Validation des Acquis de l'Expérience)",
        },
        href: "https://app.activvae.com",
        tasks: {
          en: [
            "Administration back-office: users, documents, training and messaging",
            "Data synchronisation with QUEOVAL and EDOF, and API integrations",
            "Audit logs, audit trail and GDPR management",
          ],
          fr: [
            "Back-office d'administration : utilisateurs, documents, formation et messagerie",
            "Synchronisation des données avec QUEOVAL et EDOF, et intégrations d'API",
            "Journaux d'audit, piste d'audit et gestion RGPD",
          ],
        },
        stack: [
          "React",
          "React Router",
          "TypeScript",
          "Supabase",
          "Tailwind CSS",
        ],
      },
    ],
  },
  {
    company: "Troopay",
    href: "https://troopay.com",
    start: "2025-03",
    end: "2025-10",
    role: {
      en: "Front-end Developer, freelance",
      fr: "Développeur front-end freelance",
    },
    place: { en: "Ireland, remote", fr: "Irlande, à distance" },
    projects: [
      {
        name: {
          en: "Platform generating certified income statements from bank flows",
          fr: "Plateforme de bulletins de revenus certifiés à partir des flux bancaires",
        },
        tasks: {
          en: [
            "Turned Figma mockups into working React.js code",
            "Built front-end features",
          ],
          fr: [
            "Transformation des maquettes Figma en code React.js fonctionnel",
            "Développement de fonctionnalités front-end",
          ],
        },
        stack: ["Next.js", "React", "TypeScript", "Material UI"],
      },
    ],
  },
  {
    company: "Ejara",
    href: "https://www.ejara.io",
    start: "2024-09",
    end: "2025-02",
    role: {
      en: "Front-end React.js Developer",
      fr: "Développeur front-end React.js",
    },
    place: { en: "Douala, Cameroon, hybrid", fr: "Douala, Cameroun, hybride" },
    projects: [
      {
        name: {
          en: "Communication panel, tokenized bonds and Xpress transactions",
          fr: "Panneau de communication, obligations tokenisées et transactions Xpress",
        },
        tasks: {
          en: [
            "Turned Figma mockups into working React.js code",
            "Built front-end features and integrated back-end APIs",
          ],
          fr: [
            "Transformation des maquettes Figma en code React.js fonctionnel",
            "Développement de fonctionnalités front-end et intégration des API back-end",
          ],
        },
        stack: [
          "React.js",
          "TypeScript",
          "Ant Design",
          "Tailwind CSS",
          "Git",
          "ClickUp",
        ],
      },
    ],
  },
  {
    company: "Wat & Co",
    href: "https://watconsultants.com",
    start: "2023-02",
    end: "2023-10",
    role: {
      en: "CTO and Front-end React.js Developer",
      fr: "CTO et développeur front-end React.js",
    },
    place: { en: "Cameroon, remote", fr: "Cameroun, à distance" },
    projects: [
      {
        name: {
          en: "Bank management application",
          fr: "Application de gestion bancaire",
        },
        href: "https://greatpay.vercel.app/",
        tasks: {
          en: [
            "Front-end components with TypeScript, React.js and Chakra UI",
            "Front-end performance monitoring and code review",
            "Jira workspace setup, task organisation, reporting and Scrum meetings",
          ],
          fr: [
            "Composants front-end avec TypeScript, React.js et Chakra UI",
            "Suivi des performances front-end et revue de code",
            "Configuration de Jira, organisation des tâches, reporting et réunions Scrum",
          ],
        },
        stack: [
          "React.js",
          "TypeScript",
          "TanStack",
          "Chakra UI",
          "GitLab",
          "Docker",
          "Jira",
        ],
      },
    ],
  },
  {
    company: "Digintu Tech",
    href: "https://digintu.ch",
    start: "2021-08",
    end: "2022-11",
    role: { en: "Full-Stack Developer", fr: "Développeur full-stack" },
    place: {
      en: "Czech Republic, remote",
      fr: "République tchèque, à distance",
    },
    projects: [
      {
        name: { en: "No-code platform", fr: "Plateforme no-code" },
        tasks: {
          en: [
            "Built the entire front end with TypeScript, React.js and Ant Design",
            "Added back-end features and integrated Stripe payments",
          ],
          fr: [
            "Développement de tout le front-end avec TypeScript, React.js et Ant Design",
            "Nouvelles fonctionnalités back-end et intégration des paiements Stripe",
          ],
        },
        stack: [
          "React.js",
          "Redux",
          "TypeScript",
          "Apollo",
          "GraphQL",
          "Laravel",
          "PHPUnit",
        ],
      },
      {
        name: {
          en: "Invoice management application",
          fr: "Application de gestion de factures",
        },
        tasks: {
          en: [
            "Fixed front-end and back-end bugs, end-to-end testing with Cypress",
          ],
          fr: [
            "Correction de bugs front-end et back-end, tests end-to-end avec Cypress",
          ],
        },
        stack: ["React.js", "Laravel", "Ant Design", "Cypress"],
      },
    ],
  },
  {
    company: "ComeUp",
    href: "https://comeup.com/@dev-pro",
    start: "2020-11",
    end: null,
    role: { en: "Freelance Web Developer", fr: "Développeur web freelance" },
    place: { en: "Remote", fr: "À distance" },
    projects: [
      {
        name: {
          en: "Diplomatic card application for the Senegalese government (Protosen)",
          fr: "Application de cartes diplomatiques pour le gouvernement sénégalais (Protosen)",
        },
        href: "https://protosen.gouv.sn/",
        tasks: { en: [], fr: [] },
        stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      },
      {
        name: {
          en: "Company websites: Gloco Sarl, Innov and Co, GA Académie",
          fr: "Sites vitrines : Gloco Sarl, Innov and Co, GA Académie",
        },
        links: [
          { label: "glocosarl.com", href: "https://glocosarl.com/" },
          { label: "innovandco.net", href: "https://www.innovandco.net" },
          { label: "gaacademie.com", href: "https://gaacademie.com" },
        ],
        tasks: { en: [], fr: [] },
        stack: ["WordPress", "JavaScript", "HTML", "CSS"],
      },
    ],
  },
  {
    company: "ADAA SAS",
    href: "https://adaa.tech",
    start: "2019-12",
    end: "2020-10",
    role: {
      en: "Lead Full-Stack Developer",
      fr: "Lead développeur full-stack",
    },
    place: { en: "Douala, Cameroon", fr: "Douala, Cameroun" },
    projects: [
      {
        name: { en: "E-learning platform", fr: "Plateforme d'e-learning" },
        href: "https://adaalearning.com",
        tasks: {
          en: [
            "Led a team of 4 developers: task organisation, Scrum meetings, technical specifications",
            "Designed a database of more than 56 tables (UML, MySQL Workbench)",
            "Built features from mockups, configured servers and handled deployments",
          ],
          fr: [
            "Encadrement d'une équipe de 4 développeurs : organisation, réunions Scrum, spécifications techniques",
            "Conception d'une base de données de plus de 56 tables (UML, MySQL Workbench)",
            "Intégration des maquettes, développement des fonctionnalités, configuration serveur et déploiements",
          ],
        },
        stack: [
          "Laravel",
          "React.js",
          "JavaScript",
          "PHPUnit",
          "Bootstrap",
          "Bitbucket",
        ],
      },
    ],
  },
  {
    company: "ALC-Digital",
    href: null,
    start: "2019-03",
    end: "2019-10",
    role: { en: "Full-Stack Developer", fr: "Développeur full-stack" },
    place: { en: "Douala, Cameroon", fr: "Douala, Cameroun" },
    projects: [
      {
        name: {
          en: "Delivery and customer order management application",
          fr: "Application de gestion des livraisons et des commandes clients",
        },
        tasks: {
          en: [
            "Designed a 47-table database (UML, MySQL Workbench)",
            "Built the back end, the front end and a complete REST API with Laravel",
          ],
          fr: [
            "Conception d'une base de données de 47 tables (UML, MySQL Workbench)",
            "Développement du back-end, du front-end et d'une API REST complète avec Laravel",
          ],
        },
        stack: ["Laravel", "jQuery", "JavaScript", "Bootstrap", "REST API"],
      },
    ],
  },
];

const projects = [
  {
    name: "Troopay",
    href: "https://troopay.com",
    text: {
      en: "Certified income statements generated from the automated analysis of bank flows.",
      fr: "Bulletins de revenus certifiés générés par l'analyse automatisée des flux bancaires.",
    },
  },
  {
    name: "Lockbox Local",
    href: "https://github.com/bleriotnoguia/lockbox-local",
    text: {
      en: "Open-source desktop app (Tauri, Rust, React), a local version of Pluckeye Lockbox.",
      fr: "Application desktop open source (Tauri, Rust, React), version locale de Pluckeye Lockbox.",
    },
  },
  {
    name: "Activ'VAE",
    href: "https://app.activvae.com",
    text: {
      en: "Platform for managing and supporting VAE journeys: back-office, QUEOVAL and EDOF sync, audit logs and GDPR.",
      fr: "Plateforme de gestion et d'accompagnement des parcours VAE : back-office, synchronisation QUEOVAL et EDOF, audit et RGPD.",
    },
  },
];

const skills = [
  {
    group: { en: "Front-end", fr: "Front-end" },
    items:
      "TypeScript, React.js, Next.js, Redux, TanStack Query, Tailwind CSS, Ant Design, Chakra UI",
  },
  {
    group: { en: "Back-end", fr: "Back-end" },
    items:
      "Node.js, AdonisJS, Express, Laravel, GraphQL, REST, MySQL, Supabase, MongoDB",
  },
  {
    group: { en: "AI and agents", fr: "IA et agents" },
    items: "Claude API, OpenAI API, Vercel AI SDK, MCP, RAG with pgvector, n8n",
  },
  {
    group: { en: "Mobile and desktop", fr: "Mobile et desktop" },
    items: "React Native, Ionic, Tauri",
  },
  {
    group: { en: "Tools and methods", fr: "Outils et méthodes" },
    items: "Git, Docker, Cypress, Figma, Jira, Scrum, Kanban, GitHub Copilot",
  },
];

const education = [
  {
    label: { en: "2015–2017", fr: "2015–2017" },
    text: {
      en: "Associate degree in Computer Science, University of Douala",
      fr: "Diplôme Bac+2 en informatique, Université de Douala",
    },
    links: [],
  },
  {
    label: { en: "freeCodeCamp", fr: "freeCodeCamp" },
    text: { en: "Certifications:", fr: "Certifications :" },
    links: [
      {
        label: "JavaScript Algorithms and Data Structures",
        href: "https://www.freecodecamp.org/certification/bleriotnoguia/javascript-algorithms-and-data-structures",
      },
      {
        label: "Front End Libraries",
        href: "https://freecodecamp.org/certification/bleriotnoguia/front-end-libraries",
      },
      {
        label: "Responsive Web Design",
        href: "https://www.freecodecamp.org/certification/bleriotnoguia/responsive-web-design",
      },
    ],
  },
];

export const content = {
  en: {
    lang: "en",
    file: "CV.pdf",
    documentTitle: "Blériot Noguia, full-stack developer, CV",
    title: "Full-stack developer, web, mobile and AI",
    experienceYears: (years) => `${years} years of experience`,
    location: "Douala, Cameroon",
    summary:
      "Full-stack developer since 2019, I design and ship web and mobile products for startups, agencies and public institutions, from idea to launch. My core stack is React (Next.js, React Native), TypeScript, Node.js (AdonisJS) and Laravel. I also build AI into products: LLM features, agents that use real tools, RAG on company data and MCP servers. I'm used to working remotely with teams in Africa and Europe.",
    sections: {
      experience: "Experience",
      projects: "Selected projects",
      skills: "Skills",
      education: "Education and certifications",
      more: "Languages and interests",
    },
    present: "Present",
    current: "Current",
    duration: (months) => {
      const years = Math.floor(months / 12);
      const rest = months % 12;
      const parts = [];
      if (years) parts.push(`${years} year${years > 1 ? "s" : ""}`);
      if (rest) parts.push(`${rest} month${rest > 1 ? "s" : ""}`);
      return parts.join(" ");
    },
    stackLabel: "Stack",
    languages: "French, English",
    interests: "Spirituality, technology, reading",
    languagesLabel: "Languages",
    interestsLabel: "Interests",
    experience: localize(experience, "en"),
    projects: localize(projects, "en"),
    skills: localize(skills, "en"),
    education: localize(education, "en"),
  },
  fr: {
    lang: "fr",
    file: "CV-fr.pdf",
    documentTitle: "Blériot Noguia, développeur full-stack, CV",
    title: "Développeur full-stack, web, mobile et IA",
    experienceYears: (years) => `${years} ans d'expérience`,
    location: "Douala, Cameroun",
    summary:
      "Développeur full-stack depuis 2019, je conçois et livre des produits web et mobiles pour des startups, des agences et des institutions publiques, de l'idée à la mise en ligne. Ma stack principale : React (Next.js, React Native), TypeScript, Node.js (AdonisJS) et Laravel. J'intègre aussi l'IA dans les produits : fonctionnalités LLM, agents qui utilisent de vrais outils, RAG sur les données de l'entreprise et serveurs MCP. Je travaille régulièrement à distance avec des équipes d'Afrique et d'Europe.",
    sections: {
      experience: "Expérience",
      projects: "Projets choisis",
      skills: "Compétences",
      education: "Formation et certifications",
      more: "Langues et centres d'intérêt",
    },
    present: "aujourd'hui",
    current: "En cours",
    duration: (months) => {
      const years = Math.floor(months / 12);
      const rest = months % 12;
      const parts = [];
      if (years) parts.push(`${years} an${years > 1 ? "s" : ""}`);
      if (rest) parts.push(`${rest} mois`);
      return parts.join(" ");
    },
    stackLabel: "Stack",
    languages: "Français, anglais",
    interests: "Spiritualité, technologie, lecture",
    languagesLabel: "Langues",
    interestsLabel: "Intérêts",
    experience: localize(experience, "fr"),
    projects: localize(projects, "fr"),
    skills: localize(skills, "fr"),
    education: localize(education, "fr"),
  },
};

// Replaces every { en, fr } pair with the string for one language.
function localize(value, lang) {
  if (Array.isArray(value)) return value.map((item) => localize(item, lang));
  if (value && typeof value === "object") {
    const keys = Object.keys(value);
    if (keys.length === 2 && "en" in value && "fr" in value) return value[lang];
    return Object.fromEntries(
      keys.map((key) => [key, localize(value[key], lang)])
    );
  }
  return value;
}
