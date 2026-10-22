const en = {
  meta: {
    title: "Blériot Noguia | Full-stack developer, web, mobile and AI",
    description:
      "Blériot Noguia is a full-stack developer building web and mobile products, AI features and agents with React, Next.js, React Native, AdonisJS and Laravel.",
  },
  nav: {
    main: "Main",
    work: "Work",
    services: "Services",
    experience: "Experience",
    about: "About",
    blog: "Blog",
    cta: "Start a project",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchToDark: "Switch to dark theme",
    switchToLight: "Switch to light theme",
    language: "Language",
  },
  hero: {
    available: "Available for new projects",
    headline: {
      wide: [
        "Web, mobile",
        "and AI products,",
        "from first commit",
        "to production.",
      ],
      narrow: [
        "Web, mobile",
        "and AI",
        "products,",
        "from first",
        "commit to",
        "production.",
      ],
    },
    lead: "I'm Blériot Noguia, a full-stack developer since 2019. I've shipped platforms for teams in France, Senegal, Switzerland and the UAE, and I now help companies build AI features and agents into their products.",
    cta: "Start a project",
    cv: "Download CV",
    clients: "Teams and clients",
  },
  work: {
    title: "Selected work",
    intro:
      "Products I built or helped build for startups, agencies and public institutions.",
    seeAll: "See all {count} projects",
    screenshotAlt: "Screenshot of {title}",
  },
  services: {
    title: "What I do",
    intro:
      "Three ways to work together, from a first version to AI agents running in production.",
    items: [
      {
        title: "Web and mobile products",
        text: "SaaS platforms, dashboards and mobile apps, built to be maintained long after launch.",
        points: [
          "Next.js and React",
          "React Native",
          "AdonisJS, Laravel",
          "MySQL, Supabase",
        ],
        highlight: false,
      },
      {
        title: "AI features and agents",
        text: "LLM features inside your product, agents that use your tools and data, and automations that take over repetitive work.",
        points: [
          "Claude and OpenAI APIs",
          "Tool-using agents",
          "RAG on your documents",
          "MCP servers",
        ],
        highlight: true,
      },
      {
        title: "Audits and technical guidance",
        text: "Code and architecture reviews, technical specifications, and an honest view on where AI is worth it for you.",
        points: [
          "Code and architecture audit",
          "Technical specifications",
          "MVP scoping",
        ],
        highlight: false,
      },
    ],
  },
  experience: {
    title: "Experience",
    intro: "Freelance missions and in-house roles since 2019.",
    present: "Present",
    current: "Current",
  },
  about: {
    title: "About",
    portraitAlt: "Portrait of Blériot Noguia",
    paragraphs: [
      "I studied computer science, then taught myself full-stack web development through online courses. What I enjoy most is the problem-solving: the moment a hard bug or a messy requirement finally makes sense.",
      "My core stack is React (Next.js and React Native), Node.js with AdonisJS, and MySQL. I'm also at home with Laravel and no-code tools.",
      "A growing part of my work is AI: LLM features, agents that call real tools, and the plumbing that connects them to a company's data. I also work with AI coding agents every day, which lets me ship faster without lowering the bar on quality.",
      "I founded the JavaScript community in Cameroon, where I organise meetups and events. Outside of code, I read and watch videos about spirituality, and I like sharing what I learn.",
    ],
    stackTitle: "Stack",
    stackGroups: {
      frontend: "Front-end",
      backend: "Back-end",
      ai: "AI and agents",
      mobile: "Mobile and desktop",
      workflow: "Workflow",
    },
  },
  blog: {
    title: "Writing",
    homeIntro:
      "Practical notes on building products with AI and modern web tools.",
    seeAll: "All articles",
    indexTitle: "Blog",
    indexIntro:
      "Practical notes on AI agents, LLM features and the web stack I use to ship them.",
    readingTime: "{minutes} min read",
    backToBlog: "All articles",
    authorRole: "Full-stack developer, web, mobile and AI",
    ctaTitle: "Need this in your product?",
    ctaText:
      "I help teams design and ship AI features and agents. Tell me about your project.",
    ctaButton: "Start a project",
    moreTitle: "Keep reading",
  },
  contact: {
    title: ["Have a product to build?", "Let's talk."],
    intro:
      "Tell me about your project with the form, or reach me directly by email or WhatsApp.",
    whatsapp: "Message on WhatsApp",
    emailLabel: "Your email",
    emailPlaceholder: "you@company.com",
    messageLabel: "Your message",
    messagePlaceholder: "What are you building, and by when?",
    send: "Send message",
    sending: "Sending…",
    success: "Message sent. I'll reply by email.",
    errors: {
      invalid_submission: "Submission rejected. Reload the page and try again.",
      too_fast:
        "That was quick. Take a few seconds to write your message, then try again.",
      invalid_email: "This email address isn't valid. Check it and try again.",
      invalid_message: "Your message must be between 1 and 5,000 characters.",
      send_failed:
        "Your message couldn't be sent. Try again or email contact@bleriotnoguia.com directly.",
    },
  },
  projectsPage: {
    back: "Back to home",
    title: "All projects",
    intro:
      "{count} projects, from client platforms in production to side projects I built to learn.",
  },
  footer: {
    builtWith:
      "Built with Next.js, TypeScript, Tailwind CSS, Framer Motion, React Email and Resend. Hosted on Vercel.",
  },
};

export default en;
export type Dictionary = typeof en;
