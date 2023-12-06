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
    title: "Fontend Developer",
    company: "Wat & Co",
    description:
      "I worked as a front-end developer. I was in charge of the front-end architecture and the development of the website.",
    icon: React.createElement(FaReact),
    date: "Feb. 2023 - Oct. 2023",
  },
  {
    title: "Full-Stack Developer",
    company: "Digintu Tech",
    description:
      "As a full-stack developer, I participate on building a no-code platform.",
    icon: React.createElement(FaReact),
    date: "Aug. 2021 - Nov. 2022",
  },
  {
    title: "Full-Stack Developer",
    company: "COMEUP",
    description:
      "I worked as a fullstack developer. I discussed with many client",
    icon: React.createElement(CgWorkAlt),
    date: "Nov. 2020 - Jul. 2021",
  },
  {
    title: "Full-Stack Developer",
    company: "ADAA SAS",
    description:
      "I worked as a Full-Stack Developer. With my team we build an online learning platform.",
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
      "I worked as a full-stack developer on this website project for 2 months. Visitors can get more information about weledi company.",
    tags: ["React", "Next.js", "Sanity", "Bootstrap", "TypeScript"],
    imageUrl: welediImg,
    link: "https://weledi.dev",
  },
  {
    title: "Digintu Code",
    description:
      "This platform aims to allow freelancers and companies to easily create web applications without having to write a line of code.",
    tags: ["React", "Typescript", "Ant Design", "GraphQL", "Apollo", "Laravel"],
    imageUrl: digintuCodeImg,
    link: "https://digintu.codes",
  },
  {
    title: "OneBill",
    description:
      "This application helps companies automatically manage the sending, receiving and payment of their invoices.",
    tags: ["React", "Typescript", "Ant Design", "Cypress", "Git", "Laravel"],
    imageUrl: onebillImg,
    link: "https://www.icabedo.ch/onebill",
  },
  {
    title: "Dental Clinic",
    description:
      "This application helps companies automatically manage the sending, receiving and payment of their invoices.",
    tags: ["React", "Typescript", "Ant Design", "Cypress", "Git", "Laravel"],
    imageUrl: clinicImg,
    link: "https://cliniquedentairewado.com",
  },
  {
    title: "GreatPay",
    description:
      "It is a payment application intended for financial institutions wishing to issue bank cards. I worked on this project as a lead front-end developer.",
    tags: ["React", "TypeScript", "GitLab", "Chakra UI", "React Query"],
    imageUrl: greatpayImg,
    link: "https://greatpay.vercel.app/",
  },
  {
    title: "Innov and Co",
    description:
      "This application helps companies automatically manage the sending, receiving and payment of their invoices.",
    tags: ["React", "Typescript", "Ant Design", "Cypress", "Git", "Laravel"],
    imageUrl: innovImg,
    link: "https://www.innovandco.net",
  },
  {
    title: "Ga Academie",
    description:
      "This application helps companies automatically manage the sending, receiving and payment of their invoices.",
    tags: ["React", "Typescript", "Ant Design", "Cypress", "Git", "Laravel"],
    imageUrl: gaAcademieImg,
    link: "https://gaacademie.com",
  },
  {
    title: "Cointracker",
    description:
      "This application helps companies automatically manage the sending, receiving and payment of their invoices.",
    tags: ["React", "Typescript", "Ant Design", "Cypress", "Git", "Laravel"],
    imageUrl: cointrackerImg,
    link: "https://cointracker.bleriotnoguia.com/",
  },
  {
    title: "Calculator",
    description:
      "This application helps companies automatically manage the sending, receiving and payment of their invoices.",
    tags: ["React", "Typescript", "Ant Design", "Cypress", "Git", "Laravel"],
    imageUrl: calcoImg,
    link: "https://calculator.bleriotnoguia.com/",
  },
  {
    title: "Adaa Learning",
    description:
      "This application helps companies automatically manage the sending, receiving and payment of their invoices.",
    tags: ["React", "Typescript", "Ant Design", "Cypress", "Git", "Laravel"],
    imageUrl: adaaLearningImg,
    link: "https://adaalearning.com/",
  },
  {
    title: "Current portfolio",
    description:
      "This application helps companies automatically manage the sending, receiving and payment of their invoices.",
    tags: ["React", "Typescript", "Ant Design", "Cypress", "Git", "Laravel"],
    imageUrl: portfoliov2Img,
    link: "",
  },
  {
    title: "Portfolio v1",
    description:
      "This application helps companies automatically manage the sending, receiving and payment of their invoices.",
    tags: ["React", "Typescript", "Ant Design", "Cypress", "Git", "Laravel"],
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
