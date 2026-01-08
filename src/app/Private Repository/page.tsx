"use client";
// An error page that indicates that the linked repository is private.
export default function PrivateRepository() {
  return (
    <section className="space-y-8">
      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
          Repository unavailable
        </h1>

        <p className="mt-4 text-base sm:text-lg text-muted">
          This project’s source code is currently stored in a private repository.
          The link you followed is intentionally restricted.
        </p>

        <p className="text-muted">
          Some of the work shown on this site is part of active research, restricted
          coursework, or pre-publication development. For that reason, certain
          repositories are not publicly accessible and may not be released.
        </p>

        <p className="text-muted">
          If you are an employer, collaborator, or reviewer and need access,
          feel free to reach out via LinkedIn (linked in the footer) and I can
          provide credentials, write-ups, or a private walkthrough.
        </p>

        <div className="mt-6 text-sm text-muted">
          Public projects can be found on the{" "}
          <a href="/projects" className="link">
            Projects
          </a>{" "}
          page.
        </div>
      </div>
    </section>
  );
}
