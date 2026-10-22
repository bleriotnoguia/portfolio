import React from "react";
import type { Locale } from "@/lib/i18n";

// Article covers drawn as SVG so they stay sharp, weigh almost nothing and use
// the site's own type. Colors are fixed so a cover looks the same in both themes.
const INK = "#15171C";
const SIGNAL = "#F7DF1E";
const PAPER = "#FFFFFF";
const LIGHT = "#ECEEF3";
const PERIWINKLE = "#7684BA";

const labels = {
  en: {
    request: "request",
    model: "model",
    answer: "answer",
    toolResult: "tool_result",
    agent: "AI agent",
    client: "MCP client",
    database: "Database",
    files: "Files",
    api: "Your API",
  },
  fr: {
    request: "demande",
    model: "modèle",
    answer: "réponse",
    toolResult: "tool_result",
    agent: "Agent IA",
    client: "client MCP",
    database: "Base de données",
    files: "Fichiers",
    api: "Votre API",
  },
} satisfies Record<Locale, Record<string, string>>;

// Four-pointed spark used as the visual shorthand for "AI".
function spark(cx: number, cy: number, size: number) {
  return `M ${cx} ${cy - size} Q ${cx} ${cy} ${cx + size} ${cy} Q ${cx} ${cy} ${cx} ${
    cy + size
  } Q ${cx} ${cy} ${cx - size} ${cy} Q ${cx} ${cy} ${cx} ${cy - size} Z`;
}

const textStyle: React.CSSProperties = {
  fontFamily: "var(--font-archivo), system-ui, sans-serif",
  fontStretch: "112%",
};

function ProductCover() {
  return (
    <>
      <rect width="1200" height="630" fill={SIGNAL} />
      <rect
        x="240"
        y="105"
        width="720"
        height="430"
        rx="28"
        fill={PAPER}
        stroke={INK}
        strokeWidth="5"
      />
      <line x1="240" y1="170" x2="960" y2="170" stroke={INK} strokeWidth="5" />
      {[280, 310, 340].map((cx) => (
        <circle key={cx} cx={cx} cy="138" r="8" fill={INK} />
      ))}
      <line x1="400" y1="170" x2="400" y2="535" stroke={INK} strokeWidth="5" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x="272"
          y={205 + i * 42}
          width={i === 0 ? 96 : 76}
          height="13"
          rx="6.5"
          fill={INK}
          opacity={i === 0 ? 1 : 0.22}
        />
      ))}
      <rect x="440" y="205" width="250" height="24" rx="12" fill={INK} />
      <rect
        x="440"
        y="245"
        width="380"
        height="13"
        rx="6.5"
        fill={INK}
        opacity="0.22"
      />
      <rect
        x="440"
        y="288"
        width="232"
        height="208"
        rx="20"
        fill="none"
        stroke={INK}
        strokeWidth="5"
      />
      {[
        [480, 90],
        [530, 140],
        [580, 60],
        [630, 115],
      ].map(([x, h]) => (
        <rect
          key={x}
          x={x}
          y={466 - h}
          width="28"
          height={h}
          rx="6"
          fill={INK}
          opacity="0.85"
        />
      ))}
      {/* The AI panel: the one part of the product that changes */}
      <rect x="690" y="288" width="232" height="208" rx="20" fill={INK} />
      <path d={spark(806, 352, 40)} fill={SIGNAL} />
      <path d={spark(858, 318, 14)} fill={SIGNAL} />
      {[160, 128, 92].map((w, i) => (
        <rect
          key={w}
          x="726"
          y={414 + i * 24}
          width={w}
          height="11"
          rx="5.5"
          fill={SIGNAL}
          opacity={i === 0 ? 1 : 0.6}
        />
      ))}
      <path d={spark(1010, 210, 30)} fill={INK} />
      <path d={spark(1060, 268, 14)} fill={INK} />
      <path d={spark(170, 470, 20)} fill={INK} />
    </>
  );
}

function AgentCover({ t }: { t: (typeof labels)["en"] }) {
  return (
    <>
      <rect width="1200" height="630" fill={INK} />
      <defs>
        <marker
          id="agent-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={SIGNAL} />
        </marker>
        <marker
          id="agent-arrow-light"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={LIGHT} />
        </marker>
      </defs>
      <rect
        x="70"
        y="262"
        width="230"
        height="106"
        rx="22"
        fill="none"
        stroke={LIGHT}
        strokeWidth="4"
      />
      <text
        x="185"
        y="326"
        textAnchor="middle"
        fill={LIGHT}
        fontSize="34"
        fontWeight="700"
        style={textStyle}
      >
        {t.request}
      </text>
      <line
        x1="300"
        y1="315"
        x2="438"
        y2="315"
        stroke={LIGHT}
        strokeWidth="4"
        markerEnd="url(#agent-arrow-light)"
      />
      <circle cx="590" cy="315" r="145" fill={SIGNAL} />
      <text
        x="590"
        y="333"
        textAnchor="middle"
        fill={INK}
        fontSize="54"
        fontWeight="800"
        style={{ ...textStyle, fontStretch: "125%" }}
      >
        {t.model}
      </text>
      <line
        x1="590"
        y1="170"
        x2="590"
        y2="70"
        stroke={SIGNAL}
        strokeWidth="4"
        markerEnd="url(#agent-arrow)"
      />
      <text
        x="612"
        y="92"
        fill={SIGNAL}
        fontSize="30"
        fontWeight="700"
        style={textStyle}
      >
        {t.answer}
      </text>
      {[
        ["get_order()", 150],
        ["search_docs()", 285],
        ["create_ticket()", 420],
      ].map(([label, y]) => (
        <g key={label}>
          <line
            x1="735"
            y1="315"
            x2="850"
            y2={Number(y) + 35}
            stroke={LIGHT}
            strokeWidth="3"
            opacity="0.7"
          />
          <rect
            x="850"
            y={y}
            width="290"
            height="70"
            rx="35"
            fill="none"
            stroke={LIGHT}
            strokeWidth="4"
          />
          <text
            x="995"
            y={Number(y) + 46}
            textAnchor="middle"
            fill={LIGHT}
            fontSize="30"
            fontWeight="600"
            style={textStyle}
          >
            {label}
          </text>
        </g>
      ))}
      <path
        d="M 995 500 C 995 610, 590 610, 590 470"
        fill="none"
        stroke={SIGNAL}
        strokeWidth="4"
        strokeDasharray="14 12"
        markerEnd="url(#agent-arrow)"
      />
      <text
        x="795"
        y="600"
        textAnchor="middle"
        fill={SIGNAL}
        fontSize="28"
        fontWeight="600"
        style={textStyle}
      >
        {t.toolResult}
      </text>
    </>
  );
}

// Left edge of the three server boxes, wide enough for "Base de données".
const BOX_X = 800;

function McpCover({ t }: { t: (typeof labels)["en"] }) {
  const servers = [
    { label: t.database, y: 105 },
    { label: t.files, y: 265 },
    { label: t.api, y: 425 },
  ];

  return (
    <>
      <rect width="1200" height="630" fill={PERIWINKLE} />
      <rect x="70" y="240" width="270" height="150" rx="26" fill={PAPER} />
      <path d={spark(130, 315, 26)} fill={INK} />
      <text
        x="170"
        y="310"
        fill={INK}
        fontSize="34"
        fontWeight="800"
        style={textStyle}
      >
        {t.agent}
      </text>
      <text
        x="170"
        y="348"
        fill={INK}
        fontSize="24"
        fontWeight="500"
        opacity="0.7"
        style={textStyle}
      >
        {t.client}
      </text>
      <line x1="340" y1="315" x2="500" y2="315" stroke={INK} strokeWidth="5" />
      <circle cx="340" cy="315" r="9" fill={INK} />
      <circle cx="500" cy="315" r="9" fill={INK} />
      <rect
        x="500"
        y="215"
        width="200"
        height="200"
        rx="44"
        fill={SIGNAL}
        stroke={INK}
        strokeWidth="5"
      />
      <text
        x="600"
        y="338"
        textAnchor="middle"
        fill={INK}
        fontSize="66"
        fontWeight="800"
        style={{ ...textStyle, fontStretch: "125%" }}
      >
        MCP
      </text>
      {servers.map(({ label, y }, index) => (
        <g key={label}>
          <line
            x1="700"
            y1="315"
            x2={BOX_X}
            y2={y + 50}
            stroke={INK}
            strokeWidth="5"
          />
          <circle cx={BOX_X} cy={y + 50} r="9" fill={INK} />
          <rect x={BOX_X} y={y} width="345" height="100" rx="22" fill={PAPER} />
          {index === 0 && (
            <g fill="none" stroke={INK} strokeWidth="4">
              <ellipse cx={BOX_X + 46} cy={y + 34} rx="20" ry="8" />
              <path
                d={`M ${BOX_X + 26} ${y + 34} V ${y + 66} A 20 8 0 0 0 ${
                  BOX_X + 66
                } ${y + 66} V ${y + 34}`}
              />
            </g>
          )}
          {index === 1 && (
            <path
              d={`M ${BOX_X + 32} ${y + 26} H ${BOX_X + 56} L ${BOX_X + 68} ${
                y + 38
              } V ${y + 74} H ${BOX_X + 32} Z`}
              fill="none"
              stroke={INK}
              strokeWidth="4"
            />
          )}
          {index === 2 && (
            <text
              x={BOX_X + 48}
              y={y + 64}
              textAnchor="middle"
              fill={INK}
              fontSize="34"
              fontWeight="800"
              style={textStyle}
            >
              {"{ }"}
            </text>
          )}
          <text
            x={BOX_X + 92}
            y={y + 61}
            fill={INK}
            fontSize="27"
            fontWeight="700"
            style={textStyle}
          >
            {label}
          </text>
        </g>
      ))}
    </>
  );
}

const covers: Record<
  string,
  (props: { t: (typeof labels)["en"] }) => React.ReactElement
> = {
  "ai-in-your-product": ProductCover,
  "build-an-ai-agent-typescript": AgentCover,
  "mcp-explained": McpCover,
};

export default function BlogCover({
  slug,
  locale,
  className,
}: {
  slug: string;
  locale: Locale;
  className?: string;
}) {
  const Cover = covers[slug];

  return (
    <svg
      viewBox="0 0 1200 630"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      {Cover ? (
        <Cover t={labels[locale]} />
      ) : (
        <rect width="1200" height="630" fill={SIGNAL} />
      )}
    </svg>
  );
}
