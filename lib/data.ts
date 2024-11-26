import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import biquizImg from "@/public/biquiz.png";
import greatpayImg from "@/public/greatpay.png";
import digintuCodeImg from "@/public/digintu-code.png";
import glocosarlImg from "@/public/glocosarl.png";
import legardImg from "@/public/legard-store.png";
import gaAcademieImg from "@/public/ga-academie.png";
import innovImg from "@/public/innov-and-co.png";
import onebillImg from "@/public/onebill.png";
import calcoImg from "@/public/calco.png";
import cointrackerImg from "@/public/cointracker.png";
import adaaLearningImg from "@/public/adaalearning.png";
import porfoliov1Img from "@/public/portfolio1.png";
import portfoliov2Img from "@/public/portfolio2.png";
import ubereatsImg from "@/public/ubereats.png";

export const links = [
  {
    name: "Home",
    hash: "/#home",
  },
  {
    name: "About",
    hash: "/#about",
  },
  {
    name: "Projects",
    hash: "/#projects",
  },
  {
    name: "Skills",
    hash: "/#skills",
  },
  {
    name: "Experience",
    hash: "/#experience",
  },
  {
    name: "Contact",
    hash: "/#contact",
  },
] as const;

type Experience = {
  title: string;
  company: string;
  description: string;
  icon: React.ReactElement;
  date: string;
  link?: string;
};

export const experiencesData: Experience[] = [
  {
    title: "Fontend React.js Developer",
    company: "Ejara",
    description:
      "I am involved in developing the frontend of the admin dashboard for the Ejara application. Converting Figma designs into functional code using React.js.",
    icon: React.createElement(FaReact),
    date: "Sept. 2024 - Present",
    link: "https://ejara.io",
  },
  {
    title: "Full-Stack Developer",
    company: "COMEUP (Freelance)",
    description:
      "On the comeup platform I offer my services to individuals and businesses as a fullstack developer. (website creation and bug fixing)",
    icon: React.createElement(CgWorkAlt),
    date: "Nov. 2020 - Present",
    link: "https://comeup.com/@dev-pro",
  },
  {
    title: "Fontend React.js Developer",
    company: "Wat & Co",
    description:
      "I worked as a front-end developer. I was in charge of front-end component development and project management.",
    icon: React.createElement(FaReact),
    date: "Feb. 2023 - Oct. 2023",
    link: "https://watconsultants.com",
  },
  {
    title: "Full-Stack Developer",
    company: "Digintu Tech",
    description:
      "As a full-stack developer, I participate on building a no-code platform. We used React.js, Laravel, graphql...",
    icon: React.createElement(FaReact),
    date: "Aug. 2021 - Nov. 2022",
    link: "https://digintu.ch",
  },
  {
    title: "Full-Stack Developer",
    company: "ADAA SAS",
    description:
      "I worked as a Full-Stack Developer. With my team we build an online learning platform with React.js and Laravel.",
    icon: React.createElement(CgWorkAlt),
    date: "Dec. 2019 - Oct. 2020",
    link: "https://adaalearning.com",
  },
  {
    title: "Full-Stack Developer",
    company: "ALC-Digital",
    description:
      "As a full-stack developer, I worked on <a href='https://github.com/bleriotnoguia/ubereats-clone' target='_blank' class='underline'>web application</a> for managing deliveries and customer orders.",
    icon: React.createElement(CgWorkAlt),
    date: "March 2019 - Oct. 2019",
  },
] as const;

export const projectsData = [
  {
    title: "OneBill",
    description:
      "My participation in this project mainly consisted of carrying out end-to-end tests with cypress and fixing bugs in the frontend and backend.",
    tags: ["React", "Typescript", "Ant Design", "Cypress", "Git", "Laravel"],
    imageUrl: onebillImg,
    link: "https://www.icabedo.ch/onebill",
  },
  {
    title: "Gloco Sarl",
    description:
      "The website was built with WordPress. It allow visitors to get more information about the company and its services.",
    tags: ["WordPress", "CSS"],
    imageUrl: glocosarlImg,
    link: "https://glocosarl.com",
  },
  {
    title: "Adaa Learning",
    description:
      "As a full-stack developer and project manager, I participated in the development of frontend and backend features.",
    tags: ["React", "Typescript", "Bootstrap", "CSS", "Git", "Laravel"],
    imageUrl: adaaLearningImg,
    link: "https://adaalearning.com/",
  },
  {
    title: "Legard Store",
    description:
      "The website was built with WordPress. It allow visitors to get more information about the company and its products.",
    tags: ["WordPress", "CSS"],
    imageUrl: legardImg,
    link: "https://legard.store",
  },
  {
    title: "GreatPay",
    description:
      "At the client's request, I just had to participate in the development of the frontend interfaces, the backend dev having to be carried out by another company.",
    tags: ["React", "TypeScript", "GitLab", "Chakra UI", "React Query"],
    imageUrl: greatpayImg,
    link: "https://greatpay.vercel.app/",
  },
  {
    title: "Innov and Co",
    description:
      "The company wanted a modern design that would allow visitors to obtain information about the company quickly.",
    tags: ["HTML", "CSS", "JavaScript", "jekyll"],
    imageUrl: innovImg,
    link: "https://www.innovandco.net",
  },
  {
    title: "Biquiz",
    description:
      "Biquiz is a quiz app that allows you to create and play quizzes. It was built with React, Next.js, Ionic, Supabase and TypeScript.",
    tags: ["React", "Next.js", "Ionic", "Supabase", "TypeScript"],
    imageUrl: biquizImg,
    link: "https://biquiz.vercel.app",
  },
  {
    title: "Ga Academie",
    description:
      "The company wanted a modern design that would allow visitors to obtain information about the company quickly.",
    tags: ["WordPress", "CSS", "elementor"],
    imageUrl: gaAcademieImg,
    link: "https://gaacademie.com",
  },
  {
    title: "Cointracker",
    description:
      "Simple clone of Coinmarketcap wallet. Built with React, Redux and Tailwind CSS for learning purposes.",
    tags: ["React", "Redux", "JavaScript", "Tailwind CSS"],
    imageUrl: cointrackerImg,
    link: "https://cointracker.bleriotnoguia.com/",
  },
  {
    title: "Calculator",
    description: "Simple calculator built with Reactjs for learning purposes.",
    tags: ["React", "JavaScript", "CSS"],
    imageUrl: calcoImg,
    link: "https://calculator.bleriotnoguia.com/",
  },
  {
    title: "Digintu Code",
    description:
      "As a fullstack developer, I fully developed the front-end part and I also took care of adding new features to the backend.",
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
    link: "https://digintu.codes",
  },
  {
    title: "Current portfolio",
    description:
      "I wanted to have a more modern design for my portfolio. So I built this, also in order to present information about my profile.",
    tags: ["React", "Typescript", "Next.js", "Tailwind", "Git"],
    imageUrl: portfoliov2Img,
    link: "",
  },
  {
    title: "Portfolio v1",
    description:
      "This is the first version of my website. I built it in 2018. The goal was just to have a personal website.",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "Git"],
    imageUrl: porfoliov1Img,
    link: "https://v1.bleriotnoguia.com/",
  },
  {
    title: "UberEats Clone",
    description:
      "When working at ALC-Digital (2019), I fully developed a web application for managing deliveries and customer orders.",
    tags: ["Laravel", "Pusher", "JQuery", "Bootstrap", "MySQL", "JavaScript"],
    imageUrl: ubereatsImg,
    link: "https://github.com/bleriotnoguia/ubereats-clone",
  },
] as const;

export const skillsData = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "AdonisJS",
  "Git",
  "Tailwind",
  "Figma",
  "MongoDB",
  "Redux",
  "GraphQL",
  "Express",
  "MySQL",
  "React Query",
  "Laravel",
  "Framer Motion",
  "Cypress",
  "HTML",
  "CSS",
  "JavaScript",
] as const;
