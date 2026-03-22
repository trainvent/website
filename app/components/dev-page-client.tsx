"use client";

import { useEffect, useMemo, useState } from "react";

import LocalizedSiteHeader from "./localized-site-header";
import styles from "../dev/page.module.css";
import type { Dictionary } from "../[lang]/dictionaries";
import type { Locale } from "@/lib/i18n";

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

type DevPageClientProps = {
	dict: Dictionary["dev"];
	header: Dictionary["header"];
	locale: Locale;
};

const GITLAB_OWNER = process.env.NEXT_PUBLIC_GITLAB_OWNER || "trainvent";

export default function DevPageClient({
	dict,
	header,
	locale,
}: DevPageClientProps) {
	const [projects, setProjects] = useState<GitLabProject[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;

		async function resolveOwnerId(): Promise<{ id: number; type: "group" | "user" }> {
			let res = await fetch(
				`https://gitlab.com/api/v4/groups/${encodeURIComponent(GITLAB_OWNER)}`,
			);

			if (res.ok) {
				const group = await res.json();
				return { id: group.id, type: "group" };
			}

			res = await fetch(
				`https://gitlab.com/api/v4/users?username=${encodeURIComponent(GITLAB_OWNER)}`,
			);

			if (!res.ok) {
				throw new Error(`owner lookup failed (${res.status})`);
			}

			const users = await res.json();

			if (!Array.isArray(users) || users.length === 0) {
				throw new Error(`GitLab owner "${GITLAB_OWNER}" not found`);
			}

			return { id: users[0].id, type: "user" };
		}

		async function loadProjects() {
			try {
				const { id: ownerId, type } = await resolveOwnerId();
				const projectsUrl = `https://gitlab.com/api/v4/${
					type === "group" ? "groups" : "users"
				}/${ownerId}/projects?simple=true&per_page=100&order_by=last_activity_at&sort=desc`;

				const res = await fetch(projectsUrl);

				if (!res.ok) {
					throw new Error(`GitLab API returned ${res.status} for ${projectsUrl}`);
				}

				const data = (await res.json()) as GitLabProject[];
				const withSnippets = await Promise.all(
					data.map(async (project) => {
						let snippet = "";

						if (project.default_branch) {
							const readmeUrl = `https://gitlab.com/api/v4/projects/${project.id}/repository/files/README.md/raw?ref=${encodeURIComponent(
								project.default_branch,
							)}`;

							try {
								const readmeResponse = await fetch(readmeUrl);

								if (readmeResponse.ok) {
									const text = await readmeResponse.text();
									snippet = `${text.slice(0, 200).replace(/\r?\n/g, " ")}...`;
								}
							} catch (fetchError) {
								console.debug("failed to fetch readme", readmeUrl, fetchError);
							}
						}

						return { ...project, snippet };
					}),
				);

				if (!cancelled) {
					setProjects(withSnippets);
				}
			} catch (loadError) {
				if (!cancelled) {
					setError(
						loadError instanceof Error
							? loadError.message
							: dict.loadErrorSummary,
					);
				}
			} finally {
				if (!cancelled) {
					setLoading(false);
				}
			}
		}

		void loadProjects();

		return () => {
			cancelled = true;
		};
	}, [dict.loadErrorSummary]);

	const projectCountText = useMemo(() => {
		if (loading) {
			return dict.loadingProjects;
		}

		if (error) {
			return dict.loadErrorSummary;
		}

		return `${projects.length} ${
			projects.length === 1
				? dict.publicProjectsSingular
				: dict.publicProjectsPlural
		}`;
	}, [
		dict.loadErrorSummary,
		dict.loadingProjects,
		dict.publicProjectsPlural,
		dict.publicProjectsSingular,
		error,
		loading,
		projects.length,
	]);

	return (
		<main className={`site-shell ${styles.shell}`}>
			<LocalizedSiteHeader
				navLabel={dict.navLabel}
				header={header}
				locale={locale}
				currentPath="/dev"
			/>
			<header className={`${styles.header} connected-panel`}>
				<p className={styles.eyebrow}>{dict.eyebrow}</p>
				<h1>{dict.title}</h1>
				<p className={styles.subtext}>
					{dict.subtitlePrefix}{" "}
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

			{loading ? <p className={styles.state}>{dict.loading}</p> : null}
			{error ? (
				<p className={styles.stateError}>
					{dict.loadErrorDetail} ({error}).
				</p>
			) : null}

			{!loading && !error ? (
				<section className={styles.grid}>
					{projects.map((project) => (
						<article key={project.id} className={styles.card}>
							<h2>{project.name}</h2>
							<p>{project.description ?? dict.noDescription}</p>

							{project.snippet ? (
								<pre className={styles.snippet}>{project.snippet}</pre>
							) : null}

							<div className={styles.stats}>
								<span>★ {project.star_count}</span>
								<span>⑂ {project.forks_count}</span>
								<span>
									{dict.updatedLabel}{" "}
									{new Date(project.last_activity_at).toLocaleDateString(
										locale === "de" ? "de-DE" : "en-US",
									)}
								</span>
							</div>
							<a
								href={project.web_url}
								target="_blank"
								rel="noopener noreferrer"
							>
								{dict.openProject}
							</a>
						</article>
					))}
				</section>
			) : null}
		</main>
	);
}
