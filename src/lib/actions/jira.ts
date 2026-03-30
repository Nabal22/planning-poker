"use server";

import { fetchSprints, fetchIssuesByJQL, updateStoryPoints } from "@/lib/jira";
import type { JiraSprint, JiraIssue } from "@/lib/jira";

type Result<T> = { data: T; error?: never } | { data?: never; error: string };

function getConfig() {
  const domain = process.env.JIRA_DOMAIN;
  const email = process.env.JIRA_EMAIL;
  const apiToken = process.env.JIRA_API_TOKEN;
  const projectKey = process.env.JIRA_PROJECT_KEY;
  const storyPointsField = process.env.JIRA_STORY_POINTS_FIELD || "customfield_10016";

  if (!domain || !email || !apiToken || !projectKey) {
    throw new Error("Variables d'environnement Jira manquantes (JIRA_DOMAIN, JIRA_EMAIL, JIRA_API_TOKEN, JIRA_PROJECT_KEY)");
  }
  return { domain, email, apiToken, projectKey, storyPointsField };
}

export async function getSprintsAction(): Promise<Result<JiraSprint[]>> {
  try {
    const { domain, email, apiToken, projectKey } = getConfig();
    const data = await fetchSprints(domain, email, apiToken, projectKey);
    return { data };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erreur inconnue" };
  }
}

export async function getIssuesAction(jql: string): Promise<Result<JiraIssue[]>> {
  try {
    const { domain, email, apiToken, storyPointsField } = getConfig();
    const data = await fetchIssuesByJQL(domain, email, apiToken, jql, storyPointsField);
    return { data };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erreur inconnue" };
  }
}

export async function estimateIssueAction(issueKey: string, points: number): Promise<Result<void>> {
  try {
    const { domain, email, apiToken, storyPointsField } = getConfig();
    await updateStoryPoints(domain, email, apiToken, issueKey, points, storyPointsField);
    return { data: undefined };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erreur inconnue" };
  }
}
