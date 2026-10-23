// Builds public/CV.pdf (English) and public/CV-fr.pdf (French) from cv/content.mjs.
// Usage: npm run cv            (add `-- --html` to also write the HTML next to this file)
// Needs Playwright's Chromium once: npx playwright install --only-shell chromium
// Fonts are static Archivo instances in cv/fonts (SIL Open Font License, see OFL.txt).
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  FiArrowUpRight,
  FiGithub,
  FiGlobe,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import { chromium } from "playwright";
import { careerStart, contact, content } from "./content.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const writeHtml = process.argv.includes("--html");

const icon = (Icon) =>
  renderToStaticMarkup(createElement(Icon, { "aria-hidden": true }));

const escape = (text) =>
  String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function monthLabel(lang, yearMonth) {
  const [year, month] = yearMonth.split("-").map(Number);
  return new Intl.DateTimeFormat(lang, {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}

// Inclusive month count, e.g. Sep 2024 to Dec 2024 is 4 months.
function monthsBetween(start, end) {
  const [y1, m1] = start.split("-").map(Number);
  const [y2, m2] = end.split("-").map(Number);
  return (y2 - y1) * 12 + (m2 - m1) + 1;
}

function link(label, href, className = "") {
  if (!href) return escape(label);
  return `<a href="${escape(href)}"${className ? ` class="${className}"` : ""}>${escape(label)}</a>`;
}

function renderJob(job, t) {
  // Each date stays on one line; a long range breaks after the dash.
  const dates = `<span class="nowrap">${escape(
    monthLabel(t.lang, job.start)
  )} –</span> <span class="nowrap">${escape(
    job.end ? monthLabel(t.lang, job.end) : t.present
  )}</span>`;
  const duration = job.end ? t.duration(monthsBetween(job.start, job.end)) : "";

  const projectBlocks = job.projects.map((project) => {
    const extraLinks = project.links
      ? ` <span class="muted">${project.links
          .map((item) => link(item.label, item.href))
          .join(", ")}</span>`
      : "";
    const tasks = project.tasks.length
      ? `<ul class="tasks">${project.tasks
          .map((task) => `<li>${escape(task)}</li>`)
          .join("")}</ul>`
      : "";
    return `
        <div class="project">
          <p class="project-name">${link(project.name, project.href)}${extraLinks}</p>
          ${tasks}
          <p class="stack">${project.stack
            .map((item) => `<span>${escape(item)}</span>`)
            .join("")}</p>
        </div>`;
  });

  // A long entry may continue on the next page between two projects, but the
  // company name always stays with its first project (.lead).
  return `
    <article class="job">
      <div class="when">
        <p class="dates">${dates}</p>
        ${duration ? `<p class="muted">${escape(duration)}</p>` : ""}
        <p class="muted">${escape(job.place)}</p>
        ${job.end ? "" : `<p><span class="badge">${escape(t.current)}</span></p>`}
      </div>
      <div>
        <div class="lead">
          <h3 class="company">${
            job.href
              ? `<a href="${escape(job.href)}">${escape(job.company)}${icon(FiArrowUpRight)}</a>`
              : escape(job.company)
          }</h3>
          <p class="role">${escape(job.role)}</p>
          ${projectBlocks[0] ?? ""}
        </div>
        ${projectBlocks.slice(1).join("")}
      </div>
    </article>`;
}

function renderCv(t, photo, fontFaces) {
  const years = new Date().getFullYear() - careerStart;
  const contacts = [
    [FiGlobe, contact.website],
    [FiMail, contact.email],
    [FiPhone, contact.phone],
    [FiLinkedin, contact.linkedin],
    [FiGithub, contact.github],
    [FiMapPin, { label: t.location, href: null }],
  ]
    .map(
      ([Icon, item]) => `<li>${icon(Icon)}${link(item.label, item.href)}</li>`
    )
    .join("");

  return `<!doctype html>
<html lang="${t.lang}">
<head>
<meta charset="utf-8">
<title>${escape(t.documentTitle)}</title>
<style>
${fontFaces}
  @page { size: A4; margin: 12mm 13mm; }
  :root {
    --ink: #15171c;
    --muted: #5d6370;
    --line: #dcdfe5;
    --signal: #f7df1e;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body {
    font-family: "Archivo", system-ui, sans-serif;
    font-size: 8.6pt;
    line-height: 1.42;
    color: var(--ink);
  }
  a { color: inherit; text-decoration: none; }
  svg { flex: none; }
  .muted { color: var(--muted); }
  .nowrap { white-space: nowrap; }

  /* The one loud element, echoing the yellow contact block on the site */
  .header {
    display: grid;
    grid-template-columns: 25mm 1fr;
    gap: 6mm;
    align-items: center;
    padding: 5.5mm 7mm;
    border-radius: 5mm;
    background: var(--signal);
  }
  .photo { width: 25mm; height: 25mm; border-radius: 4mm; object-fit: cover; display: block; }
  .name {
    font-size: 25pt;
    font-family: "Archivo Expanded";
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 0.95;
  }
  .title {
    margin-top: 2mm;
    font-size: 11.5pt;
    font-family: "Archivo SemiExpanded";
    font-weight: 750;
    letter-spacing: -0.01em;
  }
  .years { margin-top: 0.6mm; font-size: 8.8pt; }
  .contacts {
    display: grid;
    grid-template-columns: repeat(3, auto);
    justify-content: start;
    gap: 1.4mm 6mm;
    margin-top: 3.6mm;
    list-style: none;
    font-size: 8.2pt;
  }
  .contacts li { display: flex; align-items: center; gap: 1.6mm; }
  .contacts svg { width: 3.2mm; height: 3.2mm; }

  .summary { margin-top: 4mm; font-size: 9pt; line-height: 1.48; }

  h2 {
    margin-top: 4.6mm;
    padding-bottom: 1.4mm;
    border-bottom: 0.35mm solid var(--ink);
    font-size: 12.5pt;
    font-family: "Archivo Expanded";
    font-weight: 750;
    letter-spacing: -0.03em;
    break-after: avoid;
  }

  .job {
    display: grid;
    grid-template-columns: 31mm 1fr;
    gap: 5mm;
    padding: 2.4mm 0;
    border-bottom: 0.2mm solid var(--line);
  }
  .lead, .project { break-inside: avoid; }
  .when { font-variant-numeric: tabular-nums; }
  .dates { font-weight: 600; }
  .badge {
    display: inline-block;
    margin-top: 1.2mm;
    padding: 0.2mm 2mm;
    border-radius: 3mm;
    background: var(--signal);
    font-size: 7pt;
    font-weight: 700;
  }
  .company {
    font-size: 11pt;
    font-family: "Archivo SemiExpanded";
    font-weight: 750;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }
  .company a { display: inline-flex; align-items: center; gap: 1.2mm; }
  .company svg { width: 3.2mm; height: 3.2mm; color: var(--muted); }
  .role { color: var(--muted); }
  .project { margin-top: 1.2mm; }
  .project-name { font-weight: 600; }
  .project-name a, .project-list a, .education a {
    text-decoration: underline;
    text-decoration-color: rgba(21, 23, 28, 0.3);
    text-underline-offset: 0.6mm;
  }
  .project-name .muted { font-weight: 400; }
  .tasks { list-style: none; margin-top: 0.6mm; }
  .tasks li { position: relative; padding-left: 3.4mm; }
  .tasks li::before {
    content: "";
    position: absolute;
    left: 0.4mm;
    top: 0.68em;
    width: 1.6mm;
    height: 0.25mm;
    background: var(--ink);
  }
  .stack { display: flex; flex-wrap: wrap; gap: 1mm; margin-top: 1mm; }
  .stack span {
    padding: 0.1mm 1.4mm;
    border: 0.2mm solid var(--line);
    border-radius: 1mm;
    font-size: 7.4pt;
    color: #3a3e47;
  }

  /* Projects, skills, education and languages share the job grid */
  .rows { list-style: none; break-inside: avoid; }
  .rows > li, .rows > div {
    display: grid;
    grid-template-columns: 31mm 1fr;
    gap: 5mm;
    padding: 1.3mm 0;
    border-bottom: 0.2mm solid var(--line);
  }
  .rows strong { font-weight: 700; }
  dl.rows dt { color: var(--muted); }
  .keep { break-inside: avoid; }
</style>
</head>
<body>
  <header class="header">
    <img class="photo" src="${photo}" alt="">
    <div>
      <h1 class="name">Blériot Noguia</h1>
      <p class="title">${escape(t.title)}</p>
      <p class="years">${escape(t.experienceYears(years))}</p>
      <ul class="contacts">${contacts}</ul>
    </div>
  </header>

  <p class="summary">${escape(t.summary)}</p>

  <h2>${escape(t.sections.experience)}</h2>
  ${t.experience.map((job) => renderJob(job, t)).join("")}

  <h2>${escape(t.sections.projects)}</h2>
  <ul class="rows project-list">
    ${t.projects
      .map(
        (project) =>
          `<li><strong>${link(project.name, project.href)}</strong><span>${escape(project.text)}</span></li>`
      )
      .join("")}
  </ul>

  <h2>${escape(t.sections.skills)}</h2>
  <dl class="rows">
    ${t.skills
      .map(
        (skill) =>
          `<div><dt>${escape(skill.group)}</dt><dd>${escape(skill.items)}</dd></div>`
      )
      .join("")}
  </dl>

  <section class="keep">
    <h2>${escape(t.sections.education)}</h2>
    <dl class="rows education">
      ${t.education
        .map(
          (item) =>
            `<div><dt>${escape(item.label)}</dt><dd>${escape(item.text)}${
              item.links.length
                ? ` ${item.links.map((entry) => link(entry.label, entry.href)).join(", ")}`
                : ""
            }</dd></div>`
        )
        .join("")}
    </dl>
  </section>

  <section class="keep">
    <h2>${escape(t.sections.more)}</h2>
    <dl class="rows">
      <div><dt>${escape(t.languagesLabel)}</dt><dd>${escape(t.languages)}</dd></div>
      <div><dt>${escape(t.interestsLabel)}</dt><dd>${escape(t.interests)}</dd></div>
    </dl>
  </section>
</body>
</html>`;
}

// Static instances of Archivo (see cv/fonts). Chrome embeds them as regular
// TrueType fonts; the variable font would end up as Type 3, which some PDF
// viewers space poorly.
const fonts = [
  ["Archivo", 400, "archivo-400.ttf"],
  ["Archivo", 600, "archivo-600.ttf"],
  ["Archivo", 700, "archivo-700.ttf"],
  ["Archivo SemiExpanded", 750, "archivo-semiexpanded-750.ttf"],
  ["Archivo Expanded", 750, "archivo-expanded-750.ttf"],
  ["Archivo Expanded", 800, "archivo-expanded-800.ttf"],
];

async function loadFontFaces() {
  const faces = await Promise.all(
    fonts.map(async ([family, weight, file]) => {
      const data = await fs.readFile(path.join(here, "fonts", file));
      return `@font-face { font-family: "${family}"; font-weight: ${weight}; src: url(data:font/ttf;base64,${data.toString(
        "base64"
      )}) format("truetype"); }`;
    })
  );
  return faces.join("\n");
}

async function main() {
  const fontFaces = await loadFontFaces();
  // profile.png is actually a JPEG file
  const photo = `data:image/jpeg;base64,${(
    await fs.readFile(path.join(root, "public", "profile.png"))
  ).toString("base64")}`;

  const browser = await chromium.launch();
  try {
    for (const t of Object.values(content)) {
      const html = renderCv(t, photo, fontFaces);
      if (writeHtml)
        await fs.writeFile(path.join(here, `cv-${t.lang}.html`), html);

      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      const output = path.join(root, "public", t.file);
      await page.pdf({
        path: output,
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
      });
      await page.close();
      console.log(`Wrote ${path.relative(root, output)}`);
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
