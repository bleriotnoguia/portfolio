import type { Dictionary } from "./en";

const fr: Dictionary = {
  meta: {
    title: "Blériot Noguia | Développeur full-stack, web, mobile et IA",
    description:
      "Blériot Noguia est développeur full-stack. Il conçoit des produits web et mobiles, des fonctionnalités IA et des agents avec React, Next.js, React Native, AdonisJS et Laravel.",
  },
  nav: {
    main: "Principale",
    work: "Réalisations",
    services: "Services",
    experience: "Parcours",
    about: "À propos",
    blog: "Blog",
    cta: "Démarrer un projet",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    switchToDark: "Passer au thème sombre",
    switchToLight: "Passer au thème clair",
    language: "Langue",
  },
  hero: {
    available: "Disponible pour de nouveaux projets",
    headline: {
      wide: [
        "Produits web,",
        "mobiles et IA,",
        "du premier commit",
        "à la production.",
      ],
      narrow: [
        "Produits web,",
        "mobiles et IA,",
        "du premier",
        "commit à la",
        "production.",
      ],
    },
    lead: "Je suis Blériot Noguia, développeur full-stack depuis 2019. J'ai livré des plateformes pour des équipes en France, au Sénégal, en Suisse et aux Émirats arabes unis, et j'aide aujourd'hui les entreprises à intégrer des fonctionnalités IA et des agents dans leurs produits.",
    cta: "Démarrer un projet",
    cv: "Télécharger le CV",
    clients: "Équipes et clients",
  },
  work: {
    title: "Réalisations",
    intro:
      "Des produits que j'ai conçus ou aidé à construire pour des startups, des agences et des institutions publiques.",
    seeAll: "Voir les {count} projets",
    screenshotAlt: "Capture d'écran de {title}",
  },
  services: {
    title: "Ce que je fais",
    intro:
      "Trois façons de travailler ensemble, d'une première version jusqu'aux agents IA en production.",
    items: [
      {
        title: "Produits web et mobiles",
        text: "Plateformes SaaS, tableaux de bord et applications mobiles, pensés pour être maintenus bien après le lancement.",
        points: [
          "Next.js et React",
          "React Native",
          "AdonisJS, Laravel",
          "MySQL, Supabase",
        ],
        highlight: false,
      },
      {
        title: "Fonctionnalités IA et agents",
        text: "Des fonctionnalités LLM dans votre produit, des agents qui utilisent vos outils et vos données, et des automatisations qui prennent en charge le travail répétitif.",
        points: [
          "API Claude et OpenAI",
          "Agents avec outils",
          "RAG sur vos documents",
          "Serveurs MCP",
        ],
        highlight: true,
      },
      {
        title: "Audit et accompagnement technique",
        text: "Revue de code et d'architecture, cahier des charges technique, et un avis franc sur les cas où l'IA en vaut vraiment la peine pour vous.",
        points: [
          "Audit de code et d'architecture",
          "Cahier des charges technique",
          "Cadrage de MVP",
        ],
        highlight: false,
      },
    ],
  },
  experience: {
    title: "Parcours",
    intro: "Missions freelance et postes en entreprise depuis 2019.",
    present: "aujourd'hui",
    current: "En cours",
  },
  about: {
    title: "À propos",
    portraitAlt: "Portrait de Blériot Noguia",
    paragraphs: [
      "J'ai étudié l'informatique, puis je me suis formé au développement web full-stack grâce à des cours en ligne. Ce que je préfère, c'est la résolution de problèmes : le moment où un bug tenace ou un besoin flou devient enfin clair.",
      "Ma stack principale : React (Next.js et React Native), Node.js avec AdonisJS, et MySQL. Je suis aussi à l'aise avec Laravel et les outils no-code.",
      "Une part croissante de mon travail porte sur l'IA : fonctionnalités LLM, agents qui appellent de vrais outils, et toute la plomberie qui les relie aux données d'une entreprise. J'utilise aussi des agents de code IA au quotidien, ce qui me permet de livrer plus vite sans baisser l'exigence de qualité.",
      "J'ai fondé la communauté JavaScript du Cameroun, où j'organise des meetups et des événements. En dehors du code, je lis et regarde des vidéos sur la spiritualité, et j'aime partager ce que j'apprends.",
    ],
    stackTitle: "Stack",
    stackGroups: {
      frontend: "Front-end",
      backend: "Back-end",
      ai: "IA et agents",
      mobile: "Mobile et desktop",
      workflow: "Outils",
    },
  },
  blog: {
    title: "Articles",
    homeIntro:
      "Des notes pratiques sur la création de produits avec l'IA et les outils web modernes.",
    seeAll: "Tous les articles",
    indexTitle: "Blog",
    indexIntro:
      "Des notes pratiques sur les agents IA, les fonctionnalités LLM et la stack web que j'utilise pour les livrer.",
    readingTime: "{minutes} min de lecture",
    backToBlog: "Tous les articles",
    authorRole: "Développeur full-stack, web, mobile et IA",
    ctaTitle: "Besoin de ça dans votre produit ?",
    ctaText:
      "J'aide les équipes à concevoir et livrer des fonctionnalités IA et des agents. Parlez-moi de votre projet.",
    ctaButton: "Démarrer un projet",
    moreTitle: "À lire aussi",
  },
  contact: {
    title: ["Un produit à construire ?", "Parlons-en."],
    intro:
      "Parlez-moi de votre projet via le formulaire, ou contactez-moi directement par e-mail ou WhatsApp.",
    whatsapp: "Écrire sur WhatsApp",
    emailLabel: "Votre e-mail",
    emailPlaceholder: "vous@entreprise.com",
    messageLabel: "Votre message",
    messagePlaceholder: "Que construisez-vous, et pour quand ?",
    send: "Envoyer le message",
    sending: "Envoi…",
    success: "Message envoyé. Je vous réponds par e-mail.",
    errors: {
      invalid_submission: "Envoi refusé. Rechargez la page et réessayez.",
      too_fast:
        "Envoi trop rapide. Prenez quelques secondes pour écrire votre message, puis réessayez.",
      invalid_email:
        "Cette adresse e-mail n'est pas valide. Vérifiez-la et réessayez.",
      invalid_message:
        "Votre message doit contenir entre 1 et 5 000 caractères.",
      send_failed:
        "Le message n'a pas pu être envoyé. Réessayez ou écrivez directement à contact@bleriotnoguia.com.",
    },
  },
  projectsPage: {
    back: "Retour à l'accueil",
    title: "Tous les projets",
    intro:
      "{count} projets, des plateformes clientes en production aux projets personnels réalisés pour apprendre.",
  },
  footer: {
    builtWith:
      "Construit avec Next.js, TypeScript, Tailwind CSS, Framer Motion, React Email et Resend. Hébergé sur Vercel.",
  },
};

export default fr;
