"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";
import React from 'react';
import SiteHeader from "../components/site-header";

type GitLabProject = {
	id: number;
	name: string;
	web_url: string;
	description: string | null;
	star_count: number;
	forks_count: number;
	last_activity_at: string;
	default_branch: string;
	snippet?: string;
};

// read from env (NEXT_PUBLIC_ so it’s available in the browser)
const GITLAB_OWNER =
	process.env.NEXT_PUBLIC_GITLAB_OWNER || "trainvent";

export default function DevPage() {
	const [projects, setProjects] = useState<GitLabProject[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;

		async function resolveOwnerId(): Promise<{ id: number; type: "group" | "user" }> {
			// try group lookup first
			let res = await fetch(
				`https://gitlab.com/api/v4/groups/${encodeURIComponent(GITLAB_OWNER)}`
			);
			if (res.ok) {
				const grp = await res.json();
				return { id: grp.id, type: "group" };
			}
			// fallback to user search
			res = await fetch(
				`https://gitlab.com/api/v4/users?username=${encodeURIComponent(
					GITLAB_OWNER
				)}`
			);
			if (!res.ok) throw new Error(`owner lookup failed (${res.status})`);
			const arr = await res.json();
			if (!Array.isArray(arr) || arr.length === 0) {
				throw new Error(`GitLab owner "${GITLAB_OWNER}" not found`);
			}
			return { id: arr[0].id, type: "user" };
		}

		async function loadProjects() {
			try {
				const { id: ownerId, type } = await resolveOwnerId();

				const projectsUrl = `https://gitlab.com/api/v4/${type === "group" ? "groups" : "users"
					}/${ownerId}/projects?simple=true&per_page=100&order_by=last_activity_at&sort=desc`;

				const res = await fetch(projectsUrl);
				if (!res.ok) {
					throw new Error(
						`GitLab API returned ${res.status} for ${projectsUrl}`
					);
				}
				const data = (await res.json()) as GitLabProject[];

				const withSnippets = await Promise.all(
					data.map(async (proj) => {
						let snippet = "";
						if (proj.default_branch) {
							const readmeUrl = `https://gitlab.com/api/v4/projects/${proj.id}/repository/files/README.md/raw?ref=${encodeURIComponent(
								proj.default_branch
							)}`;
							try {
								const r = await fetch(readmeUrl);
								if (r.ok) {
									const txt = await r.text();
									snippet =
										txt.slice(0, 200).replace(/\r?\n/g, " ") + "…";
								}
							} catch (e) {
								console.debug("failed to fetch readme", readmeUrl, e);
							}
						}
						return { ...proj, snippet };
					})
				);

				if (!cancelled) {
					setProjects(withSnippets);
				}
			} catch (err) {
				if (!cancelled) {
					setError(
						err instanceof Error ? err.message : "Failed to load projects"
					);
					console.error("project load error", err);
				}
			} finally {
				if (!cancelled) {
					setLoading(false);
				}
			}
		}

		loadProjects();
		return () => {
			cancelled = true;
		};
	}, []);

	const projectCountText = useMemo(() => {
		if (loading) {
			return "Loading projects...";
		}
		if (error) {
			return "Could not load projects.";
		}
		return `${projects.length} public project${projects.length === 1 ? "" : "s"}`;
	}, [error, loading, projects.length]);

	return (
		<main className={`site-shell ${styles.shell}`}>
			<SiteHeader navLabel="Developer sources navigation" />
			<header className={styles.header}>
				<p className={styles.eyebrow}>Developer Sources</p>
				<h1>GitLab Projects</h1>
				<p className={styles.subtext}>
					Auto‑synced from{" "}
					<a
						href={`https://gitlab.com/${GITLAB_OWNER}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						gitlab.com/{GITLAB_OWNER}
					</a>
				</p>
				<p className={styles.meta}>{projectCountText}</p>
			</header>

			{loading ? <p className={styles.state}>Loading...</p> : null}
			{error ? (
				<p className={styles.stateError}>
					Failed to load projects from GitLab API ({error}).
				</p>
			) : null}

			{!loading && !error ? (
				<section className={styles.grid}>
					{projects.map((project) => (
						<article key={project.id} className={styles.card}>
							<h2>{project.name}</h2>
							<p>{project.description ?? "No description provided."}</p>

							{project.snippet && (
								<pre className={styles.snippet}>
									{project.snippet}
								</pre>
							)}

							<div className={styles.stats}>
								<span>★ {project.star_count}</span>
								<span>⑂ {project.forks_count}</span>
								<span>
									Updated {new Date(project.last_activity_at).toLocaleDateString()}
								</span>
							</div>
							<a
								href={project.web_url}
								target="_blank"
								rel="noopener noreferrer"
							>
								Open project
							</a>
						</article>
					))}
				</section>
			) : null}
		</main>
	);
}
