import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import welediImg from "@/public/weledi.png";
import greatpayImg from "@/public/greatpay.png";
import digintuCodeImg from "@/public/digintu-code.png";
import clinicImg from "@/public/clinique-dentaire-wado.png";
import gaAcademieImg from "@/public/ga-academie.png";
import innovImg from "@/public/innov-and-co.png";
import onebillImg from "@/public/onebill.png";
import calcoImg from "@/public/calco.png";
import cointrackerImg from "@/public/cointracker.png";
import adaaLearningImg from "@/public/adaalearning.png";
import porfoliov1Img from "@/public/portfolio1.png";
import portfoliov2Img from "@/public/portfolio2.png";

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

export const experiencesData = [
  {
    title: "Full-Stack Developer",
    company: "COMEUP (Freelance)",
    description:
      "On the comeup platform I offer my services to individuals and businesses as a fullstack developer",
    icon: React.createElement(FaReact),
    date: "Nov. 2023 - Present",
  },
  {
    title: "Fontend Developer",
    company: "Wat & Co",
    description:
      "I worked as a front-end developer. I was in charge of front-end component development and project management.",
    icon: React.createElement(FaReact),
    date: "Feb. 2023 - Oct. 2023",
  },
  {
    title: "Full-Stack Developer",
    company: "Digintu Tech",
    description:
      "As a full-stack developer, I participate on building a no-code platform. We used React.js, Laravel, graphql...",
    icon: React.createElement(FaReact),
    date: "Aug. 2021 - Nov. 2022",
  },
  {
    title: "Full-Stack Developer",
    company: "COMEUP",
    description:
      "On the comeup freelance platform I met the needs of many clients. (website creation and bug fixing)",
    icon: React.createElement(CgWorkAlt),
    date: "Nov. 2020 - Jul. 2021",
  },
  {
    title: "Full-Stack Developer",
    company: "ADAA SAS",
    description:
      "I worked as a Full-Stack Developer. With my team we build an online learning platform with React.js and Laravel.",
    icon: React.createElement(CgWorkAlt),
    date: "Dec. 2019 - Oct. 2020",
  },
  {
    title: "Full-Stack Developer",
    company: "ALC-Digital",
    description:
      "As a full-stack developer, I worked on web application for managing deliveries and customer orders.",
    icon: React.createElement(CgWorkAlt),
    date: "March 2019 - Oct. 2019",
  },
] as const;

export const projectsData = [
  {
    title: "Weledi",
    description:
      "I worked as a font-end developer on this website project for 2 months. the website allow visitors to get more information about weledi company.",
    tags: ["React", "Next.js", "Sanity", "Bootstrap", "TypeScript"],
    imageUrl: welediImg,
    link: "https://weledi.dev",
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
    title: "OneBill",
    description:
      "My participation in this project mainly consisted of carrying out end-to-end tests with cypress and fixing bugs in the frontend and backend.",
    tags: ["React", "Typescript", "Ant Design", "Cypress", "Git", "Laravel"],
    imageUrl: onebillImg,
    link: "https://www.icabedo.ch/onebill",
  },
  {
    title: "Dental Clinic",
    description:
      "The website was built with WordPress. It allow visitors to get more information about the dental clinic.",
    tags: ["WordPress", "CSS"],
    imageUrl: clinicImg,
    link: "https://cliniquedentairewado.com",
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
    title: "Adaa Learning",
    description:
      "As a full-stack developer and project manager, I participated in the development of frontend and backend features.",
    tags: ["React", "Typescript", "Bootstrap", "CSS", "Git", "Laravel"],
    imageUrl: adaaLearningImg,
    link: "https://adaalearning.com/",
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
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Git",
  "Tailwind",
  "Figma",
  "MongoDB",
  "Redux",
  "GraphQL",
  "Apollo",
  "Express",
  "MySQL",
  "React Query",
  "Laravel",
  "Framer Motion",
  "Cypress",
] as const;
