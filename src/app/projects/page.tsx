"use client";

import { useState } from "react";

type Project = {
  title: string;
  summary: string;
  tech: string[];
  repo: string;
};

const projects: Project[] = [
  {
    title: "250 Notes Scraper",
    summary: "Scrapes PDFs with PyPDF2 and cleans the text via regex for usable study notes.",
    tech: ["Python", "PyPDF2", "Regex"],
    repo: "https://github.com/yourhandle/250-notes-scraper",
  },
  {
    title: "BardBot",
    summary: "Discord bot that records & transcribes D&D sessions using Azure Speech-to-Text, storing artifacts in Blob Storage.",
    tech: ["Python", "discord.py", "Azure Speech-to-Text", "Azure Blob Storage", "REST"],
    repo: "https://github.com/yourhandle/bardbot",
  },
  {
    title: "Compression",
    summary: "A file compression utility using gzip and planned GUI with PyQt5. It features a hash map for categorization and intends to add encryption and automated file categorization using computer vision in the future.",
    tech: ["Python", "PyQt5", "gzip", "OpenCV"],
    repo: ""
  },
  {
    title: "FlasktorioAsgn4",
    summary: "A distributed, fault-tolerant, and sharded key-value store built with Flask. It implements causal consistency using vector clocks and manages node membership and replication for high availability.",
    tech: ["Python", "Flask", "Distributed Systems", "Vector Clocks", "Sharding", "REST APIs"],
    repo: ""
  },
  {
    title: "ImageConverter",
    summary: "A Python utility to convert HEIC images to JPG format. It uses a pre-trained PyTorch model and the face_recognition library to automatically classify and sort the converted images into categories like 'person', 'animal', or 'landscape'.",
    tech: ["Python", "PyTorch", "Pillow", "face_recognition"],
    repo: ""
  },
  {
    title: "KVALD",
    summary: "Local-dimming / vision pipeline with a U-Net in PyTorch; C++/CMake core, Dockerized; uses OpenCV and Eigen.",
    tech: ["C++", "Python", "PyTorch", "OpenCV", "CMake", "Docker", "Eigen"],
    repo: "https://github.com/yourhandle/kvald",
  },
  {
    title: "Diffusers Text-to-Image",
    summary: "Generates images from text prompts using Hugging Face Diffusers and a pre-trained model.",
    tech: ["Python", "PyTorch", "Diffusers"],
    repo: "https://github.com/yourhandle/diffusers-text-to-image",
  },
  {
    title: "RL_Agent",
    summary: "A reinforcement learning agent built with PyTorch to control a vehicle in the CARLA simulator. The agent uses a policy network to learn how to navigate to a destination while adhering to speed limits.",
    tech: ["Python", "PyTorch", "CARLA", "Reinforcement Learning", "Machine Learning"],
    repo: ""
  },
  {
    title: "Solitaire",
    summary: "Solitaire player with a TensorFlow/Keras policy network; includes rules engine and training pipeline.",
    tech: ["Python", "TensorFlow", "Keras", "NumPy", "Machine Learning"],
    repo: "https://github.com/yourhandle/solitaire-ml",
  },
  {
    title: "Website (Next.js)",
    summary: "Modern portfolio built with Next.js + React/TypeScript; Tailwind styling and Dockerized deployment.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Docker"],
    repo: "https://github.com/yourhandle/portfolio-nextjs",
  },
  {
    title: "Wordle",
    summary: "Wordle clone with both a command-line mode and a Tkinter GUI.",
    tech: ["Python", "tkinter"],
    repo: "https://github.com/yourhandle/wordle-clone",
  },
];


function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M12 .5A11.5 11.5 0 0 0 8.36 22.9c.58.1.8-.25.8-.56v-2.18c-3.26.71-3.95-1.57-3.95-1.57-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.22 1.79 1.22 1.04 1.78 2.73 1.26 3.4.97.11-.76.41-1.26.75-1.55-2.6-.3-5.35-1.3-5.35-5.8 0-1.28.46-2.33 1.22-3.15-.12-.3-.53-1.53.12-3.18 0 0 1-.32 3.28 1.2a11.36 11.36 0 0 1 5.98 0c2.27-1.52 3.27-1.2 3.27-1.2.65 1.65.24 2.88.12 3.18.76.82 1.21 1.87 1.21 3.15 0 4.51-2.75 5.5-5.37 5.8.42.36.8 1.06.8 2.14v3.18c0 .31.21.67.81.56A11.5 11.5 0 0 0 12 .5Z"/>
    </svg>
  );
}

export default function Projects() {
  // Track which cards are "pinned" open.
  const [openSet, setOpenSet] = useState<Set<number>>(new Set());
  const allOpen = openSet.size === projects.length;

  const toggleAll = () => {
    setOpenSet(prev => {
      if (prev.size === projects.length) return new Set(); // collapse all
      const s = new Set<number>();
      projects.forEach((_, i) => s.add(i));                // expand all
      return s;
    });
  };

  const toggleOne = (i: number) => {
    setOpenSet(prev => {
      const s = new Set(prev);
      if (s.has(i)) s.delete(i); else s.add(i);
      return s;
    });
  };

  return (
    <section className="space-y-8">
      {/* Title left, 32×32 square toggle right */}
      <div className="header-row">
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight m-0">Projects</h1>

        <button
          type="button"
          className={`header-toggle${allOpen ? " is-open" : ""}`}
          onClick={toggleAll}
          aria-pressed={allOpen}
          aria-label={allOpen ? "Collapse all projects" : "Expand all projects"}
          title={allOpen ? "Collapse all" : "Expand all"}
        >
          <span className="header-toggle-box">
            <svg className="header-toggle-icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden>
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/>
              <path d="M12 5V19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/>
            </svg>
            <span className="header-toggle-label">
              {allOpen ? "Collapse all" : "Expand all"}
            </span>
          </span>
        </button>
      </div>


      <div className="projects-stack">
        {projects.map((p, i) => (
          <ProjectCard
            key={p.title}
            project={p}
            isPinned={openSet.has(i)}
            onTogglePinned={() => toggleOne(i)}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  isPinned,
  onTogglePinned,
}: {
  project: Project;
  isPinned: boolean;
  onTogglePinned: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const isOpen = isPinned || hovered;

  return (
    <article
      className={`project${isOpen ? " is-open" : ""}`}
      tabIndex={0}
      aria-expanded={isOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Per-card square toggle */}
      <button
        className="project-toggle"
        aria-label={isPinned ? "Unpin details" : "Pin open"}
        aria-pressed={isPinned}
        onClick={(e) => { e.stopPropagation(); onTogglePinned(); }}
        title={isPinned ? "Collapse" : "Expand"}
      >
        <span className="project-toggle-box" aria-hidden>
          <svg className="project-toggle-icon" viewBox="0 0 24 24" width="16" height="16">
            <path d="M5 12H19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/>
            <path d="M12 5V19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/>
          </svg>
        </span>
      </button>

      <div className="project-head">
        <div className="project-meta">
          <GitHubIcon />
          <span className="project-title">{project.title}</span>
        </div>
      </div>

      <div className="project-content">
        <p className="mt-3 text-sm text-muted">{project.summary}</p>

        <div className="project-actions">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
          <a className="project-cta" href={project.repo} target="_blank" rel="noopener noreferrer">
            View Repo
          </a>
        </div>
      </div>
    </article>
  );
}
