// src/types/opensource.ts
export interface PullRequest {
  id: string;
  title: string;
  url: string;
  state: string;
  createdAt: string;
  number: number;
  changedFiles: number;
  additions: number;
  deletions: number;
  mergedBy: {
    avatarUrl: string;
    url: string;
    login: string;
  } | null;
  baseRepository: {
    name: string;
    url: string;
    owner: {
      avatarUrl: string;
      login: string;
      url: string;
    };
  };
}

// src/types/opensource.ts
export interface Assignee {
  avatarUrl: string;
  name: string | null;  // name може бути null
  url: string;
}

export interface Issue {
  id: string;
  closed: boolean;
  title: string;
  createdAt: string;
  url: string;
  number: number;
  updatedAt: string;
  assignees: {
    nodes: Assignee[];  // ← Використовуємо тип Assignee
  };
  repository: {
    name: string;
    url: string;
    owner: {
      login: string;
      avatarUrl: string;
      url: string;
    };
  };
}

export interface Organization {
  login: string;
  avatarUrl: string;
  url: string;  // зробити url необов'язковим
  __typename?: string; // додати як необов'язкове
}

export interface Project {
  id: string;
  name: string;
  createdAt: string;
  url: string;
  description: string;
  isFork: boolean;
  languages: Array<{
    name: string;
    iconifyClass: string;
  }>;
}


export interface Person {
  name: string;
  copyright: string;
  homeTitle: string;
  homeSubtitles: string[];
  homeEmojis: string[];
}


export interface ProjectLangIcon {
  name: string;
  color: string;
}

export interface ProjectInfo {
  title: string;
  url: string;
  desc: string;
  icons: ProjectLangIcon[];
}

export interface ContactLink {
  name: string;
  url: string;
  icon: string;
  color: string;
  bgColor: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface NavLink {
  name: string;
  path: string;
}

export interface ArtLink {
  name: string;
  url: string;
  icon: string;
  color: string;
  bgColor: string;
}