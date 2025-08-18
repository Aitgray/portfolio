// src/app/about/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function About() {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="space-y-8">
      {/* flow-root keeps the float contained */}
      <div className="flow-root">
        {/* Float the portrait FIRST so the H1 lines up with its top.
           Adjust --portrait-h below to fine-tune alignment. */}
        <div
          className="about-portrait float-wrap-right sm:float-right sm:ml-6 sm:mb-4"
          style={
            {
              // tweak these two values to size/align the image
              ["--portrait-h" as any]: "403px",   // ← change this to line up with the H1
              ["--portrait-w" as any]: "302px",   // width cap (optional)
              ["--portrait-radius" as any]: "16px",
            }
          }
        >
          {!imgError ? (
            <Image
              src="/me.jpg"           // put your photo at /public/me.jpg
              alt="Portrait of Aidan Gray"
              fill                     // fills the frame (which now has a real height)
              className="object-cover"
              onError={() => setImgError(true)}
              priority
            />
          ) : (
            <div className="grid place-items-center w-full h-full bg-surface/70">
              <span className="text-sm text-muted text-center px-4">
                Add your photo at <span className="font-medium">/public/me.jpg</span>
              </span>
            </div>
          )}
        </div>

        {/* Heading right after the float so tops align */}
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight m-0">About Me</h1>

        <p className="mt-3 text-base sm:text-lg text-muted">
          I’m <span className="font-medium">Aidan</span>, a computer science graduate student who likes building practical
          systems with clean, straightforward interfaces. My recent work includes containers and networking,
          computer vision, and small machine learning projects as well as the website you're viewing now.
        </p>

        <p className="text-muted">
          I focus on end-to-end projects: collect useful data, process it efficiently, and present it through a
          fast interface. I prefer readable code, predictable infrastructure, and a small footprint. When I bring
          in deep learning, it's to enable a clear capability such as smoothing a vision pipeline, ranking items,
          or improving a tool’s decisions.
        </p>

        <h2 className="mt-8 text-xl font-semibold">At a glance</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="chip">Python</span>
          <span className="chip">C++</span>
          <span className="chip">Docker</span>
          <span className="chip">Nginx</span>
          <span className="chip">Cloudflare</span>
          <span className="chip">PyTorch</span>
          <span className="chip">OpenCV</span>
          <span className="chip">TensorFlow/Keras</span>
        </div>

        <h2 className="mt-8 text-xl font-semibold">Selected projects</h2>
        <ul className="mt-2 space-y-2 text-sm">
          <li>
            <span className="font-medium">KVALD</span>: local dimming and vision pipeline with a U-Net in PyTorch,
            C++/CMake core, Dockerized, using OpenCV and Eigen.
          </li>
          <li>
            <span className="font-medium">BardBot</span>: Discord bot that records and transcribes D&amp;D sessions
            with Azure Speech, storing artifacts in Blob Storage.
          </li>
          <li>
            <span className="font-medium">Solitaire ML</span>: rules engine and a TensorFlow/Keras policy network,
            with a training loop and evaluation utilities.
          </li>
          <li>
            <span className="font-medium">Portfolio (Next.js)</span>: this site using React/TypeScript and Tailwind,
            served with Nginx and Docker and protected by Cloudflare.
          </li>
        </ul>

        <div className="mt-4 text-sm">
          See more on the{" "}
          <Link className="link" href="/projects">
            Projects
          </Link>{" "}
          page.
        </div>

        <h2 className="mt-8 text-xl font-semibold">Contact</h2>
        <p className="text-muted text-sm">
          You can reach me via my LinkedIn, which is linked in the footer. I’m happy to chat about project work,
          systems problems, collaboration ideas, or employment opportunities.
        </p>
      </div>
    </section>
  );
}
