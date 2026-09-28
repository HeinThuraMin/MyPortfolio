const unsplash = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=70`;

export const profile = {
  name: "Hein Thura Min",
  role: "Data Engineer · Full-Stack Developer",
  location: "Singapore",
  email: "heinthuraminn@gmail.com",
  phone: "+65 8160 3390",
  github: "https://github.com/HeinThuraMin",
  linkedin: "https://linkedin.com/in/hein-thura-min-3b9795281",
  intro:
    "Fresh Graduate CS student (AI & Big Data) in Singapore. I build web apps, data pipelines and AI-powered products, and won the Community Choice and Microsoft Stack awards at a hackathon.",
  // Fill in the empty urls to enable those icons' links
  socials: [
    { name: "Facebook", url: "https://www.facebook.com/gypsyveno.veno.1" },
    { name: "Instagram", url: "https://www.instagram.com/friedvermicelli/" },
    { name: "LinkedIn", url: "https://linkedin.com/in/hein-thura-min-3b9795281" },
    { name: "GitHub", url: "https://github.com/HeinThuraMin" },
  ],
  about: [
    "I'm a Computer Science student (AI & Big Data Management) at the University of Wollongong, studying through SIM Global Education in Singapore. I currently work as an IT Support / Junior Data Engineer, writing Python and PowerShell to automate reporting and keeping SQL Server / Azure SQL databases healthy.",
    "Before that I worked as a junior developer on React, Node.js and SQL projects. Outside of work I lead teams on projects like Krewby, a workforce management SaaS, and Emochi, an emotional AI companion.",
  ],
};

export const nav = [
  ["Home", "home"],
  ["About", "about"],
  ["Experience", "experience"],
  ["Projects", "projects"],
  ["Skills", "skills"],
  ["Contact", "contact"],
];

export const stats = [
  ["2", "Hackathon awards"],
  ["4", "Cloud & data certs"],
  ["7", "Projects built"],
];

export const experience = [
  {
    date: "Nov 2025 – Present",
    title: "IT Support / Junior Data Engineer",
    org: "B8 ICT Solutions · Remote",
    points: [
      "Maintain and monitor SQL Server / Azure SQL: integrity checks, backups, performance tuning.",
      "Wrote Python and PowerShell scripts to clean and transform ticketing and log data into reports.",
      "Automated recurring extracts, log aggregation and reporting to cut manual effort.",
      "Supported Azure deployments and administered Windows/Linux systems.",
    ],
  },
  {
    date: "Apr 2024 – Sep 2025",
    title: "Junior Developer",
    org: "MSME by G3G · Remote",
    points: [
      "Built and tested features in JavaScript, TypeScript, React and Node.js/Express.",
      "Wrote SQL against MySQL and PostgreSQL; fixed QA-reported bugs.",
      "Took part in code reviews with Git/GitHub in an Agile/Scrum team, and documented REST APIs.",
    ],
  },
  {
    date: "Oct 2024 – Oct 2026",
    title: "B.Sc. Computer Science – AI & Big Data Management",
    org: "University of Wollongong · SIM Global Education",
  },
  {
    date: "Oct 2023 – Oct 2024",
    title: "Diploma in Information Technology",
    org: "SIM Global Education, Singapore",
  },
];

export const projects = [
  {
    tag: "Hackathon winner",
    win: true,
    featured: true,
    title: "Emochi — Emotional AI Companion",
    desc: "Turns your feelings into eight debating AI characters, with a judge agent (“Wisey”) that synthesizes one balanced next step. Won the Community Choice Award and Microsoft Stack Award.",
    stack: "Azure AI Foundry · Next.js · Microsoft SQL Server",
    image: unsplash("photo-1677442136019-21780ecad995"),
    link: "https://github.com/HeinThuraMin/Emochi-Emotional-AI-Companion",
  },
  {
    tag: "Final year project",
    title: "Krewby — Workforce Management SaaS",
    desc: "Multi-outlet scheduling, leave approval, rostering and timesheets for F&B businesses, with an AI assistant and AI-generated weekly schedules. I led the team as Team Lead and Database Engineer.",
    stack: "React 19 · Vite · Node/Express · Prisma · Supabase · OpenAI · Azure RAG",
    image: unsplash("photo-1517694712202-14dd9538aa97"),
    link: "https://github.com/HeinThuraMin/Krewby-Workforce-Management-SaaS-Platform",
  },
  {
    tag: "Group project",
    title: "ShibaInu — Online Fundraising Platform",
    desc: "A GoFundMe-style platform with Admin, Fund Raiser, Donee and Platform Management roles. Coordinated a 5-person Scrum team and produced the UML and ERD designs.",
    stack: "Next.js · TypeScript · Supabase",
    image: unsplash("photo-1555066931-4365d14bab8c"),
    link: "https://github.com/HeinThuraMin/ShibaInu-Online-Fundraising-Platform",
  },
  {
    tag: "Solo project",
    title: "Hand Gesture Alphabet Learning",
    desc: "Helps children learn sign language alphabets through tutorials, mini-games and real-time hand gesture recognition.",
    stack: "React · Tailwind · Node/Express · MySQL · MediaPipe · TensorFlow",
    image: unsplash("photo-1550751827-4bd374c3f58b"),
  },
  {
    tag: "AI / ML",
    title: "Taxi-v3 Reinforcement Learning",
    desc: "Trained a Q-learning agent in Gymnasium to learn optimal pickup and drop-off routes.",
    stack: "Python · Gymnasium · NumPy · Matplotlib",
    image: unsplash("photo-1526374965328-7f61d4dc18c5"),
    link: "https://github.com/HeinThuraMin/csci323-drive-a-taxi",
  },
  {
    tag: "AI / ML",
    title: "Garbage Classification",
    desc: "A CNN image classifier that sorts waste images to support automated recycling. I handled dataset cleaning and model testing.",
    stack: "Python · TensorFlow",
    image: unsplash("photo-1518770660439-4636190af475"),
    link: "https://github.com/HeinThuraMin/Garbage-Classification",
  },
];

export const skills = [
  ["Languages", ["JavaScript", "TypeScript", "Python", "SQL", "PowerShell"]],
  ["Frameworks & Backend", ["React.js", "Next.js", "Node.js", "Express.js", "Prisma", "REST APIs"]],
  ["Databases", ["PostgreSQL", "MySQL", "SQL Server"]],
  ["Cloud & Systems", ["Microsoft Azure", "Windows Admin", "Linux Admin"]],
  ["AI / ML", ["TensorFlow", "Q-learning", "RAG", "OpenAI API"]],
  ["Practices", ["Git/GitHub", "Agile/Scrum", "Data Analysis"]],
];

export const certs = [
  { title: "Solutions Architect – Associate", issuer: "AWS", tag: "Cloud", from: "#f59e0b", to: "#b45309" },
  { title: "Cloud Practitioner", issuer: "AWS", tag: "Cloud", from: "#fb923c", to: "#9a3412" },
  { title: "Data Engineering Professional Certificate", issuer: "IBM", tag: "Data", from: "#3b82f6", to: "#1e3a8a" },
  { title: "Data Analytics Specialization", issuer: "Google · Coursera", tag: "Data", from: "#22c55e", to: "#166534" },
  { title: "Oracle Database Foundation", issuer: "Simbolo · Aug 2023", tag: "Database", from: "#ef4444", to: "#7f1d1d" },
  { title: "Introduction to Artificial Intelligence", issuer: "Simbolo · 2023", tag: "AI", from: "#a78bfa", to: "#4c1d95" },
];
