"use client";

import { useEffect, useMemo, useState } from "react";

import LocalizedSiteHeader from "./localized-site-header";
import styles from "../sources/page.module.css";
import type { Dictionary } from "../[lang]/dictionaries";
import type { Locale } from "@/lib/i18n";

type GitHubRepository = {
	id: number;
	name: string;
	html_url: string;
	description: string | null;
	stargazers_count: number;
	forks_count: number;
	updated_at: string;
	default_branch: string;
	snippet?: string;
};

type SourcesPageClientProps = {
	dict: Dictionary["dev"];
	header: Dictionary["header"];
	locale: Locale;
};

const GITHUB_OWNER = process.env.NEXT_PUBLIC_GITHUB_OWNER || "Trainvent";

export default function SourcesPageClient({
	dict,
	header,
	locale,
}: SourcesPageClientProps) {
	const [projects, setProjects] = useState<GitHubRepository[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;

		async function fetchRepositories(): Promise<GitHubRepository[]> {
			const owner = encodeURIComponent(GITHUB_OWNER);
			const orgReposUrl = `https://api.github.com/orgs/${owner}/repos?per_page=100&sort=updated&direction=desc&type=public`;
			const userReposUrl = `https://api.github.com/users/${owner}/repos?per_page=100&sort=updated&direction=desc&type=owner`;

			let res = await fetch(orgReposUrl, {
				headers: {
					Accept: "application/vnd.github+json",
				},
			});

			if (res.ok) {
				return (await res.json()) as GitHubRepository[];
			}

			if (res.status !== 404) {
				throw new Error(`GitHub API returned ${res.status} for ${orgReposUrl}`);
			}

			res = await fetch(userReposUrl, {
				headers: {
					Accept: "application/vnd.github+json",
				},
			});

			if (!res.ok) {
				throw new Error(`GitHub API returned ${res.status} for ${userReposUrl}`);
			}

			return (await res.json()) as GitHubRepository[];
		}

		async function loadProjects() {
			try {
				const data = await fetchRepositories();
				const withSnippets = await Promise.all(
					data.map(async (project) => {
						let snippet = "";
						const readmeUrl = `https://api.github.com/repos/${encodeURIComponent(
							GITHUB_OWNER,
						)}/${encodeURIComponent(project.name)}/readme`;

						try {
							const readmeResponse = await fetch(readmeUrl, {
								headers: {
									Accept: "application/vnd.github.raw+json",
								},
							});

							if (readmeResponse.ok) {
								const text = await readmeResponse.text();
								snippet = `${text.slice(0, 200).replace(/\r?\n/g, " ")}...`;
							}
						} catch (fetchError) {
							console.debug("failed to fetch readme", readmeUrl, fetchError);
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
				currentPath="/sources"
			/>
			<header className={`${styles.header} connected-panel`}>
				<p className={styles.eyebrow}>{dict.eyebrow}</p>
				<h1>{dict.title}</h1>
				<p className={styles.subtext}>
					{dict.subtitlePrefix}{" "}
					<a
						href={`https://github.com/${GITHUB_OWNER}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						github.com/{GITHUB_OWNER}
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
								<span>★ {project.stargazers_count}</span>
								<span>⑂ {project.forks_count}</span>
								<span>
									{dict.updatedLabel}{" "}
									{new Date(project.updated_at).toLocaleDateString(
										locale === "de" ? "de-DE" : "en-US",
									)}
								</span>
							</div>
							<a
								href={project.html_url}
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
