import type { StaticImageData } from "next/image";
import type { Localized } from "./i18n";
import biquizImg from "@/public/biquiz.png";
import greatpayImg from "@/public/greatpay.png";
import digintuCodeImg from "@/public/digintu-code.png";
import glocosarlImg from "@/public/glocosarl.png";
import gaAcademieImg from "@/public/ga-academie.png";
import innovImg from "@/public/innov-and-co.png";
import onebillImg from "@/public/onebill.png";
import calcoImg from "@/public/calco.png";
import cointrackerImg from "@/public/cointracker.png";
import adaaLearningImg from "@/public/adaalearning.png";
import porfoliov1Img from "@/public/portfolio1.png";
import portfoliov2Img from "@/public/portfolio2.png";
import ubereatsImg from "@/public/ubereats.png";
import quoteImg from "@/public/quote.png";
import protosenImg from "@/public/protosen.png";
import cvGeneratorImg from "@/public/cv-generator.png";
import yassirPayImg from "@/public/yassir-pay.png";
import troopayImg from "@/public/troopay.png";
import activvaeImg from "@/public/activ-vae.png";
import jscamImg from "@/public/jscam.png";
import lockboxLocalImg from "@/public/lockbox-local.png";

// Sections the navigation can highlight while scrolling.
export const sections = [
  "Home",
  "Work",
  "Services",
  "Experience",
  "About",
  "Blog",
  "Contact",
] as const;

export type Project = {
  title: string;
  category: Localized;
  description: Localized;
  tags: readonly string[];
  imageUrl: StaticImageData;
  link: string;
};

export type Experience = {
  title: Localized;
  company: string;
  // HTML, may contain links
  description: Localized;
  start: string; // YYYY-MM
  end: string | null; // null while ongoing
  link: string;
};

export type StackGroup = "frontend" | "backend" | "ai" | "mobile" | "workflow";

export const experiencesData: Experience[] = [
  {
    title: { en: "Full-Stack Developer", fr: "Développeur full-stack" },
    company: "Activ'VAE",
    description: {
      en: "I develop Activ'VAE's platform for managing and supporting VAE journeys (Validation of Acquired Experience): administration back-office, data synchronisation with QUEOVAL and EDOF, audit logs and GDPR management.",
      fr: "Je développe la plateforme d'Activ'VAE de gestion et d'accompagnement des parcours VAE (Validation des Acquis de l'Expérience) : back-office d'administration, synchronisation des données avec QUEOVAL et EDOF, journaux d'audit et gestion RGPD.",
    },
    start: "2025-11",
    end: null,
    link: "https://activvae.com",
  },
  {
    title: { en: "Full-Stack Developer", fr: "Développeur full-stack" },
    company: "COMEUP (Freelance)",
    description: {
      en: "On the ComeUp platform, I offer my services to individuals and businesses as a full-stack developer: website creation and bug fixing.",
      fr: "Sur la plateforme ComeUp, je propose mes services de développeur full-stack aux particuliers et aux entreprises : création de sites web et correction de bugs.",
    },
    start: "2020-11",
    end: null,
    link: "https://comeup.com/@dev-pro",
  },
  {
    title: { en: "Front-end Developer", fr: "Développeur front-end" },
    company: "Troopay (Freelance)",
    description: {
      en: "I turned Figma mockups into working React.js code and built front-end features for Troopay, a platform that generates certified income statements from bank flows.",
      fr: "J'ai transformé des maquettes Figma en code React.js fonctionnel et développé des fonctionnalités front-end pour Troopay, une plateforme qui génère des bulletins de revenus certifiés à partir des flux bancaires.",
    },
    start: "2025-03",
    end: "2025-10",
    link: "https://troopay.com",
  },
  {
    title: {
      en: "Front-end React.js Developer",
      fr: "Développeur front-end React.js",
    },
    company: "Ejara",
    description: {
      en: "I built the front end of the admin dashboard for the Ejara application, turning Figma designs into working React.js code.",
      fr: "J'ai développé le frontend du tableau de bord d'administration de l'application Ejara, en transformant des maquettes Figma en code React.js fonctionnel.",
    },
    start: "2024-09",
    end: "2025-02",
    link: "https://ejara.io",
  },
  {
    title: {
      en: "Front-end React.js Developer",
      fr: "Développeur front-end React.js",
    },
    company: "Wat & Co",
    description: {
      en: "I worked as a front-end developer, in charge of front-end component development and project management.",
      fr: "Développeur front-end, en charge du développement des composants et de la gestion de projet.",
    },
    start: "2023-02",
    end: "2023-10",
    link: "https://watconsultants.com",
  },
  {
    title: { en: "Full-Stack Developer", fr: "Développeur full-stack" },
    company: "Digintu Tech",
    description: {
      en: "As a full-stack developer, I helped build a no-code platform with React.js, Laravel and GraphQL.",
      fr: "En tant que développeur full-stack, j'ai participé à la construction d'une plateforme no-code avec React.js, Laravel et GraphQL.",
    },
    start: "2021-08",
    end: "2022-11",
    link: "https://digintu.ch",
  },
  {
    title: { en: "Full-Stack Developer", fr: "Développeur full-stack" },
    company: "ADAA SAS",
    description: {
      en: "I worked as a full-stack developer. With my team, we built an <a href='https://adaalearning.com' target='_blank' rel='noopener noreferrer' class='underline'>online learning platform</a> with React.js and Laravel.",
      fr: "Développeur full-stack. Avec mon équipe, nous avons construit une <a href='https://adaalearning.com' target='_blank' rel='noopener noreferrer' class='underline'>plateforme d'apprentissage en ligne</a> avec React.js et Laravel.",
    },
    start: "2019-12",
    end: "2020-10",
    link: "https://adaa.tech",
  },
  {
    title: { en: "Full-Stack Developer", fr: "Développeur full-stack" },
    company: "ALC-Digital",
    description: {
      en: "As a full-stack developer, I worked on a web application for managing deliveries and customer orders.",
      fr: "En tant que développeur full-stack, j'ai travaillé sur une application web de gestion des livraisons et des commandes clients.",
    },
    start: "2019-03",
    end: "2019-10",
    link: "",
  },
];

export const projectsData: Project[] = [
  {
    title: "Activ VAE",
    category: { en: "SaaS platform", fr: "Plateforme SaaS" },
    description: {
      en: "Complete platform for managing and supporting the steps of Validation of Acquired Experience (VAE).",
      fr: "Plateforme complète pour gérer et accompagner les étapes de la Validation des Acquis de l'Expérience (VAE).",
    },
    tags: [
      "React Router",
      "CSS",
      "React",
      "Typescript",
      "Supabase",
      "Tailwind",
    ],
    imageUrl: activvaeImg,
    link: "https://app.activvae.com",
  },
  {
    title: "Troopay",
    category: { en: "Fintech", fr: "Fintech" },
    description: {
      en: "The first service capable of generating certified income statements from the automated analysis of bank flows.",
      fr: "Le premier service capable de générer des bulletins de revenus certifiés à partir de l'analyse automatisée des flux bancaires.",
    },
    tags: ["Next.js", "CSS", "React", "Typescript"],
    imageUrl: troopayImg,
    link: "https://troopay.com",
  },
  {
    title: "Protosen",
    category: { en: "Government app", fr: "Application gouvernementale" },
    description: {
      en: "Application for the Senegalese government. It generates diplomatic cards from a holder's information.",
      fr: "Application pour le gouvernement sénégalais. Elle génère des cartes diplomatiques à partir des informations d'un titulaire.",
    },
    tags: ["React", "TypeScript", "Tailwind", "Github", "Next.js"],
    imageUrl: protosenImg,
    link: "https://protosen.gouv.sn/",
  },
  {
    title: "JavaScript Community",
    category: { en: "Community", fr: "Communauté" },
    description: {
      en: "Platform of the JavaScript community in Cameroon, which I'm a member of. The community promotes JavaScript and web development through meetups and events.",
      fr: "Plateforme de la communauté JavaScript du Cameroun, dont je suis membre. La communauté promeut JavaScript et le développement web à travers des meetups et des événements.",
    },
    tags: ["JavaScript", "AdonisJS", "Typescript", "React"],
    imageUrl: jscamImg,
    link: "https://www.javascript.cm",
  },
  {
    title: "Lockbox Local",
    category: { en: "Desktop app", fr: "Application desktop" },
    description: {
      en: "A desktop application version of Pluckeye Lockbox.",
      fr: "Une version application desktop de Pluckeye Lockbox.",
    },
    tags: ["Tauri", "Typescript", "CSS", "HTML", "React", "Rust"],
    imageUrl: lockboxLocalImg,
    link: "https://github.com/bleriotnoguia/lockbox-local",
  },
  {
    title: "Gloco Sarl",
    category: { en: "Company website", fr: "Site vitrine" },
    description: {
      en: "The website was built with WordPress. It lets visitors learn more about the company and its services.",
      fr: "Site réalisé avec WordPress. Il permet aux visiteurs d'en savoir plus sur l'entreprise et ses services.",
    },
    tags: ["WordPress", "CSS"],
    imageUrl: glocosarlImg,
    link: "https://glocosarl.com",
  },
  {
    title: "Adaa Learning",
    category: { en: "E-learning platform", fr: "Plateforme e-learning" },
    description: {
      en: "As a full-stack developer and project manager, I participated in the development of frontend and backend features.",
      fr: "En tant que développeur full-stack et chef de projet, j'ai participé au développement des fonctionnalités frontend et backend.",
    },
    tags: ["React", "Typescript", "Bootstrap", "CSS", "Git", "Laravel"],
    imageUrl: adaaLearningImg,
    link: "https://adaalearning.com/",
  },
  {
    title: "GreatPay",
    category: { en: "Fintech", fr: "Fintech" },
    description: {
      en: "At the client's request, I built the front-end interfaces, while another company handled the back end.",
      fr: "À la demande du client, j'ai développé les interfaces frontend, le backend étant réalisé par une autre entreprise.",
    },
    tags: ["React", "TypeScript", "GitLab", "Chakra UI", "React Query"],
    imageUrl: greatpayImg,
    link: "https://greatpay.vercel.app/",
  },
  {
    title: "Innov and Co",
    category: { en: "Company website", fr: "Site vitrine" },
    description: {
      en: "The company wanted a modern design that would allow visitors to obtain information about the company quickly.",
      fr: "L'entreprise voulait un design moderne permettant aux visiteurs de trouver rapidement les informations essentielles.",
    },
    tags: ["HTML", "CSS", "JavaScript", "jekyll"],
    imageUrl: innovImg,
    link: "https://www.innovandco.net",
  },
  {
    title: "Biquiz",
    category: { en: "Quiz app", fr: "Application de quiz" },
    description: {
      en: "Biquiz lets you create and play quizzes. It was built with React, Next.js, Ionic, Supabase and TypeScript.",
      fr: "Biquiz permet de créer des quiz et d'y jouer. Réalisée avec React, Next.js, Ionic, Supabase et TypeScript.",
    },
    tags: ["React", "Next.js", "Ionic", "Supabase", "TypeScript"],
    imageUrl: biquizImg,
    link: "https://biquiz.vercel.app",
  },
  {
    title: "Ga Academie",
    category: { en: "Company website", fr: "Site vitrine" },
    description: {
      en: "The company wanted a modern design that would allow visitors to obtain information about the company quickly.",
      fr: "L'entreprise voulait un design moderne permettant aux visiteurs de trouver rapidement les informations essentielles.",
    },
    tags: ["WordPress", "CSS", "elementor"],
    imageUrl: gaAcademieImg,
    link: "https://gaacademie.com",
  },
  {
    title: "Cointracker",
    category: { en: "Side project", fr: "Projet personnel" },
    description: {
      en: "Simple clone of the Coinmarketcap wallet, built with React, Redux and Tailwind CSS for learning purposes.",
      fr: "Clone simple du portefeuille Coinmarketcap, réalisé avec React, Redux et Tailwind CSS pour apprendre.",
    },
    tags: ["React", "Redux", "JavaScript", "Tailwind CSS"],
    imageUrl: cointrackerImg,
    link: "https://cointracker.bleriotnoguia.com/",
  },
  {
    title: "Calculator",
    category: { en: "Side project", fr: "Projet personnel" },
    description: {
      en: "Simple calculator built with React for learning purposes.",
      fr: "Calculatrice simple réalisée avec React pour apprendre.",
    },
    tags: ["React", "JavaScript", "CSS"],
    imageUrl: calcoImg,
    link: "https://calculator.bleriotnoguia.com/",
  },
  {
    title: "Digintu Code",
    category: { en: "No-code platform", fr: "Plateforme no-code" },
    description: {
      en: "As a full-stack developer, I built the entire front end and added new features to the back end.",
      fr: "En tant que développeur full-stack, j'ai développé l'intégralité du frontend et ajouté de nouvelles fonctionnalités au backend.",
    },
    tags: [
      "React",
      "Typescript",
      "Ant Design",
      "Redux",
      "GraphQL",
      "Apollo",
      "Laravel",
    ],
    imageUrl: digintuCodeImg,
    link: "",
  },
  {
    title: "Portfolio v2",
    category: { en: "Personal site", fr: "Site personnel" },
    description: {
      en: "The second version of this website, built with the Next.js App Router, server actions and Framer Motion.",
      fr: "La deuxième version de ce site, construite avec l'App Router de Next.js, les server actions et Framer Motion.",
    },
    tags: ["React", "Typescript", "Next.js", "Tailwind", "Git"],
    imageUrl: portfoliov2Img,
    link: "",
  },
  {
    title: "Quote Creator",
    category: { en: "Side project", fr: "Projet personnel" },
    description: {
      en: "Simple quote creator app built with React for learning purposes.",
      fr: "Petite application de création de citations réalisée avec React pour apprendre.",
    },
    tags: ["React", "TypeScript", "Tailwind", "Git", "CSS"],
    imageUrl: quoteImg,
    link: "https://quote.javascript.cm/",
  },
  {
    title: "CV Generator",
    category: { en: "Web tool", fr: "Outil web" },
    description: {
      en: "CV generator built with React: fill in the fields and your CV is ready.",
      fr: "Générateur de CV réalisé avec React : il suffit de remplir les champs pour créer son CV.",
    },
    tags: ["Next.js", "React", "TypeScript", "Tailwind", "Git", "CSS"],
    imageUrl: cvGeneratorImg,
    link: "https://cv.javascript.cm/",
  },
  {
    title: "Yassir Pay",
    category: { en: "Fintech website", fr: "Site fintech" },
    description: {
      en: "The company wanted a modern design that would allow visitors to obtain information about the company quickly.",
      fr: "L'entreprise voulait un design moderne permettant aux visiteurs de trouver rapidement les informations essentielles.",
    },
    tags: ["Next.js", "React", "TypeScript", "Tailwind", "Git", "CSS"],
    imageUrl: yassirPayImg,
    link: "https://yassirpay.ae/",
  },
  {
    title: "OneBill",
    category: { en: "Web app", fr: "Application web" },
    description: {
      en: "My work on this project was mainly end-to-end testing with Cypress and fixing bugs in the front end and back end.",
      fr: "Ma contribution a surtout porté sur les tests end-to-end avec Cypress et la correction de bugs frontend et backend.",
    },
    tags: ["React", "Typescript", "Ant Design", "Cypress", "Git", "Laravel"],
    imageUrl: onebillImg,
    link: "",
  },
  {
    title: "Portfolio v1",
    category: { en: "Personal site", fr: "Site personnel" },
    description: {
      en: "The first version of my website, built in 2018. The goal was simply to have a personal website.",
      fr: "La première version de mon site, réalisée en 2018. L'objectif était simplement d'avoir un site personnel.",
    },
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "Git"],
    imageUrl: porfoliov1Img,
    link: "https://v1.bleriotnoguia.com/",
  },
  {
    title: "UberEats Clone",
    category: { en: "Delivery platform", fr: "Plateforme de livraison" },
    description: {
      en: "When working at ALC-Digital (2019), I fully developed a web application for managing deliveries and customer orders.",
      fr: "Chez ALC-Digital (2019), j'ai développé entièrement une application web de gestion des livraisons et des commandes clients.",
    },
    tags: ["Laravel", "Pusher", "JQuery", "Bootstrap", "MySQL", "JavaScript"],
    imageUrl: ubereatsImg,
    link: "",
  },
];

export const clientsData = [
  "Troopay",
  "Activ VAE",
  "Protosen",
  "Ejara",
  "Yassir Pay",
  "Wat & Co",
  "Digintu",
  "ADAA",
] as const;

export const stackData: { group: StackGroup; items: string[] }[] = [
  {
    group: "frontend",
    items: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Redux",
      "React Query",
      "Tailwind",
      "Framer Motion",
      "HTML",
      "CSS",
    ],
  },
  {
    group: "backend",
    items: [
      "Node.js",
      "AdonisJS",
      "Express",
      "Laravel",
      "GraphQL",
      "MySQL",
      "MongoDB",
      "Supabase",
    ],
  },
  {
    group: "ai",
    items: [
      "Claude API",
      "OpenAI API",
      "Vercel AI SDK",
      "Model Context Protocol (MCP)",
      "RAG with pgvector",
      "n8n",
    ],
  },
  {
    group: "mobile",
    items: ["React Native", "Ionic", "Tauri"],
  },
  {
    group: "workflow",
    items: ["Git", "Figma", "Cypress"],
  },
];
